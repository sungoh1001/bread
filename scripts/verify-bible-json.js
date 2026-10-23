#!/usr/bin/env node
'use strict'

/**
 * 변환된 ko_rev.json이 기존 구조와 확정 규칙을 지키는지 검증한다.
 *
 * 사용법
 *   node scripts/verify-bible-json.js [jsonPath]
 *
 * 기본값: src/assets/ko_rev.json
 * 구조 비교 기준: `git show main:src/assets/ko_rev.json`
 */

const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')

const ROOT = path.resolve(__dirname, '..')
const DEFAULT_TARGET = path.join(ROOT, 'src/assets/ko_rev.json')
// 9765dc0 = 본문 교체 전 원본 구조. 필요하면 BIBLE_REFERENCE로 덮어쓴다.
const REFERENCE = process.env.BIBLE_REFERENCE || '9765dc0:src/assets/ko_rev.json'

// 합절: 첫 절에 라벨 + 본문, 나머지 절은 빈 문자열
const RANGES = [
  ['deut', 6, 18, 19], ['deut', 15, 4, 5], ['deut', 30, 9, 10],
  ['chr1', 16, 12, 13], ['ps', 92, 1, 3], ['ps', 105, 5, 6],
  ['jer', 32, 3, 5], ['jer', 33, 10, 11], ['eze', 24, 4, 5],
  ['acts', 15, 25, 26], ['rom', 9, 1, 2]
]

// 합절 라벨 뒤에 오는 제목 (제목이 있는 합절)
const RANGE_HEADINGS = {
  'ps:92:1': '<안식일의 찬송 시>',
  'rom:9:1': '<약속의 자녀 약속의 말씀>'
}

// f1에 없던 원문 전용 제목 17개
const SOURCE_HEADINGS = {
  'ps:92:1': '<안식일의 찬송 시>',
  'rom:9:1': '<약속의 자녀 약속의 말씀>',
  'gen:35:22': '<야곱의 아들들(대상 2:1-2)>',
  'sam1:4:1': '<언약궤를 빼앗기다>',
  'sam2:12:15': '<다윗의 아이가 죽다>',
  'sam2:19:8': '<다윗의 귀환 준비>',
  'is:59:15': '<여호와께서 백성을 구원하려고 하시다>',
  'jer:3:22': '<진실한 회개>',
  'oba:1:1': '<여호와께서 에돔을 심판하시다>',
  'mk:6:6': '<열두 제자를 부르사 둘씩 보내시다(마 10:1, 5-15; 눅 9:1-6)>',
  'lk:9:43': '<인자가 사람들의 손에 넘겨지리라(마 17:22-23; 막 9:30-32)>',
  'lk:23:56': '<살아나시다(마 28:1-10; 막 16:1-8; 요 20:1-10)>',
  'jn:12:36': '<그들이 예수를 믿지 아니하다>',
  'jn:18:38': '<십자가에 못 박도록 예수를 넘겨 주다(마 27:15-31; 막 15:6-20; 눅 23:13-25)>',
  'acts:8:1': '<사울이 교회를 박해하다>',
  'acts:9:19': '<사울이 다메섹에서 전도하다>',
  'acts:10:23': '<베드로가 고넬료의 집에서 설교하다>'
}

const failures = []
const checks = []

function check (name, condition, detail) {
  checks.push(name)
  if (!condition) failures.push(detail || name)
}

function key (abbrev, chapter, verse) {
  return `${abbrev}:${chapter}:${verse}`
}

function getVerse (json, abbrev, chapter, verse) {
  const book = json.find(item => item.abbrev === abbrev)
  if (!book) return undefined
  const chapterData = book.chapters[chapter - 1]
  if (!chapterData) return undefined
  return chapterData[verse - 1]
}

function loadReference () {
  try {
    const raw = execFileSync('git', ['show', REFERENCE], {
      cwd: ROOT,
      encoding: 'utf8',
      maxBuffer: 32 * 1024 * 1024
    })
    return JSON.parse(raw)
  } catch (error) {
    throw new Error(`기준 JSON을 읽지 못했습니다 (${REFERENCE}): ${error.message}`)
  }
}

function main () {
  const targetPath = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_TARGET
  const json = JSON.parse(fs.readFileSync(targetPath, 'utf8'))
  const reference = loadReference()

  // 1. 구조
  check('책 수 66권', json.length === 66, `책 수: ${json.length}`)
  check('책 약어·이름 일치', json.every((book, i) => {
    const ref = reference[i]
    return ref && book.abbrev === ref.abbrev && book.name === ref.name
  }), '책 약어/이름이 기준과 다릅니다')

  const chapterCount = json.reduce((sum, book) => sum + book.chapters.length, 0)
  check('장 수 1,189장', chapterCount === 1189, `장 수: ${chapterCount}`)

  let verseCount = 0
  let structureOk = true
  json.forEach((book, bookIndex) => {
    const refBook = reference[bookIndex]
    if (!refBook || book.chapters.length !== refBook.chapters.length) {
      structureOk = false
      return
    }
    book.chapters.forEach((chapter, chapterIndex) => {
      const refChapter = refBook.chapters[chapterIndex]
      if (chapter.length !== refChapter.length) structureOk = false
      verseCount += chapter.length
    })
  })
  check('장별 절 수가 기준과 동일', structureOk, '장별 절 수가 기준과 다릅니다')
  check('총 절 수 31,102', verseCount === 31102, `총 절 수: ${verseCount}`)

  // 2. null/빈 문자열
  const nulls = []
  const empties = []
  json.forEach(book => book.chapters.forEach((chapter, chapterIndex) => {
    chapter.forEach((verse, verseIndex) => {
      const ref = key(book.abbrev, chapterIndex + 1, verseIndex + 1)
      if (verse === null || verse === undefined) nulls.push(ref)
      if (verse === '') empties.push(ref)
    })
  }))
  check('null 절 0개', nulls.length === 0, `null 절: ${nulls.join(', ')}`)

  const expectedTails = new Set()
  RANGES.forEach(([abbrev, chapter, start, end]) => {
    for (let verse = start + 1; verse <= end; verse++) {
      expectedTails.add(key(abbrev, chapter, verse))
    }
  })
  const emptySet = new Set(empties)
  check('빈 절 13개', empties.length === 13, `빈 절 수: ${empties.length} (${empties.join(', ')})`)
  check('빈 절 위치 일치', expectedTails.size === emptySet.size &&
    [...expectedTails].every(ref => emptySet.has(ref)),
  `예상: ${[...expectedTails].join(', ')}\n실제: ${empties.join(', ')}`)

  // 3. 합절 라벨
  let labelCount = 0
  RANGES.forEach(([abbrev, chapter, start, end]) => {
    const ref = key(abbrev, chapter, start)
    const verse = getVerse(json, abbrev, chapter, start)
    const label = `(${start}-${end}) `
    check(`합절 라벨 ${ref}`, typeof verse === 'string' && verse.startsWith(label),
      `${ref}: ${String(verse).slice(0, 60)}`)
    if (typeof verse === 'string' && verse.startsWith(label)) labelCount++
    const heading = RANGE_HEADINGS[ref]
    if (heading) {
      check(`합절+제목 순서 ${ref}`, typeof verse === 'string' && verse.startsWith(`${label}${heading}`),
        `${ref}: ${String(verse).slice(0, 80)}`)
    }
  })
  check('합절 라벨 11개', labelCount === 11, `라벨 수: ${labelCount}`)

  // 4. 원문 전용 제목
  Object.keys(SOURCE_HEADINGS).forEach(ref => {
    const [abbrev, chapter, verse] = ref.split(':')
    const text = getVerse(json, abbrev, Number(chapter), Number(verse))
    check(`원문 제목 유지 ${ref}`, typeof text === 'string' && text.includes(SOURCE_HEADINGS[ref]),
      `${ref}: ${String(text).slice(0, 80)}`)
  })

  // 5. 제목 총 개수
  let headingCount = 0
  json.forEach(book => book.chapters.forEach(chapter => chapter.forEach(verse => {
    if (typeof verse === 'string') {
      const matches = verse.match(/<[^<>]*>/g)
      if (matches) headingCount += matches.length
    }
  })))
  check('제목 총 2,429개', headingCount === 2429, `제목 수: ${headingCount}`)

  // 6. 대표 절
  const deut618 = getVerse(json, 'deut', 6, 18)
  const deut619 = getVerse(json, 'deut', 6, 19)
  const ps921 = getVerse(json, 'ps', 92, 1)
  const ps922 = getVerse(json, 'ps', 92, 2)
  const ps923 = getVerse(json, 'ps', 92, 3)
  const gen3522 = getVerse(json, 'gen', 35, 22)
  const rom91 = getVerse(json, 'rom', 9, 1)
  const acts247 = getVerse(json, 'acts', 24, 7)

  check('신 6:18 라벨', typeof deut618 === 'string' && deut618.startsWith('(18-19) 여호와께서 보시기에'), String(deut618).slice(0, 60))
  check('신 6:19 빈 절', deut619 === '', String(deut619))
  check('시 92:1 라벨+제목', typeof ps921 === 'string' && ps921.startsWith('(1-3) <안식일의 찬송 시> 지존자여'), String(ps921).slice(0, 70))
  check('시 92:2 빈 절', ps922 === '', String(ps922))
  check('시 92:3 빈 절', ps923 === '', String(ps923))
  check('창 35:22 중간 제목', typeof gen3522 === 'string' && gen3522.includes('야곱의 <야곱의 아들들(대상 2:1-2)> 아들은 열둘이라'), String(gen3522).slice(0, 80))
  check('롬 9:1 라벨+제목', typeof rom91 === 'string' && rom91.startsWith('(1-2) <약속의 자녀 약속의 말씀>'), String(rom91).slice(0, 70))
  check('행 24:7 (없음)', acts247 === '(없음)', String(acts247))

  // 결과
  const failed = failures.length
  console.log(`검사 항목: ${checks.length}`)
  console.log(`통과: ${checks.length - failed}`)
  console.log(`실패: ${failed}`)
  if (failed) {
    console.log('\n실패 항목:')
    failures.forEach((failure, index) => console.log(`${index + 1}. ${failure}`))
    process.exitCode = 1
  } else {
    console.log('\nPASS — 구조와 합절/제목 규칙이 모두 일치합니다.')
  }
}

main()

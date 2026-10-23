#!/usr/bin/env node
'use strict'

/**
 * ko_rev.json(f1)의 구조와 <제목>을 유지한 채, 본문만 ko-rev-cp949.txt에서 다시 채운다.
 *
 * 변환 규칙
 * 1. 책/장/절 배열 길이와 책 약어·이름은 f1을 그대로 쓴다.
 * 2. f1 절에 <...> 제목이 있으면 그것을 그대로 쓰고, 원문 본문의 제목은 제거한다.
 *    f1에 제목이 없으면 원문의 제목을 있는 그대로(선행/중간 모두) 유지한다.
 * 3. 원문의 "18-19"처럼 합쳐진 절은 첫 절 본문 맨 앞에 "(18-19)" 라벨을 붙이고
 *    전체 본문을 넣는다. 나머지 절은 빈 문자열로 둔다.
 *    제목이 함께 있으면 "(1-3) <제목> 본문" 순서가 된다.
 * 4. 원문에서 절 번호 없이 줄바꿈된 이어짐 줄은 앞 절 본문 뒤에 붙인다.
 * 5. 원문에 본문이 없는 절(예: 행 24:7)은 기존 관례대로 "(없음)"을 넣는다.
 *
 * 사용 예
 *   node scripts/rebuild-bible-json.js --book deut --chapter 6 --pretty
 *   node scripts/rebuild-bible-json.js --out src/assets/ko_rev.json
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const DEFAULT_F1 = path.join(ROOT, 'src/assets/ko_rev.json')
const DEFAULT_SRC = path.join(ROOT, 'src/assets/ko-rev-cp949.txt')

// 성경 정경 순서: [ko_rev.json 책 약어, 원문 파일의 책 이름]
const BOOKS = [
  ['gen', '창'], ['exod', '출'], ['lev', '레'], ['num', '민'], ['deut', '신'],
  ['josh', '수'], ['jud', '삿'], ['ruth', '룻'], ['sam1', '삼상'], ['sam2', '삼하'],
  ['kgs1', '왕상'], ['kgs2', '왕하'], ['chr1', '대상'], ['chr2', '대하'], ['ezr', '스'],
  ['neh', '느'], ['est', '에'], ['job', '욥'], ['ps', '시'], ['prov', '잠'],
  ['ecc', '전'], ['song', '아'], ['is', '사'], ['jer', '렘'], ['lam', '애'],
  ['eze', '겔'], ['dan', '단'], ['hos', '호'], ['joel', '욜'], ['amos', '암'],
  ['oba', '옵'], ['jonah', '욘'], ['mic', '미'], ['nah', '나'], ['hab', '합'],
  ['zep', '습'], ['hag', '학'], ['zec', '슥'], ['mal', '말'], ['matt', '마'],
  ['mk', '막'], ['lk', '눅'], ['jn', '요'], ['acts', '행'], ['rom', '롬'],
  ['cor1', '고전'], ['cor2', '고후'], ['gal', '갈'], ['eph', '엡'], ['phil', '빌'],
  ['col', '골'], ['thes1', '살전'], ['thes2', '살후'], ['tim1', '딤전'], ['tim2', '딤후'],
  ['tit', '딛'], ['philem', '몬'], ['heb', '히'], ['jas', '약'], ['pet1', '벧전'],
  ['pet2', '벧후'], ['jn1', '요일'], ['jn2', '요이'], ['jn3', '요삼'], ['jude', '유'],
  ['rev', '계']
]

const BOOK_NAME_TO_ABBREV = new Map(BOOKS.map(([abbrev, name]) => [name, abbrev]))
// 긴 이름을 먼저 매칭해야 "고전"이 "전"으로 잘못 잡히지 않는다.
const BOOK_NAME_PATTERN = BOOKS.map(([, name]) => name).sort((a, b) => b.length - a.length).join('|')

const HEADING_RE = /<[^<>]*>/g
const PSALM_DIVISION_RE = /^제[이삼사오]권$/
// 원문 자체에 본문이 없는 절
const OMITTED_KEYS = new Set(['acts:24:7'])

function usage () {
  return [
    '사용법: node scripts/rebuild-bible-json.js [옵션]',
    '',
    '옵션:',
    '  --f1 <path>       기존 JSON (기본: src/assets/ko_rev.json)',
    '  --src <path>      원문 CP949 텍스트 (기본: src/assets/ko-rev-cp949.txt)',
    '  --out <path>      변환 결과를 파일로 저장',
    '  --book <abbrev>   지정한 책만 출력 (예: deut)',
    '  --chapter <n>     --book과 함께 쓰면 해당 장만 출력',
    '  --pretty          JSON을 들여쓰기해서 출력',
    '  --help            이 도움말 출력'
  ].join('\n')
}

function parseArgs (argv) {
  const args = {
    f1: DEFAULT_F1,
    src: DEFAULT_SRC,
    out: null,
    book: null,
    chapter: null,
    pretty: false,
    help: false
  }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    switch (arg) {
      case '--f1': args.f1 = argv[++i]; break
      case '--src': args.src = argv[++i]; break
      case '--out': args.out = argv[++i]; break
      case '--book': args.book = argv[++i]; break
      case '--chapter': args.chapter = Number(argv[++i]); break
      case '--pretty': args.pretty = true; break
      case '--help': args.help = true; break
      default: throw new Error(`알 수 없는 옵션: ${arg}`)
    }
  }
  if (args.chapter !== null && (!Number.isInteger(args.chapter) || args.chapter < 1)) {
    throw new Error('--chapter에는 1 이상의 정수를 지정하세요.')
  }
  if (args.chapter !== null && !args.book) {
    throw new Error('--chapter는 --book과 함께 사용하세요.')
  }
  return args
}

function readSource (file) {
  const buffer = fs.readFileSync(file)
  // CP949는 WHATWG 표준 이름이 euc-kr이다.
  return new TextDecoder('euc-kr').decode(buffer).replace(/\r\n/g, '\n')
}

/**
 * 일부 책은 마지막 절과 다음 책의 첫 절이 줄바꿈 없이 붙어 있다.
 * 예: "...아멘고전1:1 <인사와 감사> ..."
 */
function splitGluedBookStarts (text) {
  const re = new RegExp('([^\\n])(' + BOOK_NAME_PATTERN + ')1:1 ', 'g')
  let count = 0
  const result = text.replace(re, (match, prevChar, bookName) => {
    count++
    return prevChar + '\n' + bookName + '1:1 '
  })
  return { text: result, count }
}

function parseRecords (text) {
  const verseRe = new RegExp(
    '^(' + BOOK_NAME_PATTERN + ')([0-9]+):([0-9]+)(?:-([0-9]+))? (.*)$'
  )
  const noVerseRe = new RegExp('^(' + BOOK_NAME_PATTERN + ')([0-9]+):(.*)$')
  const records = []

  const lines = text.split('\n')
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex]
    if (!line.trim()) continue

    let match = line.match(verseRe)
    if (match) {
      records.push({
        book: BOOK_NAME_TO_ABBREV.get(match[1]),
        chapter: Number(match[2]),
        verse: Number(match[3]),
        verseEnd: match[4] ? Number(match[4]) : null,
        text: match[5],
        raw: line
      })
      continue
    }

    match = line.match(noVerseRe)
    if (match) {
      records.push({
        book: BOOK_NAME_TO_ABBREV.get(match[1]),
        chapter: Number(match[2]),
        verse: null,
        verseEnd: null,
        text: match[3],
        raw: line
      })
      continue
    }

    throw new Error(`해석할 수 없는 줄: ${line.slice(0, 100)}`)
  }

  return records
}

/**
 * 절 번호 없이 시작하는 줄은 앞 절이 줄바꿈된 것이다. 앞 절 뒤에 이어 붙인다.
 * 시편의 "제이권" 같은 권 구분 표시는 절이 아니므로 버린다.
 */
function mergeContinuations (records) {
  const merged = []
  let continuationLines = 0
  let divisionMarkers = 0

  for (let recordIndex = 0; recordIndex < records.length; recordIndex++) {
    const record = records[recordIndex]
    if (record.verse !== null) {
      merged.push(record)
      continue
    }

    const text = record.text.trim()
    if (PSALM_DIVISION_RE.test(text)) {
      divisionMarkers++
      continue
    }

    const previous = merged[merged.length - 1]
    if (!previous || previous.book !== record.book || previous.chapter !== record.chapter) {
      throw new Error(`이어 붙일 앞 절이 없습니다: ${record.raw.slice(0, 100)}`)
    }

    previous.text = previous.text.trim() + ' ' + text
    continuationLines++
  }

  return { records: merged, continuationLines, divisionMarkers }
}

function stripHeadings (text) {
  return text.replace(HEADING_RE, ' ').replace(/\s+/g, ' ').trim()
}

function leadingHeadings (text) {
  const match = text.match(/^((?:<[^<>]*>\s*)+)/)
  return match ? match[1].replace(/\s+$/, '') : ''
}

function indexSource (records) {
  const bodies = new Map()
  const rawBodies = new Map()
  const rangeLabels = new Map()
  const rangeTails = []

  const keyOf = (record, verse) => `${record.book}:${record.chapter}:${verse}`

  for (let recordIndex = 0; recordIndex < records.length; recordIndex++) {
    const record = records[recordIndex]
    const key = keyOf(record, record.verse)
    // f1 제목이 있는 절에는 제목을 제거한 본문을, 없는 절에는 원문을 그대로 쓴다.
    bodies.set(key, stripHeadings(record.text))
    rawBodies.set(key, record.text.trim())

    if (record.verseEnd) {
      rangeLabels.set(key, `${record.verse}-${record.verseEnd}`)
      for (let verse = record.verse + 1; verse <= record.verseEnd; verse++) {
        const tailKey = keyOf(record, verse)
        bodies.set(tailKey, '')
        rawBodies.set(tailKey, '')
        rangeTails.push(tailKey)
      }
    }
  }

  return { bodies, rawBodies, rangeLabels, rangeTails }
}

function convert (f1, sourceIndex) {
  const stats = {
    totalVerses: 0,
    f1Nulls: 0,
    f1Headings: 0,
    sourceHeadingsKept: 0,
    rangeLabels: sourceIndex.rangeLabels.size,
    rangeTails: sourceIndex.rangeTails.length,
    omittedVerses: 0,
    emptyVerses: 0
  }

  const books = f1.map(book => ({
    abbrev: book.abbrev,
    name: book.name,
    chapters: book.chapters.map((chapter, chapterIndex) => chapter.map((verse, verseIndex) => {
      const key = `${book.abbrev}:${chapterIndex + 1}:${verseIndex + 1}`
      const isNull = verse === null || verse === undefined
      const f1Heading = typeof verse === 'string' ? leadingHeadings(verse) : ''

      stats.totalVerses++
      if (isNull) stats.f1Nulls++
      if (f1Heading) stats.f1Headings++

      let body
      if (sourceIndex.bodies.has(key)) {
        body = f1Heading ? sourceIndex.bodies.get(key) : sourceIndex.rawBodies.get(key)
        if (!f1Heading) {
          const kept = body.match(HEADING_RE)
          if (kept) stats.sourceHeadingsKept += kept.length
        }
      } else if (OMITTED_KEYS.has(key)) {
        body = '(없음)'
        stats.omittedVerses++
      } else {
        throw new Error(`원문에서 절을 찾지 못했습니다: ${key}`)
      }

      const rangeLabel = sourceIndex.rangeLabels.get(key)
      if (rangeLabel) body = `(${rangeLabel}) ${body}`.trim()

      const result = f1Heading ? `${f1Heading} ${body}`.trim() : body
      if (result === '') stats.emptyVerses++
      return result
    }))
  }))

  return { books, stats }
}

function selectOutput (books, args) {
  if (!args.book) return books

  const book = books.find(item => item.abbrev === args.book)
  if (!book) throw new Error(`알 수 없는 책 약어: ${args.book}`)
  if (args.chapter === null) return book

  const chapter = book.chapters[args.chapter - 1]
  if (!chapter) throw new Error(`${book.name} ${args.chapter}장이 없습니다.`)
  return chapter
}

function main () {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    console.log(usage())
    return
  }

  const f1 = JSON.parse(fs.readFileSync(args.f1, 'utf8'))
  const source = readSource(args.src)
  const glued = splitGluedBookStarts(source)
  const parsed = parseRecords(glued.text)
  const merged = mergeContinuations(parsed)
  const sourceIndex = indexSource(merged.records)
  const { books, stats } = convert(f1, sourceIndex)

  stats.gluedBookStarts = glued.count
  stats.continuationLines = merged.continuationLines
  stats.divisionMarkers = merged.divisionMarkers

  const output = selectOutput(books, args)
  const json = JSON.stringify(output, null, args.pretty ? 2 : 0)

  if (args.out) {
    fs.writeFileSync(args.out, json + '\n', 'utf8')
    console.error(`저장: ${args.out}`)
  } else {
    console.log(json)
  }

  console.error(JSON.stringify(stats, null, 2))
}

main()

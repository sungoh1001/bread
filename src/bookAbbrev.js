// 성경 66권 약자 매핑 (영문 abbrev → 한글 약자)
// 한국교회에서 널리 사용되는 2글자 이내 약자 기준
// 구약 39권 순서 (영문 abbrev)
export const OT_BOOKS = [
  'gen', 'exod', 'lev', 'num', 'deut', 'josh', 'jud', 'ruth',
  'sam1', 'sam2', 'kgs1', 'kgs2', 'chr1', 'chr2', 'ezr', 'neh',
  'est', 'job', 'ps', 'prov', 'ecc', 'song', 'is', 'jer', 'lam',
  'eze', 'dan', 'hos', 'joel', 'amos', 'oba', 'jonah', 'mic',
  'nah', 'hab', 'zep', 'hag', 'zec', 'mal'
]

// 신약 27권 순서 (영문 abbrev)
export const NT_BOOKS = [
  'matt', 'mk', 'lk', 'jn', 'acts', 'rom', 'cor1', 'cor2', 'gal',
  'eph', 'phil', 'col', 'thes1', 'thes2', 'tim1', 'tim2', 'tit',
  'philem', 'heb', 'jas', 'pet1', 'pet2', 'jn1', 'jn2', 'jn3',
  'jude', 'rev'
]

export const BOOK_ABBREV = {
  // 구약 (39권)
  gen: '창',
  exod: '출',
  lev: '레',
  num: '민',
  deut: '신',
  josh: '수',
  jud: '삿',
  ruth: '룻',
  sam1: '삼상',
  sam2: '삼하',
  kgs1: '왕상',
  kgs2: '왕하',
  chr1: '대상',
  chr2: '대하',
  ezr: '스',
  neh: '느',
  est: '에',
  job: '욥',
  ps: '시',
  prov: '잠',
  ecc: '전',
  song: '아',
  is: '사',
  jer: '렘',
  lam: '애',
  eze: '겔',
  dan: '단',
  hos: '호',
  joel: '욜',
  amos: '암',
  oba: '옵',
  jonah: '욘',
  mic: '미',
  nah: '나',
  hab: '합',
  zep: '습',
  hag: '학',
  zec: '슥',
  mal: '말',
  // 신약 (27권)
  matt: '마',
  mk: '막',
  lk: '눅',
  jn: '요',
  acts: '행',
  rom: '롬',
  cor1: '고전',
  cor2: '고후',
  gal: '갈',
  eph: '엡',
  phil: '빌',
  col: '골',
  thes1: '살전',
  thes2: '살후',
  tim1: '딤전',
  tim2: '딤후',
  tit: '딛',
  philem: '몬',
  heb: '히',
  jas: '약',
  pet1: '벧전',
  pet2: '벧후',
  jn1: '요일',
  jn2: '요이',
  jn3: '요삼',
  jude: '유',
  rev: '계'
}

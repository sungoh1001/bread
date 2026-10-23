# 성경 원문 데이터 출처와 재생성

## 원문 파일

- 원본 파일명: `개역개정4판(구약+신약).txt`
- 로컬 저장 이름: `ko-rev-cp949.txt`
- 인코딩: CP949/EUC-KR, CRLF
- 크기: 3,540,641 bytes
- SHA-256: `e6069768f15ce7b74295cff308530caef8f95be9f3609bcb4aa46edcdebce8a3`
- 배포처: https://thegoodhopeweb.tistory.com/574
- 참고: 이슈 #1 댓글의 카카오 CDN 직접 URL은 서명과 만료(`expires=1793458799`, 2026-10-31경)가 있어 재사용하기 어렵다. tistory 페이지에서 다시 받는 것을 권장한다.

## 저장소 정책

- 원문 txt는 **저장소에 커밋하지 않는다** (대용량 + 개역개정4판 저작권).
- `.gitignore`에 `/src/assets/ko-rev-cp949.txt`를 등록했다.
- 앱이 실제로 사용하는 데이터는 `src/assets/ko_rev.json`이며, 이 파일은 커밋한다.
- 원문은 재생성할 때만 `src/assets/ko-rev-cp949.txt`에 다시 내려받는다.

## 재생성 절차

```bash
# 1) 원문을 내려받아 src/assets/ko-rev-cp949.txt 로 저장

# 2) 원문 → ko_rev.json 변환
node scripts/rebuild-bible-json.js --out src/assets/ko_rev.json

# 3) 구조·합절·제목 규칙 검증 (기준: 9765dc0 커밋의 원본 구조)
node scripts/verify-bible-json.js

# 4) 빌드 (Node 24 + webpack 4 환경)
NODE_OPTIONS=--openssl-legacy-provider npm run build:release
```

## 검증 기준

- `scripts/verify-bible-json.js`는 기본적으로 `9765dc0:src/assets/ko_rev.json`을 구조 기준으로 사용한다.
- 다른 기준을 쓰려면 `BIBLE_REFERENCE` 환경변수로 Git 개체를 지정한다.

```bash
BIBLE_REFERENCE=main:src/assets/ko_rev.json node scripts/verify-bible-json.js
```

## 라이선스

개역개정4판은 대한성서공회 저작물이다. 공개 배포·재배포 전에 라이선스를 확인한다.

# 박장식 경력 포트폴리오

게임 서버, 서비스 플랫폼, AI 기반 통합 개발 경험을 소개하는 GitHub Pages 정적 사이트입니다.

- `index.html` — 개인 프로필과 경력, 프로젝트 갤러리
- `style.css` — 반응형 화면과 인쇄 스타일
- `images/` — 경력기술서에서 가져온 프로젝트 원본 화면

로컬에서는 `index.html`을 브라우저로 열면 됩니다. 별도의 설치나 빌드 과정이 필요 없습니다.

## 만료 링크로 공유하기

Worker는 유효한 공유 링크를 열면 브라우저에 만료 쿠키를 설정하고 프로필로 이동시킵니다. 이후에는 페이지와 이미지 요청마다 만료 시각을 확인합니다. 링크를 전달받은 사람도 유효기간 안에는 열 수 있습니다.

### 로컬 테스트

1. PowerShell에서 `npm install`을 실행합니다.
2. `npm run dev`를 실행합니다. Worker는 기본적으로 8787번 포트를 사용합니다.
3. 다른 PowerShell 창에서 같은 폴더로 이동해 `node scripts/create-invite.mjs 7 --local`을 실행하고, 출력된 링크를 엽니다.
4. 새 시크릿 창에서 `http://localhost:8787/`와 `http://localhost:8787/images/github.png`를 직접 열어 차단되는지 확인합니다.

### Cloudflare에 처음 배포

1. `npx wrangler login`으로 Cloudflare 계정에 연결합니다.
2. `npx wrangler kv namespace create INVITES`로 링크 저장소를 만듭니다. 출력된 ID를 `wrangler.jsonc`의 `INVITES` 항목에 넣습니다.
3. `npm run deploy`를 실행합니다. `profile-share` Worker가 생성되고 정적 파일이 함께 업로드됩니다.
4. 도메인 전환 시 기존 GitHub Pages용 `profile` CNAME을 제거하고, Cloudflare 대시보드에서 **Workers & Pages → profile-share → Settings → Domains & Routes → Add → Custom Domain**에 `profile.pionman.com`을 연결합니다. 기본 `workers.dev`와 미리보기 URL은 설정에서 비활성화되어 있습니다.
5. 공유 링크와 이미지 차단을 확인한 뒤 기존 GitHub Pages 공개 배포를 내립니다. 저장소가 공개되어 있으면 기존 커밋에도 프로필과 이미지가 있으므로 저장소 공개 범위를 함께 조정합니다.

### 링크 발급
파워셀 경로 이동 : D:\CorpPion\github.io
`node scripts/create-invite.mjs 7`을 실행하면 7일짜리 링크가 출력됩니다. 일수는 1~365일 사이에서 지정할 수 있으며 생략하면 7일입니다. 링크마다 재배포할 필요가 없습니다. Cloudflare KV 전파 때문에 새 링크가 일부 지역에서 즉시 열리지 않을 수 있습니다.

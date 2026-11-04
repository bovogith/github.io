# bovogith · Project Portfolio (GitHub Pages)

개인 식별 정보(이름, 연락처, 이메일 등)를 배제하고 **공개 가능한 오픈소스 및 기술 프로젝트 중심**으로 구성된 GitHub Pages 정적 포트폴리오 샘플입니다.

## 주요 특징

- **개인정보 비포함(Privacy-First)**: 민감한 개인 정보 없이 GitHub 핸들(`bovogith`)과 프로젝트 결과물, 기술 스택만 깔끔하게 노출합니다.
- **카테고리 필터링**: `All`, `Web`, `CLI & Tools`, `AI & Data` 탭을 통해 프로젝트 카드를 즉시 필터링할 수 있습니다.
- **다크/라이트 모드 지원**: 사용자 선호 테마를 `localStorage`에 저장하여 전환할 수 있습니다.
- **Zero-Dependency 정적 구성**: 순수 HTML5, CSS3, Vanilla JS로 작성되어 별도의 빌드 과정 없이 GitHub Pages에서 즉시 호스팅됩니다.

## 파일 구조

- `index.html`: 메인 레이아웃 및 프로젝트 카드 마크업
- `style.css`: 다크/라이트 테마 변수 및 반응형 그리드 스타일
- `script.js`: 테마 토글 및 카테고리 필터 인터랙션
- `.nojekyll`: GitHub Pages에서 Jekyll 빌드 과정을 생략하고 정적 파일을 즉시 서빙하도록 설정

## 커스터마이징 방법

1. `index.html` 내 `#project-grid` 섹션의 `<article class="project-card">` 블록을 실제 공개할 프로젝트 내용과 저장소 링크로 수정합니다.
2. `#skills` 섹션의 기술 스택 태그를 필요에 맞게 편집합니다.

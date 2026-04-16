# AI 이미지 생성기

텍스트 프롬프트를 입력하면 AI가 이미지를 생성합니다. 비용 0원, 서버 없이 브라우저에서 동작.

Live: https://ai-image-generator-beryl-sigma.vercel.app

## 기능

- 7가지 스타일 프리셋 (기본, 아이콘, 일러스트, 3D, 수채화, 픽셀아트, 실사)
- 3가지 비율 선택 (1:1, 16:9, 9:16)
- 다크모드 / 라이트모드 (시스템 설정 자동 감지)
- 생성 히스토리 갤러리 (localStorage, 최대 50장)
- 이미지 다운로드 및 전체화면 모달 뷰
- 반응형 디자인 (모바일 + 데스크톱)

## 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS v4 |
| 이미지 생성 | Pollinations.ai (FLUX 모델) |
| 배포 | Vercel |
| 비용 | 0원 |

## 디자인

에디토리얼 툴 디자인 — 플랫 솔리드 UI, 타이포그래피 중심, 최소한의 장식.

- 컬러: 웜 뉴트럴 (stone 계열) 베이스 + 틸(teal) 액센트
- 다크모드: 트루 다크 (#09090b)
- 보더 1px + shadow-sm, 글래스모피즘/그라디언트 없음
- Geist Sans 폰트

```
Light                              Dark
─────────────────────              ─────────────────────
bg:    #fafaf9                     bg:    #09090b
surface: #ffffff                   surface: #18181b
border: #e7e5e4                    border: #3f3f46
text:  #1c1917                     text:  #fafafa
accent: #0d9488 (teal-600)         accent: #14b8a6 (teal-500)
```

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx          # 루트 레이아웃 (한국어 메타데이터, Geist 폰트)
│   ├── page.tsx            # 메인 페이지 (헤더, 생성 카드, 결과, 갤러리)
│   └── globals.css         # CSS 커스텀 프로퍼티, 스크롤바, 애니메이션
├── components/
│   ├── PromptInput.tsx     # 프롬프트 입력 (자동 회전 플레이스홀더)
│   ├── StyleSelector.tsx   # 스타일 프리셋 선택
│   ├── SizeSelector.tsx    # 이미지 비율 선택
│   ├── GenerateButton.tsx  # 생성 버튼
│   ├── ImageResult.tsx     # 생성 결과 표시 (스켈레톤 로딩)
│   ├── ImageModal.tsx      # 전체화면 이미지 뷰어
│   ├── Gallery.tsx         # 히스토리 갤러리 그리드
│   └── ThemeToggle.tsx     # 다크모드 토글
├── hooks/
│   ├── useImageGenerator.ts # 이미지 생성 핵심 로직
│   └── useTheme.ts          # 테마 상태 관리
└── lib/
   ├── types.ts            # GeneratedImage, StylePreset, SizeOption
   ├── constants.ts        # 7 스타일 / 3 사이즈 / 플레이스홀더 상수
   └── storage.ts          # localStorage CRUD (최대 50장)
```

## 로컬 개발

```bash
git clone https://github.com/sigco3111/ai-image-generator.git
cd ai-image-generator
npm install
npm run dev
```

http://localhost:3000 에서 확인.

## 배포

GitHub main 브랜치에 푸시하면 Vercel에서 자동 배포됩니다.

수동 배포:
```bash
vercel --yes --prod
```

## 라이선스

MIT

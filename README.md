# AI 이미지 생성기

무료 AI 이미지 생성기 — 텍스트를 입력하면 Pollinations.ai가 이미지를 생성합니다. 비용 0원.

Live: https://ai-image-generator-beryl-sigma.vercel.app

## 기능

- 7가지 스타일 프리셋 (기본, 아이콘, 일러스트, 3D, 수채화, 픽셀아트, 실사)
- 3가지 비율 선택 (1:1, 16:9, 9:16)
- 다크모드 / 라이트모드 (시스템 설정 자동 감지)
- 생성 히스토리 갤러리 (localStorage, 최대 50장)
- 이미지 다운로드
- 전체 이미지 모달 뷰
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

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx          # 루트 레이아웃 (한국어 메타데이터)
│   ├── page.tsx            # 메인 페이지
│   └── globals.css         # 글로벌 스타일, 애니메이션
├── components/
│   ├── PromptInput.tsx     # 프롬프트 입력 (자동 회전 플레이스홀더)
│   ├── StyleSelector.tsx   # 스타일 프리셋 선택
│   ├── SizeSelector.tsx    # 이미지 비율 선택
│   ├── GenerateButton.tsx  # 생성 버튼 (쉬머 애니메이션)
│   ├── ImageResult.tsx     # 생성 결과 표시
│   ├── ImageModal.tsx      # 전체 이미지 모달
│   ├── Gallery.tsx         # 히스토리 갤러리 그리드
│   └── ThemeToggle.tsx     # 다크모드 토글
├── hooks/
│   ├── useImageGenerator.ts # 이미지 생성 로직
│   └── useTheme.ts          # 테마 관리
└── lib/
    ├── types.ts            # 타입 정의
    ├── constants.ts        # 스타일/사이즈/플레이스홀더 상수
    └── storage.ts          # localStorage CRUD
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

# HolyShield 2025 홈페이지 현재 상태 - 복구용 백업

## 📋 최근 수정사항들

### 1. CTF 페이지 수정 (src/pages/CtfPage.tsx)
- **상단 히어로 섹션**: "CTF 개요" pill 제거됨 (11번째 줄의 `<span className="section-pill">{ctf.highlightPill}</span>` 제거)
- **하단 하이라이트 섹션**: 유지됨 (29-33번째 줄의 pill과 line 포함된 section-heading-left div 유지)

### 2. 컨퍼런스 페이지 수정 (src/pages/ConferencePage.tsx)  
- **상단 히어로 섹션**: "Conference 개요" pill 제거됨 (11번째 줄의 `<span className="section-pill">{conference.introPill}</span>` 제거)
- **하단 연사 섹션**: 유지됨 (SpeakerSection 컴포넌트 그대로 유지)

### 3. 히어로 섹션 로고 관련 (src/components/Hero.tsx, src/pages/HomePage.tsx)
- **최종 상태**: 히어로 섹션에 로고 없음 (처음에 추가했다가 제거함)
- **Hero.tsx**: logoSrc prop 없음, 로고 렌더링 코드 없음
- **HomePage.tsx**: logoSrc prop 전달 안함

### 4. 참가신청 버튼 수정 (src/config/site.ts)
- **CTF 섹션**: registrationCtaLabel: 'Join Now', registrationUrl: 'https://forms.gle/example-ctf-registration' 추가됨
- **컨퍼런스 섹션**: registrationCtaLabel: 'Join Now', registrationUrl: 'https://forms.gle/example-conference-registration' 추가됨

### 5. Docker 설정 수정 (.dockerignore)
- **docker 폴더 제외 제거**: docker 라인 제거하여 nginx.conf 파일이 빌드 컨텍스트에 포함되도록 수정

## 🔄 복구 방법

언제든지 "복구해줘"라고 요청하면 이 상태로 되돌릴 수 있습니다.

### 복구가 필요한 경우:
1. **CTF 페이지 상단 pill 복구**: CtfPage.tsx 11번째 줄에 `<span className="section-pill">{ctf.highlightPill}</span>` 추가
2. **컨퍼런스 페이지 상단 pill 복구**: ConferencePage.tsx 11번째 줄에 `<span className="section-pill">{conference.introPill}</span>` 추가
3. **히어로 로고 복구**: Hero.tsx에 logoSrc prop 추가, HomePage.tsx에서 logoSrc 전달
4. **참가신청 버튼 제거**: site.ts에서 registrationCtaLabel, registrationUrl 제거
5. **Docker 설정 복구**: .dockerignore에 docker 라인 추가

## 📅 백업 생성일
2025년 1월 27일 - 현재 상태 기준

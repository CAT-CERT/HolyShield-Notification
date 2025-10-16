import speakersData from './speakers.json'

type Speaker = {
  id?: string
  name: string
  title: string
  image: string
  topic?: string
  time?: string
  track?: string
  bio?: string
  body?: string[]
}

const speakers: Speaker[] = speakersData as Speaker[]

export const siteConfig = {
  name: 'HolyShield 2025',
  description: 'HolyShield 2025 보안 페스티벌 공식 랜딩 페이지입니다.',
  brand: {
    logoSrc: '/logo.svg',
    navLinks: [
      { label: 'MAIN', path: '/' },
      { label: 'CTF', path: '/ctf' },
      { label: 'CONFERENCE', path: '/conference' },
    ],
  },
  hero: {
    title: 'HOLYSHIELD 2025',
    description: '',
    eventPeriod: '2025.12.20 ~ 21',
    venue: 'The Catholic University of Korea',
    bannerImage: '/banner.png',
  },
  aboutCat: {
    title: 'About CAT-Security',
    subtitle: 'The CATholic University of Korea, Computer Emergency Response Team',
    descriptions: [
      '가톨릭대학교 침해사고대응센터 CAT-CERT는 학내망에 발생할 수 있는 컴퓨터 정보보호 관련 사고 발생에 대하여, 사고를 미연에 방지하고 사고 발생 시 즉각적인 조치를 통하여 피해를 최소화하는 정보보호 관련 센터입니다.',
      '가톨릭대학교 학우들이 주축이 되어 활동하고 있는 CAT-CERT는 학내활동 뿐만 아니라, CAT-Security라는 이름으로 외부에서도 활발히 활동하고 있습니다.',
    ],
  },
  countdown: {
    label: 'D-DAY',
    targetISO: '2025-12-20T00:00:00+09:00',
  },
  location: {
    pillLabel: '장소',
    title: '오시는 길',
    description: '가톨릭대학교 성심교정 김수환관 2층 컨퍼런스 룸',
    address: '경기도 부천시 지봉로 43 · 가톨릭대학교 김수환관',
    summary: {
      campusName: '가톨릭대학교 성심교정',
      addressDetail: '14662 경기도 부천시 원미구 지봉로 43',
      phone: '02-2164-4114',
    },
    guideTitle: '대중교통 이용 안내',
    sections: [
      {
        heading: '지하철 이용',
        cards: [
          {
            icon: '/map_subway_ico.png',
            badge: { label: '1호선', tone: 'blue' as const },
            title: '지하철 1호선 송내역 2번 출구',
            subtitle: '(학교 정문까지 도보 약 10분)',
            details: ['송내역 2번 출구 → 도보 10분 이동', '정문 진입 후 본관 방향으로 직진'],
          },
          {
            icon: '/map_subway_ico.png',
            badge: { label: '7호선', tone: 'green' as const },
            title: '지하철 7호선 부천시청역 7번 출구',
            subtitle: '(학교 정문까지 도보 약 10분)',
            details: ['부천시청역 7번 출구 → 중앙공원 방면', '마을버스 환승 시 캠퍼스 정문 하차'],
          },
        ],
      },
      {
        heading: '버스 이용',
        cards: [
          {
            icon: '/map_bus_ico.png',
            badge: { label: '마을버스', tone: 'purple' as const },
            title: '마을버스 51 · 51-1 · 51-2',
            subtitle: '[가톨릭대학교, 중앙도서관] 정류장 하차',
            details: ['정류장에서 도보 3분', '김수환관 방향 안내판을 따라 이동'],
          },
          {
            icon: '/map_bus_ico.png',
            badge: { label: '시내버스', tone: 'magenta' as const },
            title: '시내버스 20 · 5 · 12 · 52번',
            subtitle: '중앙공원 · 가톨릭대학교 정류장 하차',
            details: ['중앙공원 방면 하차 후 도보 7분', '야외 광장 → 김수환관 2층으로 이동'],
          },
        ],
      },
    ],
  },
  ctf: {
    heroTitle: 'HolyShield CTF 2025',
    heroDescription: 'HolyShield CTF 2025는 CTF 형식의 워게임과 CAT-Security에서 기획한 RPC(Role Playing Challenge) 형태의 대회가 동시에 진행됩니다.',
    heroDescription2: 'CTF : Jeopardy 형식으로 진행되며, Web Hacking, Reversing, Pwnable, Crypto 등 다양한 분야의 문제가 출제됩니다.',
    heroDescription3: 'RPC : 대회 운영측은 \"기업 보안팀\", 참가팀은 \"외부 모의침투 전문가\"가 되어 서비스 점검을 의뢰하고 수행합니다. 총 3개의 목표(모의 침투, 악성코드 분석, Live Fire)를 수행하여 각 점수를 합산합니다.',
    contact: {
      phone: '010-1234-5678',
      email: 'catcert.official@gmail.com',
    },
    highlightPill: 'CTF 개요',
    highlights: [
      {
        title: '종합 카테고리',
        description: 'Web, Pwn, Reversing, Crypto, RPC 등 다섯 개 분야의 문제를 제공합니다.',
      },
      {
        title: '온·오프라인 병행',
        description: '현장과 원격 참가를 병행해 누구나 접근 가능한 구조로 운영합니다.',
      },
      {
        title: '풍성한 상금',
        description: '총상금 250만 원과 다양한 경품이 준비되어 있습니다.',
      },
    ],
    timeline: [
      { label: '참가 신청 마감', detail: '- 12월 10일 23:59' },
      { label: 'CTF', detail: '- 12월 20일 09:00 ~ 18:00' },
      { label: '시상', detail: '- 12월 20일 19:00 · 컨퍼런스 홀' },
    ],
    overviewRules: [
      '오프라인 진행',
      '정보보안에 관심있는 전국의 고등학생, 대학(원)생으로 구성된 팀(최대 4인 1팀)',
      'CTF(Capture The Flag) 형식의 워게임과 Live-Fire(실시간 방어) 동시 진행',
    ],
    pageRules: [
      '팀 구성은 최대 4인까지 가능합니다.',
      '개인 장비 지참 필수',
      '실격 사유: 팀 간 플래그 공유 및 유출, 대회 플랫폼에 대한 모든 공격 및 부담이 갈 수 있는 도구 사용 시 실격',
      '플랫폼 장애 발생 시 즉시 운영 데스크에 신고',
    ],
    rules: [],
    registrationCtaLabel: '참가 신청',
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdxAHkxHsL7xrFlVwM4gmhzmHGt_juvCLbkEXhMTOf76RdKwA/viewform?usp=header',
  },
  conference: {
    pageTitle: 'HolyShield Conference 2025',
    introPill: 'Conference 개요',
    introTitle: '연사 라인업',
    introDescription: '',
    speakers,

    agenda: {
      day1: [
        { time: '09:00', track: 'TECH' },
        { time: '09:00', track: 'CAREER' },
        { time: '09:30', track: 'TECH' },
        { time: '09:30', track: 'CAREER' },
        { time: '10:00', track: 'TECH' },
        { time: '10:00', track: 'CAREER' },
        { time: '10:30', track: 'TECH' },
        { time: '10:30', track: 'CAREER' },
        { time: '11:00', track: 'TECH' },
        { time: '11:00', track: 'CAREER' },
        { time: '11:30', track: 'TECH' },
        { time: '11:30', track: 'CAREER' },
        { time: '12:00', track: 'TECH' },
        { time: '12:00', track: 'CAREER' },
        { time: '12:30', track: 'TECH' },
        { time: '12:30', track: 'CAREER' },
        { time: '13:00', title: '점심시간' },
        { time: '14:00', track: 'TECH' },
        { time: '14:00', track: 'CAREER' },
        { time: '14:30', track: 'TECH' },
        { time: '14:30', track: 'CAREER' },
        { time: '15:00', track: 'TECH' },
        { time: '15:00', track: 'CAREER' },
        { time: '15:30', track: 'TECH' },
        { time: '15:30', track: 'CAREER' },
        { time: '16:00', track: 'TECH' },
        { time: '16:00', track: 'CAREER' },
        { time: '16:30', track: 'TECH' },
        { time: '16:30', track: 'CAREER' },
      ],
    },
    registrationButtons: [
      {
        label: '참석자 신청',
        href: 'https://docs.google.com/forms/u/3/d/1n4zLOcjgOSbwP10tBvbubOxtrjW_-Zry8HOoDjvetQc/edit?usp=forms_home&ouid=114446764496062618833&ths=true',
      },
      {
        label: '발표자 신청',
        href: 'https://docs.google.com/forms/d/e/1FAIpQLSepwEg4XDxwLQjGP7Y9LYV5DoqtxRvyfPV0jkcoMznxnYy3uQ/viewform?usp=header',
      },
    ],
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} HolyShield`,
  },
}



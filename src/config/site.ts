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

  description: 'HolyShield 2025 공식 랜딩 페이지입니다.',

  brand: {
    logoSrc: '/logo.svg',
    navLinks: [
      { label: 'MAIN', path: '/' },
      { label: 'CONTEST', path: '/contest' },
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
      `가톨릭대학교 학우들이 주축이 되어 활동하고 있는 CAT-CERT는 학내활동 뿐만 아니라, CAT-Security라는 이름으로 외부에서도 활발히 활동하고 있습니다.`,
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
            title: '지하철 1호선 역곡역 2번 출구 혹은 소사역 3번 출구에서 하차할 경우',
            subtitle: '(학교 정문까지 도보 약 10분)',
            details: ['인천역 ↔ 역곡역 : 35분 소요', '서울역 ↔ 역곡역 : 30분 소요', '신도림역 ↔ 역곡역 : 15분 소요', '부평역 ↔ 역곡역 : 15분 소요'],
          },
          {
            icon: '/map_subway_ico.png',
            badge: { label: '서해선', tone: 'green' as const },
            title: '지하철 서해선 소사역 7번 출구',
            subtitle: '(학교 후문까지 도보 약 10분)',
            details: ['일산역 ↔ 소사역 : 35분 소요', '김포공항역 ↔ 소사역 : 11분 소요', '원시역 ↔ 소사역 : 35분 소요'],
          },
        ],
      },
      {
        heading: '버스 이용',
        cards: [
          {
            icon: '/map_bus_ico.png',
            badge: { label: '마을버스', tone: 'green' as const },
            title: '51번, 51-1번, 51-2번 버스를 타고 올 경우',
            subtitle: '',
            details: ['[가톨릭대학교, 역곡도서관] 정류장 하차'],
          },
          {
            icon: '/map_bus_ico.png',
            badge: { label: '시내버스', tone: 'magenta' as const },
            title: '20번 버스 혹은 5번, 12번, 52번 버스를 타고 올 경우',
            subtitle: '',
            details: ['20번 버스 : [가톨릭대학교, 역곡도서관] 정류장 하차', '정문 기준 : [역곡2동 행정복지센터입구] 또는 [가톨릭대학교 입구, 보람쉬움아파트] 정류장 하차', '후문 기준 : [금강맨션] 정류장 하차'],
          },
        ],
      },
    ],
  },
  ctf: {
    heroTitle: 'HolyShield Contest 2025',
    heroDescription: 'HolyShield Contest 2025는 CTF 형식과 CAT-Security에서 기획한 RPC(Role Playing Challenge) 형태의 대회가 진행됩니다.',
    heroDescription2: 'CTF : Jeopardy 형식이며, Web Hacking, Reversing, Pwnable 등 다양한 분야의 문제가 출제됩니다.',
    heroDescription3: 'RPC : 대회 운영측은 \"기업 보안팀\", 참가팀은 \"외부 모의침투 전문가\"가 되어 서비스 점검을 의뢰하고 수행합니다.\n총 3개의 목표(모의 침투, 악성코드 분석, Live Fire)를 수행하여 각 점수를 합산합니다.',
    contact: {
      email: 'catcert.official@gmail.com',
    },
    timeline: [
      { label: '신청기간', detail: '11. 17.(월) 까지' },
      { label: 'CONTEST', detail: '12월 20일 09:00 ~ 18:00' },
      { label: '시상식', detail: '12월 20일 18:30' },
    ],
    participation: [
      '정보보안에 관심있는 고등학생, 대학(원)생으로 구성된 팀 (최대 4인 1팀)',
      'CTF(Capture The Flag) 형식과 CAT-Security가 자체 기획한 RPC(Role Playing Challenge) 동시 진행',
      '문제유형: Web Hacking, Pwnable, Reversing, Mobile Hacking, Penetration Testing, Malware Analysis, Live Fire',
    ],
    rulesDocUrl: '#',
    overviewRules: [
      '오프라인 진행',
      '정보보안에 관심있는 고등학생, 대학(원)생으로 구성된 팀 (최대 4인 1팀)',
      'Jeopardy 형식과 RPC(Role Playing Challenge) 형식 동시 진행',
    ],
    pageRules: [
      '팀 구성은 최대 4인까지 가능합니다.',
      '개인 장비 지참 필수',
      '플래그 공유 및 유출, 대회 플랫폼에 대한 모든 공격 시 실격',
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



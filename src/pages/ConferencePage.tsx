
import { Fragment, type CSSProperties, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'

type AgendaItem = {
  sessionId?: string
  time: string
  title?: string
  speaker?: string
  track?: string
  placeholder?: boolean
}

type NormalizedAgendaItem = {
  sessionId?: string
  time: string
  title: string
  speaker?: string
  track: string
  mergeAcrossTracks?: boolean
  speakerCompany?: string
  speakerImage?: string
  speakers: { name?: string; company?: string; image?: string }[]
  slug: string
  sessionTime?: string
  speakerRoom?: string
  speakerRoomDetail?: string
  speakerBio?: string
  speakerBody?: string[]
  placeholder: boolean
  startTime?: string
  endTime?: string
  durationMinutes?: number
}

const trackThemes: Record<
  string,
  { accent: string; accentSoft: string; border: string; shadow: string }
> = {
  TECH: {
    accent: '#14b8a6',
    accentSoft: 'rgba(20, 184, 166, 0.18)',
    border: 'rgba(20, 184, 166, 0.28)',
    shadow: 'rgba(15, 118, 110, 0.2)',
  },
  CAREER: {
    accent: '#a855f7',
    accentSoft: 'rgba(168, 85, 247, 0.18)',
    border: 'rgba(168, 85, 247, 0.3)',
    shadow: 'rgba(139, 92, 246, 0.22)',
  },
  DEFAULT: {
    accent: 'var(--primary-500)',
    accentSoft: 'rgba(91, 125, 255, 0.15)',
    border: 'rgba(91, 125, 255, 0.2)',
    shadow: 'rgba(91, 125, 255, 0.18)',
  },
}

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const toArray = <T,>(value: T | T[] | null | undefined): T[] =>
  value == null ? [] : Array.isArray(value) ? value : [value]

const timeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number)
  return hours * 60 + minutes
}

const TRACK_ORDER = ['TECH', 'CAREER'] as const
type TrackKey = (typeof TRACK_ORDER)[number]

const ConferencePage = () => {
  const { conference } = siteConfig
  const [mobileTrackFilter, setMobileTrackFilter] = useState<TrackKey>('TECH')

  const sessionItems = useMemo(() => {
    const agenda = conference.agenda

    if (Array.isArray(agenda)) {
      return [...agenda] as AgendaItem[]
    }

    if (agenda && typeof agenda === 'object') {
      const day1Array = 'day1' in agenda && Array.isArray(agenda.day1) ? agenda.day1 : []
      const day2Array = 'day2' in agenda && Array.isArray(agenda.day2) ? agenda.day2 : []
      return [...day1Array, ...day2Array] as AgendaItem[]
    }

    return [] as AgendaItem[]
  }, [conference.agenda])

  const normalizedAgenda: NormalizedAgendaItem[] = useMemo(() => {
    const speakers = conference.speakers

    return sessionItems.map((item, index) => {
      // time 필드로 speaker 매칭 (우선순위 1: time + track, 2: time만)
      const speakerByTime = speakers.find(
        (speaker) =>
          speaker.time === item.time && (speaker.track === item.track || !item.track),
      )
      const speakerByName = item.speaker
        ? speakers.find((speaker) => toArray(speaker.name).includes(item.speaker as string))
        : undefined
      const speakerInfo = speakerByTime ?? speakerByName

      const mergeAcrossTracks = speakerInfo?.id === '8'
      const resolvedTrack = item.track ?? speakerInfo?.track ?? '공통'
      const hasExplicitContent = Boolean(item.title || item.speaker)
      const placeholder = item.placeholder ?? (!hasExplicitContent && !speakerInfo)
      const title = item.title ?? speakerInfo?.topic ?? '미정'

      const rawSpeakerName = (item.speaker ?? speakerInfo?.name) as
        | string
        | string[]
        | undefined
      const rawSpeakerImage = speakerInfo?.image as string | string[] | undefined
      const rawSpeakerCompany = speakerInfo?.company as string | string[] | undefined

      const speakerNames = toArray(rawSpeakerName)
      const speakerImages = toArray(rawSpeakerImage)
      const speakerCompanies = toArray(rawSpeakerCompany)

      const speakersList = speakerNames.reduce<
        { name: string; company?: string; image?: string }[]
      >((list, name, idx) => {
        const normalizedName = typeof name === 'string' ? name.trim() : ''
        if (!normalizedName) {
          return list
        }

        const imageValue = speakerImages[idx] ?? speakerImages[0]
        const companyValue = speakerCompanies[idx] ?? speakerCompanies[0]

        list.push({
          name: normalizedName,
          company: typeof companyValue === 'string' ? companyValue : undefined,
          image: typeof imageValue === 'string' ? imageValue : undefined,
        })

        return list
      }, [])

      const primarySpeakerName =
        speakersList[0]?.name ??
        (typeof rawSpeakerName === 'string'
          ? rawSpeakerName
          : Array.isArray(rawSpeakerName)
            ? rawSpeakerName[0]
            : undefined)

      const primarySpeakerCompany =
        speakersList[0]?.company ??
        (typeof rawSpeakerCompany === 'string'
          ? rawSpeakerCompany
          : Array.isArray(rawSpeakerCompany)
            ? rawSpeakerCompany[0]
            : undefined)

      const primarySpeakerImage =
        speakersList[0]?.image ??
        (typeof rawSpeakerImage === 'string'
          ? rawSpeakerImage
          : Array.isArray(rawSpeakerImage)
            ? rawSpeakerImage[0]
            : undefined)

      const slugSource =
        speakerInfo?.id ??
        item.sessionId ??
        `${item.time}-${resolvedTrack}-${primarySpeakerName ?? index}`

      const startTime = (speakerInfo as any)?.startTime ?? item.time
      const endTime = (speakerInfo as any)?.endTime
      const durationMinutes = startTime && endTime ? timeToMinutes(endTime) - timeToMinutes(startTime) : 30 // 기본 30분

      return {
        sessionId: item.sessionId,
        time: item.time,
        title,
        speaker: primarySpeakerName,
        track: resolvedTrack,
        mergeAcrossTracks,
        speakerCompany: primarySpeakerCompany,
        speakerImage: primarySpeakerImage,
        speakers: speakersList,
        slug: createSlug(slugSource),
        sessionTime: speakerInfo?.time ?? item.time,
        speakerBio: speakerInfo?.bio,
        speakerBody: speakerInfo?.body,
        placeholder,
        startTime,
        endTime,
        durationMinutes,
      }
    })
  }, [conference.speakers, sessionItems])

  type ScheduleRow = { time: string; sessions: Record<string, NormalizedAgendaItem> }

  const scheduleRows: ScheduleRow[] = useMemo(() => {
    const rowByTime = new Map<string, ScheduleRow>()
    const rows: ScheduleRow[] = []

    for (const item of normalizedAgenda) {
      const existing = rowByTime.get(item.time)
      if (existing) {
        existing.sessions[item.track] = item
        continue
      }

      const newRow: ScheduleRow = { time: item.time, sessions: { [item.track]: item } }
      rowByTime.set(item.time, newRow)
      rows.push(newRow)
    }

    return rows
  }, [normalizedAgenda])

  const spannedCells = useMemo(() => {
    const rowByTime = new Map<string, ScheduleRow>()
    const minutesToTime = new Map<number, string>()

    for (const row of scheduleRows) {
      rowByTime.set(row.time, row)
      minutesToTime.set(timeToMinutes(row.time), row.time)
    }

    const spanSet = new Set<string>()
    const cellKey = (time: string, track: TrackKey) => `${time}__${track}`
    const fullWidthSpanTimes = new Set<string>()

    for (const row of scheduleRows) {
      const currentMinutes = timeToMinutes(row.time)
      const previousTime = minutesToTime.get(currentMinutes - 30)
      if (!previousTime) {
        continue
      }

      const previousRow = rowByTime.get(previousTime)
      if (!previousRow) {
        continue
      }

      for (const track of TRACK_ORDER) {
        const previousSession = previousRow.sessions[track]
        if (previousSession?.durationMinutes === 60) {
          spanSet.add(cellKey(row.time, track))
        }
      }
    }

    for (const row of scheduleRows) {
      const fullWidthSession = Object.values(row.sessions).find(
        (session) => session && (session.track === '공통' || session.mergeAcrossTracks),
      )
      if (!fullWidthSession || fullWidthSession.durationMinutes !== 60) {
        continue
      }

      const nextTime = minutesToTime.get(timeToMinutes(row.time) + 30)
      if (nextTime) {
        fullWidthSpanTimes.add(nextTime)
      }
    }

    return { spanSet, fullWidthSpanTimes, cellKey }
  }, [scheduleRows])

  // 실제 발표자 데이터가 하나라도 있는지 확인
  const hasAnyPresenters = Array.isArray(conference.speakers) && conference.speakers.length > 0

  const isLunchRowFor = (row: { time: string; sessions: Record<string, NormalizedAgendaItem> }) => {
    const first = Object.values(row.sessions)[0]
    return Boolean(first && first.track === '공통' && /점심|lunch/i.test(first.title ?? ''))
  }

  const scheduleGridStyle = {
    '--schedule-track-count': TRACK_ORDER.length || 1,
    gridTemplateRows: `auto ${scheduleRows
      .map((row) => (isLunchRowFor(row) ? '90px' : 'minmax(var(--schedule-row-height, 180px), auto)'))
      .join(' ')}`,
  } as CSSProperties

  const getTrackStyle = (track: string): CSSProperties => {
    const theme = trackThemes[track] ?? trackThemes.DEFAULT

    return {
      '--track-border': theme.border,
      '--track-shadow': theme.shadow,
      '--track-accent': theme.accent,
      '--track-accent-soft': theme.accentSoft,
    } as CSSProperties
  }

  return (
    <>
      <section className="subpage-hero" aria-labelledby="conference-page-title">
        <div className="container subpage-hero-content">
          <div className="subpage-hero-text animate-fade-in-up">
            <h1 id="conference-page-title">{conference.pageTitle}</h1>
            {conference.introDescription ? <p>{conference.introDescription}</p> : null}
          </div>
          <div className="subpage-actions animate-fade-in-up animate-stagger-1">
            <a
              className="action-button action-primary"
              href="https://docs.google.com/forms/u/3/d/1n4zLOcjgOSbwP10tBvbubOxtrjW_-Zry8HOoDjvetQc/edit?usp=forms_home&ouid=114446764496062618833&ths=true"
            >
              참석자 신청
            </a>
            <a
              className="action-button action-secondary"
              href="https://docs.google.com/forms/d/e/1FAIpQLSepwEg4XDxwLQjGP7Y9LYV5DoqtxRvyfPV0jkcoMznxnYy3uQ/viewform?usp=header"
            >
              발표자 신청
            </a>
          </div>
        </div>
      </section>


      <section className="detail-section">
        <div className="container">
          <div className="conference-program">
            <div className="conference-program-header">
              <div className="conference-program-heading">
                <p className="conference-program-pill">PROGRAM</p>
                <h2>프로그램 일정</h2>
              </div>
            </div>
            <div 
              className={`conference-program-grid ${!hasAnyPresenters ? 'conference-program-grid-placeholder' : ''}`}
              style={scheduleGridStyle}
            >
              <div className="program-grid-head program-grid-time-head">Time</div>
              {TRACK_ORDER.map((track) => (
                <div className="program-grid-head" key={`track-head-${track}`}>
                  {track === 'TECH'
                    ? 'TECH (3층 컨퍼런스홀)'
                    : track === 'CAREER'
                      ? 'CAREER (2층 K267)'
                      : track}
                </div>
              ))}
              {scheduleRows.map((row, rowIndex) => {
                const commonSession = row.sessions['공통']
                const mergedSession = TRACK_ORDER.map((track) => row.sessions[track]).find(
                  (session) => session?.mergeAcrossTracks,
                )
                const fullWidthSession = commonSession ?? mergedSession
                const isCommonSession = Boolean(commonSession)
                const isMergedSession = Boolean(mergedSession)
                const isLunchRow =
                  isCommonSession && /점심|lunch/i.test(commonSession?.title ?? '')
                const isSpannedByPreviousFullWidthRow = spannedCells.fullWidthSpanTimes.has(row.time)

                // 모든 트랙이 비어있거나 전부 placeholder인지 확인 (1시간 발표가 차지한 셀 제외)
                const allTracksEmptyOrPlaceholder = TRACK_ORDER.every((track) => {
                  // 이전 행의 1시간 발표가 이 셀을 차지한 경우는 제외
                  if (spannedCells.spanSet.has(spannedCells.cellKey(row.time, track))) {
                    return true // 차지된 셀은 빈 것으로 간주
                  }
                  const session = row.sessions[track]
                  return !session || session.placeholder
                })

                // 행 번호 계산 (헤더 행이 1행이므로 +2)
                const gridRowStart = rowIndex + 2

                if (isSpannedByPreviousFullWidthRow) {
                  return (
                    <Fragment key={`row-${row.time}`}>
                      <div
                        className="program-grid-time-cell"
                        style={{ gridRow: `${gridRowStart} / ${gridRowStart + 1}` }}
                      >
                        <span>{row.time}</span>
                      </div>
                    </Fragment>
                  )
                }

                return (
                  <Fragment key={`row-${row.time}`}>
                    <div 
                      className={`program-grid-time-cell ${isLunchRow ? 'program-grid-time-cell-lunch' : ''}`}
                      style={{ gridRow: `${gridRowStart} / ${gridRowStart + 1}` }}
                    >
                      {!isLunchRow ? <span>{row.time}</span> : null}
                    </div>
                    {fullWidthSession ? (
                      // 공통(또는 병합) 세션이면 셀 병합
                      <div
                        className={`program-grid-cell program-grid-cell-merged${isMergedSession ? ' program-grid-cell-merged-compact' : ''} ${isLunchRow ? 'program-grid-cell-lunch' : ''}`}
                        style={{ 
                          gridColumn: `span ${TRACK_ORDER.length}`,
                          gridRow:
                            fullWidthSession.durationMinutes === 60
                              ? `${gridRowStart} / ${gridRowStart + 2}`
                              : `${gridRowStart} / ${gridRowStart + 1}`,
                          ...(isMergedSession
                            ? { display: 'grid', gridTemplateRows: 'auto 1fr auto' }
                            : null),
                        }}
                      >
                        {(() => {
                          const renderedSession = fullWidthSession
                          const presenters =
                            renderedSession.speakers && renderedSession.speakers.length > 0
                              ? renderedSession.speakers
                              : renderedSession.speaker
                                ? [
                                    {
                                      name: renderedSession.speaker,
                                      company: renderedSession.speakerCompany,
                                      image: renderedSession.speakerImage,
                                    },
                                  ]
                                : []
                          const visiblePresenters = presenters.filter((presenter) => presenter?.name)

                          const sessionStartTime = renderedSession.startTime ?? renderedSession.time
                          const sessionEndTime = renderedSession.endTime
                          const sessionTimeRange = sessionEndTime
                            ? `${sessionStartTime} ~ ${sessionEndTime}`
                            : sessionStartTime

                          const trackTheme =
                            trackThemes[renderedSession.track] ?? trackThemes.DEFAULT
                          const badgeStyle = { background: trackTheme.accent }

                          return (
                            <>
                              {!isLunchRow ? (
                                <div className="program-card-header">
                                  <span className="program-track-badge" style={badgeStyle}>
                                    {renderedSession.track}
                                  </span>
                                  {sessionTimeRange ? (
                                    <span className="program-session-time">{sessionTimeRange}</span>
                                  ) : null}
                                </div>
                              ) : null}
                              <div
                                className="program-session-body"
                                style={
                                  isMergedSession
                                    ? {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }
                                    : undefined
                                }
                              >
                                <h3 style={{ textAlign: 'center', fontSize: '1.2rem', margin: 0 }}>
                                  {isLunchRow ? 'Lunch' : renderedSession.title}
                                </h3>
                              </div>
                              {!isLunchRow ? (
                                <div className="program-session-footer" style={isMergedSession ? { alignSelf: 'stretch' } : undefined}>
                                  {visiblePresenters.length > 0 ? (
                                    <div className="program-session-presenters">
                                      <span className="program-session-speaker">
                                        {visiblePresenters.map((presenter, presenterIndex) => (
                                          <span
                                            key={`${renderedSession.slug}-presenter-${presenterIndex}`}
                                          >
                                            <span className="program-session-speaker-name">
                                              {presenter.name}
                                            </span>
                                            {presenter.company ? (
                                              <span className="program-session-speaker-company">
                                                {' '}
                                                ({presenter.company})
                                              </span>
                                            ) : (
                                              ''
                                            )}
                                            {presenterIndex < visiblePresenters.length - 1
                                              ? ', '
                                              : ''}
                                          </span>
                                        ))}
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="program-session-presenters" />
                                  )}
                                  <Link
                                    className="program-session-more"
                                    to={`/conference/sessions/${renderedSession.slug}`}
                                  >
                                    더 보기
                                  </Link>
                                </div>
                              ) : null}
                            </>
                          )
                        })()}
                      </div>
                    ) : allTracksEmptyOrPlaceholder ? (
                      // 모든 트랙이 비어있거나 전부 placeholder면 각 트랙별 빈 셀 표시 (1시간 발표가 차지한 셀 제외)
                      TRACK_ORDER.map((track, trackIndex) => {
                        // 이전 행의 1시간 발표가 이 셀을 차지한 경우 아무것도 렌더링하지 않음
                        if (spannedCells.spanSet.has(spannedCells.cellKey(row.time, track))) {
                          return null
                        }
                        return (
                          <div
                            className="program-grid-cell program-grid-cell-empty"
                            key={`${row.time}-${track}-empty`}
                            style={{ 
                              gridColumn: trackIndex + 2,
                              gridRow: `${gridRowStart} / ${gridRowStart + 1}`
                            }}
                          />
                        )
                      })
                    ) : (
                      // 한쪽이라도 실제 세션이 있으면 각 트랙별로 표시
                      TRACK_ORDER.map((track, trackIndex) => {
                        const session = row.sessions[track]
                        const style = getTrackStyle(session?.track ?? track)

                        // 이전 행의 1시간 발표가 이 셀을 차지한 경우 아무것도 렌더링하지 않음
                        if (spannedCells.spanSet.has(spannedCells.cellKey(row.time, track))) {
                          return null
                        }

                        // 세션이 없거나 placeholder면 흰 배경
                        if (!session || session.placeholder) {
                          return (
                            <div
                              className="program-grid-cell program-grid-cell-empty"
                              key={`${row.time}-${track}`}
                              style={{ 
                                gridColumn: trackIndex + 2,
                                gridRow: `${gridRowStart} / ${gridRowStart + 1}`
                              }}
                            />
                          )
                        }

                        const presenters =
                          session.speakers && session.speakers.length > 0
                            ? session.speakers
                            : session.speaker
                            ? [
                                {
                                  name: session.speaker,
                                  company: session.speakerCompany,
                                  image: session.speakerImage,
                                },
                              ]
                            : []
                        const visiblePresenters = presenters.filter((presenter) => presenter?.name)

                        // 1시간 발표는 명시적으로 2행에 걸치도록 설정
                        const cellStyle = session.durationMinutes === 60
                          ? { 
                              ...style, 
                              gridColumn: trackIndex + 2,
                              gridRowStart: gridRowStart,
                              gridRowEnd: gridRowStart + 2
                            }
                          : { 
                              ...style,
                              gridColumn: trackIndex + 2,
                              gridRowStart: gridRowStart,
                              gridRowEnd: gridRowStart + 1
                            }

                        // 시간 범위 계산
                        const sessionStartTime = session.startTime ?? session.time
                        const sessionEndTime = session.endTime
                        const sessionTimeRange = sessionEndTime ? `${sessionStartTime} ~ ${sessionEndTime}` : sessionStartTime

                        // 배지 스타일 (트랙별 색상)
                        const trackTheme = trackThemes[session.track] ?? trackThemes.DEFAULT
                        const badgeStyle = {
                          background: trackTheme.accent,
                        }

                        // 실제 세션 표시
                        return (
                          <div className="program-grid-cell" key={`${row.time}-${track}`} style={cellStyle}>
                            <div className="program-card-header">
                              <span className="program-track-badge" style={badgeStyle}>{session.track}</span>
                              {sessionTimeRange ? (
                                <span className="program-session-time">{sessionTimeRange}</span>
                              ) : null}
                            </div>
                            <div className="program-session-body">
                              <h3>{session.title}</h3>
                            </div>
                            <div className="program-session-footer">
                              {visiblePresenters.length > 0 ? (
                                <div className="program-session-presenters">
                                  <span className="program-session-speaker">
                                    {visiblePresenters.map((presenter, presenterIndex) => (
                                      <span key={`${session.slug}-presenter-${presenterIndex}`}>
                                        <span className="program-session-speaker-name">{presenter.name}</span>
                                        {presenter.company ? <span className="program-session-speaker-company"> ({presenter.company})</span> : ''}
                                        {presenterIndex < visiblePresenters.length - 1 ? ', ' : ''}
                                      </span>
                                    ))}
                                  </span>
                                </div>
                              ) : (
                                <div className="program-session-presenters" />
                              )}
                              <Link className="program-session-more" to={`/conference/sessions/${session.slug}`}>
                                더 보기
                              </Link>
                            </div>
                          </div>
                        )
                      })
                    )}
                  </Fragment>
                )
              })}
            </div>

            <div className="conference-program-mobile">
              <div className="program-mobile-tabs">
                <button
                  className={`program-mobile-tab ${mobileTrackFilter === 'TECH' ? 'program-mobile-tab-active' : ''}`}
                  onClick={() => setMobileTrackFilter('TECH')}
                >
                  TECH
                </button>
                <button
                  className={`program-mobile-tab ${mobileTrackFilter === 'CAREER' ? 'program-mobile-tab-active' : ''}`}
                  onClick={() => setMobileTrackFilter('CAREER')}
                >
                  CAREER
                </button>
              </div>
              {normalizedAgenda
                .filter(
                  (item) =>
                    !item.placeholder &&
                    (item.track === mobileTrackFilter || item.track === '공통'),
                )
                .length === 0 ? (
                <div className="program-mobile-empty">준비중입니다</div>
              ) : (
                normalizedAgenda
                  .filter(
                    (item) =>
                      !item.placeholder &&
                      (item.track === mobileTrackFilter || item.track === '공통'),
                  )
                  .map((item) => {
                    const presenters =
                      item.speakers && item.speakers.length > 0
                        ? item.speakers
                        : item.speaker
                        ? [
                            {
                              name: item.speaker,
                              company: item.speakerCompany,
                              image: item.speakerImage,
                            },
                          ]
                        : []
                    const visiblePresenters = presenters.filter((presenter) => presenter?.name)

                    // 시간 범위 계산
                    const mobileStartTime = item.startTime ?? item.time
                    const mobileEndTime = item.endTime
                    const mobileTimeRange = mobileEndTime ? `${mobileStartTime} ~ ${mobileEndTime}` : mobileStartTime

                    // 모바일 배지 스타일 (트랙별 색상)
                    const mobileTrackStyle = getTrackStyle(item.track)
                    const mobileTrackTheme = trackThemes[item.track] ?? trackThemes.DEFAULT
                    const mobileBadgeStyle = {
                      background: mobileTrackTheme.accent,
                    }

                    return (
                      <div
                        className="program-mobile-card"
                        key={`${item.time}-${item.title}`}
                        style={mobileTrackStyle}
                      >
                        <div className="program-card-header">
                          <span className="program-track-badge" style={mobileBadgeStyle}>{item.track}</span>
                          {mobileTimeRange ? (
                            <span className="program-session-time">{mobileTimeRange}</span>
                          ) : null}
                        </div>
                        <div className="program-session-body">
                          <h3>{item.title}</h3>
                        </div>
                        <div className="program-session-footer">
                          {visiblePresenters.length > 0 ? (
                            <div className="program-session-presenters">
                              <span className="program-session-speaker">
                                {visiblePresenters.map((presenter, presenterIndex) => (
                                  <span key={`${item.slug}-mobile-presenter-${presenterIndex}`}>
                                    <span className="program-session-speaker-name">{presenter.name}</span>
                                    {presenter.company ? <span className="program-session-speaker-company"> ({presenter.company})</span> : ''}
                                    {presenterIndex < visiblePresenters.length - 1 ? ', ' : ''}
                                  </span>
                                ))}
                              </span>
                            </div>
                          ) : (
                            <div className="program-session-presenters" />
                          )}
                          <Link className="program-session-more" to={`/conference/sessions/${item.slug}`}>
                            더 보기
                          </Link>
                        </div>
                      </div>
                    )
                  })
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ConferencePage

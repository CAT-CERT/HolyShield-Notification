
import { Navigate, useParams, Link } from 'react-router-dom'

import { siteConfig } from '@/config/site'

const toArray = <T,>(value: T | T[] | null | undefined): T[] =>
  value == null ? [] : Array.isArray(value) ? value : [value]

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const SessionDetailPage = () => {
  const { sessionId } = useParams<{ sessionId: string }>()

  // speakers.json에서 id로 연사 찾기
  const session = siteConfig.conference.speakers.find((speaker) => {
    const baseId = speaker.id ?? toArray(speaker.name)[0]
    return baseId ? createSlug(baseId) === sessionId : false
  })

  if (!session) {
    return <Navigate to="/conference" replace />
  }

  const timeRange = session.time
  const bodyParagraphs = session.body ?? []
  const presenterNames = toArray(session.name)
  const presenterImages = toArray(session.image)
  const presenterCompanies = toArray(session.company)

  type Presenter = {
    name: string
    image?: string
    company?: string
  }

  const presenters = presenterNames.reduce<Presenter[]>((list, name, idx) => {
    const normalizedName = typeof name === 'string' ? name.trim() : ''
    if (!normalizedName) {
      return list
    }

    const imageValue = presenterImages[idx] ?? presenterImages[0]
    const companyValue = presenterCompanies[idx] ?? presenterCompanies[0]

    list.push({
      name: normalizedName,
      image: typeof imageValue === 'string' ? imageValue : undefined,
      company: typeof companyValue === 'string' ? companyValue : undefined,
    })

    return list
  }, [])

  return (
    <section className="session-detail" aria-labelledby="session-detail-title">
      <div className="container session-detail-container">
        <Link className="session-detail-back" to="/conference">
          ← 프로그램으로 돌아가기
        </Link>
        {timeRange ? (
          <div className="session-detail-meta">
            <span className="session-detail-time">{timeRange}</span>
          </div>
        ) : null}
        <h1 id="session-detail-title" className="session-detail-title">
          {session.topic}
        </h1>
        {presenters.length > 0 ? (
          <div className="session-detail-speakers">
            {presenters.map((presenter, index) => (
              <div className="session-detail-speaker" key={`${sessionId}-presenter-${index}`}>
                {presenter.image ? (
                  <img className="session-detail-avatar" src={presenter.image} alt={`${presenter.name} 사진`} />
                ) : null}
                <div className="session-detail-speaker-text">
                  <span className="session-detail-speaker-name">{presenter.name}</span>
                  {presenter.company ? (
                    <span className="session-detail-speaker-role">{presenter.company}</span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {session.bio ? (
          <div className="session-detail-intro-block">
            <p className="session-detail-intro" style={{ whiteSpace: 'pre-line' }}>{session.bio}</p>
          </div>
        ) : null}
        {bodyParagraphs.length > 0 ? <hr className="session-detail-divider" /> : null}
        {bodyParagraphs.length > 0 ? (
          <div className="session-detail-body">
            {bodyParagraphs.map((paragraph: string, index: number) => (
              <p key={`paragraph-${index}`}>{paragraph}</p>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default SessionDetailPage

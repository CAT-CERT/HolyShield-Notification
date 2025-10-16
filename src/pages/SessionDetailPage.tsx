
import { Navigate, useParams, Link } from 'react-router-dom'

import { siteConfig } from '@/config/site'

const SessionDetailPage = () => {
  const { sessionId } = useParams<{ sessionId: string }>()

  // speakers.json에서 id로 연사 찾기
  const session = siteConfig.conference.speakers.find((speaker) => {
    // slug 생성 로직과 동일하게 처리
    const speakerId = speaker.id ?? speaker.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    return speakerId === sessionId
  })

  if (!session) {
    return <Navigate to="/conference" replace />
  }

  const timeRange = session.time
  const bodyParagraphs = session.body ?? []

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
        <div className="session-detail-speaker">
          {session.image ? (
            <img className="session-detail-avatar" src={session.image} alt={`${session.name} 사진`} />
          ) : null}
          <div className="session-detail-speaker-text">
            <span className="session-detail-speaker-name">{session.name}</span>
            {session.title ? (
              <span className="session-detail-speaker-role">{session.title}</span>
            ) : null}
          </div>
        </div>
        {session.bio ? (
          <div className="session-detail-intro-block">
            <p className="session-detail-intro">{session.bio}</p>
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

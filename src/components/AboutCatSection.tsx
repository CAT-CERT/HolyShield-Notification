import certLogo from '@/assets/cert.svg'
import catLogo from '@/assets/CAT.svg'
import { siteConfig } from '@/config/site'

const AboutCatSection = () => {
  const { aboutCat } = siteConfig

  return (
    <section className="about-cat" aria-labelledby="about-cat-title">
      <div className="container about-cat-content">
        <header className="about-cat-header">
          <span className="about-cat-divider" aria-hidden="true" />
          <h2 id="about-cat-title" className="about-cat-title">
            {aboutCat.title}
          </h2>
          <span className="about-cat-divider" aria-hidden="true" />
          <p className="about-cat-subtitle">{aboutCat.subtitle}</p>
        </header>
        <div className="about-cat-body">
          {aboutCat.descriptions.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
        <div className="about-cat-logos" role="presentation">
          <img src={certLogo} alt="CAT-CERT 로고" />
          <img src={catLogo} alt="CAT-Security 로고" />
        </div>
      </div>
    </section>
  )
}

export default AboutCatSection

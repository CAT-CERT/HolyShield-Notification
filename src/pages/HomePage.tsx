import Hero from '@/components/Hero'
import CountdownTimer from '@/components/CountdownTimer'
import AboutCatSection from '@/components/AboutCatSection'
import OverviewSection from '@/components/OverviewSection'
import LocationSection from '@/components/LocationSection'
import { siteConfig } from '@/config/site'

const HomePage = () => {
  return (
    <>
      <Hero
        title={siteConfig.hero.title}
        eventPeriod={siteConfig.hero.eventPeriod}
        venue={siteConfig.hero.venue}
        description={siteConfig.hero.description}
        bannerImage={siteConfig.hero.bannerImage}
      />
      <OverviewSection />
      <AboutCatSection />
      <LocationSection
        pillLabel={siteConfig.location.pillLabel}
        title={siteConfig.location.title}
        description={siteConfig.location.description}
        address={siteConfig.location.address}
        summary={siteConfig.location.summary}
        guideTitle={siteConfig.location.guideTitle}
        id="location"
        sections={siteConfig.location.sections}
      />
      <CountdownTimer label={siteConfig.countdown.label} targetISO={siteConfig.countdown.targetISO} />

    </>
  )
}

export default HomePage

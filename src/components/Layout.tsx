import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import SiteFooter from '@/components/SiteFooter'

type NavItem = {
  label: string
  path: string
}

type LayoutProps = {
  title: string
  description: string
  navLinks: readonly NavItem[]
  logoSrc: string
  footerText: string
}

const Layout = ({ title, description, navLinks, logoSrc, footerText }: LayoutProps) => {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const targetId = location.hash.slice(1)
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      window.requestAnimationFrame(() => {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [location])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        본문 바로가기
      </a>
      <header className="app-header">
        <div className="container nav-bar">
          <div className="brand">
            <Link className="brand-logo-link" to="/" aria-label={`${title} 홈으로 이동`}>
              <img className="brand-logo-image" src={logoSrc} alt={`${title} 로고`} />
            </Link>
          </div>
          <nav aria-label="주요 메뉴">
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
                    end={link.path === '/'}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main id="main" className="app-main" aria-label={description}>
        <Outlet />
      </main>
      <SiteFooter copyright={footerText} />
      <div id="portal-root" />
    </div>
  )
}

export default Layout

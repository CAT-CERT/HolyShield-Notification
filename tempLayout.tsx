import { Link, NavLink, Outlet } from 'react-router-dom'
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
  const [brandPrimary, brandSecondary] = title.split(' ')

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        본문 바로가�?      </a>
      <header className="app-header">
        <div className="container nav-bar">
          <Link className="brand" to="/" aria-label={`${title} ??}>
            <span className="brand-image" aria-hidden="true">
              <img src={logoSrc} alt="" />
            </span>
            <div className="brand-text" aria-hidden="true">
              <span className="brand-primary">{brandPrimary ?? title}</span>
              {brandSecondary ? <span className="brand-secondary">{brandSecondary}</span> : null}
            </div>
            <span className="visually-hidden">{title}</span>
          </Link>
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


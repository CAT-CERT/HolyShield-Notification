import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import HomePage from '@/pages/HomePage'
import CtfPage from '@/pages/CtfPage'
import ConferencePage from '@/pages/ConferencePage'
import SessionDetailPage from '@/pages/SessionDetailPage'
import { siteConfig } from '@/config/site'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout
              title={siteConfig.name}
              description={siteConfig.description}
              navLinks={siteConfig.brand.navLinks}
              logoSrc={siteConfig.brand.logoSrc}
              footerText={siteConfig.footer.copyright}
            />
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/contest" element={<CtfPage />} />
          <Route path="/conference" element={<ConferencePage />} />
          <Route path="/conference/sessions/:sessionId" element={<SessionDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

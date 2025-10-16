type SiteFooterProps = {
  copyright: string
}

const SiteFooter = ({ copyright }: SiteFooterProps) => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="site-footer-content">
          <p>{copyright}</p>
          <p className="site-footer-email">Email: catcert.official@gmail.com</p>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter

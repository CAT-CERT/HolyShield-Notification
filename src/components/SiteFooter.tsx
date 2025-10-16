type SiteFooterProps = {
  copyright: string
}

const SiteFooter = ({ copyright }: SiteFooterProps) => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <p>{copyright}</p>
      </div>
    </footer>
  )
}

export default SiteFooter

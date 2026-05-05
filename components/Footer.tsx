import Image from 'next/image'

export default function Footer() {
  return (
    <footer>
      <div className="section-inner">
        <div className="footer-grid">
          <div>
            <Image
              src="/fmt-logo.svg"
              alt="FollowMe Global Business Solutions"
              width={80}
              height={80}
              style={{ marginBottom: 16, display: 'block' }}
            />
            <div className="footer-brand-name">FollowMe Global Business Solutions</div>
            <div className="footer-tagline">Influencing Influencers.&trade;</div>
          </div>
          <div>
            <div className="footer-col-label">Navigation</div>
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#divisions">Divisions</a></li>
              <li><a href="#results">Results</a></li>
              <li><a href="#jason">Jason Slaughter</a></li>
              <li><a href="#apply">Apply</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-label">Contact</div>
            <div className="footer-contact">
              <span className="footer-contact-item">(470) 265-3810</span>
              <span className="footer-contact-item">Jason@FollowMe.llc</span>
              <span className="footer-contact-item">
                1755 North Brown Rd. | Suite 250<br />Atlanta, GA 30043
              </span>
            </div>
          </div>
          <div>
            <div className="footer-col-label">Connect</div>
            <a href="https://instagram.com/followme.llc" className="footer-social-link">
              @followme.llc
            </a>
            <span
              className="footer-contact-item"
              style={{
                marginTop: '12px',
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: 'var(--gold)',
                opacity: 0.65,
                display: 'block',
              }}
            >
              Text &ldquo;TOKEN&rdquo; to 26786
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">
            &copy; 2026 FollowMe Global Business Solutions, LLC. All rights reserved.
          </span>
          <div className="footer-logo-circle">
            <Image src="/fmt-logo.svg" alt="FMT" width={30} height={30} />
          </div>
        </div>
      </div>
    </footer>
  )
}

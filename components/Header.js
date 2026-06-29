import { useState } from 'react';
import Link from 'next/link';

const SOCIAL_LINKS = [
  { name: 'Telegram',  href: 'https://t.me/whileushop',                          top: '9.0%',  height: '18.2%' },
  { name: 'Facebook',  href: 'https://www.facebook.com/whileushop786',            top: '27.2%', height: '18.2%' },
  { name: 'Instagram', href: 'https://instagram.com/crazydealshunter',            top: '45.4%', height: '18.2%' },
  { name: 'WhatsApp',  href: 'https://chat.whatsapp.com/Ei6fHrUYhyx5GZTHBF5IFF', top: '63.6%', height: '18.2%' },
  { name: 'YouTube',   href: 'https://www.youtube.com/@SnagItUSA',                top: '81.8%', height: '18.2%' },
];

export default function Header({ search, onSearch, totalCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ── Sticky Top Bar: Logo left + Amazon banner center + Menu right ── */}
      <header className="sticky-header">
        <Link href="/" className="sticky-logo">
          <img src="/logo.png" alt="WhileUShop.com" className="sticky-logo-img" />
        </Link>

        {/* Amazon Storefront banner — center of header */}
        <a
          href="https://www.amazon.com/shop/whileushop"
          target="_blank"
          rel="noopener noreferrer"
          className="header-amazon-link"
        >
          <img
            src="/amazon-storefront.png"
            alt="Shop our Amazon Storefront"
            className="header-amazon-img"
          />
        </a>

        <div className="sticky-right">
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* ── Social Media Banner with clickable zones ── */}
      <div className="social-banner">
        <img
          src="/social-media.png"
          alt="Join our social channels"
          className="social-banner-img"
        />
        {SOCIAL_LINKS.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-zone"
            style={{ top: s.top, height: s.height }}
            aria-label={`Join our ${s.name} channel`}
            title={`Join ${s.name}`}
          />
        ))}
      </div>

      {/* ── Search Bar ── */}
      <div className="search-bar-wrap">
        <div className="search-bar-inner">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Looking for something?"
              value={search}
              onChange={onSearch}
            />
          </div>
          <div className="deal-count-badge">
            <strong>{totalCount}</strong> active deals
          </div>
        </div>
      </div>

      {/* ── Slide-in Side Menu ── */}
      {menuOpen && (
        <>
          <div className="menu-overlay" onClick={() => setMenuOpen(false)} />
          <nav className="side-menu">
            <div className="side-menu-header">
              <span className="side-menu-title">Menu</span>
              <button className="side-menu-close" onClick={() => setMenuOpen(false)}>✕</button>
            </div>
            <ul className="side-menu-links">
              <li><Link href="/" onClick={() => setMenuOpen(false)}>🏠 Home</Link></li>
              <li><Link href="/about" onClick={() => setMenuOpen(false)}>👋 About Us</Link></li>
              <li><Link href="/contact" onClick={() => setMenuOpen(false)}>📩 Contact Us</Link></li>
              <li><Link href="/privacy" onClick={() => setMenuOpen(false)}>🔒 Privacy Policy</Link></li>
            </ul>
            <div className="side-menu-footer">
              © {new Date().getFullYear()} WhileUShop.com
            </div>
          </nav>
        </>
      )}
    </>
  );
}

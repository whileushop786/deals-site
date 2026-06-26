import { useState } from 'react';
import Link from 'next/link';

export default function Header({ search, onSearch, totalCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Logo Banner */}
      <div className="logo-banner">
        <Link href="/">
          <img src="/logo.png" alt="WhileUShop.com — Deals, Coupons & Freebies" className="site-logo" />
        </Link>
      </div>

      {/* Social Media Banner */}
      <div className="social-banner">
        <img src="/social-media.png" alt="Join our Telegram, Facebook, Instagram, WhatsApp and YouTube channels" className="social-banner-img" />
      </div>

      {/* Amazon Storefront Banner */}
      <div className="amazon-banner">
        <a href="https://www.amazon.com/shop/whileushop" target="_blank" rel="noopener noreferrer">
          <img src="/amazon-storefront.png" alt="Shop our Amazon Storefront — Hand-picked deals and top recommendations" className="amazon-banner-img" />
        </a>
      </div>

      {/* Main Nav — search + deal count + menu only */}
      <header className="header">
        <div className="header-inner">

          {/* Search bar — full width on left */}
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search deals..."
              value={search}
              onChange={onSearch}
            />
          </div>

          <div className="header-right">
            <div className="deal-count-badge">
              <strong>{totalCount}</strong> active deals
            </div>

            {/* Hamburger Menu */}
            <button
              className="menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-in Side Menu */}
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

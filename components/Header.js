import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getShopPages } from '../lib/shopPages';

const SOCIAL_LINKS = [
  { name: 'Telegram',  href: 'https://t.me/whileushop',                          top: '9.0%',  height: '18.2%' },
  { name: 'Facebook',  href: 'https://www.facebook.com/whileushop786',            top: '27.2%', height: '18.2%' },
  { name: 'Instagram', href: 'https://instagram.com/crazydealshunter',            top: '45.4%', height: '18.2%' },
  { name: 'WhatsApp',  href: 'https://chat.whatsapp.com/Ei6fHrUYhyx5GZTHBF5IFF', top: '63.6%', height: '18.2%' },
  { name: 'YouTube',   href: 'https://www.youtube.com/@SnagItUSA',                top: '81.8%', height: '18.2%' },
];

export default function Header({ search, onSearch, totalCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [shopPages, setShopPages] = useState([]);

  const closeAll = () => { setMenuOpen(false); setShopOpen(false); };

  useEffect(() => { getShopPages().then(setShopPages); }, []);

  return (
    <>
      <header className="sticky-header">
        <Link href="/" className="sticky-logo">
          <img src="/logo.png" alt="WhileUShop.com" className="sticky-logo-img" />
        </Link>
        <a href="https://www.amazon.com/shop/caramc" target="_blank" rel="noopener noreferrer" className="header-amazon-link">
          <img src="/amazon-storefront.png" alt="Shop our Amazon Storefront" className="header-amazon-img" />
        </a>
        <div className="sticky-right">
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      <div className="social-banner">
        <img src="/social-media.png" alt="Join our social channels" className="social-banner-img" />
        {SOCIAL_LINKS.map((s) => (
          <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
            className="social-zone" style={{ top: s.top, height: s.height }}
            aria-label={`Join our ${s.name} channel`} title={`Join ${s.name}`} />
        ))}
      </div>

      <div className="search-bar-wrap">
        <div className="search-bar-inner">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input type="text" className="search-input" placeholder="Looking for something?" value={search} onChange={onSearch} />
          </div>
          <div className="deal-count-badge"><strong>{totalCount}</strong> active deals</div>
        </div>
      </div>

      {menuOpen && (
        <>
          <div className="menu-overlay" onClick={closeAll} />
          <nav className="side-menu">
            <div className="side-menu-header">
              <span className="side-menu-title">Menu</span>
              <button className="side-menu-close" onClick={closeAll}>✕</button>
            </div>
            <ul className="side-menu-links">
              <li><Link href="/" onClick={closeAll}>🏠 Home</Link></li>
              <li className="has-submenu">
                <button className="submenu-trigger" onClick={() => setShopOpen(!shopOpen)}>
                  <span>🛍️ Shop &amp; Save</span>
                  <span className={`submenu-arrow ${shopOpen ? 'open' : ''}`}>›</span>
                </button>
                {shopOpen && (
                  <ul className="submenu">
                    {shopPages.map((page) => (
                      <li key={page.id}>
                        <Link href={`/shop/${page.slug}`} onClick={closeAll}>{page.icon} {page.page_name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li><Link href="/freebies-library" onClick={closeAll}>📚 Freebies Library</Link></li>
              <li><Link href="/about" onClick={closeAll}>👋 About Us</Link></li>
              <li><Link href="/contact" onClick={closeAll}>📩 Contact Us</Link></li>
              <li><Link href="/privacy" onClick={closeAll}>🔒 Privacy Policy</Link></li>
            </ul>
          </nav>
        </>
      )}
    </>
  );
}

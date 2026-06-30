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
  const [shopOpen, setShopOpen] = useState(false);
  const [menuEmail, setMenuEmail] = useState('');
  const [menuStatus, setMenuStatus] = useState('idle'); // idle | loading | success | error
  const [menuErrorMsg, setMenuErrorMsg] = useState('');

  const closeAll = () => {
    setMenuOpen(false);
    setShopOpen(false);
  };

  const handleMenuSubscribe = async (e) => {
    e.preventDefault();
    if (!menuEmail || !menuEmail.includes('@')) {
      setMenuErrorMsg('Please enter a valid email.');
      return;
    }
    setMenuStatus('loading');
    setMenuErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: menuEmail }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMenuErrorMsg(data.error || 'Something went wrong.');
        setMenuStatus('error');
        return;
      }
      setMenuStatus('success');
    } catch {
      setMenuErrorMsg('Something went wrong.');
      setMenuStatus('error');
    }
  };

  return (
    <>
      {/* ── Sticky Header ── */}
      <header className="sticky-header">
        <Link href="/" className="sticky-logo">
          <img src="/logo.png" alt="WhileUShop.com" className="sticky-logo-img" />
        </Link>

        <a href="https://www.amazon.com/shop/whileushop" target="_blank" rel="noopener noreferrer" className="header-amazon-link">
          <img src="/amazon-storefront.png" alt="Shop our Amazon Storefront" className="header-amazon-img" />
        </a>

        <div className="sticky-right">
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* ── Social Media Banner ── */}
      <div className="social-banner">
        <img src="/social-media.png" alt="Join our social channels" className="social-banner-img" />
        {SOCIAL_LINKS.map((s) => (
          <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
            className="social-zone" style={{ top: s.top, height: s.height }}
            aria-label={`Join our ${s.name} channel`} title={`Join ${s.name}`} />
        ))}
      </div>

      {/* ── Search Bar ── */}
      <div className="search-bar-wrap">
        <div className="search-bar-inner">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input type="text" className="search-input" placeholder="Looking for something?"
              value={search} onChange={onSearch} />
          </div>
          <div className="deal-count-badge">
            <strong>{totalCount}</strong> active deals
          </div>
        </div>
      </div>

      {/* ── Side Menu ── */}
      {menuOpen && (
        <>
          <div className="menu-overlay" onClick={closeAll} />
          <nav className="side-menu">
            <div className="side-menu-header">
              <span className="side-menu-title">Menu</span>
              <button className="side-menu-close" onClick={closeAll}>✕</button>
            </div>

            <ul className="side-menu-links">
              <li>
                <Link href="/" onClick={closeAll}>🏠 Home</Link>
              </li>

              {/* Shop & Save with submenu */}
              <li className="has-submenu">
                <button
                  className="submenu-trigger"
                  onClick={() => setShopOpen(!shopOpen)}
                >
                  <span>🛍️ Shop &amp; Save</span>
                  <span className={`submenu-arrow ${shopOpen ? 'open' : ''}`}>›</span>
                </button>
                {shopOpen && (
                  <ul className="submenu">
                    <li>
                      <Link href="/walmart-savings" onClick={closeAll}>
                        🛒 Walmart Savings
                      </Link>
                    </li>
                    <li>
                      <Link href="/wayfair-home" onClick={closeAll}>
                        🛋️ Wayfair Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/michael-kors-outlet" onClick={closeAll}>
                        👜 Michael Kors Outlet
                      </Link>
                    </li>
                    <li>
                      <Link href="/freebies" onClick={closeAll}>
                        🎁 Freebies
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Link href="/about" onClick={closeAll}>👋 About Us</Link>
              </li>
              <li>
                <Link href="/contact" onClick={closeAll}>📩 Contact Us</Link>
              </li>
              <li>
                <Link href="/privacy" onClick={closeAll}>🔒 Privacy Policy</Link>
              </li>
            </ul>

            {/* Compact email subscribe form */}
            <div className="menu-subscribe">
              {menuStatus === 'success' ? (
                <div className="menu-subscribe-success">
                  🎉 You're subscribed!
                </div>
              ) : (
                <>
                  <p className="menu-subscribe-title">🔥 Get Daily Deals</p>
                  <form onSubmit={handleMenuSubscribe} className="menu-subscribe-form">
                    <input
                      type="email"
                      placeholder="Your email"
                      value={menuEmail}
                      onChange={(e) => setMenuEmail(e.target.value)}
                      className="menu-subscribe-input"
                      disabled={menuStatus === 'loading'}
                    />
                    <button
                      type="submit"
                      className="menu-subscribe-btn"
                      disabled={menuStatus === 'loading'}
                    >
                      {menuStatus === 'loading' ? '...' : '→'}
                    </button>
                  </form>
                  {menuErrorMsg && <p className="menu-subscribe-error">{menuErrorMsg}</p>}
                </>
              )}
            </div>
          </nav>
        </>
      )}
    </>
  );
}

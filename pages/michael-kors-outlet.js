import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import FooterSubscribe from '../components/FooterSubscribe';

const SITE_URL = "https://www.whileushop.com";

export default function MichaelKorsOutlet() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Michael Kors Outlet — Best MK Deals & Discounts',
    url: `${SITE_URL}/michael-kors-outlet`,
    description: 'Find the best Michael Kors outlet deals on handbags, purses, watches, shoes and accessories. Save up to 70% with verified MK promo codes.',
    publisher: { '@type': 'Organization', name: 'WhileUShop.com', url: SITE_URL },
  };

  return (
    <>
      <Head>
        <title>Michael Kors Outlet — Best MK Handbag Deals & Promo Codes | WhileUShop.com</title>
        <meta name="description" content="Find the best Michael Kors outlet deals on handbags, purses, watches, shoes and wallets. Save up to 70% with verified MK promo codes and outlet sale events — updated daily." />
        <meta name="keywords" content="Michael Kors outlet, Michael Kors deals, MK handbag sale, Michael Kors coupon code, Michael Kors discount, MK purse deals, Michael Kors promo code, Michael Kors clearance, WhileUShop MK" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Michael Kors Outlet — Best MK Deals & Promo Codes" />
        <meta property="og:description" content="Best Michael Kors outlet deals on handbags, watches and accessories — updated daily at WhileUShop.com." />
        <meta property="og:url" content={`${SITE_URL}/michael-kors-outlet`} />
        <meta property="og:image" content={`${SITE_URL}/icon-512.png`} />
        <meta property="og:site_name" content="WhileUShop.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Michael Kors Outlet — Best MK Deals & Promo Codes" />
        <meta name="twitter:description" content="Best MK outlet deals on handbags, watches and accessories — updated daily." />
        <link rel="canonical" href={`${SITE_URL}/michael-kors-outlet`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <Header search="" onSearch={() => {}} totalCount={0} />

      <main className="static-page">
        <div className="static-container">
          <div className="static-hero">
            <h1>Michael Kors <span>Outlet</span></h1>
            <p>Best MK deals on handbags, watches & accessories — up to 70% off.</p>
          </div>

          <div className="static-content">
            <div className="static-card">
              <div className="static-icon">👜</div>
              <h2>Michael Kors Outlet Deals</h2>
              <p>Michael Kors is one of America's most loved luxury fashion brands, known for its iconic handbags, watches, shoes and accessories. The Michael Kors Outlet offers the same premium quality at significantly reduced prices — often 60-70% less than retail.</p>
              <p>WhileUShop.com monitors Michael Kors outlet sales and promo codes daily, so you can get your favorite MK handbag or watch at the best possible price without spending hours searching.</p>
            </div>

            <div className="static-card">
              <div className="static-icon">✨</div>
              <h2>Best Michael Kors Categories</h2>
              <ul className="static-list">
                <li>👜 Handbags & Crossbody Bags</li>
                <li>👛 Wallets & Small Leather Goods</li>
                <li>⌚ Watches & Smartwatches</li>
                <li>👠 Shoes & Sandals</li>
                <li>🧥 Clothing & Jackets</li>
                <li>🕶️ Sunglasses & Accessories</li>
                <li>💍 Jewelry & Bracelets</li>
                <li>🎒 Backpacks & Tote Bags</li>
              </ul>
            </div>

            <div className="static-card">
              <div className="static-icon">🏷️</div>
              <h2>How to Get the Best MK Prices</h2>
              <p><strong>1. Shop the Outlet</strong> — MichaelKors.com/outlet has items up to 70% off retail price.</p>
              <p><strong>2. Use Promo Codes</strong> — MK regularly offers 20-30% off promo codes on top of outlet prices. WhileUShop posts them all!</p>
              <p><strong>3. Sale Events</strong> — Michael Kors holds major sales during Black Friday, Memorial Day and end-of-season clearances.</p>
              <p><strong>4. Email Signup</strong> — Get 15% off your first order by signing up for MK emails.</p>
              <p><strong>5. Amazon</strong> — Many authentic MK products are available on Amazon at outlet prices with Prime shipping.</p>
            </div>

            <div className="static-card">
              <div className="static-icon">📅</div>
              <h2>Michael Kors Major Sale Events</h2>
              <ul className="static-list">
                <li>🖤 <strong>Black Friday</strong> — Up to 70% off sitewide</li>
                <li>❤️ <strong>Valentine's Day Sale</strong> — Handbags & jewelry deals</li>
                <li>☀️ <strong>Summer Sale</strong> — Sandals & summer bags</li>
                <li>🏫 <strong>Back to School</strong> — Backpacks & totes</li>
                <li>🎄 <strong>Holiday Sale</strong> — Gifts & accessories</li>
                <li>🗓️ <strong>Semi-Annual Sale</strong> — Up to 60% off twice a year</li>
              </ul>
            </div>

            <div className="static-card">
              <div className="static-icon">📢</div>
              <h2>Never Miss an MK Deal</h2>
              <p>Follow us to get Michael Kors promo codes and sale alerts the moment they drop:</p>
              <ul className="static-list">
                <li>📱 <strong>Telegram</strong> — <a href="https://t.me/whileushop" style={{color:'#ff6b00'}}>t.me/whileushop</a></li>
                <li>📘 <strong>Facebook</strong> — <a href="https://www.facebook.com/whileushop786" style={{color:'#ff6b00'}}>facebook.com/whileushop786</a></li>
                <li>📸 <strong>Instagram</strong> — <a href="https://instagram.com/crazydealshunter" style={{color:'#ff6b00'}}>@crazydealshunter</a></li>
              </ul>
            </div>
          </div>

          <div className="static-back">
            <Link href="/" className="back-btn">← Back to All Deals</Link>
          </div>
        </div>
      </main>

      <FooterSubscribe />

      <footer className="footer">
        <p>As an affiliate partner, we earn from qualifying purchases.</p>
        <p>© {new Date().getFullYear()} <a href={SITE_URL}>WhileUShop.com</a> — All rights reserved.</p>
      </footer>
    </>
  );
}

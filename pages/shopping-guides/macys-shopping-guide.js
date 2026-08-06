import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import FooterSubscribe from '../../components/FooterSubscribe';

const SITE_URL = 'https://www.whileushop.com';

export default function MacysShoppingGuide() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: "Macy's Shopping Guide 2026 — How to Save Money at Macy's",
      description: "Complete Macy's shopping guide with tips on sale events, Star Rewards, coupon stacking and the best times to shop.",
      url: `${SITE_URL}/shopping-guides/macys-shopping-guide`,
      publisher: { '@type': 'Organization', name: 'WhileUShop.com', url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: "When does Macy's have the biggest sales?", acceptedAnswer: { '@type': 'Answer', text: "Macy's biggest sales are Black Friday, the Semi-Annual Sale (June and December), the Friends & Family sale and the 4th of July sale. These events offer 20-70% off across all departments." } },
        { '@type': 'Question', name: "How do Macy's Star Rewards work?", acceptedAnswer: { '@type': 'Answer', text: "Macy's Star Rewards is their loyalty program with 4 tiers — Silver, Gold, Platinum and Bronze. Members earn points on every purchase, get exclusive discounts, birthday rewards and early access to sales." } },
        { '@type': 'Question', name: "Can I stack coupons at Macy's?", acceptedAnswer: { '@type': 'Answer', text: "Yes! Macy's allows coupon stacking in many cases. You can combine a promo code with a Star Rewards discount and sale prices for maximum savings. Some exclusions apply on luxury brands." } },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Shopping Guides', item: `${SITE_URL}/shopping-guides` },
        { '@type': 'ListItem', position: 3, name: "Macy's Shopping Guide", item: `${SITE_URL}/shopping-guides/macys-shopping-guide` },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Macy's Shopping Guide 2026 — Sales, Coupons & Star Rewards Tips | WhileUShop.com</title>
        <meta name="description" content="Complete Macy's shopping guide for 2026. Learn about Star Rewards, Semi-Annual Sale, coupon stacking, best sale dates and insider tips to save up to 70% at Macy's." />
        <meta name="keywords" content="macys shopping guide, macys sale dates, macys coupon code, macys star rewards, macys semi annual sale, how to save at macys, macys promo code, macys friends and family sale, macys black friday" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Macy's Shopping Guide 2026 — Sales, Coupons & Star Rewards" />
        <meta property="og:description" content="Expert tips on Macy's Star Rewards, sale events and coupon stacking strategies." />
        <meta property="og:url" content={`${SITE_URL}/shopping-guides/macys-shopping-guide`} />
        <meta property="og:image" content={`${SITE_URL}/icon-512.png`} />
        <link rel="canonical" href={`${SITE_URL}/shopping-guides/macys-shopping-guide`} />
        {schema.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      </Head>

      <Header search="" onSearch={() => {}} totalCount={0} />

      <nav aria-label="Breadcrumb" style={{ padding: '10px 20px', fontSize: 12, color: '#999' }}>
        <Link href="/" style={{ color: '#ff6b00' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <Link href="/shopping-guides" style={{ color: '#ff6b00' }}>Shopping Guides</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: '#aaa' }}>Macy's Shopping Guide</span>
      </nav>

      <main className="static-page" style={{ paddingTop: 0 }}>
        <div className="static-container">
          <div className="static-hero">
            <h1>🌟 Macy's <span>Shopping Guide</span></h1>
            <p>How to save money at Macy's in 2026 — Star Rewards, sale events & coupon stacking tips.</p>
          </div>

          <div className="static-content">
            <div className="static-card">
              <h2>Why Shop at Macy's</h2>
              <p>Macy's is one of America's most iconic department stores, offering premium clothing, beauty products, home goods, jewelry and accessories from top brands. With frequent sale events, a generous loyalty program and stackable coupons, Macy's shoppers can regularly save 40-70% off retail prices.</p>
            </div>

            <div className="static-card">
              <h2>⭐ Macy's Star Rewards — Complete Guide</h2>
              <p>Star Rewards is Macy's free loyalty program that rewards you every time you shop. Here's how each tier works:</p>
              <ul className="static-list">
                <li><strong>Bronze</strong> — Free to join. Earn 1 point per $1 spent. Access to exclusive sales.</li>
                <li><strong>Silver</strong> — Spend $500+/year. Earn 2 points per $1. Free shipping on $25+ orders.</li>
                <li><strong>Gold</strong> — Spend $1,200+/year. Earn 3 points per $1. Priority customer service.</li>
                <li><strong>Platinum</strong> — Macy's credit card holders. Earn 5 points per $1. Best perks and benefits.</li>
              </ul>
              <p><strong>Pro tip:</strong> Always sign up for Star Rewards before your first purchase — even Bronze members get exclusive sale access and birthday discounts.</p>
            </div>

            <div className="static-card">
              <h2>📅 Macy's Sale Calendar 2026</h2>
              <ul className="static-list">
                <li>🌹 <strong>Valentine's Day Sale (February)</strong> — Jewelry and gifts up to 50% off</li>
                <li>☘️ <strong>Spring Sale (March-April)</strong> — Clothing and home décor discounts</li>
                <li>👨 <strong>Memorial Day Sale (May)</strong> — Major sitewide discounts</li>
                <li>🌞 <strong>Semi-Annual Sale (June)</strong> — One of the biggest sales of the year</li>
                <li>🎆 <strong>4th of July Sale</strong> — Up to 60% off across all departments</li>
                <li>🏫 <strong>Back to School Sale (August)</strong> — Clothing and accessories</li>
                <li>🖤 <strong>Black Friday (November)</strong> — Biggest discounts of the year</li>
                <li>🎄 <strong>Semi-Annual Sale (December)</strong> — Huge year-end clearance</li>
              </ul>
            </div>

            <div className="static-card">
              <h2>🏷️ Macy's Coupon Stacking Strategy</h2>
              <p>Macy's is famous for allowing coupon stacking — combining multiple discounts for massive savings:</p>
              <ul className="static-list">
                <li><strong>Step 1:</strong> Find an item on sale (clearance or promotional price)</li>
                <li><strong>Step 2:</strong> Apply a Macy's promo code at checkout</li>
                <li><strong>Step 3:</strong> Use your Star Rewards discount</li>
                <li><strong>Step 4:</strong> Pay with Macy's credit card for extra points</li>
                <li><strong>Result:</strong> Often 50-70% off original retail price!</li>
              </ul>
            </div>

            <div className="static-card">
              <h2>💡 Insider Macy's Shopping Tips</h2>
              <ul className="static-list">
                <li><strong>Shop Last Season</strong> — Macy's clearance has last season's styles at 60-80% off. Same quality, massive savings.</li>
                <li><strong>Check the Backstage Section</strong> — Macy's Backstage is their off-price store within a store with designer items at outlet prices.</li>
                <li><strong>Free Shipping Threshold</strong> — Silver members and above get free shipping on $25+ orders. Bronze members get free shipping on $25+ with promo codes.</li>
                <li><strong>Price Adjustment Policy</strong> — If an item goes on sale within 10 days of purchase, request a price adjustment for a refund of the difference.</li>
                <li><strong>Birthday Discount</strong> — Star Rewards members get a special birthday discount. Make sure your birthday is registered!</li>
              </ul>
            </div>

            <div className="static-card">
              <h2>❓ Frequently Asked Questions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>When does Macy's have the biggest sales?</h3>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>The Semi-Annual Sale (June & December) and Black Friday are Macy's biggest events. The Friends & Family sale and 4th of July sale also offer outstanding discounts of 20-70% off.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>How do Macy's Star Rewards work?</h3>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>Free to join loyalty program with 4 tiers. Earn points on every purchase, get exclusive sale access, birthday rewards and the higher your tier, the more you earn per dollar spent.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>Can I stack coupons at Macy's?</h3>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>Yes! Combine promo codes with Star Rewards discounts and sale prices for maximum savings. Some luxury brands are excluded but most regular merchandise qualifies for stacking.</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <Link href="/shopping-guides" className="back-btn">← All Shopping Guides</Link>
            <Link href="/" className="back-btn">← Back to Deals</Link>
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

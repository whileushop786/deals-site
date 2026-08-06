import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import FooterSubscribe from '../../components/FooterSubscribe';

const SITE_URL = 'https://www.whileushop.com';

const GUIDES = [
  {
    slug: 'amazon-shopping-guide',
    title: 'Amazon Shopping Guide',
    icon: '🛒',
    desc: 'Master Amazon deals, Prime benefits, coupon stacking and insider tips to save hundreds every month.',
    color: '#FF9900',
    keywords: 'amazon deals, amazon coupons, prime savings',
  },
  {
    slug: 'walmart-shopping-guide',
    title: 'Walmart Shopping Guide',
    icon: '🏪',
    desc: 'Everything you need to know about Walmart Rollbacks, clearance, price matching and coupon codes.',
    color: '#0071CE',
    keywords: 'walmart deals, walmart rollback, walmart coupons',
  },
  {
    slug: 'macys-shopping-guide',
    title: "Macy's Shopping Guide",
    icon: '🌟',
    desc: "Unlock Macy's best sale events, loyalty rewards, coupon stacking strategies and VIP member perks.",
    color: '#E21837',
    keywords: "macy's deals, macy's coupons, macy's sale",
  },
  {
    slug: 'michael-kors-shopping-guide',
    title: 'Michael Kors Shopping Guide',
    icon: '👜',
    desc: 'Get authentic Michael Kors handbags, watches and accessories at outlet prices with verified promo codes.',
    color: '#C5A028',
    keywords: 'michael kors outlet, mk deals, michael kors coupons',
  },
  {
    slug: 'wayfair-shopping-guide',
    title: 'Wayfair Shopping Guide',
    icon: '🛋️',
    desc: 'Navigate Way Day, open box deals, free shipping tips and the best times to buy furniture at Wayfair.',
    color: '#7B2D8B',
    keywords: 'wayfair deals, wayfair sale, wayfair coupons',
  },
  {
    slug: 'online-shopping-guide',
    title: 'Online Shopping Guide',
    icon: '💻',
    desc: 'Ultimate guide to saving money online — coupon stacking, cashback apps, price tracking and more.',
    color: '#ff6b00',
    keywords: 'online shopping tips, coupon codes, save money online',
  },
];

export default function ShoppingGuides() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Shopping Guides — WhileUShop.com',
    url: `${SITE_URL}/shopping-guides`,
    description: 'Complete shopping guides for Amazon, Walmart, Macy\'s, Michael Kors and Wayfair. Learn insider tips, coupon strategies and how to save money at top U.S. stores.',
    publisher: { '@type': 'Organization', name: 'WhileUShop.com', url: SITE_URL },
  };

  return (
    <>
      <Head>
        <title>Shopping Guides — Save More at Amazon, Walmart, Wayfair & More | WhileUShop.com</title>
        <meta name="description" content="Complete shopping guides for Amazon, Walmart, Macy's, Michael Kors and Wayfair. Expert tips on coupon codes, sale events, price matching and insider savings strategies." />
        <meta name="keywords" content="shopping guides, amazon shopping guide, walmart shopping guide, wayfair shopping guide, michael kors shopping guide, macys shopping guide, how to save money shopping online, coupon tips" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Shopping Guides — Save More at Top U.S. Stores | WhileUShop.com" />
        <meta property="og:description" content="Expert shopping guides for Amazon, Walmart, Macy's, Michael Kors and Wayfair." />
        <meta property="og:url" content={`${SITE_URL}/shopping-guides`} />
        <meta property="og:image" content={`${SITE_URL}/icon-512.png`} />
        <meta property="og:site_name" content="WhileUShop.com" />
        <link rel="canonical" href={`${SITE_URL}/shopping-guides`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <Header search="" onSearch={() => {}} totalCount={0} />

      <main className="static-page">
        <div className="static-container" style={{ maxWidth: 1100 }}>
          <div className="static-hero">
            <h1>🛍️ <span>Shopping Guides</span></h1>
            <p>Expert guides to help you save more at America's top stores — insider tips, coupon strategies & sale calendars.</p>
          </div>

          <div className="guides-grid">
            {GUIDES.map((guide) => (
              <Link key={guide.slug} href={`/shopping-guides/${guide.slug}`} className="guide-card">
                <div className="guide-card-icon" style={{ background: `${guide.color}15`, border: `2px solid ${guide.color}30` }}>
                  <span style={{ fontSize: 36 }}>{guide.icon}</span>
                </div>
                <div className="guide-card-body">
                  <h2 className="guide-card-title" style={{ color: guide.color }}>{guide.title}</h2>
                  <p className="guide-card-desc">{guide.desc}</p>
                  <div className="guide-card-tags">
                    {guide.keywords.split(', ').map((k, i) => (
                      <span key={i} className="guide-tag">{k}</span>
                    ))}
                  </div>
                  <span className="guide-card-cta">Read Guide →</span>
                </div>
              </Link>
            ))}
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

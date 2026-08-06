import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import FooterSubscribe from '../../components/FooterSubscribe';

const SITE_URL = 'https://www.whileushop.com';

export default function MichaelKorsShoppingGuide() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Michael Kors Shopping Guide 2026 — Outlet Deals, Promo Codes & Savings Tips',
      description: 'Complete Michael Kors shopping guide with tips on outlet deals, promo codes, sale events and how to get authentic MK products at the best prices.',
      url: `${SITE_URL}/shopping-guides/michael-kors-shopping-guide`,
      publisher: { '@type': 'Organization', name: 'WhileUShop.com', url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Is Michael Kors outlet authentic?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, Michael Kors outlet products are authentic but are often made specifically for outlet stores at a lower price point and quality tier than the mainline collection. They carry the genuine MK brand but may use different materials.' } },
        { '@type': 'Question', name: 'When does Michael Kors have the best sales?', acceptedAnswer: { '@type': 'Answer', text: 'Michael Kors biggest sales are Black Friday, the Semi-Annual Sale (twice yearly), Valentine\'s Day and end-of-season clearances. During these events you can save 40-70% off retail prices.' } },
        { '@type': 'Question', name: 'How do I get Michael Kors promo codes?', acceptedAnswer: { '@type': 'Answer', text: 'Sign up for Michael Kors email list for 15% off your first order. WhileUShop.com posts verified MK promo codes regularly. Student discounts are also available through UNiDAYS.' } },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Shopping Guides', item: `${SITE_URL}/shopping-guides` },
        { '@type': 'ListItem', position: 3, name: 'Michael Kors Shopping Guide', item: `${SITE_URL}/shopping-guides/michael-kors-shopping-guide` },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Michael Kors Shopping Guide 2026 — Outlet Deals & Promo Codes | WhileUShop.com</title>
        <meta name="description" content="Complete Michael Kors shopping guide for 2026. Learn how to get authentic MK handbags, watches and accessories at outlet prices with verified promo codes and sale tips." />
        <meta name="keywords" content="michael kors shopping guide, michael kors outlet guide, michael kors promo code, michael kors sale, mk handbag deals, michael kors discount, how to buy michael kors cheap, michael kors outlet vs retail" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Michael Kors Shopping Guide 2026 — Outlet Deals & Promo Codes" />
        <meta property="og:description" content="Get authentic MK products at outlet prices with verified promo codes and insider tips." />
        <meta property="og:url" content={`${SITE_URL}/shopping-guides/michael-kors-shopping-guide`} />
        <meta property="og:image" content={`${SITE_URL}/icon-512.png`} />
        <link rel="canonical" href={`${SITE_URL}/shopping-guides/michael-kors-shopping-guide`} />
        {schema.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      </Head>

      <Header search="" onSearch={() => {}} totalCount={0} />

      <nav aria-label="Breadcrumb" style={{ padding: '10px 20px', fontSize: 12, color: '#999' }}>
        <Link href="/" style={{ color: '#ff6b00' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <Link href="/shopping-guides" style={{ color: '#ff6b00' }}>Shopping Guides</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: '#aaa' }}>Michael Kors Shopping Guide</span>
      </nav>

      <main className="static-page" style={{ paddingTop: 0 }}>
        <div className="static-container">
          <div className="static-hero">
            <h1>👜 Michael Kors <span>Shopping Guide</span></h1>
            <p>How to get authentic MK products at outlet prices — promo codes, sale events & insider tips.</p>
          </div>

          <div className="static-content">
            <div className="static-card">
              <h2>Why Michael Kors is Worth It</h2>
              <p>Michael Kors is one of America's most recognized luxury fashion brands, known for sophisticated handbags, elegant watches, stylish shoes and premium accessories. While retail prices can be high, savvy shoppers know that MK regularly offers outlet deals, promo codes and sale events where you can get the same quality at 40-70% less.</p>
            </div>

            <div className="static-card">
              <h2>🏬 Michael Kors Outlet vs Retail — What's the Difference?</h2>
              <ul className="static-list">
                <li><strong>Outlet products</strong> — Made specifically for outlet stores. Authentic MK brand but may use slightly different materials. Prices are 40-70% lower than retail.</li>
                <li><strong>Retail products</strong> — Full mainline collection with premium materials. Available at MK stores, department stores and michaelkors.com.</li>
                <li><strong>Online outlet</strong> — michaelkors.com/outlet offers the best of both worlds — outlet prices with online convenience.</li>
                <li><strong>Amazon MK deals</strong> — Many authentic MK products are sold on Amazon at competitive prices with Prime shipping.</li>
              </ul>
            </div>

            <div className="static-card">
              <h2>🏷️ How to Get Michael Kors Promo Codes</h2>
              <ul className="static-list">
                <li><strong>Email signup</strong> — Get 15% off your first order by signing up for MK emails at michaelkors.com</li>
                <li><strong>WhileUShop.com</strong> — We post verified MK promo codes as soon as they're available. <Link href="/shop/michael-kors-outlet" style={{color:'#ff6b00'}}>Check MK deals →</Link></li>
                <li><strong>Student discount</strong> — Verify student status via UNiDAYS for ongoing discounts</li>
                <li><strong>MK Insider loyalty</strong> — Join for exclusive member-only promo codes and early sale access</li>
                <li><strong>RetailMeNot & Honey</strong> — Browser extensions that automatically apply MK promo codes at checkout</li>
              </ul>
            </div>

            <div className="static-card">
              <h2>📅 Michael Kors Sale Calendar 2026</h2>
              <ul className="static-list">
                <li>❤️ <strong>Valentine's Day Sale (February)</strong> — Handbags and jewelry up to 40% off</li>
                <li>🌸 <strong>Spring Sale (April)</strong> — New season styles discounted</li>
                <li>☀️ <strong>Summer Sale (June-July)</strong> — Up to 50% off summer styles</li>
                <li>🏫 <strong>Back to School (August)</strong> — Backpacks and accessories deals</li>
                <li>🍂 <strong>Semi-Annual Sale (September)</strong> — Major clearance event</li>
                <li>🖤 <strong>Black Friday (November)</strong> — Biggest discounts of the year, up to 70% off</li>
                <li>🎄 <strong>Holiday Sale (December)</strong> — Gift sets and accessories on sale</li>
              </ul>
            </div>

            <div className="static-card">
              <h2>💡 Insider Michael Kors Shopping Tips</h2>
              <ul className="static-list">
                <li><strong>Shop End of Season</strong> — Best time to buy summer bags is August-September and winter bags is February-March when prices drop 50-60%.</li>
                <li><strong>Compare Outlet vs Amazon</strong> — Sometimes Amazon has better prices on the same MK items, especially with Prime Day deals.</li>
                <li><strong>Check MK Insider App</strong> — Exclusive app-only deals and early access to sales for loyalty members.</li>
                <li><strong>Buy Classic Styles</strong> — Investment pieces like the Jet Set and Selma bags hold their value and go on sale regularly.</li>
                <li><strong>Stack Discounts</strong> — Combine a promo code with outlet pricing and loyalty rewards for maximum savings.</li>
              </ul>
            </div>

            <div className="static-card">
              <h2>❓ Frequently Asked Questions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>Is Michael Kors outlet authentic?</h3>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>Yes, outlet products are authentic MK brand. They are made specifically for outlet stores at a slightly lower price point than the mainline collection, but carry the same brand name and warranty.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>When does Michael Kors have the best sales?</h3>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>Black Friday and the Semi-Annual Sale offer the deepest discounts of 50-70% off. Valentine's Day and end-of-season clearances also offer excellent deals on handbags and accessories.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>How do I get Michael Kors promo codes?</h3>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>Sign up for MK emails for 15% off your first order. WhileUShop.com posts verified MK promo codes regularly — bookmark us for the latest deals!</p>
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

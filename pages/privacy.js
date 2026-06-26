import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';

const SITE_URL = "https://www.whileushop.com";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — WhileUShop.com</title>
        <meta name="description" content="Read the Privacy Policy of WhileUShop.com. Learn how we collect, use and protect your information when you visit our Amazon deals website." />
        <meta name="keywords" content="WhileUShop privacy policy, deals site privacy, data protection, amazon affiliate privacy" />
        <meta property="og:title" content="Privacy Policy — WhileUShop.com" />
        <meta property="og:description" content="Read the Privacy Policy of WhileUShop.com — your trusted Amazon deals website." />
        <meta property="og:url" content={`${SITE_URL}/privacy`} />
        <meta property="og:image" content={`${SITE_URL}/icon-512.png`} />
        <link rel="canonical" href={`${SITE_URL}/privacy`} />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <Header search="" onSearch={() => {}} totalCount={0} />

      <main className="static-page">
        <div className="static-container">
          <div className="static-hero">
            <h1>Privacy <span>Policy</span></h1>
            <p>Last updated: June 2025</p>
          </div>

          <div className="static-content">
            <div className="static-card">
              <h2>1. Introduction</h2>
              <p>Welcome to <strong>WhileUShop.com</strong>. We respect your privacy and are committed to protecting any personal information you share with us. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data.</p>
              <p>By using our website, you agree to the terms of this Privacy Policy.</p>
            </div>

            <div className="static-card">
              <h2>2. Information We Collect</h2>
              <p>WhileUShop.com is primarily a deals listing website. We do <strong>not</strong> require you to create an account or submit any personal information to browse deals.</p>
              <p>However, we may collect the following non-personal information automatically:</p>
              <ul className="static-list">
                <li>Browser type and version</li>
                <li>Pages visited and time spent on each page</li>
                <li>Referring website or link</li>
                <li>Device type (mobile, desktop, tablet)</li>
                <li>General geographic location (country/region level only)</li>
              </ul>
            </div>

            <div className="static-card">
              <h2>3. Cookies</h2>
              <p>Our website may use cookies — small text files stored on your device — to improve your browsing experience. These cookies do not identify you personally.</p>
              <ul className="static-list">
                <li><strong>Analytics cookies</strong> — To understand how visitors use our site</li>
                <li><strong>Preference cookies</strong> — To remember your settings</li>
              </ul>
              <p>You can disable cookies through your browser settings at any time.</p>
            </div>

            <div className="static-card">
              <h2>4. Affiliate Links & Third-Party Sites</h2>
              <p>WhileUShop.com contains affiliate links to Amazon and other third-party websites. When you click these links and make a purchase, we may earn a small commission at no extra cost to you.</p>
              <p>We are a participant in the <strong>Amazon Associates Program</strong>, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.</p>
            </div>

            <div className="static-card">
              <h2>5. How We Use Information</h2>
              <p>Any information we collect is used solely for:</p>
              <ul className="static-list">
                <li>Improving our website's performance and content</li>
                <li>Understanding our audience to show more relevant deals</li>
                <li>Analyzing traffic patterns to improve user experience</li>
              </ul>
              <p>We <strong>never</strong> sell, rent, or trade your information to third parties.</p>
            </div>

            <div className="static-card">
              <h2>6. Children's Privacy</h2>
              <p>WhileUShop.com is not directed at children under the age of 13. We do not knowingly collect personal information from children.</p>
            </div>

            <div className="static-card">
              <h2>7. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
            </div>

            <div className="static-card">
              <h2>8. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <a href="mailto:privacy@whileushop.com" className="contact-link">privacy@whileushop.com</a>
              <p style={{marginTop: '12px'}}>Or visit our <Link href="/contact" className="inline-link">Contact Us</Link> page.</p>
            </div>
          </div>

          <div className="static-back">
            <Link href="/" className="back-btn">← Back to Deals</Link>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>As an Amazon Associate, we earn from qualifying purchases.</p>
        <p>© {new Date().getFullYear()} <a href={SITE_URL}>WhileUShop.com</a> — All rights reserved.</p>
      </footer>
    </>
  );
}

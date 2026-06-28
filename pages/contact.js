import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';

const SITE_URL = "https://www.whileushop.com";

export default function Contact() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact WhileUShop.com',
    url: `${SITE_URL}/contact`,
    description: 'Contact WhileUShop.com for deal submissions, business collaborations, or general queries.',
    publisher: { '@type': 'Organization', name: 'WhileUShop.com', url: SITE_URL },
  };

  return (
    <>
      <Head>
        <title>Contact Us — WhileUShop.com | Get in Touch</title>
        <meta name="description" content="Contact WhileUShop.com for deal submissions, business collaborations, or general queries. Reach us at hello@whileushop.com. We'd love to hear from you!" />
        <meta name="keywords" content="contact WhileUShop, deal submission, business collaboration, online deals contact, coupon codes support, promo codes help" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="WhileUShop.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Us — WhileUShop.com" />
        <meta property="og:description" content="Get in touch with WhileUShop.com for queries, collaborations and deal submissions." />
        <meta property="og:url" content={`${SITE_URL}/contact`} />
        <meta property="og:image" content={`${SITE_URL}/icon-512.png`} />
        <meta property="og:site_name" content="WhileUShop.com" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact Us — WhileUShop.com" />
        <meta name="twitter:description" content="Get in touch with WhileUShop.com for queries, collaborations and deal submissions." />
        <link rel="canonical" href={`${SITE_URL}/contact`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <Header search="" onSearch={() => {}} totalCount={0} />

      <main className="static-page">
        <div className="static-container">
          <div className="static-hero">
            <h1>Contact <span>Us</span></h1>
            <p>Have a question, suggestion, or want to collaborate? We'd love to hear from you!</p>
          </div>

          <div className="static-content">
            <div className="static-card">
              <div className="static-icon">📧</div>
              <h2>Email Us</h2>
              <p>For any queries, deal submissions, collaborations or feedback, reach out to us at:</p>
              <a href="mailto:hello@whileushop.com" className="contact-link">hello@whileushop.com</a>
              <p style={{marginTop: '12px', fontSize: '13px', color: '#888'}}>We typically respond within 24–48 hours on business days.</p>
            </div>

            <div className="static-card">
              <div className="static-icon">💬</div>
              <h2>Join Our Community</h2>
              <p>The fastest way to reach us and get deal updates is through our social channels:</p>
              <div className="contact-channels">
                <a href="https://t.me/whileushop" target="_blank" rel="noopener noreferrer" className="channel-btn telegram">📱 Telegram Channel</a>
                <a href="https://chat.whatsapp.com/Ei6fHrUYhyx5GZTHBF5IFF" target="_blank" rel="noopener noreferrer" className="channel-btn whatsapp">💬 WhatsApp Channel</a>
                <a href="https://www.facebook.com/whileushop786" target="_blank" rel="noopener noreferrer" className="channel-btn facebook">📘 Facebook Page</a>
                <a href="https://instagram.com/crazydealshunter" target="_blank" rel="noopener noreferrer" className="channel-btn instagram">📸 Instagram</a>
                <a href="https://www.youtube.com/@SnagItUSA" target="_blank" rel="noopener noreferrer" className="channel-btn youtube">▶️ YouTube</a>
              </div>
            </div>

            <div className="static-card">
              <div className="static-icon">🤝</div>
              <h2>Business & Collaborations</h2>
              <p>Are you a brand, seller, or PR agency looking to feature your products on WhileUShop.com? We're open to collaborations!</p>
              <p>Please email us at <a href="mailto:business@whileushop.com" className="inline-link">business@whileushop.com</a> with details about your product and collaboration idea.</p>
            </div>

            <div className="static-card">
              <div className="static-icon">🐛</div>
              <h2>Report a Deal or Issue</h2>
              <p>Found a broken link, expired deal, or incorrect price? Please let us know! Email us at <a href="mailto:support@whileushop.com" className="inline-link">support@whileushop.com</a> with the deal title and the issue you found.</p>
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

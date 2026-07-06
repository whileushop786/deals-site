import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import FooterSubscribe from '../components/FooterSubscribe';
import { supabase } from '../lib/supabase';

const SITE_URL = "https://www.whileushop.com";

// Force download via Cloudinary fl_attachment flag
function getDownloadUrl(url) {
  if (!url) return '#';
  if (url.includes('cloudinary.com')) {
    // Insert fl_attachment into the URL
    return url.replace('/upload/', '/upload/fl_attachment/');
  }
  return url;
}

export default function FreebiesLibrary({ resources }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Freebies Library — Free Saving & Coupon Guides',
    url: `${SITE_URL}/freebies-library`,
    description: 'Download free saving guides, coupon checklists and budgeting templates — completely free digital resources from WhileUShop.com.',
    publisher: { '@type': 'Organization', name: 'WhileUShop.com', url: SITE_URL },
  };

  const handleDownload = (url, title) => {
    // Open in new tab — works for all file types and cross-origin URLs
    window.open(getDownloadUrl(url), '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Head>
        <title>Freebies Library — Free Saving Guides & Coupon Resources | WhileUShop.com</title>
        <meta name="description" content="Download free saving guides, coupon checklists, budgeting templates and money-saving resources — completely free at WhileUShop.com." />
        <meta name="keywords" content="free saving guides, free coupon templates, free budgeting printables, money saving resources, free downloads, savings checklist, WhileUShop freebies library" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Freebies Library — Free Saving Guides & Resources" />
        <meta property="og:description" content="Download free saving guides and coupon resources — completely free at WhileUShop.com." />
        <meta property="og:url" content={`${SITE_URL}/freebies-library`} />
        <meta property="og:image" content={`${SITE_URL}/icon-512.png`} />
        <meta property="og:site_name" content="WhileUShop.com" />
        <link rel="canonical" href={`${SITE_URL}/freebies-library`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <Header search="" onSearch={() => {}} totalCount={0} />

      <main className="static-page">
        <div className="static-container">
          <div className="static-hero">
            <h1>📚 Freebies <span>Library</span></h1>
            <p>Free saving guides, coupon checklists & money-saving resources — yours to download, completely free.</p>
          </div>

          {(!resources || resources.length === 0) ? (
            <div className="empty-state" style={{ padding: '40px 20px' }}>
              <div className="empty-icon">📦</div>
              <h3>New resources coming soon!</h3>
              <p>We're preparing free guides and printables for you. Check back soon.</p>
            </div>
          ) : (
            <div className="library-grid">
              {resources.map((item) => (
                <div key={item.id} className="library-card">
                  <div className="library-card-icon">{item.icon || '📄'}</div>
                  <h3 className="library-card-title">{item.title}</h3>
                  {item.description && (
                    <div
                      className="library-card-desc"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  )}
                  <button
                    onClick={() => handleDownload(item.file_url, item.title)}
                    className="library-download-btn"
                    style={{ border: 'none', cursor: 'pointer', width: '100%' }}
                  >
                    ⬇ Download Free
                  </button>
                </div>
              ))}
            </div>
          )}

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

export async function getStaticProps() {
  const { data, error } = await supabase
    .from('freebies_library')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false });

  return {
    props: { resources: error ? [] : (data || []) },
    revalidate: 60,
  };
}

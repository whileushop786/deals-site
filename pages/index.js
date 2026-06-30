import { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import { format, parseISO } from 'date-fns';
import { getDeals, getTotalCount } from '../lib/supabase';
import DealCard from '../components/DealCard';
import { SkeletonGrid } from '../components/SkeletonCard';
import Header from '../components/Header';
import FooterSubscribe from '../components/FooterSubscribe';
import EmailPopup from '../components/EmailPopup';
import Ticker from '../components/Ticker';
import AdBanner from '../components/AdBanner';

const SITE_NAME = "WhileUShop.com — Best Online Deals, Coupons & Promo Codes";
const SITE_DESC = "Save more with handpicked deals, verified coupon codes, promo offers, and exclusive discounts from top U.S. online stores — updated daily so you never miss a great deal.";
const SITE_KEYWORDS = "best online deals today, coupon codes, promo codes, discount codes, freebies, online shopping deals, verified coupons, exclusive discounts, WhileUShop, deals and coupons, save money online, daily deals";
const SITE_URL = "https://www.whileushop.com";

function groupByDate(deals) {
  const grouped = {};
  deals.forEach((deal) => {
    const date = deal.deal_date;
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(deal);
  });
  return grouped;
}

export default function Home() {
  const [deals, setDeals] = useState([]);
  const [groupedDeals, setGroupedDeals] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  const loaderRef = useRef(null);
  const searchTimer = useRef(null);

  const fetchInitial = useCallback(async (q) => {
    setLoading(true);
    setDeals([]);
    setGroupedDeals({});
    setPage(0);
    setHasMore(true);
    const [result, total] = await Promise.all([getDeals(q, 0), getTotalCount()]);
    setDeals(result.deals);
    setGroupedDeals(groupByDate(result.deals));
    setHasMore(result.hasMore);
    setTotalCount(total);
    setPage(1);
    setLoading(false);
  }, []);

  const fetchMore = useCallback(async (q, currentPage) => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const result = await getDeals(q, currentPage);
    setDeals((prev) => {
      const merged = [...prev, ...result.deals];
      setGroupedDeals(groupByDate(merged));
      return merged;
    });
    setHasMore(result.hasMore);
    setPage(currentPage + 1);
    setLoadingMore(false);
  }, [loadingMore, hasMore]);

  useEffect(() => { fetchInitial(''); }, [fetchInitial]);

  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => { fetchInitial(query); }, 400);
    return () => clearTimeout(searchTimer.current);
  }, [query, fetchInitial]);

  useEffect(() => {
    // Auto-load only the FIRST extra batch via scroll.
    // After that, require manual "Load More" click.
    if (page > 1) return; // only observe before first manual load

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          fetchMore(query, page);
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, loading, page, query, fetchMore]);

  const handleLoadMoreClick = () => {
    fetchMore(query, page);
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    setQuery(val);
  };

  const sortedDates = Object.keys(groupedDeals).sort((a, b) => new Date(b) - new Date(a));

  const formatDateHeading = (dateStr) => {
    try {
      const d = parseISO(dateStr);
      const day = format(d, 'd');
      const month = format(d, 'MMMM');
      const year = format(d, 'yyyy');
      const currentYear = new Date().getFullYear();
      return { day, month, year: String(year) !== String(currentYear) ? year : null };
    } catch {
      return { day: dateStr, month: '', year: null };
    }
  };

  // JSON-LD for homepage — WebSite + SearchAction (enables Google Sitelinks Search)
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WhileUShop.com',
    url: SITE_URL,
    description: SITE_DESC,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // JSON-LD Organization schema
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WhileUShop.com',
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    sameAs: [
      'https://t.me/whileushop',
      'https://www.facebook.com/whileushop786',
      'https://instagram.com/crazydealshunter',
      'https://www.youtube.com/@SnagItUSA',
    ],
  };

  return (
    <>
      <Head>
        <title>{SITE_NAME}</title>
        <meta name="description" content={SITE_DESC} />
        <meta name="keywords" content={SITE_KEYWORDS} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="WhileUShop.com" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={SITE_NAME} />
        <meta property="og:description" content={SITE_DESC} />
        <meta property="og:image" content={`${SITE_URL}/icon-512.png`} />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:alt" content="WhileUShop.com — Best Online Deals" />
        <meta property="og:site_name" content="WhileUShop.com" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={SITE_URL} />
        <meta name="twitter:title" content={SITE_NAME} />
        <meta name="twitter:description" content={SITE_DESC} />
        <meta name="twitter:image" content={`${SITE_URL}/icon-512.png`} />
        <meta name="twitter:image:alt" content="WhileUShop.com" />

        <link rel="canonical" href={SITE_URL} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </Head>

      <Header search={search} onSearch={handleSearch} totalCount={totalCount} />
      <EmailPopup />

      <section className="hero">
        <h1>Best Online Deals, Coupons &amp; Promo Codes</h1>
        <p className="hero-sub">Save more with handpicked deals, verified coupon codes, promo offers, and exclusive discounts from top U.S. online stores — updated daily so you never miss a great deal.</p>
      </section>

      <Ticker />

      <main className="container" style={{ paddingTop: 8, paddingBottom: 40 }}>
        {loading ? (
          <div style={{ marginTop: 32 }}><SkeletonGrid /></div>
        ) : sortedDates.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛍️</div>
            <h3>No deals found</h3>
            <p>{query ? `No results for "${query}". Try a different search.` : 'Check back soon — new deals are added daily!'}</p>
          </div>
        ) : (
          <>
            {sortedDates.map((date) => {
              const dayDeals = groupedDeals[date];
              const { day, month, year } = formatDateHeading(date);
              return (
                <section key={date} className="date-section">
                  <div className="date-header">
                    <h2 className="date-label">
                      <span>{month} {day}</span>{year ? ` ${year}` : ''}
                    </h2>
                    <div className="date-line" />
                    <span className="date-count">{dayDeals.length} deal{dayDeals.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="deals-grid">
                    {dayDeals.map((deal) => (
                      <DealCard key={deal.id} deal={deal} />
                    ))}
                  </div>
                </section>
              );
            })}
            <div ref={loaderRef} style={{ marginTop: 16 }}>
              {loadingMore && (
                <div className="load-more-indicator">
                  <div className="load-more-spinner" />
                  <span>Loading more deals...</span>
                </div>
              )}
              {!loadingMore && hasMore && page > 1 && (
                <div className="load-more-btn-wrap">
                  <button className="load-more-btn" onClick={handleLoadMoreClick}>
                    Load More Deals ↓
                  </button>
                </div>
              )}
              {!hasMore && deals.length > 0 && (
                <div className="all-loaded">🎉 You have seen all {totalCount} deals!</div>
              )}
            </div>
          </>
        )}
      </main>

      <FooterSubscribe />

      <footer className="footer">
        <p>As an Amazon Associate, we earn from qualifying purchases. Prices and availability are subject to change.</p>
        <p>© {new Date().getFullYear()} <a href={SITE_URL}>WhileUShop.com</a> — All rights reserved.</p>
      </footer>

      <AdBanner />
    </>
  );
}

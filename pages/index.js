import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { format, parseISO } from 'date-fns';
import { getDeals } from '../lib/supabase';
import DealCard from '../components/DealCard';
import { SkeletonGrid } from '../components/SkeletonCard';

const SITE_NAME = "Today's Best Deals";
const SITE_TAGLINE = "Fresh Amazon deals, coupon codes & discounts — updated daily.";

export default function Home() {
  const [groupedDeals, setGroupedDeals] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  const fetchDeals = useCallback(async (q) => {
    setLoading(true);
    const data = await getDeals(q);
    setGroupedDeals(data);
    const count = Object.values(data).reduce((acc, arr) => acc + arr.length, 0);
    setTotalCount(count);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDeals('');
  }, [fetchDeals]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDeals(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query, fetchDeals]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    setQuery(val);
  };

  const sortedDates = Object.keys(groupedDeals).sort((a, b) =>
    new Date(b) - new Date(a)
  );

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

  return (
    <>
      <Head>
        <title>{SITE_NAME}</title>
        <meta name="description" content={SITE_TAGLINE} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Open Graph */}
        <meta property="og:title" content={SITE_NAME} />
        <meta property="og:description" content={SITE_TAGLINE} />
        <meta property="og:type" content="website" />
      </Head>

      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon">🔥</div>
            <span className="logo-text">Hot<span>Deals</span></span>
          </div>

          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search deals..."
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div className="deal-count-badge">
            <strong>{totalCount}</strong> active deals
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-eyebrow">
          🔥 Updated Daily
        </div>
        <h1>
          Best Amazon<br />
          <em>Deals Today</em>
        </h1>
        <p className="hero-sub">{SITE_TAGLINE}</p>
      </section>

      {/* Deals */}
      <main className="container" style={{ paddingTop: 8, paddingBottom: 40 }}>
        {loading ? (
          <div style={{ marginTop: 32 }}>
            <SkeletonGrid />
          </div>
        ) : sortedDates.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛍️</div>
            <h3>No deals found</h3>
            <p>
              {query
                ? `No results for "${query}". Try a different search.`
                : 'Check back soon — new deals are added daily!'}
            </p>
          </div>
        ) : (
          sortedDates.map((date) => {
            const deals = groupedDeals[date];
            const { day, month, year } = formatDateHeading(date);
            return (
              <section key={date} className="date-section">
                <div className="date-header">
                  <h2 className="date-label">
                    <span>{month} {day}</span>{year ? ` ${year}` : ''}
                  </h2>
                  <div className="date-line" />
                  <span className="date-count">{deals.length} deal{deals.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="deals-grid">
                  {deals.map((deal) => (
                    <DealCard key={deal.id} deal={deal} />
                  ))}
                </div>
              </section>
            );
          })
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>
          As an Amazon Associate, we earn from qualifying purchases.
          Prices and availability are subject to change.
        </p>
        <p>
          © {new Date().getFullYear()} HotDeals. All rights reserved.
        </p>
      </footer>
    </>
  );
}

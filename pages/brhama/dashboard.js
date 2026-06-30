import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSession, signOut, onAuthChange } from '../../lib/auth';
import { supabase } from '../../lib/supabase';
import DealForm from '../../components/admin/DealForm';
import LibraryForm from '../../components/admin/LibraryForm';

export default function AdminDashboard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [activeTab, setActiveTab] = useState('deals'); // deals | library

  /* ── Deals state ── */
  const [deals, setDeals] = useState([]);
  const [loadingDeals, setLoadingDeals] = useState(true);
  const [showDealForm, setShowDealForm] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [dealSearch, setDealSearch] = useState('');
  const [dealFilter, setDealFilter] = useState('all');

  /* ── Library state ── */
  const [library, setLibrary] = useState([]);
  const [loadingLibrary, setLoadingLibrary] = useState(true);
  const [showLibraryForm, setShowLibraryForm] = useState(false);
  const [editingLibraryItem, setEditingLibraryItem] = useState(null);

  // Auth check
  useEffect(() => {
    getSession().then((session) => {
      if (!session) router.push('/brhama');
      else setChecking(false);
    });
    const { data: listener } = onAuthChange((session) => {
      if (!session) router.push('/brhama');
    });
    return () => listener.subscription.unsubscribe();
  }, [router]);

  /* ── Fetch deals ── */
  const fetchDeals = useCallback(async () => {
    setLoadingDeals(true);
    const { data, error } = await supabase.from('deals').select('*').order('created_at', { ascending: false });
    if (!error) setDeals(data || []);
    setLoadingDeals(false);
  }, []);

  /* ── Fetch library ── */
  const fetchLibrary = useCallback(async () => {
    setLoadingLibrary(true);
    const { data, error } = await supabase.from('freebies_library').select('*').order('created_at', { ascending: false });
    if (!error) setLibrary(data || []);
    setLoadingLibrary(false);
  }, []);

  useEffect(() => {
    if (!checking) {
      fetchDeals();
      fetchLibrary();
    }
  }, [checking, fetchDeals, fetchLibrary]);

  const handleLogout = async () => {
    await signOut();
    router.push('/brhama');
  };

  /* ── Deal actions ── */
  const handleEditDeal = (deal) => { setEditingDeal(deal); setShowDealForm(true); };
  const handleAddNewDeal = () => { setEditingDeal(null); setShowDealForm(true); };

  const handleDeleteDeal = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from('deals').delete().eq('id', id);
    if (!error) setDeals((prev) => prev.filter((d) => d.id !== id));
    else alert('Failed to delete. Please try again.');
  };

  const handleToggleDealActive = async (id, currentActive) => {
    const { error } = await supabase.from('deals').update({ active: !currentActive }).eq('id', id);
    if (!error) setDeals((prev) => prev.map((d) => d.id === id ? { ...d, active: !currentActive } : d));
  };

  const handleDealFormSaved = () => {
    setShowDealForm(false);
    setEditingDeal(null);
    fetchDeals();
  };

  /* ── Library actions ── */
  const handleEditLibraryItem = (item) => { setEditingLibraryItem(item); setShowLibraryForm(true); };
  const handleAddNewLibraryItem = () => { setEditingLibraryItem(null); setShowLibraryForm(true); };

  const handleDeleteLibraryItem = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from('freebies_library').delete().eq('id', id);
    if (!error) setLibrary((prev) => prev.filter((d) => d.id !== id));
    else alert('Failed to delete. Please try again.');
  };

  const handleToggleLibraryActive = async (id, currentActive) => {
    const { error } = await supabase.from('freebies_library').update({ active: !currentActive }).eq('id', id);
    if (!error) setLibrary((prev) => prev.map((d) => d.id === id ? { ...d, active: !currentActive } : d));
  };

  const handleLibraryFormSaved = () => {
    setShowLibraryForm(false);
    setEditingLibraryItem(null);
    fetchLibrary();
  };

  /* ── Filtered deals ── */
  const filteredDeals = deals.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(dealSearch.toLowerCase());
    const matchesFilter = dealFilter === 'all' || (dealFilter === 'active' && d.active) || (dealFilter === 'inactive' && !d.active);
    return matchesSearch && matchesFilter;
  });

  if (checking) return <div className="admin-loading">Checking access...</div>;

  return (
    <>
      <Head>
        <title>Admin Dashboard — WhileUShop.com</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="admin-wrap">
        {/* Top bar */}
        <header className="admin-header">
          <div className="admin-header-left">
            <img src="/logo.png" alt="WhileUShop" className="admin-header-logo" />
            <span className="admin-header-title">Admin Dashboard</span>
          </div>
          <button onClick={handleLogout} className="admin-logout-btn">Logout</button>
        </header>

        {/* Tabs */}
        <div className="admin-tabs">
          <button
            className={`admin-tab-btn ${activeTab === 'deals' ? 'active' : ''}`}
            onClick={() => setActiveTab('deals')}
          >
            🛍️ Deals
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'library' ? 'active' : ''}`}
            onClick={() => setActiveTab('library')}
          >
            📚 Freebies Library
          </button>
        </div>

        <main className="admin-main">

          {/* ═══════════ DEALS TAB ═══════════ */}
          {activeTab === 'deals' && (
            <>
              <div className="admin-stats">
                <div className="admin-stat-card">
                  <div className="admin-stat-num">{deals.length}</div>
                  <div className="admin-stat-label">Total Deals</div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-num" style={{color:'#22c55e'}}>{deals.filter(d => d.active).length}</div>
                  <div className="admin-stat-label">Active</div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-num" style={{color:'#999'}}>{deals.filter(d => !d.active).length}</div>
                  <div className="admin-stat-label">Inactive</div>
                </div>
              </div>

              <div className="admin-toolbar">
                <input
                  type="text"
                  placeholder="Search deals..."
                  value={dealSearch}
                  onChange={(e) => setDealSearch(e.target.value)}
                  className="admin-search-input"
                />
                <div className="admin-filter-group">
                  <button className={`admin-filter-btn ${dealFilter==='all'?'active':''}`} onClick={() => setDealFilter('all')}>All</button>
                  <button className={`admin-filter-btn ${dealFilter==='active'?'active':''}`} onClick={() => setDealFilter('active')}>Active</button>
                  <button className={`admin-filter-btn ${dealFilter==='inactive'?'active':''}`} onClick={() => setDealFilter('inactive')}>Inactive</button>
                </div>
                <button className="admin-btn-primary admin-add-btn" onClick={handleAddNewDeal}>
                  + Add New Deal
                </button>
              </div>

              {loadingDeals ? (
                <div className="admin-loading">Loading deals...</div>
              ) : filteredDeals.length === 0 ? (
                <div className="admin-empty">No deals found.</div>
              ) : (
                <div className="admin-deals-grid">
                  {filteredDeals.map((deal) => (
                    <div key={deal.id} className={`admin-deal-card ${!deal.active ? 'inactive' : ''}`}>
                      <div className="admin-deal-img">
                        <img src={deal.image_url || '/icon-512.png'} alt={deal.title} />
                        {!deal.active && <div className="admin-inactive-badge">Hidden</div>}
                      </div>
                      <div className="admin-deal-body">
                        <p className="admin-deal-title">{deal.title}</p>
                        <div className="admin-deal-meta">
                          <span className="admin-deal-price">${Number(deal.sale_price).toFixed(2)}</span>
                          {deal.original_price && (
                            <span className="admin-deal-orig">${Number(deal.original_price).toFixed(2)}</span>
                          )}
                          <span className="admin-deal-platform">{deal.platform}</span>
                        </div>
                        <div className="admin-deal-actions">
                          <button className="admin-action-btn edit" onClick={() => handleEditDeal(deal)}>Edit</button>
                          <button className="admin-action-btn toggle" onClick={() => handleToggleDealActive(deal.id, deal.active)}>
                            {deal.active ? 'Hide' : 'Show'}
                          </button>
                          <button className="admin-action-btn delete" onClick={() => handleDeleteDeal(deal.id, deal.title)}>Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ═══════════ FREEBIES LIBRARY TAB ═══════════ */}
          {activeTab === 'library' && (
            <>
              <div className="admin-stats">
                <div className="admin-stat-card">
                  <div className="admin-stat-num">{library.length}</div>
                  <div className="admin-stat-label">Total Freebies</div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-num" style={{color:'#22c55e'}}>{library.filter(d => d.active).length}</div>
                  <div className="admin-stat-label">Active</div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-num" style={{color:'#999'}}>{library.filter(d => !d.active).length}</div>
                  <div className="admin-stat-label">Inactive</div>
                </div>
              </div>

              <div className="admin-toolbar">
                <div style={{ flex: 1 }} />
                <button className="admin-btn-primary admin-add-btn" onClick={handleAddNewLibraryItem}>
                  + Add New Freebie
                </button>
              </div>

              {loadingLibrary ? (
                <div className="admin-loading">Loading freebies...</div>
              ) : library.length === 0 ? (
                <div className="admin-empty">No freebies yet. Click "Add New Freebie" to create one.</div>
              ) : (
                <div className="admin-library-grid">
                  {library.map((item) => (
                    <div key={item.id} className={`admin-library-card ${!item.active ? 'inactive' : ''}`}>
                      <div className="admin-library-icon">{item.icon}</div>
                      <div className="admin-library-body">
                        <p className="admin-library-title">{item.title}</p>
                        <p className="admin-library-desc">{item.description}</p>
                        {!item.active && <div className="admin-inactive-badge-inline">Hidden</div>}
                        <div className="admin-deal-actions">
                          <button className="admin-action-btn edit" onClick={() => handleEditLibraryItem(item)}>Edit</button>
                          <button className="admin-action-btn toggle" onClick={() => handleToggleLibraryActive(item.id, item.active)}>
                            {item.active ? 'Hide' : 'Show'}
                          </button>
                          <button className="admin-action-btn delete" onClick={() => handleDeleteLibraryItem(item.id, item.title)}>Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

        </main>
      </div>

      {/* Modals */}
      {showDealForm && (
        <DealForm
          deal={editingDeal}
          onClose={() => { setShowDealForm(false); setEditingDeal(null); }}
          onSaved={handleDealFormSaved}
        />
      )}

      {showLibraryForm && (
        <LibraryForm
          item={editingLibraryItem}
          onClose={() => { setShowLibraryForm(false); setEditingLibraryItem(null); }}
          onSaved={handleLibraryFormSaved}
        />
      )}
    </>
  );
}

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSession, signOut, onAuthChange } from '../../lib/auth';
import { supabase } from '../../lib/supabase';
import DealForm from '../../components/admin/DealForm';
import LibraryForm from '../../components/admin/LibraryForm';
import ShopPageForm from '../../components/admin/ShopPageForm';
import ShopDealForm from '../../components/admin/ShopDealForm';

const DEALS_PER_PAGE = 20;

export default function AdminDashboard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [activeTab, setActiveTab] = useState('deals');

  const [deals, setDeals] = useState([]);
  const [loadingDeals, setLoadingDeals] = useState(true);
  const [showDealForm, setShowDealForm] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [dealSearch, setDealSearch] = useState('');
  const [dealFilter, setDealFilter] = useState('all');
  const [dealsPage, setDealsPage] = useState(1);

  const [library, setLibrary] = useState([]);
  const [loadingLibrary, setLoadingLibrary] = useState(true);
  const [showLibraryForm, setShowLibraryForm] = useState(false);
  const [editingLibraryItem, setEditingLibraryItem] = useState(null);

  const [shopPages, setShopPages] = useState([]);
  const [loadingShopPages, setLoadingShopPages] = useState(true);
  const [showShopPageForm, setShowShopPageForm] = useState(false);
  const [editingShopPage, setEditingShopPage] = useState(null);

  const [shopDeals, setShopDeals] = useState([]);
  const [loadingShopDeals, setLoadingShopDeals] = useState(true);
  const [showShopDealForm, setShowShopDealForm] = useState(false);
  const [editingShopDeal, setEditingShopDeal] = useState(null);
  const [selectedPageFilter, setSelectedPageFilter] = useState('all');

  useEffect(() => {
    getSession().then((session) => {
      if (!session) router.push('/brhama');
      else setChecking(false);
    });
    const { data: listener } = onAuthChange((session) => { if (!session) router.push('/brhama'); });
    return () => listener.subscription.unsubscribe();
  }, [router]);

  const fetchDeals = useCallback(async () => {
    setLoadingDeals(true);
    const { data } = await supabase.from('deals').select('*').order('created_at', { ascending: false });
    setDeals(data || []); setLoadingDeals(false);
  }, []);

  const fetchLibrary = useCallback(async () => {
    setLoadingLibrary(true);
    const { data } = await supabase.from('freebies_library').select('*').order('created_at', { ascending: false });
    setLibrary(data || []); setLoadingLibrary(false);
  }, []);

  const fetchShopPages = useCallback(async () => {
    setLoadingShopPages(true);
    const { data } = await supabase.from('shop_pages').select('*').order('created_at', { ascending: true });
    setShopPages(data || []); setLoadingShopPages(false);
  }, []);

  const fetchShopDeals = useCallback(async () => {
    setLoadingShopDeals(true);
    const { data } = await supabase.from('shop_deals').select('*, shop_pages(page_name, icon)').order('created_at', { ascending: false });
    setShopDeals(data || []); setLoadingShopDeals(false);
  }, []);

  useEffect(() => {
    if (!checking) { fetchDeals(); fetchLibrary(); fetchShopPages(); fetchShopDeals(); }
  }, [checking, fetchDeals, fetchLibrary, fetchShopPages, fetchShopDeals]);

  // Reset page when search/filter changes
  useEffect(() => { setDealsPage(1); }, [dealSearch, dealFilter]);

  const handleLogout = async () => { await signOut(); router.push('/brhama'); };

  const toggleActive = async (table, id, current, setter) => {
    const { error } = await supabase.from(table).update({ active: !current }).eq('id', id);
    if (!error) setter((prev) => prev.map((d) => d.id === id ? { ...d, active: !current } : d));
  };

  const deleteItem = async (table, id, title, setter) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) setter((prev) => prev.filter((d) => d.id !== id));
    else alert('Failed to delete.');
  };

  const allFilteredDeals = deals.filter((d) => {
    const matchSearch = d.title.toLowerCase().includes(dealSearch.toLowerCase());
    const matchFilter = dealFilter === 'all' || (dealFilter === 'active' && d.active) || (dealFilter === 'inactive' && !d.active);
    return matchSearch && matchFilter;
  });
  const filteredDeals = allFilteredDeals.slice(0, dealsPage * DEALS_PER_PAGE);
  const hasMoreDeals = filteredDeals.length < allFilteredDeals.length;

  const filteredShopDeals = shopDeals.filter((d) => selectedPageFilter === 'all' || String(d.page_id) === String(selectedPageFilter));

  if (checking) return <div className="admin-loading">Checking access...</div>;

  return (
    <>
      <Head>
        <title>Admin Dashboard — WhileUShop.com</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="admin-wrap">
        <header className="admin-header">
          <div className="admin-header-left">
            <img src="/logo.png" alt="WhileUShop" className="admin-header-logo" />
            <span className="admin-header-title">Admin Dashboard</span>
          </div>
          <button onClick={handleLogout} className="admin-logout-btn">Logout</button>
        </header>

        <div className="admin-tabs">
          <button className={`admin-tab-btn ${activeTab==='deals'?'active':''}`} onClick={() => setActiveTab('deals')}>🛍️ Deals</button>
          <button className={`admin-tab-btn ${activeTab==='shop-pages'?'active':''}`} onClick={() => setActiveTab('shop-pages')}>📄 Shop Pages</button>
          <button className={`admin-tab-btn ${activeTab==='shop-deals'?'active':''}`} onClick={() => setActiveTab('shop-deals')}>🏷️ Shop Deals</button>
          <button className={`admin-tab-btn ${activeTab==='library'?'active':''}`} onClick={() => setActiveTab('library')}>📚 Freebies Library</button>
        </div>

        <main className="admin-main">

          {/* DEALS TAB */}
          {activeTab === 'deals' && (
            <>
              <div className="admin-stats">
                <div className="admin-stat-card"><div className="admin-stat-num">{deals.length}</div><div className="admin-stat-label">Total Deals</div></div>
                <div className="admin-stat-card"><div className="admin-stat-num" style={{color:'#22c55e'}}>{deals.filter(d=>d.active).length}</div><div className="admin-stat-label">Active</div></div>
                <div className="admin-stat-card"><div className="admin-stat-num" style={{color:'#999'}}>{deals.filter(d=>!d.active).length}</div><div className="admin-stat-label">Inactive</div></div>
              </div>
              <div className="admin-toolbar">
                <input type="text" placeholder="Search deals..." value={dealSearch} onChange={(e) => setDealSearch(e.target.value)} className="admin-search-input" />
                <div className="admin-filter-group">
                  <button className={`admin-filter-btn ${dealFilter==='all'?'active':''}`} onClick={() => setDealFilter('all')}>All</button>
                  <button className={`admin-filter-btn ${dealFilter==='active'?'active':''}`} onClick={() => setDealFilter('active')}>Active</button>
                  <button className={`admin-filter-btn ${dealFilter==='inactive'?'active':''}`} onClick={() => setDealFilter('inactive')}>Inactive</button>
                </div>
                <button className="admin-btn-primary admin-add-btn" onClick={() => { setEditingDeal(null); setShowDealForm(true); }}>+ Add New Deal</button>
              </div>
              {loadingDeals ? <div className="admin-loading">Loading...</div> : filteredDeals.length === 0 ? <div className="admin-empty">No deals found.</div> : (
                <>
                  <div className="admin-deals-grid">
                    {filteredDeals.map((deal) => (
                      <div key={deal.id} className={`admin-deal-card ${!deal.active?'inactive':''}`}>
                        <div className="admin-deal-img">
                          <img src={deal.image_url || '/icon-512.png'} alt={deal.title} />
                          {!deal.active && <div className="admin-inactive-badge">Hidden</div>}
                        </div>
                        <div className="admin-deal-body">
                          <p className="admin-deal-title">{deal.title}</p>
                          <div className="admin-deal-meta">
                            <span className="admin-deal-price">${Number(deal.sale_price).toFixed(2)}</span>
                            {deal.original_price && <span className="admin-deal-orig">${Number(deal.original_price).toFixed(2)}</span>}
                            <span className="admin-deal-platform">{deal.platform}</span>
                          </div>
                          <div className="admin-deal-actions">
                            <button className="admin-action-btn edit" onClick={() => { setEditingDeal(deal); setShowDealForm(true); }}>Edit</button>
                            <button className="admin-action-btn toggle" onClick={() => toggleActive('deals', deal.id, deal.active, setDeals)}>{deal.active?'Hide':'Show'}</button>
                            <button className="admin-action-btn delete" onClick={() => deleteItem('deals', deal.id, deal.title, setDeals)}>Delete</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {hasMoreDeals && (
                    <div className="admin-load-more-wrap">
                      <button className="admin-load-more-btn" onClick={() => setDealsPage((p) => p + 1)}>
                        Load More Deals ({allFilteredDeals.length - filteredDeals.length} remaining)
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* SHOP PAGES TAB */}
          {activeTab === 'shop-pages' && (
            <>
              <div className="admin-stats">
                <div className="admin-stat-card"><div className="admin-stat-num">{shopPages.length}</div><div className="admin-stat-label">Total Pages</div></div>
                <div className="admin-stat-card"><div className="admin-stat-num" style={{color:'#22c55e'}}>{shopPages.filter(d=>d.active).length}</div><div className="admin-stat-label">Active</div></div>
                <div className="admin-stat-card"><div className="admin-stat-num" style={{color:'#999'}}>{shopPages.filter(d=>!d.active).length}</div><div className="admin-stat-label">Inactive</div></div>
              </div>
              <div className="admin-toolbar">
                <div style={{flex:1}} />
                <button className="admin-btn-primary admin-add-btn" onClick={() => { setEditingShopPage(null); setShowShopPageForm(true); }}>+ Add New Page</button>
              </div>
              {loadingShopPages ? <div className="admin-loading">Loading...</div> : shopPages.length === 0 ? <div className="admin-empty">No pages yet.</div> : (
                <div className="admin-library-grid">
                  {shopPages.map((page) => (
                    <div key={page.id} className={`admin-library-card ${!page.active?'inactive':''}`}>
                      <div className="admin-library-icon">{page.icon}</div>
                      <div className="admin-library-body">
                        <p className="admin-library-title">{page.page_name}</p>
                        <p className="admin-library-desc">/shop/{page.slug}</p>
                        <p className="admin-library-desc">{page.description}</p>
                        {!page.active && <div className="admin-inactive-badge-inline">Hidden</div>}
                        <div className="admin-deal-actions">
                          <button className="admin-action-btn edit" onClick={() => { setEditingShopPage(page); setShowShopPageForm(true); }}>Edit</button>
                          <button className="admin-action-btn toggle" onClick={() => toggleActive('shop_pages', page.id, page.active, setShopPages)}>{page.active?'Hide':'Show'}</button>
                          <button className="admin-action-btn delete" onClick={() => deleteItem('shop_pages', page.id, page.page_name, setShopPages)}>Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* SHOP DEALS TAB */}
          {activeTab === 'shop-deals' && (
            <>
              <div className="admin-stats">
                <div className="admin-stat-card"><div className="admin-stat-num">{shopDeals.length}</div><div className="admin-stat-label">Total Shop Deals</div></div>
                <div className="admin-stat-card"><div className="admin-stat-num" style={{color:'#22c55e'}}>{shopDeals.filter(d=>d.active).length}</div><div className="admin-stat-label">Active</div></div>
                <div className="admin-stat-card"><div className="admin-stat-num" style={{color:'#999'}}>{shopDeals.filter(d=>!d.active).length}</div><div className="admin-stat-label">Inactive</div></div>
              </div>
              <div className="admin-toolbar">
                <select value={selectedPageFilter} onChange={(e) => setSelectedPageFilter(e.target.value)} className="admin-search-input" style={{maxWidth:220}}>
                  <option value="all">All Pages</option>
                  {shopPages.map((p) => <option key={p.id} value={p.id}>{p.icon} {p.page_name}</option>)}
                </select>
                <div style={{flex:1}} />
                <button className="admin-btn-primary admin-add-btn" onClick={() => { setEditingShopDeal(null); setShowShopDealForm(true); }}>+ Add Shop Deal</button>
              </div>
              {loadingShopDeals ? <div className="admin-loading">Loading...</div> : filteredShopDeals.length === 0 ? <div className="admin-empty">No shop deals yet.</div> : (
                <div className="admin-deals-grid">
                  {filteredShopDeals.map((deal) => (
                    <div key={deal.id} className={`admin-deal-card ${!deal.active?'inactive':''}`}>
                      <div className="admin-deal-img">
                        <img src={deal.image_url || '/icon-512.png'} alt={deal.deal_name} />
                        {!deal.active && <div className="admin-inactive-badge">Hidden</div>}
                      </div>
                      <div className="admin-deal-body">
                        <p className="admin-deal-title">{deal.deal_name}</p>
                        <div className="admin-deal-meta">
                          <span className="admin-deal-platform">{deal.shop_pages?.icon} {deal.shop_pages?.page_name}</span>
                        </div>
                        <div className="admin-deal-actions">
                          <button className="admin-action-btn edit" onClick={() => { setEditingShopDeal(deal); setShowShopDealForm(true); }}>Edit</button>
                          <button className="admin-action-btn toggle" onClick={() => toggleActive('shop_deals', deal.id, deal.active, setShopDeals)}>{deal.active?'Hide':'Show'}</button>
                          <button className="admin-action-btn delete" onClick={() => deleteItem('shop_deals', deal.id, deal.deal_name, setShopDeals)}>Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* LIBRARY TAB */}
          {activeTab === 'library' && (
            <>
              <div className="admin-stats">
                <div className="admin-stat-card"><div className="admin-stat-num">{library.length}</div><div className="admin-stat-label">Total Freebies</div></div>
                <div className="admin-stat-card"><div className="admin-stat-num" style={{color:'#22c55e'}}>{library.filter(d=>d.active).length}</div><div className="admin-stat-label">Active</div></div>
                <div className="admin-stat-card"><div className="admin-stat-num" style={{color:'#999'}}>{library.filter(d=>!d.active).length}</div><div className="admin-stat-label">Inactive</div></div>
              </div>
              <div className="admin-toolbar">
                <div style={{flex:1}} />
                <button className="admin-btn-primary admin-add-btn" onClick={() => { setEditingLibraryItem(null); setShowLibraryForm(true); }}>+ Add New Freebie</button>
              </div>
              {loadingLibrary ? <div className="admin-loading">Loading...</div> : library.length === 0 ? <div className="admin-empty">No freebies yet.</div> : (
                <div className="admin-library-grid">
                  {library.map((item) => (
                    <div key={item.id} className={`admin-library-card ${!item.active?'inactive':''}`}>
                      <div className="admin-library-icon">{item.icon}</div>
                      <div className="admin-library-body">
                        <p className="admin-library-title">{item.title}</p>
                        <p className="admin-library-desc">{item.description}</p>
                        {!item.active && <div className="admin-inactive-badge-inline">Hidden</div>}
                        <div className="admin-deal-actions">
                          <button className="admin-action-btn edit" onClick={() => { setEditingLibraryItem(item); setShowLibraryForm(true); }}>Edit</button>
                          <button className="admin-action-btn toggle" onClick={() => toggleActive('freebies_library', item.id, item.active, setLibrary)}>{item.active?'Hide':'Show'}</button>
                          <button className="admin-action-btn delete" onClick={() => deleteItem('freebies_library', item.id, item.title, setLibrary)}>Delete</button>
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

      {showDealForm && <DealForm deal={editingDeal} onClose={() => { setShowDealForm(false); setEditingDeal(null); }} onSaved={() => { setShowDealForm(false); setEditingDeal(null); fetchDeals(); }} />}
      {showLibraryForm && <LibraryForm item={editingLibraryItem} onClose={() => { setShowLibraryForm(false); setEditingLibraryItem(null); }} onSaved={() => { setShowLibraryForm(false); setEditingLibraryItem(null); fetchLibrary(); }} />}
      {showShopPageForm && <ShopPageForm page={editingShopPage} onClose={() => { setShowShopPageForm(false); setEditingShopPage(null); }} onSaved={() => { setShowShopPageForm(false); setEditingShopPage(null); fetchShopPages(); }} />}
      {showShopDealForm && <ShopDealForm deal={editingShopDeal} onClose={() => { setShowShopDealForm(false); setEditingShopDeal(null); }} onSaved={() => { setShowShopDealForm(false); setEditingShopDeal(null); fetchShopDeals(); }} />}
    </>
  );
}

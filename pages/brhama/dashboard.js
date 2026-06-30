import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSession, signOut, onAuthChange } from '../../lib/auth';
import { supabase } from '../../lib/supabase';
import DealForm from '../../components/admin/DealForm';

export default function AdminDashboard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | active | inactive

  // Auth check
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.push('/brhama');
      } else {
        setChecking(false);
      }
    });

    const { data: listener } = onAuthChange((session) => {
      if (!session) router.push('/brhama');
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  const fetchDeals = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('deals')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setDeals(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!checking) fetchDeals();
  }, [checking, fetchDeals]);

  const handleLogout = async () => {
    await signOut();
    router.push('/brhama');
  };

  const handleEdit = (deal) => {
    setEditingDeal(deal);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingDeal(null);
    setShowForm(true);
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from('deals').delete().eq('id', id);
    if (!error) {
      setDeals((prev) => prev.filter((d) => d.id !== id));
    } else {
      alert('Failed to delete. Please try again.');
    }
  };

  const handleToggleActive = async (id, currentActive) => {
    const { error } = await supabase
      .from('deals')
      .update({ active: !currentActive })
      .eq('id', id);
    if (!error) {
      setDeals((prev) => prev.map((d) => d.id === id ? { ...d, active: !currentActive } : d));
    }
  };

  const handleFormSaved = () => {
    setShowForm(false);
    setEditingDeal(null);
    fetchDeals();
  };

  // Filtered list
  const filteredDeals = deals.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || (filter === 'active' && d.active) || (filter === 'inactive' && !d.active);
    return matchesSearch && matchesFilter;
  });

  if (checking) {
    return <div className="admin-loading">Checking access...</div>;
  }

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

        <main className="admin-main">

          {/* Stats */}
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

          {/* Toolbar */}
          <div className="admin-toolbar">
            <input
              type="text"
              placeholder="Search deals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-search-input"
            />
            <div className="admin-filter-group">
              <button className={`admin-filter-btn ${filter==='all'?'active':''}`} onClick={() => setFilter('all')}>All</button>
              <button className={`admin-filter-btn ${filter==='active'?'active':''}`} onClick={() => setFilter('active')}>Active</button>
              <button className={`admin-filter-btn ${filter==='inactive'?'active':''}`} onClick={() => setFilter('inactive')}>Inactive</button>
            </div>
            <button className="admin-btn-primary admin-add-btn" onClick={handleAddNew}>
              + Add New Deal
            </button>
          </div>

          {/* Deal list */}
          {loading ? (
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
                      <button className="admin-action-btn edit" onClick={() => handleEdit(deal)}>Edit</button>
                      <button
                        className="admin-action-btn toggle"
                        onClick={() => handleToggleActive(deal.id, deal.active)}
                      >
                        {deal.active ? 'Hide' : 'Show'}
                      </button>
                      <button className="admin-action-btn delete" onClick={() => handleDelete(deal.id, deal.title)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <DealForm
          deal={editingDeal}
          onClose={() => { setShowForm(false); setEditingDeal(null); }}
          onSaved={handleFormSaved}
        />
      )}
    </>
  );
}

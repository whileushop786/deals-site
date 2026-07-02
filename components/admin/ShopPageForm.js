import { useState } from 'react';
import { supabase } from '../../lib/supabase';

const ICON_OPTIONS = ['🛍️','🛒','🛋️','👜','🎁','💄','🏠','👗','💊','🐾','📱','⌚','🎮','🧸','💪','📚','🌿','✈️','🍕','☕'];

export default function ShopPageForm({ page, onClose, onSaved }) {
  const isEdit = !!page;

  const [form, setForm] = useState({
    page_name: page?.page_name || '',
    slug: page?.slug || '',
    icon: page?.icon || '🛍️',
    description: page?.description || '',
    content: page?.content || '',
    active: page?.active ?? true,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: type === 'checkbox' ? checked : value };
      // Auto-generate slug from page_name
      if (name === 'page_name' && !isEdit) {
        updated.slug = value.toLowerCase().trim()
          .replace(/[\s]+/g, '-')
          .replace(/[^\w-]+/g, '')
          .replace(/--+/g, '-');
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    if (!form.page_name || !form.slug) {
      setError('Page name and slug are required.');
      setSaving(false);
      return;
    }

    const payload = {
      page_name: form.page_name,
      slug: form.slug,
      icon: form.icon,
      description: form.description || null,
      content: form.content || null,
      active: form.active,
    };

    let result;
    if (isEdit) {
      result = await supabase.from('shop_pages').update(payload).eq('id', page.id);
    } else {
      result = await supabase.from('shop_pages').insert([payload]);
    }

    if (result.error) {
      setError(result.error.message || 'Failed to save. Please try again.');
      setSaving(false);
      return;
    }

    onSaved();
  };

  // Simple HTML formatting buttons
  const insertHtml = (before, after = '') => {
    const textarea = document.getElementById('shop-page-content');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = form.content.substring(start, end);
    const newContent = form.content.substring(0, start) + before + selected + after + form.content.substring(end);
    setForm((prev) => ({ ...prev, content: newContent }));
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 0);
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal admin-modal-wide" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2>{isEdit ? 'Edit Page' : 'Add New Page'}</h2>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">

          {/* Icon picker */}
          <div className="admin-form-group">
            <label>Icon</label>
            <div className="admin-icon-picker">
              {ICON_OPTIONS.map((ic) => (
                <button type="button" key={ic}
                  className={`admin-icon-option ${form.icon === ic ? 'selected' : ''}`}
                  onClick={() => setForm((prev) => ({ ...prev, icon: ic }))}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          {/* Page Name + Slug */}
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Page Name *</label>
              <input type="text" name="page_name" value={form.page_name}
                onChange={handleChange} className="admin-input"
                placeholder="Walmart Savings" required />
            </div>
            <div className="admin-form-group">
              <label>Slug (URL) *</label>
              <input type="text" name="slug" value={form.slug}
                onChange={handleChange} className="admin-input"
                placeholder="walmart-savings" required />
              <p className="admin-form-hint">whileushop.com/shop/{form.slug || '...'}</p>
            </div>
          </div>

          {/* Description */}
          <div className="admin-form-group">
            <label>Short Description (shown as subtitle)</label>
            <input type="text" name="description" value={form.description}
              onChange={handleChange} className="admin-input"
              placeholder="Best Walmart deals, rollback prices — updated daily." />
          </div>

          {/* HTML Content Editor */}
          <div className="admin-form-group">
            <label>Page Content (HTML)</label>
            <div className="html-editor-toolbar">
              <button type="button" className="html-tool-btn" onClick={() => insertHtml('<h2>', '</h2>')}>H2</button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtml('<h3>', '</h3>')}>H3</button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtml('<p>', '</p>')}>P</button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtml('<strong>', '</strong>')}><b>B</b></button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtml('<em>', '</em>')}><i>I</i></button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtml('<ul>\n  <li>', '</li>\n</ul>')}>UL</button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtml('<li>', '</li>')}>LI</button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtml('<a href="">', '</a>')}>Link</button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtml('<br />')}>BR</button>
            </div>
            <textarea
              id="shop-page-content"
              name="content"
              value={form.content}
              onChange={handleChange}
              className="admin-input admin-textarea admin-html-editor"
              rows="12"
              placeholder="<h2>Why Shop Here?</h2>&#10;<p>Your page content here...</p>"
            />
            <p className="admin-form-hint">HTML is supported. Use toolbar buttons above to format.</p>
          </div>

          {/* Active */}
          <div className="admin-form-group admin-checkbox-group">
            <label className="admin-checkbox-label">
              <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
              Active (visible in menu & website)
            </label>
          </div>

          {error && <p className="admin-error">{error}</p>}

          <div className="admin-form-actions">
            <button type="button" onClick={onClose} className="admin-btn-secondary">Cancel</button>
            <button type="submit" className="admin-btn-primary" disabled={saving}>
              {saving ? 'Saving...' : isEdit ? 'Update Page' : 'Add Page'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function ShopDealForm({ deal, onClose, onSaved }) {
  const isEdit = !!deal;
  const [pages, setPages] = useState([]);
  const [form, setForm] = useState({
    page_id: deal?.page_id || '',
    deal_name: deal?.deal_name || '',
    image_url: deal?.image_url || '',
    affiliate_link: deal?.affiliate_link || '',
    active: deal?.active ?? true,
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(deal?.image_url || '');

  useEffect(() => {
    supabase.from('shop_pages').select('id, page_name, icon')
      .eq('active', true).order('created_at', { ascending: true })
      .then(({ data }) => setPages(data || []));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      setError('Cloudinary not configured.');
      return;
    }
    setUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );
      const data = await res.json();
      if (data.secure_url) {
        setForm((prev) => ({ ...prev, image_url: data.secure_url }));
        setPreview(data.secure_url);
      } else {
        setError('Image upload failed. Please try again.');
      }
    } catch {
      setError('Image upload failed. Please try again.');
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    if (!form.page_id || !form.deal_name || !form.affiliate_link) {
      setError('Page, Deal Name and Affiliate Link are required.');
      setSaving(false);
      return;
    }

    const payload = {
      page_id: parseInt(form.page_id),
      deal_name: form.deal_name,
      image_url: form.image_url || null,
      affiliate_link: form.affiliate_link,
      active: form.active,
    };

    let result;
    if (isEdit) {
      result = await supabase.from('shop_deals').update(payload).eq('id', deal.id);
    } else {
      result = await supabase.from('shop_deals').insert([payload]);
    }

    if (result.error) {
      setError('Failed to save. Please try again.');
      setSaving(false);
      return;
    }
    onSaved();
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2>{isEdit ? 'Edit Shop Deal' : 'Add New Shop Deal'}</h2>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">

          {/* Page dropdown */}
          <div className="admin-form-group">
            <label>Page *</label>
            <select name="page_id" value={form.page_id} onChange={handleChange} className="admin-input" required>
              <option value="">— Select a page —</option>
              {pages.map((p) => (
                <option key={p.id} value={p.id}>{p.icon} {p.page_name}</option>
              ))}
            </select>
          </div>

          {/* Deal Name */}
          <div className="admin-form-group">
            <label>Deal Name *</label>
            <input type="text" name="deal_name" value={form.deal_name}
              onChange={handleChange} className="admin-input"
              placeholder="70% off on Walmart bedding sets" required />
          </div>

          {/* Image Upload */}
          <div className="admin-form-group">
            <label>Deal Image</label>
            <div className="admin-image-upload">
              {preview && (
                <img src={preview} alt="Preview" className="admin-image-preview" />
              )}
              <label className="admin-upload-btn">
                {uploading ? 'Uploading...' : preview ? 'Change Image' : 'Upload Image'}
                <input type="file" accept="image/*" onChange={handleImageUpload} hidden disabled={uploading} />
              </label>
            </div>
            <p className="admin-form-hint">Or paste image URL directly:</p>
            <input type="text" name="image_url" value={form.image_url}
              onChange={(e) => { handleChange(e); setPreview(e.target.value); }}
              placeholder="https://..." className="admin-input" />
          </div>

          {/* Affiliate Link */}
          <div className="admin-form-group">
            <label>Affiliate Link *</label>
            <input type="text" name="affiliate_link" value={form.affiliate_link}
              onChange={handleChange} className="admin-input"
              placeholder="https://walmart.com/..." required />
          </div>

          {/* Active */}
          <div className="admin-form-group admin-checkbox-group">
            <label className="admin-checkbox-label">
              <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
              Active (visible on page)
            </label>
          </div>

          {error && <p className="admin-error">{error}</p>}

          <div className="admin-form-actions">
            <button type="button" onClick={onClose} className="admin-btn-secondary">Cancel</button>
            <button type="submit" className="admin-btn-primary" disabled={saving || uploading}>
              {saving ? 'Saving...' : isEdit ? 'Update Deal' : 'Add Deal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

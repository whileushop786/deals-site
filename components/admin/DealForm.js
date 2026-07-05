import { useState } from 'react';
import { supabase } from '../../lib/supabase';

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function DealForm({ deal, onClose, onSaved }) {
  const isEdit = !!deal;
  const [form, setForm] = useState({
    title: deal?.title || '',
    image_url: deal?.image_url || '',
    original_price: deal?.original_price || '',
    sale_price: deal?.sale_price || '',
    discount_percent: deal?.discount_percent || '',
    coupon_code: deal?.coupon_code || '',
    affiliate_link: deal?.affiliate_link || '',
    platform: deal?.platform || 'amazon',
    deal_date: deal?.deal_date || new Date().toISOString().split('T')[0],
    description: deal?.description || '',
    active: deal?.active ?? true,
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(deal?.image_url || '');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    const orig = parseFloat(updated.original_price);
    const sale = parseFloat(updated.sale_price);
    if (orig > 0 && sale > 0 && orig > sale) {
      updated.discount_percent = Math.round(((orig - sale) / orig) * 100);
    }
    setForm(updated);
  };

  const insertHtmlDesc = (before, after = '') => {
    const textarea = document.getElementById('deal-description');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = form.description.substring(start, end);
    const newContent = form.description.substring(0, start) + before + selected + after + form.description.substring(end);
    setForm((prev) => ({ ...prev, description: newContent }));
    setTimeout(() => { textarea.focus(); textarea.setSelectionRange(start + before.length, start + before.length + selected.length); }, 0);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) { setError('Cloudinary not configured.'); return; }
    setUploading(true); setError('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: formData });
      const data = await res.json();
      if (data.secure_url) { setForm((prev) => ({ ...prev, image_url: data.secure_url })); setImagePreview(data.secure_url); }
      else setError('Image upload failed.');
    } catch { setError('Image upload failed.'); }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true); setError('');
    if (!form.title || !form.sale_price || !form.affiliate_link) { setError('Title, Sale Price, and Affiliate Link are required.'); setSaving(false); return; }
    const payload = {
      title: form.title, image_url: form.image_url || null,
      original_price: form.original_price ? parseFloat(form.original_price) : null,
      sale_price: parseFloat(form.sale_price),
      discount_percent: form.discount_percent ? parseInt(form.discount_percent) : null,
      coupon_code: form.coupon_code || null, affiliate_link: form.affiliate_link,
      platform: form.platform, deal_date: form.deal_date,
      description: form.description || null, active: form.active,
    };
    const result = isEdit ? await supabase.from('deals').update(payload).eq('id', deal.id) : await supabase.from('deals').insert([payload]);
    if (result.error) { setError('Failed to save. Please try again.'); setSaving(false); return; }
    onSaved();
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2>{isEdit ? 'Edit Deal' : 'Add New Deal'}</h2>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form-group">
            <label>Product Image</label>
            <div className="admin-image-upload">
              {imagePreview && <img src={imagePreview} alt="Preview" className="admin-image-preview" />}
              <label className="admin-upload-btn">
                {uploading ? 'Uploading...' : imagePreview ? 'Change Image' : 'Upload Image'}
                <input type="file" accept="image/*" onChange={handleImageUpload} hidden disabled={uploading} />
              </label>
            </div>
            <p className="admin-form-hint">Or paste an image URL directly below:</p>
            <input type="text" name="image_url" value={form.image_url} onChange={(e) => { handleChange(e); setImagePreview(e.target.value); }} placeholder="https://..." className="admin-input" />
          </div>

          <div className="admin-form-group">
            <label>Product Title *</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} className="admin-input" required />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Original Price</label>
              <input type="number" step="0.01" name="original_price" value={form.original_price} onChange={handlePriceChange} className="admin-input" placeholder="35.99" />
            </div>
            <div className="admin-form-group">
              <label>Sale Price *</label>
              <input type="number" step="0.01" name="sale_price" value={form.sale_price} onChange={handlePriceChange} className="admin-input" placeholder="14.99" required />
            </div>
            <div className="admin-form-group">
              <label>Discount %</label>
              <input type="number" name="discount_percent" value={form.discount_percent} onChange={handleChange} className="admin-input" placeholder="Auto" />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Coupon Code</label>
              <input type="text" name="coupon_code" value={form.coupon_code} onChange={handleChange} className="admin-input" placeholder="Leave blank if none" />
            </div>
            <div className="admin-form-group">
              <label>Platform</label>
              <select name="platform" value={form.platform} onChange={handleChange} className="admin-input">
                <option value="amazon">Amazon</option>
                <option value="walmart">Walmart</option>
                <option value="target">Target</option>
                <option value="wayfair">Wayfair</option>
                <option value="macys">Macys</option>
                <option value="ebay">eBay</option>
                <option value="bestbuy">Best Buy</option>
                <option value="costco">Costco</option>
                <option value="etsy">Etsy</option>
                <option value="website">Website</option>
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label>Affiliate Link *</label>
            <input type="text" name="affiliate_link" value={form.affiliate_link} onChange={handleChange} className="admin-input" placeholder="https://amazon.com/..." required />
          </div>

          <div className="admin-form-group">
            <label>Deal Date</label>
            <input type="date" name="deal_date" value={form.deal_date} onChange={handleChange} className="admin-input" />
          </div>

          <div className="admin-form-group">
            <label>Product Description (HTML supported)</label>
            <div className="html-editor-toolbar">
              <button type="button" className="html-tool-btn" onClick={() => insertHtmlDesc('<h2>', '</h2>')}>H2</button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtmlDesc('<h3>', '</h3>')}>H3</button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtmlDesc('<p>', '</p>')}>P</button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtmlDesc('<strong>', '</strong>')}><b>B</b></button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtmlDesc('<em>', '</em>')}><i>I</i></button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtmlDesc('<ul>\n  <li>', '</li>\n</ul>')}>UL</button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtmlDesc('<li>', '</li>')}>LI</button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtmlDesc('<a href="">', '</a>')}>Link</button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtmlDesc('<br />')}>BR</button>
            </div>
            <textarea id="deal-description" name="description" value={form.description} onChange={handleChange} className="admin-input admin-textarea admin-html-editor" rows="6" placeholder="<p>Product details, features, specifications...</p>" />
          </div>

          <div className="admin-form-group admin-checkbox-group">
            <label className="admin-checkbox-label">
              <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
              Active (visible on website)
            </label>
          </div>

          {error && <p className="admin-error">{error}</p>}
          <div className="admin-form-actions">
            <button type="button" onClick={onClose} className="admin-btn-secondary">Cancel</button>
            <button type="submit" className="admin-btn-primary" disabled={saving || uploading}>{saving ? 'Saving...' : isEdit ? 'Update Deal' : 'Add Deal'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

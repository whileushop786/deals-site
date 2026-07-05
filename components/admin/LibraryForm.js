import { useState } from 'react';
import { supabase } from '../../lib/supabase';

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const ICON_OPTIONS = ['📄','🏷️','💰','📋','🛒','🎁','📊','✅','🧾','📝','💡','🗂️'];

export default function LibraryForm({ item, onClose, onSaved }) {
  const isEdit = !!item;
  const [form, setForm] = useState({
    title: item?.title || '', description: item?.description || '',
    icon: item?.icon || '📄', file_url: item?.file_url || '', active: item?.active ?? true,
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const insertHtmlDesc = (before, after = '') => {
    const textarea = document.getElementById('library-description');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = form.description.substring(start, end);
    const newContent = form.description.substring(0, start) + before + selected + after + form.description.substring(end);
    setForm((prev) => ({ ...prev, description: newContent }));
    setTimeout(() => { textarea.focus(); textarea.setSelectionRange(start + before.length, start + before.length + selected.length); }, 0);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) { setError('Cloudinary not configured.'); return; }
    setUploading(true); setError('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`, { method: 'POST', body: formData });
      const data = await res.json();
      if (data.secure_url) setForm((prev) => ({ ...prev, file_url: data.secure_url }));
      else setError('File upload failed.');
    } catch { setError('File upload failed.'); }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true); setError('');
    if (!form.title || !form.file_url) { setError('Title and File URL are required.'); setSaving(false); return; }
    const payload = { title: form.title, description: form.description || null, icon: form.icon, file_url: form.file_url, active: form.active };
    const result = isEdit ? await supabase.from('freebies_library').update(payload).eq('id', item.id) : await supabase.from('freebies_library').insert([payload]);
    if (result.error) { setError('Failed to save.'); setSaving(false); return; }
    onSaved();
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2>{isEdit ? 'Edit Freebie' : 'Add New Freebie'}</h2>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form-group">
            <label>Title *</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} className="admin-input" placeholder="Ultimate Coupon Checklist" required />
          </div>

          <div className="admin-form-group">
            <label>Description (HTML supported)</label>
            <div className="html-editor-toolbar">
              <button type="button" className="html-tool-btn" onClick={() => insertHtmlDesc('<h2>', '</h2>')}>H2</button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtmlDesc('<h3>', '</h3>')}>H3</button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtmlDesc('<p>', '</p>')}>P</button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtmlDesc('<strong>', '</strong>')}><b>B</b></button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtmlDesc('<em>', '</em>')}><i>I</i></button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtmlDesc('<ul>\n  <li>', '</li>\n</ul>')}>UL</button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtmlDesc('<li>', '</li>')}>LI</button>
              <button type="button" className="html-tool-btn" onClick={() => insertHtmlDesc('<br />')}>BR</button>
            </div>
            <textarea id="library-description" name="description" value={form.description} onChange={handleChange} className="admin-input admin-textarea admin-html-editor" rows="5" placeholder="<p>A short description...</p>" />
          </div>

          <div className="admin-form-group">
            <label>Icon</label>
            <div className="admin-icon-picker">
              {ICON_OPTIONS.map((ic) => (
                <button type="button" key={ic} className={`admin-icon-option ${form.icon === ic ? 'selected' : ''}`} onClick={() => setForm((prev) => ({ ...prev, icon: ic }))}>{ic}</button>
              ))}
            </div>
          </div>

          <div className="admin-form-group">
            <label>File (PDF, ZIP, DOC etc.)</label>
            <div className="admin-image-upload">
              <label className="admin-upload-btn">
                {uploading ? 'Uploading...' : form.file_url ? 'Replace File' : 'Upload File'}
                <input type="file" onChange={handleFileUpload} hidden disabled={uploading} />
              </label>
              {form.file_url && <a href={form.file_url} target="_blank" rel="noopener noreferrer" className="admin-file-link">View current file →</a>}
            </div>
            <p className="admin-form-hint">Or paste a direct file URL:</p>
            <input type="text" name="file_url" value={form.file_url} onChange={handleChange} placeholder="https://..." className="admin-input" />
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
            <button type="submit" className="admin-btn-primary" disabled={saving || uploading}>{saving ? 'Saving...' : isEdit ? 'Update Freebie' : 'Add Freebie'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

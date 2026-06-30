import { useState } from 'react';
import { supabase } from '../../lib/supabase';

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const ICON_OPTIONS = ['📄','🏷️','💰','📋','🛒','🎁','📊','✅','🧾','📝','💡','🗂️'];

export default function LibraryForm({ item, onClose, onSaved }) {
  const isEdit = !!item;

  const [form, setForm] = useState({
    title: item?.title || '',
    description: item?.description || '',
    icon: item?.icon || '📄',
    file_url: item?.file_url || '',
    active: item?.active ?? true,
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // Allow uploading PDF/any file directly to Cloudinary (raw resource type)
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      setError('Cloudinary not configured. Add environment variables first.');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      // 'raw' resource type handles PDFs, zips, docs etc. (not just images)
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
        { method: 'POST', body: formData }
      );
      const data = await res.json();

      if (data.secure_url) {
        setForm((prev) => ({ ...prev, file_url: data.secure_url }));
      } else {
        setError('File upload failed. Please try again.');
      }
    } catch {
      setError('File upload failed. Please try again.');
    }

    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    if (!form.title || !form.file_url) {
      setError('Title and File URL are required.');
      setSaving(false);
      return;
    }

    const payload = {
      title: form.title,
      description: form.description || null,
      icon: form.icon,
      file_url: form.file_url,
      active: form.active,
    };

    let result;
    if (isEdit) {
      result = await supabase.from('freebies_library').update(payload).eq('id', item.id);
    } else {
      result = await supabase.from('freebies_library').insert([payload]);
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
          <h2>{isEdit ? 'Edit Freebie' : 'Add New Freebie'}</h2>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">

          {/* Title */}
          <div className="admin-form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="admin-input"
              placeholder="Ultimate Coupon Checklist"
              required
            />
          </div>

          {/* Description */}
          <div className="admin-form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="admin-input admin-textarea"
              rows="3"
              placeholder="A short description of what this freebie includes..."
            />
          </div>

          {/* Icon picker */}
          <div className="admin-form-group">
            <label>Icon</label>
            <div className="admin-icon-picker">
              {ICON_OPTIONS.map((ic) => (
                <button
                  type="button"
                  key={ic}
                  className={`admin-icon-option ${form.icon === ic ? 'selected' : ''}`}
                  onClick={() => setForm((prev) => ({ ...prev, icon: ic }))}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div className="admin-form-group">
            <label>File (PDF, ZIP, DOC etc.)</label>
            <div className="admin-image-upload">
              <label className="admin-upload-btn">
                {uploading ? 'Uploading...' : form.file_url ? 'Replace File' : 'Upload File'}
                <input type="file" onChange={handleFileUpload} hidden disabled={uploading} />
              </label>
              {form.file_url && (
                <a href={form.file_url} target="_blank" rel="noopener noreferrer" className="admin-file-link">
                  View current file →
                </a>
              )}
            </div>
            <p className="admin-form-hint">Or paste a direct file URL below:</p>
            <input
              type="text"
              name="file_url"
              value={form.file_url}
              onChange={handleChange}
              placeholder="https://..."
              className="admin-input"
            />
          </div>

          {/* Active toggle */}
          <div className="admin-form-group admin-checkbox-group">
            <label className="admin-checkbox-label">
              <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
              Active (visible on website)
            </label>
          </div>

          {error && <p className="admin-error">{error}</p>}

          <div className="admin-form-actions">
            <button type="button" onClick={onClose} className="admin-btn-secondary">Cancel</button>
            <button type="submit" className="admin-btn-primary" disabled={saving || uploading}>
              {saving ? 'Saving...' : isEdit ? 'Update Freebie' : 'Add Freebie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

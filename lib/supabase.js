import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const PAGE_SIZE = 20;

export async function getDeals(query = '', page = 0) {
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let q = supabase
    .from('deals')
    .select('*')
    .eq('active', true)
    .order('deal_date', { ascending: false })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (query && query.trim()) {
    q = q.ilike('title', `%${query.trim()}%`);
  }

  const { data, error } = await q;
  if (error) return { deals: [], hasMore: false };

  return {
    deals: data || [],
    hasMore: (data || []).length === PAGE_SIZE,
  };
}

export async function getTotalCount() {
  const { count } = await supabase
    .from('deals')
    .select('*', { count: 'exact', head: true })
    .eq('active', true);
  return count || 0;
}

export async function getDealBySlug(slug) {
  const { slugify, slugifyWithId } = await import('./slugify');

  // Fetch all active deals
  const { data } = await supabase
    .from('deals')
    .select('*')
    .eq('active', true);

  if (!data) return null;

  // First try: match slug with ID appended (new format: title-id)
  const byIdSlug = data.find((d) => slugifyWithId(d.title, d.id) === slug);
  if (byIdSlug) return byIdSlug;

  // Second try: match by title slug only (old format — for existing shared URLs)
  const byTitleSlug = data.find((d) => slugify(d.title) === slug);
  if (byTitleSlug) return byTitleSlug;

  return null;
}

export async function getAllDeals() {
  const { data } = await supabase
    .from('deals')
    .select('id, title, deal_date, image_url')
    .eq('active', true);
  return data || [];
}

// Fetch all pinned deals for homepage top section
export async function getPinnedDeals() {
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('active', true)
    .eq('pinned', true)
    .order('created_at', { ascending: false });

  if (error) return [];
  return data || [];
}

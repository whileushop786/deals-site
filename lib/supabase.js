import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const PAGE_SIZE = 20;

// Fetch deals with pagination — strictly 20 per page
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

// Total count of active deals
export async function getTotalCount() {
  const { count } = await supabase
    .from('deals')
    .select('*', { count: 'exact', head: true })
    .eq('active', true);
  return count || 0;
}

// Get single deal by slug (title match)
export async function getDealBySlug(slug) {
  const { data } = await supabase
    .from('deals')
    .select('*')
    .eq('active', true);

  if (!data) return null;

  const { slugify } = await import('./slugify');
  return data.find((d) => slugify(d.title) === slug) || null;
}

// Get all active deals (for static paths generation only)
export async function getAllDeals() {
  const { data } = await supabase
    .from('deals')
    .select('id, title, deal_date, image_url')
    .eq('active', true);
  return data || [];
}

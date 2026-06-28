import { createClient } from '@supabase/supabase-js';
import { slugify } from './slugify';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const PAGE_SIZE = 20;

// Fetch paginated deals
export async function getDeals(searchQuery = '', page = 0) {
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from('deals')
    .select('*', { count: 'exact' })
    .eq('active', true)
    .order('deal_date', { ascending: false })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (searchQuery) {
    query = query.ilike('title', `%${searchQuery}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching deals:', error);
    return { deals: [], total: 0, hasMore: false };
  }

  return {
    deals: data || [],
    total: count || 0,
    hasMore: from + PAGE_SIZE < count,
  };
}

// Fetch total count
export async function getTotalCount() {
  const { count } = await supabase
    .from('deals')
    .select('*', { count: 'exact', head: true })
    .eq('active', true);
  return count || 0;
}

// Fetch single deal by slug (matches against title)
export async function getDealBySlug(slug) {
  // Fetch recent active deals and find matching slug
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error || !data) return null;

  // Find deal whose title slugifies to the requested slug
  const deal = data.find(d => slugify(d.title) === slug);
  return deal || null;
}

// Fetch all deals for static path generation
export async function getAllDeals() {
  const { data, error } = await supabase
    .from('deals')
    .select('id, title')
    .eq('active', true);

  if (error || !data) return [];
  return data;
}

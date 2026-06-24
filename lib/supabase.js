import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fetch all active deals grouped by date
export async function getDeals(searchQuery = '') {
  let query = supabase
    .from('deals')
    .select('*')
    .eq('active', true)
    .order('deal_date', { ascending: false })
    .order('created_at', { ascending: false });

  if (searchQuery) {
    query = query.ilike('title', `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching deals:', error);
    return [];
  }

  // Group deals by date
  const grouped = {};
  data.forEach((deal) => {
    const date = deal.deal_date;
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(deal);
  });

  return grouped;
}

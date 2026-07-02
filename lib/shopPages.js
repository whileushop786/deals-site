import { supabase } from './supabase';

export async function getShopPages() {
  const { data, error } = await supabase
    .from('shop_pages')
    .select('id, page_name, slug, icon')
    .eq('active', true)
    .order('created_at', { ascending: true });

  if (error) return [];
  return data || [];
}

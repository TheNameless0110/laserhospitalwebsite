import { servicesList } from '@/lib/dummyData';
import { supabase } from '@/lib/supabaseClient';

const BASE_URL = 'https://www.laserhospital.co.in';

export default async function sitemap() {
  // ── Static pages ─────────────────────────────────────────
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // ── Dynamic product pages ────────────────────────────────
  let productPages = [];
  try {
    const { data: products } = await supabase
      .from('products')
      .select('id');
    
    if (products) {
      productPages = products.map((product) => ({
        url: `${BASE_URL}/products/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error('Sitemap: failed to fetch products', error);
  }

  // ── Dynamic service pages ────────────────────────────────
  const servicePages = servicesList.map((service) => ({
    url: `${BASE_URL}/services/${service.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...servicePages];
}

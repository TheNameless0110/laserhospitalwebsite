import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { dummyProducts, servicesList } from '@/lib/dummyData';

export async function GET() {
  try {
    // Transform products to remove React components (icons) and badges that are empty
    const productsData = dummyProducts.map(p => {
      const { imageIcon, badgeColor, ...rest } = p;
      return {
        ...rest,
        badge: rest.badge || null,
        badge_color: badgeColor || null,
        features: rest.features || [],
        specifications: rest.specifications || []
      };
    });

    const { error: pError } = await supabase.from('products').upsert(productsData);
    if (pError) throw pError;

    // Transform services
    const servicesData = servicesList.map(s => {
      const { icon, detailedOverview, ...rest } = s;
      return {
        ...rest,
        detailed_overview: detailedOverview || null,
        bullets: rest.bullets || []
      };
    });

    const { error: sError } = await supabase.from('services').upsert(servicesData);
    if (sError) throw sError;

    return NextResponse.json({ success: true, message: 'Database seeded successfully!' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { dummyProducts, servicesList } from '@/lib/dummyData';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read the public directory
    const publicDir = path.join(process.cwd(), 'public');
    let files = [];
    try {
      files = fs.readdirSync(publicDir);
    } catch (e) {
      console.error('Could not read public directory', e);
    }

    // Transform products to remove React components (icons) and badges that are empty
    const productsData = dummyProducts.map(p => {
      const { imageIcon, badgeColor, ...rest } = p;
      
      // Match images for this product
      // File format is "Product Name Prefix (1st).jpg" and p.name might be longer.
      const productImages = files
        .filter(f => p.name.startsWith(f.split(' (')[0]) && f.match(/\.(jpg|jpeg|png|webp)$/i))
        .map(f => `/${f}`);
      productImages.sort(); // ensures (1st) comes before (2nd)

      return {
        ...rest,
        badge: rest.badge || null,
        badge_color: badgeColor || null,
        features: rest.features || [],
        specifications: rest.specifications || [],
        images: productImages
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

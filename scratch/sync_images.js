const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

function getEnv() {
  try {
    const env = fs.readFileSync('.env.local', 'utf8');
    const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
    const key = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim();
    return { url, key };
  } catch (e) {
    console.error('Error reading .env.local:', e);
    process.exit(1);
  }
}

const { url: supabaseUrl, key: supabaseKey } = getEnv();

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncImages() {
  // 1. Fetch all products
  const { data: products, error: fetchError } = await supabase
    .from('products')
    .select('id, name');

  if (fetchError) {
    console.error('Error fetching products:', fetchError);
    return;
  }

  // 2. List all files in public
  const publicDir = path.join(process.cwd(), 'public');
  const files = fs.readdirSync(publicDir);

  console.log(`Found ${products.length} products in DB and ${files.length} files in public/`);

  for (const product of products) {
    const productId = product.id;
    // Find files matching the pattern: productId(Nth).ext
    // regex should match productId followed by (1st), (2nd), etc.
    // Example: aarvex_128gb_sata_ax950_pro_series_ssd(1st).jpg
    const matchingFiles = files.filter(f => {
      // Escape productId for regex
      const escapedId = productId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`^${escapedId}\\((\\d+)(?:st|nd|rd|th)\\)\\.(jpg|jpeg|png|webp|JPG|PNG)$`, 'i');
      return regex.test(f);
    }).sort((a, b) => {
      const getNum = (name) => {
        const match = name.match(/\((\d+)/);
        return match ? parseInt(match[1]) : 0;
      };
      return getNum(a) - getNum(b);
    });

    if (matchingFiles.length > 0) {
      const imagePaths = matchingFiles.map(f => `/${f}`);
      console.log(`Updating ${product.name} (${productId}): ${imagePaths.join(', ')}`);
      
      const { error: updateError } = await supabase
        .from('products')
        .update({ images: imagePaths })
        .eq('id', productId);

      if (updateError) {
        console.error(`Error updating ${productId}:`, updateError);
      }
    } else {
      // Fallback: check if any file starts with productId without the (1st) suffix if only one image exists
      // But the requirement says {name} (1st).jpg pattern.
      // Let's stick to the pattern.
    }
  }

  console.log('Sync complete.');
}

syncImages();

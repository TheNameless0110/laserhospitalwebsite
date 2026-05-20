/**
 * force_resync.js
 * Force-overwrites the images[] array for ALL products in the DB
 * based on actual files found in /public matching the pattern:
 *   {productId}(1st).jpg/jpeg/png/webp  (case-insensitive)
 */
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

function getEnv() {
  const env = fs.readFileSync('.env.local', 'utf8');
  const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
  const key = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim();
  return { url, key };
}

const { url, key } = getEnv();
const supabase = createClient(url, key);
const publicDir = path.join(process.cwd(), 'public');

async function main() {
  const freshFiles = fs.readdirSync(publicDir);

  const { data: products, error: fetchError } = await supabase
    .from('products')
    .select('id, name, images');

  if (fetchError) { console.error('Fetch error:', fetchError); return; }

  console.log(`Processing ${products.length} products...\n`);

  let updated = 0;
  let noImages = 0;
  let skipped = 0;

  for (const product of products) {
    const productId = product.id;
    // Escape special regex chars in the ID (handles dots, etc.)
    const escapedId = productId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`^${escapedId}\\((\\d+)(?:st|nd|rd|th)\\)\\.(jpg|jpeg|png|webp)$`, 'i');

    const matchingFiles = freshFiles
      .filter(f => regex.test(f))
      .sort((a, b) => {
        const getNum = n => { const m = n.match(/\((\d+)/); return m ? parseInt(m[1]) : 0; };
        return getNum(a) - getNum(b);
      });

    if (matchingFiles.length > 0) {
      const imagePaths = matchingFiles.map(f => `/${f}`);
      
      // Always update (force overwrite)
      const { error: updateError } = await supabase
        .from('products')
        .update({ images: imagePaths })
        .eq('id', productId);

      if (updateError) {
        console.error(`  ✗ ERROR ${productId}: ${updateError.message}`);
      } else {
        console.log(`  ✓ ${productId}`);
        console.log(`      → [${imagePaths.join(', ')}]`);
        updated++;
      }
    } else {
      console.log(`  ✗ NO FILES FOUND: ${productId}`);
      console.log(`      (DB has: ${JSON.stringify(product.images)})`);
      noImages++;
    }
  }

  console.log(`\n============================`);
  console.log(`Updated:   ${updated}`);
  console.log(`No images: ${noImages}`);
  console.log(`============================`);
}

main().catch(console.error);

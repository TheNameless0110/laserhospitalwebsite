/**
 * fix_and_resync.js
 * 
 * This script:
 * 1. Renames the 3 Ranz product IDs that have dots (replaces '.' with nothing)
 * 2. Renames corresponding image files in /public
 * 3. Re-runs image sync for ALL products so the images[] array in DB is correct
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

const { url: supabaseUrl, key: supabaseKey } = getEnv();
const supabase = createClient(supabaseUrl, supabaseKey);
const publicDir = path.join(process.cwd(), 'public');

// IDs to rename: old -> new
const ID_RENAMES = [
  { oldId: 'ranz_1.5m_usb_printer_cable',   newId: 'ranz_15m_usb_printer_cable' },
  { oldId: 'ranz_2_pin_power_cord_1.5m',    newId: 'ranz_2_pin_power_cord_15m' },
  { oldId: 'ranz_cat_6_patch_cord_1.5m',    newId: 'ranz_cat_6_patch_cord_15m' },
];

// Also rename the gi73_bk image file which was incorrectly named (missing 'bottle')
const FILE_RENAMES = [
  { from: 'canon_canon_gi73_bk_black_ink_(1st).jpg', to: 'canon_canon_gi73_bk_black_ink_bottle(1st).jpg' },
  { from: 'canon_canon_gi73_bk_black_ink_(2nd).jpg', to: 'canon_canon_gi73_bk_black_ink_bottle(2nd).jpg' },
];

async function main() {
  const files = fs.readdirSync(publicDir);

  // ---- Step 1: Rename misnamed canon gi73 bk image files ----
  console.log('\n--- Step 1: Renaming misnamed canon files ---');
  for (const rename of FILE_RENAMES) {
    const src = path.join(publicDir, rename.from);
    const dst = path.join(publicDir, rename.to);
    if (fs.existsSync(src)) {
      fs.renameSync(src, dst);
      console.log(`Renamed: ${rename.from}  ->  ${rename.to}`);
    } else {
      console.log(`Not found (skip): ${rename.from}`);
    }
  }

  // ---- Step 2: Rename Ranz image files (remove dot from filename) ----
  console.log('\n--- Step 2: Renaming Ranz image files ---');
  for (const { oldId, newId } of ID_RENAMES) {
    const matching = files.filter(f => f.startsWith(oldId));
    for (const file of matching) {
      const newFile = file.replace(oldId, newId);
      const src = path.join(publicDir, file);
      const dst = path.join(publicDir, newFile);
      if (!fs.existsSync(dst)) {
        fs.renameSync(src, dst);
        console.log(`Renamed: ${file}  ->  ${newFile}`);
      } else {
        console.log(`Already exists (skip): ${newFile}`);
      }
    }
    if (matching.length === 0) console.log(`No files found for: ${oldId}`);
  }

  // ---- Step 3: Update Ranz IDs in Supabase ----
  console.log('\n--- Step 3: Updating Ranz product IDs in Supabase ---');
  for (const { oldId, newId } of ID_RENAMES) {
    const { error } = await supabase
      .from('products')
      .update({ id: newId })
      .eq('id', oldId);
    if (error) {
      console.error(`Error renaming ${oldId}:`, error.message);
    } else {
      console.log(`DB: ${oldId}  ->  ${newId}`);
    }
  }

  // ---- Step 4: Full image re-sync ----
  console.log('\n--- Step 4: Re-syncing all product images ---');
  const freshFiles = fs.readdirSync(publicDir);

  const { data: products, error: fetchError } = await supabase
    .from('products')
    .select('id, name');

  if (fetchError) {
    console.error('Error fetching products:', fetchError);
    return;
  }

  console.log(`Found ${products.length} products in DB and ${freshFiles.length} files in public/`);

  let updated = 0;
  let missing = 0;

  for (const product of products) {
    const productId = product.id;
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
      const { error: updateError } = await supabase
        .from('products')
        .update({ images: imagePaths })
        .eq('id', productId);

      if (updateError) {
        console.error(`Error updating ${productId}:`, updateError.message);
      } else {
        console.log(`✓ ${productId}: [${imagePaths.join(', ')}]`);
        updated++;
      }
    } else {
      console.log(`✗ NO IMAGES: ${productId}`);
      missing++;
    }
  }

  console.log(`\n=== Sync complete: ${updated} updated, ${missing} with no images ===`);
}

main().catch(console.error);

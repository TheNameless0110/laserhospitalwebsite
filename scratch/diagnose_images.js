/**
 * diagnose_images.js
 * Prints the exact images[] array stored in DB for a sample of products
 */
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

function getEnv() {
  const env = fs.readFileSync('.env.local', 'utf8');
  const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
  const key = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim();
  return { url, key };
}

const { url, key } = getEnv();
const supabase = createClient(url, key);

async function main() {
  const sampleIds = [
    'canon_canon_gi73_bk_black_ink_bottle',
    'canon_canon_gi790_bk_black_ink_bottle',
    'epson_epson_001_bk_black_ink_bottle',
    'epson_epson_057_bk_black_ink_bottle_l8050',
    'canon_canon_maintenance_cartridge_mcg01',
    'antesports_antesports_km540_gaming_keyboard_mouse_combo',
    'aarvex_256gb_nvme_ax950_pro_series_ssd',
    'ranz_15m_usb_printer_cable',
    'ranz_2_pin_power_cord_15m',
  ];

  const { data, error } = await supabase
    .from('products')
    .select('id, name, images')
    .in('id', sampleIds);

  if (error) { console.error(error); return; }

  for (const p of data) {
    console.log(`\nID: ${p.id}`);
    console.log(`Name: ${p.name}`);
    console.log(`Images: ${JSON.stringify(p.images)}`);
  }
}

main().catch(console.error);

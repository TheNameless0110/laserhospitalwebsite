import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { dummyProducts, servicesList } from '@/lib/dummyData';

// ─── Explicit image map: product ID → array of public-folder filenames ────────
// Keys are product IDs. Values are arrays of image paths (relative to /public).
// Add new products here whenever images are dropped into /public.
const PRODUCT_IMAGE_MAP = {
  // ── Inkjet Printers ──────────────────────────────────────────────────────────
  epson_ecotank_l8050:                        [],   // no image yet
  canon_pixma_g2010:                          [],
  canon_pixma_g2012:                          [],
  canon_pixma_g3010:                          [],
  canon_pixma_g3012:                          [],
  canon_pixma_g4010:                          [],
  canon_pixma_g2770:                          [],
  canon_pixma_g3770:                          [],
  canon_pixma_g570:                           [],
  canon_pixma_g670:                           [],
  hp_smart_tank_525:                          [],
  hp_smart_tank_580:                          [],
  hp_smart_tank_585:                          [],

  // ── Laser Printers ───────────────────────────────────────────────────────────
  hp_laser_303d:                              [],
  hp_laser_303dw:                             [],
  hp_laser_mfp_323d:                          [],
  hp_laser_mfp_323dnw:                        [],
  hp_laser_mfp_323sdnw:                       [],
  hp_laserjet_pro_mfp_m126a:                  [],
  hp_laserjet_pro_mfp_m126nw:                 [],
  hp_laserjet_pro_p1108_plus:                 [],

  // ── Canon GI-73 Inks ─────────────────────────────────────────────────────────
  canon_canon_gi73_bk_black_ink_bottle:       ['/Canon GI-73 BK -  Black Ink Bottle (1st).jpg',   '/Canon GI-73 BK -  Black Ink Bottle (2nd).jpg'],
  canon_canon_gi73_gy_grey_ink_bottle:        ['/Canon GI-73 GY -  Grey Ink Bottle (1st).jpg',    '/Canon GI-73 GY -  Grey Ink Bottle (2nd).jpg'],
  canon_canon_gi73_r_red_ink_bottle:          ['/Canon GI-73 R -  Red Ink Bottle (1st).jpg',      '/Canon GI-73 R -  Red Ink Bottle (2nd).jpg'],
  canon_canon_gi73_c_cyan_ink_bottle:         ['/Canon GI-73 C -  Cyan Ink Bottle  (1st).jpg',    '/Canon GI-73 C -  Cyan Ink Bottle  (2nd).jpg'],
  canon_canon_gi73_y_yellow_ink_bottle:       ['/Canon GI-73 Y -  Yellow Ink Bottle (1st).png',   '/Canon GI-73 Y -  Yellow Ink Bottle (2nd).jpg'],
  canon_canon_gi73_m_magenta_ink_bottle:      ['/Canon GI-73 M -  Magenta Ink Bottle (1st).jpg',  '/Canon GI-73 M -  Magenta Ink Bottle (2nd).jpg'],

  // ── Canon GI-71 Inks ─────────────────────────────────────────────────────────
  canon_canon_gi71_pgbk_pigment_black_ink_bottle: ['/Canon GI-71 PGBK -  Pigment Black Ink Bottle (1st).jpg', '/Canon GI-71 PGBK -  Pigment Black Ink Bottle (2nd).jpg'],
  canon_canon_gi71_c_cyan_ink_bottle:         ['/Canon GI-71 C -  Cyan Ink Bottle (1st).jpg',     '/Canon GI-71 C - Cyan Ink Bottle  (2nd).jpg'],
  canon_canon_gi71_m_magenta_ink_bottle:      ['/Canon GI-71 M -  Magenta Ink Bottle (1st).jpg',  '/Canon GI-71 M -  Magenta Ink Bottle (2nd).jpg'],
  canon_canon_gi71_y_yellow_ink_bottle:       ['/Canon GI-71 Y -  Yellow Ink Bottle (1st).jpg',   '/Canon GI-71 Y -  Yellow Ink Bottle (2nd).jpg'],

  // ── Canon GI-70 Inks ─────────────────────────────────────────────────────────
  canon_canon_gi70_pgbk_pigment_black_ink_bottle: ['/Canon GI-70 PGBK -  Pigment Black Ink Bottle (1st).jpg', '/Canon GI-70 PGBK -  Pigment Black Ink Bottle (2nd).jpg'],
  canon_canon_gi70_c_cyan_ink_bottle:         ['/Canon GI-70 C -  Cyan Ink Bottle (1st).jpg',     '/Canon GI-70 C -  Cyan Ink Bottle (2nd).jpg'],
  canon_canon_gi70_m_magenta_ink_bottle:      ['/Canon GI-70 M -  Magenta Ink Bottle (1st).jpg',  '/Canon GI-70 M -  Magenta Ink Bottle (2nd).jpg'],
  canon_canon_gi70_y_yellow_ink_bottle:       ['/Canon GI-70 Y -  Yellow Ink Bottle (1st).png',   '/Canon GI-70 Y -  Yellow Ink Bottle (2nd).jpg'],

  // ── Canon GI-790 Inks ────────────────────────────────────────────────────────
  canon_canon_gi790_bk_black_ink_bottle:      ['/Canon GI-790 BK -  Black Ink Bottle (1st).jpg',  '/Canon GI-790 BK - Black Ink Bottle (2nd).jpg'],
  canon_canon_gi790_c_cyan_ink_bottle:        ['/Canon GI-790 C -  Cyan Ink Bottle  (1st).JPG',   '/Canon GI-790 C -  Cyan Ink Bottle  (2nd).jpg'],
  canon_canon_gi790_m_magenta_ink_bottle:     ['/Canon GI-790 M -  Magenta Ink Bottle (1st).jpg', '/Canon GI-790 M -  Magenta Ink Bottle (2nd).jpg'],
  canon_canon_gi790_y_yellow_ink_bottle:      ['/Canon GI-790 Y -  Yellow Ink Bottle (1st).jpg',  '/Canon GI-790 Y -  Yellow Ink Bottle (2nd).jpg'],

  // ── Epson 057 (L8050) Inks ───────────────────────────────────────────────────
  epson_epson_057_bk_black_ink_bottle_l8050:  ['/Epson 057 BK -  Black Ink Bottle (L8050) (1st).jpg', '/Epson 057 BK -  Black Ink Bottle (2nd).jpg'],
  epson_epson_057_c_cyan_ink_bottle_l8050:    ['/Epson 057 C -  Cyan Ink Bottle  (L8050) (1st).jpg',  '/Epson 057 C -  Cyan Ink Bottle (L8050) (2nd).jpg'],
  epson_epson_057_y_yellow_ink_bottle_l8050:  ['/Epson 057 Y -  Yellow Ink Bottle  (L8050) (1st).jpg','/Epson 057 Y -  Yellow Ink Bottle (L8050) (2nd).jpg'],
  epson_epson_057_m_magenta_ink_bottle_l8050: ['/Epson 057 M -  Magenta Ink Bottle (L8050) (1st).jpg','/Epson 057 M -  Magenta Ink Bottle (L8050) (2nd).jpg'],
  epson_epson_057_lc_light_cyan_ink_bottle_l8050: ['/Epson 057 LC -  Light Cyan Ink Bottle (L8050) (1st).jpg',    '/Epson 057 LC -  Light Cyan Ink Bottle (L8050) (2nd).jpeg'],
  epson_epson_057_lm_light_magenta_ink_bottle_l8050: ['/Epson 057 LM -  Light Magenta Ink Bottle (L8050) (1st).jpg', '/Epson 057 LM -  Light Magenta Ink Bottle (L8050) (2nd).jpeg'],

  // ── Epson 012 (L8180) Inks ───────────────────────────────────────────────────
  epson_epson_012_bk_black_ink_bottle_l8180:  ['/Epson 012 BK -  Black Ink Bottle (1st).jpg',     '/Epson 012 BK -  Black Ink Bottle (2nd).jpg'],
  epson_epson_012_c_cyan_ink_bottle_l8180:    ['/Epson 012 C -  Cyan Ink Bottle  (1st).jpeg'],
  epson_epson_012_m_magenta_ink_bottle_l8180: ['/Epson 012 M -  Magenta Ink Bottle (1st).jpeg'],
  epson_epson_012_y_yellow_ink_bottle_l8180:  ['/Epson 012 Y -  Yellow Ink Bottle (1st).jpeg'],
  epson_epson_012_g_grey_ink_bottle_l8180:    ['/Epson 012 G -  Grey Ink Bottle (1st).jpeg'],

  // ── Epson 008 Inks ───────────────────────────────────────────────────────────
  epson_epson_008_bk_black_ink_bottle:        ['/Epson 008 BK -  Black Ink Bottle (1st).jpeg',    '/Epson 008 BK -  Black Ink Bottle (2nd).jpeg'],
  epson_epson_008_c_cyan_ink_bottle:          ['/Epson 008 C -  Cyan Ink Bottle  (1st).jpeg'],
  epson_epson_008_m_magenta_ink_bottle:       ['/Epson 008 M -  Magenta Ink Bottle (1st).jpeg'],
  epson_epson_008_y_yellow_ink_bottle:        ['/Epson 008 Y -  Yellow Ink Bottle (1st).jpeg'],

  // ── Epson 005 Inks ───────────────────────────────────────────────────────────
  epson_epson_005_bk_black_ink_bottle:        ['/Epson 005 BK -  Black Ink Bottle (1st).jpeg'],

  // ── Epson 003 Inks ───────────────────────────────────────────────────────────
  epson_epson_003_bk_black_ink_bottle:        ['/Epson 003 BK -  Black Ink Bottle (1st).jpeg'],
  epson_epson_003_c_cyan_ink_bottle:          ['/Epson 003 C -  Cyan Ink Bottle  (1st).jpeg'],
  epson_epson_003_m_magenta_ink_bottle:       ['/Epson 003 M -  Magenta Ink Bottle (1st).jpeg'],
  epson_epson_003_y_yellow_ink_bottle:        ['/Epson 003 Y -  Yellow Ink Bottle (1st).jpeg'],

  // ── Epson 001 Inks ───────────────────────────────────────────────────────────
  epson_epson_001_bk_black_ink_bottle:        ['/Epson 001 BK -  Black Ink Bottle (1st).jpeg'],
  epson_epson_001_c_cyan_ink_bottle:          ['/Epson 001 C -  Cyan Ink Bottle  (1st).jpeg'],
  epson_epson_001_m_magenta_ink_bottle:       ['/Epson 001 M -  Magenta Ink Bottle (1st).jpeg'],
  epson_epson_001_y_yellow_ink_bottle:        ['/Epson 001 Y -  Yellow Ink Bottle (1st).jpeg'],

  // ── Epson 673 Inks ───────────────────────────────────────────────────────────
  epson_epson_673_bk_black_ink_bottle:        ['/Epson 673 BK -  Black Ink Bottle (1st).jpeg'],
  epson_epson_673_c_cyan_ink_bottle:          ['/Epson 673 C -  Cyan Ink Bottle  (1st).jpeg'],
  epson_epson_673_m_magenta_ink_bottle:       ['/Epson 673 M -  Magenta Ink Bottle (1st).jpeg'],
  epson_epson_673_y_yellow_ink_bottle:        ['/Epson 673 Y -  Yellow Ink Bottle (1st).jpeg'],
  epson_epson_673_lc_light_cyan_ink_bottle:   ['/Epson 673 LC -  Light Cyan Ink Bottle (1st).jpeg'],
  epson_epson_673_lm_light_magenta_ink_bottle:['/Epson 673 LM -  Light Magenta Ink Bottle (1st).jpeg'],

  // ── Epson 664 Inks ───────────────────────────────────────────────────────────
  epson_epson_664_bk_black_ink_bottle:        ['/Epson 664 BK -  Black Ink Bottle (1st).jpeg'],
  epson_epson_664_c_cyan_ink_bottle:          ['/Epson 664 C -  Cyan Ink Bottle  (1st).jpeg'],
  epson_epson_664_m_magenta_ink_bottle:       ['/Epson 664 M - Magenta Ink Bottle (1st).jpeg'],
  epson_epson_664_y_yellow_ink_bottle:        ['/Epson 664 Y -  Yellow Ink Bottle (1st).jpeg'],

  // ── Epson 774 Inks ───────────────────────────────────────────────────────────
  epson_epson_774_bk_black_ink_bottle:        ['/Epson 774 BK -  Black Ink Bottle (1st).jpeg'],

  // ── Canon Maintenance ────────────────────────────────────────────────────────
  canon_canon_maintenance_cartridge_mcg01:    ['/Canon Maintenance Cartridge MC-G01 (1st).jpg', '/Canon Maintenance Cartridge MC-G01 (2nd).jpg'],
  canon_canon_maintenance_cartridge_mcg02:    ['/Canon Maintenance Cartridge MC-G02 (1st).jpg', '/Canon Maintenance Cartridge MC-G02 (2nd).jpg'],
  canon_canon_maintenance_cartridge_mcg03:    ['/Canon Maintenance Cartridge MC-G03 (1st).jpg', '/Canon Maintenance Cartridge MC-G03 (2nd).jpg'],
  canon_canon_maintenance_cartridge_mcg04:    ['/Canon Maintenance Cartridge MC-G04 (1st).jpg', '/Canon Maintenance Cartridge MC-G04 (2nd).webp'],
  canon_canon_maintenance_cartridge_mcg05:    ['/Canon Maintenance Cartridge MC-G05 (1st).jpg', '/Canon Maintenance Cartridge MC-G05 (2nd).jpg'],

  // ── HP Printheads ────────────────────────────────────────────────────────────
  hp_hp_m0h51a_black_replacement_gt_printhead_moh51aa:   [],
  hp_hp_m0h50a_tricolor_replacement_gt_printhead_moh50aa:[],

  // ── Peripherals ──────────────────────────────────────────────────────────────
  fingers_fingers_masterhit_wired_mouse:      [],
  fingers_fingers_superhit_wired_mouse:       [],
  fingers_fingers_aerogrip_plus_3in1_wireless_mouse:  [],
  fingers_fingers_cherrygrip_3in1_wireless_mouse:     [],
  fingers_fingers_rangeela_series_keyboard_velvet_combo_c4: [],
  fingers_fingers_aeroclicks_combo_wireless_keyboard_mouse_set: [],
  fingers_fingers_teenyclicks_mini_bluetooth_keyboard: [],
  fingers_fingers_btfreedom_mini_bluetooth_keyboard:  [],
  fingers_fingers_chessycombo_wired_keyboard_mouse_set: [],
  antesports_antesports_km540_gaming_keyboard_mouse_combo: [
    '/AntEsports KM540 Gaming Keyboard & Mouse Combo (1st).jpg',
    '/AntEsports KM540 Gaming Keyboard & Mouse Combo (2nd).jpg',
  ],

  // ── HP GT Inks ───────────────────────────────────────────────────────────────
  hp_hp_gt52_c_cyan_ink_bottle:               [],
  hp_hp_gt52_m_magenta_ink_bottle:            [],
  hp_hp_gt52_y_yellow_ink_bottle:             [],
  hp_hp_gt53_bk_black_ink_bottle:             [],

  // ── Accessories ──────────────────────────────────────────────────────────────
  ranz_15m_usb_printer_cable:                 [],
  ranz_3m_usb_printer_cable:                  [],
  ranz_5m_usb_printer_cable:                  [],
  ranz_2_pin_power_cord_15m:                  [],
  ranz_cat_6_patch_cord_3m:                   [],
  ranz_cat_6_patch_cord_15m:                  [],
  ranz_cat_6_patch_cord_1m:                   [],
  ranz_screen_cleaning_expert_rzck31:          [],
  ranz_hdmi_to_hdmi_cable_4k2k_60hz_cabrio:   [],
  ranz_vga_to_hdmi_converter_rzvghdx:         [],
};
// ─────────────────────────────────────────────────────────────────────────────

export async function GET() {
  try {
    // Transform products
    const productsData = dummyProducts.map(p => {
      const { imageIcon, badgeColor, ...rest } = p;
      const productImages = PRODUCT_IMAGE_MAP[p.id] ?? [];

      return {
        ...rest,
        badge: rest.badge || null,
        badge_color: badgeColor || null,
        features: rest.features || [],
        specifications: rest.specifications || [],
        images: productImages,
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
        bullets: rest.bullets || [],
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

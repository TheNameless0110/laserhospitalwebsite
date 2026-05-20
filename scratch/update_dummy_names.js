const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../src/lib/dummyData.js');
let content = fs.readFileSync(targetFile, 'utf8');

const updates = [
  { id: 'canon_pixma_g2010', name: 'CANON PIXMA G2010' },
  { id: 'canon_pixma_g2012', name: 'CANON PIXMA G2012' },
  { id: 'canon_pixma_g3010', name: 'CANON PIXMA G3010' },
  { id: 'canon_pixma_g3012', name: 'CANON PIXMA G3012' },
  { id: 'canon_pixma_g4010', name: 'CANON PIXMA G4010' },
  { id: 'canon_pixma_g2770', name: 'CANON PIXMA G2770' },
  { id: 'canon_pixma_g3770', name: 'CANON PIXMA G3770' },
  { id: 'canon_pixma_g570', name: 'CANON PIXMA G570' },
  { id: 'canon_pixma_g670', name: 'CANON PIXMA G670' },
  { id: 'epson_ecotank_l8050', name: 'EPSON EcoTank L8050' },
  { id: 'hp_smart_tank_525', name: 'HP Smart Tank 525' },
  { id: 'hp_smart_tank_580', name: 'HP Smart Tank 580' },
  { id: 'hp_smart_tank_585', name: 'HP Smart Tank 585' },
  { id: 'hp_laser_303d', name: 'HP Laser 303d' },
  { id: 'hp_laser_303dw', name: 'HP Laser 303dw' },
  { id: 'hp_laser_mfp_323d', name: 'HP Laser MFP 323d' },
  { id: 'hp_laser_mfp_323dnw', name: 'HP Laser MFP 323dnw' },
  { id: 'hp_laser_mfp_323sdnw', name: 'HP Laser MFP 323sdnw' },
  { id: 'hp_laserjet_pro_mfp_m126a', name: 'HP LaserJet Pro MFP M126a' },
  { id: 'hp_laserjet_pro_mfp_m126nw', name: 'HP LaserJet Pro MFP M126nw' },
  { id: 'hp_laserjet_pro_p1108_plus', name: 'HP LaserJet Pro P1108 Plus' },
  { id: 'ranz_15m_usb_printer_cable', name: 'RANZ 1.5m USB Printer Cable' },
  { id: 'ranz_3m_usb_printer_cable', name: 'RANZ 3m USB Printer Cable' },
  { id: 'ranz_5m_usb_printer_cable', name: 'RANZ 5m USB Printer Cable' },
  { id: 'ranz_2_pin_power_cord_15m', name: 'RANZ 2 PIN Power Cord (1.5m)' },
  { id: 'ranz_cat_6_patch_cord_3m', name: 'RANZ CAT 6 Patch Cord (3m)' },
  { id: 'ranz_cat_6_patch_cord_15m', name: 'RANZ CAT 6 Patch Cord (1.5m)' },
  { id: 'ranz_cat_6_patch_cord_1m', name: 'RANZ CAT 6 Patch Cord (1m)' },
  { id: 'ranz_screen_cleaning_expert_rzck31', name: 'RANZ Screen Cleaning Expert RZ-CK31' },
  { id: 'ranz_hdmi_to_hdmi_cable_4k2k_60hz_cabrio', name: 'RANZ HDMI to HDMI Cable 4K2K 60Hz CABRIO' },
  { id: 'ranz_vga_to_hdmi_converter_rzvghdx', name: 'RANZ VGA to HDMI Converter RZ-VGHDX' },
  { id: 'fingers_wireless_dongle_fwf300', name: 'FINGERS Wireless Dongle FWF300' },
  { id: 'fingers_wireless_dongle_fwf150', name: 'FINGERS Wireless Dongle FWF150' },
  { id: 'smartpro_25_usb_20_hdd_case', name: 'FINGERS 2.5" USB 2.0 HDD CASE' },
  { id: 'lapcare_sata_lpssd128gb', name: 'LAPCARE SATA LPSSD128GB' },
  { id: 'lapcare_sata_lpssd256gb', name: 'LAPCARE SATA LPSSD256GB' },
  { id: 'lapcare_sata_lpssd512gb', name: 'LAPCARE SATA LPSSD512GB' },
  { id: 'aarvex_256gb_nvme_ax950_pro_series_ssd', name: 'AARVEX 256GB NVMe AX950 Pro Series SSD' },
  { id: 'aarvex_256gb_sata_ax950_pro_series_ssd', name: 'AARVEX 256GB SATA AX950 Pro Series SSD' },
  { id: 'aarvex_128gb_sata_ax950_pro_series_ssd', name: 'AARVEX 128GB SATA AX950 Pro Series SSD' }
];

updates.forEach(u => {
  const regex = new RegExp(`({ id: "${u.id}", name: ")[^"]+(")`, "g");
  content = content.replace(regex, `$1${u.name}$2`);
  
  // also uppercase the brands
  const brandRegex = new RegExp(`({ id: "${u.id}",[^}]+brand: ")[^"]+(")`);
  let match = content.match(brandRegex);
  if (match) {
     const newBrand = u.name.split(' ')[0].toUpperCase();
     content = content.replace(brandRegex, `$1${newBrand}$2`);
  }
});

// Update all remaining brands to uppercase
const brandReplacements = {
  'Fingers': 'FINGERS',
  'Canon': 'CANON',
  'Epson': 'EPSON',
  'Ranz': 'RANZ',
  'Lapcare': 'LAPCARE',
  'SmartPro': 'SMARTPRO',
  'AntEsports': 'ANTESPORTS',
  'Hp': 'HP'
};
Object.keys(brandReplacements).forEach(key => {
   const rgx = new RegExp(`brand: "${key}"`, 'g');
   content = content.replace(rgx, `brand: "${brandReplacements[key]}"`);
});

fs.writeFileSync(targetFile, content);
console.log('Done replacing dummy names.');

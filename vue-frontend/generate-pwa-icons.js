import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// Get the directory name properly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const iconsDir = path.resolve(__dirname, 'public/img/icons');
const logoPath = path.resolve(__dirname, 'public/logo.png');

console.log('Icons directory:', iconsDir);
console.log('Logo path:', logoPath);

// Make sure the icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
  console.log('Created icons directory');
}

// Check if logo exists
if (!fs.existsSync(logoPath)) {
  console.error('Logo file not found:', logoPath);
  process.exit(1);
}

// Define the icon sizes we need
const icons = [
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'pwa-192x192.png', size: 192 },
  { name: 'pwa-512x512.png', size: 512 }
];

// Generate a maskable icon (with padding)
async function generateMaskableIcon() {
  // Maskable icons need padding around the safe area (recommended 10% padding)
  const outputPath = path.join(iconsDir, 'maskable-icon.png');
  
  try {
    // For a maskable icon, we need to ensure there's padding for the safe area
    // We'll add padding by creating a composite image with a white background
    const size = 512;
    const padding = Math.round(size * 0.1); // 10% padding
    
    // Create a white square background
    const background = await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    }).png().toBuffer();
    
    // Load and resize the logo with padding
    const resizedLogo = await sharp(logoPath)
      .resize(size - (padding * 2), size - (padding * 2), {
        fit: 'contain',
        position: 'center'
      })
      .toBuffer();
    
    // Composite the logo on top of the white background
    await sharp(background)
      .composite([{
        input: resizedLogo,
        top: padding,
        left: padding
      }])
      .toFile(outputPath);
    
    console.log(`Generated maskable icon: ${outputPath}`);
  } catch (error) {
    console.error('Error generating maskable icon:', error);
  }
}

// Generate all the icons
async function generateIcons() {
  try {
    console.log('Starting icon generation from logo:', logoPath);
    
    // Generate regular icons
    for (const icon of icons) {
      const outputPath = path.join(iconsDir, icon.name);
      
      await sharp(logoPath)
        .resize(icon.size, icon.size, {
          fit: 'contain', 
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .toFile(outputPath);
      
      console.log(`Generated icon: ${icon.name} (${icon.size}x${icon.size})`);
    }
    
    // Generate the maskable icon
    await generateMaskableIcon();
    
    console.log('All PWA icons have been generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error.message);
    console.error(error.stack);
  }
}

// Run the icon generation
generateIcons();

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// Get the directory name properly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const logoPath = path.resolve(__dirname, 'public/logo.png');
const svgTemplatePath = path.resolve(__dirname, 'public/img/icons/icon-template.svg');

async function createSvgTemplate() {
  try {
    console.log('Creating SVG template from', logoPath);
    
    // Check if source file exists
    if (!fs.existsSync(logoPath)) {
      console.error('Source logo does not exist:', logoPath);
      return;
    }
    
    // Create a simple SVG template based on logo dimensions
    const svgContent = `<!-- SVG Icon Template Generated from logo.png -->
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="white"/>
  <image x="56" y="56" width="400" height="400" href="../../../logo.png" />
</svg>`;
    
    // Write the SVG file
    fs.writeFileSync(svgTemplatePath, svgContent);
    console.log('Successfully created SVG template at', svgTemplatePath);
    
  } catch (error) {
    console.error('Error creating SVG template:', error);
  }
}

// Run the function
createSvgTemplate();

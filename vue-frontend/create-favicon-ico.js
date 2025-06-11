import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// Get the directory name properly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const faviconPath = path.resolve(__dirname, 'public/img/icons/favicon-32x32.png');
const faviconIcoPath = path.resolve(__dirname, 'public/favicon.ico');

async function createFaviconIco() {
  try {
    console.log('Creating favicon.ico from', faviconPath);
    
    // Check if source file exists
    if (!fs.existsSync(faviconPath)) {
      console.error('Source favicon does not exist:', faviconPath);
      return;
    }
    
    console.log('Source file exists, copying to', faviconIcoPath);
    
    // Simply copy the PNG as ICO (most browsers support PNG favicons)
    // For proper ICO conversion, a different library would be needed
    fs.copyFileSync(faviconPath, faviconIcoPath);
    
    // Verify the file was created
    if (fs.existsSync(faviconIcoPath)) {
      console.log('Successfully created favicon.ico at', faviconIcoPath);
    } else {
      console.error('Failed to create favicon.ico at', faviconIcoPath);
    }
  } catch (error) {
    console.error('Error creating favicon.ico:', error.message);
    console.error(error.stack);
  }
}

createFaviconIco();

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const sizes = [16, 32, 192, 512];
const appleSize = 180;

// Ensure the icons directory exists
const iconsDir = path.join(process.cwd(), "public", "icons");
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Read the SVG file
const svgBuffer = fs.readFileSync(path.join(iconsDir, "icon.svg"));

// Generate favicons for different sizes
sizes.forEach((size) => {
  sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(path.join(iconsDir, `favicon-${size}x${size}.png`))
    .catch(console.error);
});

// Generate Apple Touch Icon
sharp(svgBuffer)
  .resize(appleSize, appleSize)
  .png()
  .toFile(path.join(iconsDir, "apple-touch-icon.png"))
  .catch(console.error);

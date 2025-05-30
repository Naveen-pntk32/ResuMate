const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const sizes = [16, 32, 192, 512];
const appleSize = 180;
const cornerRadius = 8; // Adjust this value to control the roundness

// Ensure the icons directory exists
const iconsDir = path.join(process.cwd(), "public", "icons");
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Read the SVG file
const svgBuffer = fs.readFileSync(path.join(iconsDir, "icon.svg"));

// Generate favicons for different sizes
sizes.forEach((size) => {
  // Calculate appropriate corner radius based on icon size
  const radius = Math.max(Math.round(size * (cornerRadius / 32)), 2); // Scale radius with icon size, minimum 2px

  sharp(svgBuffer)
    .resize(size, size)
    .composite([
      {
        input: Buffer.from(
          `<svg><rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}"/></svg>`
        ),
        blend: "dest-in",
      },
    ])
    .png()
    .toFile(path.join(iconsDir, `favicon-${size}x${size}.png`))
    .catch(console.error);
});

// Generate Apple Touch Icon with rounded corners
const appleRadius = Math.round(appleSize * (cornerRadius / 32));
sharp(svgBuffer)
  .resize(appleSize, appleSize)
  .composite([
    {
      input: Buffer.from(
        `<svg><rect x="0" y="0" width="${appleSize}" height="${appleSize}" rx="${appleRadius}" ry="${appleRadius}"/></svg>`
      ),
      blend: "dest-in",
    },
  ])
  .png()
  .toFile(path.join(iconsDir, "apple-touch-icon.png"))
  .catch(console.error);

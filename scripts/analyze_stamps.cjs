const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\adnan\\.gemini\\antigravity\\brain\\ead6c2a8-358b-4293-aea2-e07cd141b2e6';
const UPLOADED_FILES = [
    'uploaded_image_0_1768918575366.png',
    'uploaded_image_1_1768918575366.png',
    'uploaded_image_2_1768918575366.png'
];

async function analyze() {
    console.log("Starting analysis...");

    for (const filename of UPLOADED_FILES) {
        const fullPath = path.join(ARTIFACT_DIR, filename);
        if (!fs.existsSync(fullPath)) {
            console.error(`File not found: ${fullPath}`);
            continue;
        }

        console.log(`Processing ${filename}...`);
        try {
            const image = await Jimp.read(fullPath);
            const width = image.bitmap.width;
            const height = image.bitmap.height;
            console.log(`  Dimensions: ${width}x${height}`);

            // Detect white rectangles (cards)
            // Strategy: Simple scanline to find white runs, then correlating vertical runs?
            // Or just sampling a grid?
            // Assuming the cards are arranged in a grid.
            // Let's create a debug image showing which pixels match "Background" vs "Card"

            // Sample center pixel to guess background color? Or corner?
            const cornerColor = image.getPixelColor(0, 0);
            console.log(`  Corner color: 0x${cornerColor.toString(16)}`);

            // Let's output a simple stat: % of white pixels
            let whitePixels = 0;
            image.scan(0, 0, width, height, function (x, y, idx) {
                const red = this.bitmap.data[idx + 0];
                const green = this.bitmap.data[idx + 1];
                const blue = this.bitmap.data[idx + 2];
                if (red > 250 && green > 250 && blue > 250) {
                    whitePixels++;
                }
            });
            console.log(`  White pixels: ${whitePixels} (${Math.round(whitePixels / (width * height) * 100)}%)`);

        } catch (err) {
            console.error(`  Error processing ${filename}:`, err);
        }
    }
}

analyze();

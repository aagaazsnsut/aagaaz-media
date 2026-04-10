const fs = require('fs');
const path = require('path');

// Sabse important: Folder path check karna
const galleryDir = path.join(process.cwd(), 'aagaaz/gallery');
const output = {};

console.log("Scanning directory:", galleryDir);

if (fs.existsSync(galleryDir)) {
    const events = fs.readdirSync(galleryDir);
    console.log("Found folders:", events);

    events.forEach(event => {
        const eventPath = path.join(galleryDir, event);
        if (fs.lstatSync(eventPath).isDirectory()) {
            const images = fs.readdirSync(eventPath)
                .filter(file => /\.(jpg|jpeg|png|webp|avif)$/i.test(file))
                .map(file => `aagaaz/gallery/${event}/${file}`);
            
            if (images.length > 0) {
                output[event] = images;
                console.log(`✅ Added ${images.length} images from ${event}`);
            }
        }
    });

    fs.writeFileSync('gallery-manifest.json', JSON.stringify(output, null, 2));
    console.log('🚀 Manifest file updated successfully!');
} else {
    console.log('❌ Error: Gallery directory NOT found at', galleryDir);
    // Ek dummy data daal dete hain testing ke liye
    fs.writeFileSync('gallery-manifest.json', JSON.stringify({ error: "Folder not found" }, null, 2));
}

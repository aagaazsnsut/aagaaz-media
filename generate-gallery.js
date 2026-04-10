const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, 'aagaaz/gallery');
const output = {};

if (fs.existsSync(galleryDir)) {
    const events = fs.readdirSync(galleryDir);
    events.forEach(event => {
        const eventPath = path.join(galleryDir, event);
        if (fs.lstatSync(eventPath).isDirectory()) {
            const images = fs.readdirSync(eventPath)
                .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
                .map(file => `aagaaz/gallery/${event}/${file}`);
            
            output[event] = images;
        }
    });

    fs.writeFileSync('gallery-manifest.json', JSON.stringify(output, null, 2));
    console.log('✅ Manifest generated!');
}
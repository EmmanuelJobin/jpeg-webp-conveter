const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceFolder = 'F:/Gallery'; // Change this to your source folder containing JPEG images
const outputFolder = 'F:/Webp'; // Change this to your desired output folder

function convertImagesInFolder(folderPath) {
  // Read all files in the folder
  fs.readdirSync(folderPath).forEach((file) => {
    const filePath = path.join(folderPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      // If it's a subfolder, recursively convert images in that subfolder
      convertImagesInFolder(filePath);
    } else if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')) {
      // If it's a JPEG file, convert it to WebP
      const outputPath = path.join(outputFolder, file.replace(/\.(jpg|jpeg)$/i, '.webp'));

      sharp(filePath)
      .rotate() 
        .webp()
        .toFile(outputPath, (err) => {
          if (err) {
            console.error(`Error converting ${file}: ${err}`);
          } else {
            console.log(`Converted ${file} to WebP`);
          }
        });
    }
  });
}

// Ensure the output folder exists
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Start the conversion process from the source folder
convertImagesInFolder(sourceFolder);


//igyfig




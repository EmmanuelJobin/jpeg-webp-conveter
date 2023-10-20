const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const sourceFolder = "F:/Gallery"; // Change this to your source folder containing JPEG images
const outputFolder = "F:/Webp"; // Change this to your desired output folder

function createOutputPath(inputPath) {
  const relativePath = path.relative(sourceFolder, inputPath);
  const outputPath = path.join(outputFolder, relativePath);

  return outputPath.replace(/\.(jpg|jpeg)$/i, ".webp");
}

function convertImagesInFolder(folderPath) {
  fs.readdirSync(folderPath).forEach((file) => {
    const filePath = path.join(folderPath, file);
    const outputPath = createOutputPath(filePath);

    if (fs.statSync(filePath).isDirectory()) {
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }
      convertImagesInFolder(filePath);
    } else if (
      file.toLowerCase().endsWith(".jpg") ||
      file.toLowerCase().endsWith(".jpeg")
    ) {
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

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

convertImagesInFolder(sourceFolder);

import fs from 'fs';
import path from 'path';
import Tesseract from 'tesseract.js';

async function recognizeText(imagePath) {
    try {
        const result = await Tesseract.recognize(imagePath, 'chi_sim');
        return result.data.text;
    } catch (error) {
        console.error('Error:', error);
        return '';
    }
}

async function processImages() {
    const dataDir = './data';
    const outputDir = './output';
    
    // Create the output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    
    // Read all files in the data directory
    fs.readdir(dataDir, async (err, files) => {
        if (err) {
            console.error('Error:', err);
            return;
        }
        
        // Process each file
        for (const file of files) {
            const imagePath = path.join(dataDir, file);
            const text = await recognizeText(imagePath);
            
            // Write the extracted text to a new file in the output directory
            const outputFilePath = path.join(outputDir, `${file}.txt`);
            fs.writeFileSync(outputFilePath, text);
            
            console.log(`Text extracted from ${file}: ${text}`);
        }
    });
}

processImages();
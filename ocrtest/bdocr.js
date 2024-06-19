const fs = require('fs');
const path = require('path');
const AipOcrClient = require("baidu-aip-sdk").ocr;
// import { AipOcrClient } from 'baidu-aip-sdk';

const APP_ID = '79278042';
const API_KEY = 'N7mF6V5vqAHkYh9HWQgdIoMl';
const SECRET_KEY = 'Z82wEy1XkILoHHtraQs1HahZryRZwHE8';

const client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);


const image = fs.readFileSync('./data/10001.jpg');

client
  .generalBasic(image)
  .then(function(result) {
    console.log(result);
  })
  .catch(function(err) {
    console.log(err);
  });
// async function recognizeText(imagePath) {
//     try {
//         const image = fs.readFileSync(imagePath);
//         const result = await client.generalBasic(image);
//         console.log(result);
//         return result.words_result.map((word) => word.words).join('\n');
//     } catch (error) {
//         console.error('Error:', error);
//         return '';
//     }
// }

// async function processImages() {
//     const dataDir = './data';
//     const outputDir = './output';

//     // Create the output directory if it doesn't exist
//     if (!fs.existsSync(outputDir)) {
//         fs.mkdirSync(outputDir);
//     }

//     // Read all files in the data directory
//     fs.readdir(dataDir, async (err, files) => {
//         if (err) {
//             console.error('Error:', err);
//             return;
//         }

//         // Process each file
//         for (const file of files) {
//             const imagePath = path.join(dataDir, file);
//             const text = await recognizeText(imagePath);

//             // Write the extracted text to a new file in the output directory
//             const outputFilePath = path.join(outputDir, `${file}.txt`);
//             fs.writeFileSync(outputFilePath, text);

//             console.log(`Text extracted from ${file}: ${text}`);
//         }
//     });
// }

// processImages();
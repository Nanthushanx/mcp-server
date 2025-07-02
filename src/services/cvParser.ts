import fs from 'fs';
import path from 'path';
// @ts-ignore
import pdfParse from 'pdf-parse';

export async function parseCV() : Promise<String> {
    const pdfPath = path.resolve(__dirname, '../../resume/NanthushanResume.pdf');
    const dataBuffer = fs.readFileSync(pdfPath);
    const parsedInfo = await pdfParse(dataBuffer);
    
    return parsedInfo.text;
}
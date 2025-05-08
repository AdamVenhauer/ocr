
import { createWorker } from 'tesseract.js';

export interface OcrResult {
  text: string;
  confidence: number;
}

/**
 * Process an image and extract text using Tesseract.js OCR
 */
export const processImageWithOcr = async (imageFile: File): Promise<OcrResult> => {
  try {
    // Create a worker
    const worker = await createWorker('eng');
    
    // Convert file to data URL for processing
    const imageUrl = URL.createObjectURL(imageFile);
    
    // Recognize text in the image
    const { data } = await worker.recognize(imageUrl);
    
    // Cleanup
    URL.revokeObjectURL(imageUrl);
    await worker.terminate();
    
    return {
      text: data.text || "No text was detected in the image.",
      confidence: data.confidence / 100, // Convert to 0-1 scale
    };
  } catch (error) {
    console.error("OCR processing error:", error);
    throw new Error("Failed to process image with OCR");
  }
};

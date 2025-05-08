
import { createWorker } from 'tesseract.js';

export interface OcrResult {
  text: string;
  confidence: number;
}

export type OcrLanguage = "eng" | "ces" | "deu" | "fra" | "spa" | "ita" | "por" | "rus" | "pol" | "ukr" | "slk";

/**
 * Process an image and extract text using Tesseract.js OCR
 */
export const processImageWithOcr = async (
  imageFile: File, 
  language: OcrLanguage = "ces"
): Promise<OcrResult> => {
  try {
    // Create a worker with specified language
    const worker = await createWorker(language);
    
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

// Language name mapping for display
export const languageOptions = [
  { value: "eng", label: "English" },
  { value: "ces", label: "Czech" },
  { value: "slk", label: "Slovak" },
  { value: "deu", label: "German" },
  { value: "fra", label: "French" },
  { value: "spa", label: "Spanish" },
  { value: "ita", label: "Italian" },
  { value: "por", label: "Portuguese" },
  { value: "rus", label: "Russian" },
  { value: "pol", label: "Polish" },
  { value: "ukr", label: "Ukrainian" },
];

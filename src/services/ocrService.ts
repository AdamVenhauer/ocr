
// This is a mock service for OCR functionality
// In a real application, you would integrate with an actual OCR API

export interface OcrResult {
  text: string;
  confidence: number;
}

/**
 * Process an image and extract text using OCR
 * In a real app, this would call a real OCR API like Tesseract.js or a cloud service
 */
export const processImageWithOcr = async (imageFile: File): Promise<OcrResult> => {
  return new Promise((resolve) => {
    // Simulate processing time
    const processingTime = Math.random() * 2000 + 1000;
    
    setTimeout(() => {
      // This is just a mock result
      // In a real app, this would be the actual OCR result
      const mockResult: OcrResult = {
        text: "This is sample extracted text from your image.\n\nIn a real application, this text would be extracted using an OCR engine like Tesseract.js or a cloud OCR API service.\n\nYou can replace this mock service with a real OCR implementation later.",
        confidence: 0.95,
      };
      
      resolve(mockResult);
    }, processingTime);
  });
};

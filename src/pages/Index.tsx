
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import DropZone from '@/components/DropZone';
import ImagePreview from '@/components/ImagePreview';
import ResultText from '@/components/ResultText';
import { processImageWithOcr } from '@/services/ocrService';
import { useToast } from '@/hooks/use-toast';
import { Scan } from 'lucide-react';

const Index = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [extractedText, setExtractedText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { toast } = useToast();

  const handleImageUpload = async (imageFile: File) => {
    // Reset states for new upload
    setExtractedText('');
    setIsProcessing(true);
    
    // Create URL for image preview
    const url = URL.createObjectURL(imageFile);
    setImage(imageFile);
    setImageUrl(url);
    
    try {
      // Process image with OCR
      const result = await processImageWithOcr(imageFile);
      setExtractedText(result.text);
      
      toast({
        title: "Text extraction complete",
        description: "Your image has been processed successfully.",
      });
    } catch (error) {
      console.error("OCR processing error:", error);
      toast({
        title: "Processing failed",
        description: "We couldn't extract text from this image.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveImage = () => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
    setImage(null);
    setImageUrl('');
    setExtractedText('');
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Image Text Extractor
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Upload an image to extract text using OCR technology
            </p>
          </div>

          <div className="space-y-6">
            {!image ? (
              <DropZone 
                onImageUpload={handleImageUpload}
                className="h-64 sm:h-80" 
              />
            ) : (
              <div className="space-y-6">
                <ImagePreview 
                  imageUrl={imageUrl}
                  isProcessing={isProcessing}
                  onRemove={handleRemoveImage}
                />
                
                {isProcessing && (
                  <div className="flex justify-center py-4">
                    <div className="flex items-center space-x-2 text-sm text-blue-600">
                      <Scan className="h-5 w-5 animate-pulse-subtle" />
                      <span>Processing your image with OCR...</span>
                    </div>
                  </div>
                )}
                
                <ResultText text={extractedText} />
                
                <div className="flex justify-center">
                  <button
                    onClick={handleRemoveImage}
                    className="text-sm text-gray-500 hover:text-blue-600"
                  >
                    Upload a different image
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500">
        <p>© 2025 PixelParse - OCR Text Extraction Tool</p>
      </footer>
    </div>
  );
};

export default Index;

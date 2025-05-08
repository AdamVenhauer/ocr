
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImagePreviewProps {
  imageUrl: string;
  isProcessing: boolean;
  onRemove: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, isProcessing, onRemove }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative rounded-lg border border-gray-200 bg-white shadow-sm">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        </div>
      )}
      
      <div className={`relative ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <img
          src={imageUrl}
          alt="Uploaded image"
          className="mx-auto h-auto max-h-[400px] w-auto rounded-lg object-contain"
          onLoad={() => setIsLoaded(true)}
        />
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-lg">
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
              <p className="mt-4 text-sm font-medium text-gray-700">Processing Image...</p>
            </div>
          </div>
        )}
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 text-gray-500 hover:bg-white hover:text-red-500"
        onClick={onRemove}
        disabled={isProcessing}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ImagePreview;

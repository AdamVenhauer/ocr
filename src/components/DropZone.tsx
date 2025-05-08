
import React, { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DropZoneProps {
  onImageUpload: (image: File) => void;
  className?: string;
}

const DropZone: React.FC<DropZoneProps> = ({ onImageUpload, className }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    handleFiles(files);
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  }, []);

  const handleFiles = (files: FileList) => {
    if (files.length === 0) return;
    
    const file = files[0];
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
    
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, GIF, BMP, WEBP).",
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }
    
    onImageUpload(file);
  };

  return (
    <div 
      className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all ${
        isDragging 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-gray-400'
      } ${className}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-blue-100 bg-opacity-80">
          <div className="flex flex-col items-center text-blue-600">
            <Upload className="h-10 w-10 animate-bounce" />
            <p className="mt-2 font-medium">Drop to upload</p>
          </div>
        </div>
      )}
      
      <div className="flex flex-col items-center justify-center p-6 sm:p-8">
        <div className="mb-4 rounded-full bg-blue-100 p-3">
          <Upload className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-800">
          Drag &amp; Drop Image
        </h3>
        <p className="mb-4 text-center text-sm text-gray-500">
          or click to upload images (max 5MB)
        </p>
        
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileInputChange}
        />
        <label htmlFor="file-upload">
          <Button 
            variant="outline" 
            className="cursor-pointer border-blue-500 text-blue-500 hover:bg-blue-50"
            onClick={(e) => e.stopPropagation()}
            type="button"
          >
            Select Image
          </Button>
        </label>
      </div>
    </div>
  );
};

export default DropZone;

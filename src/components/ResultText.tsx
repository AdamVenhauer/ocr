
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, Check, FileText } from 'lucide-react';

interface ResultTextProps {
  text: string;
  confidence?: number;
}

const ResultText: React.FC<ResultTextProps> = ({ text, confidence }) => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(Boolean(text));
  }, [text]);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast({
        title: "Text copied to clipboard",
        variant: "default",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy text",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm animate-fade-in`}>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-medium text-gray-800">Extracted Text</h3>
          {confidence !== undefined && (
            <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
              {Math.round(confidence * 100)}% confidence
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-gray-500 hover:text-blue-500"
          onClick={handleCopyClick}
        >
          {isCopied ? (
            <>
              <Check className="mr-1 h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="mr-1 h-4 w-4" />
              Copy Text
            </>
          )}
        </Button>
      </div>
      <div className="max-h-60 overflow-y-auto rounded border border-gray-200 bg-gray-50 p-3">
        {text ? (
          <p className="whitespace-pre-wrap text-sm text-gray-700">{text}</p>
        ) : (
          <p className="text-center text-sm text-gray-400 py-4">No text found in image</p>
        )}
      </div>
    </div>
  );
};

export default ResultText;

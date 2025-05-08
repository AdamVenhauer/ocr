
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from 'lucide-react';
import { OcrLanguage, languageOptions } from '@/services/ocrService';

interface LanguageSelectorProps {
  value: OcrLanguage;
  onChange: (value: OcrLanguage) => void;
  disabled?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ value, onChange, disabled = false }) => {
  return (
    <div className="flex items-center gap-2">
      <Globe className="h-5 w-5 text-gray-600" />
      <div className="flex-grow">
        <Select
          disabled={disabled}
          value={value}
          onValueChange={(val) => onChange(val as OcrLanguage)}
        >
          <SelectTrigger className="w-full bg-white border-gray-200">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {languageOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LanguageSelector;


import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Scan, FileImage, Text, Search } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
            About PixelParse
          </h1>
          
          <div className="prose prose-blue max-w-none">
            <p className="text-lg text-gray-600">
              PixelParse is a modern web application designed to extract text from images using Optical Character Recognition (OCR) technology. Our tool makes it easy to convert text in images to editable, searchable text.
            </p>
            
            <h2 className="mt-8 text-2xl font-semibold text-gray-800">How It Works</h2>
            
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <FileImage className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-800">
                  1. Upload Image
                </h3>
                <p className="text-gray-600">
                  Drag and drop or select an image containing text that you want to extract.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Scan className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-800">
                  2. Process with OCR
                </h3>
                <p className="text-gray-600">
                  Our system analyzes the image and identifies text patterns using advanced OCR algorithms.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Text className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-800">
                  3. Extract Text
                </h3>
                <p className="text-gray-600">
                  Text is extracted from the image and presented in an editable format.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-800">
                  4. Copy & Use
                </h3>
                <p className="text-gray-600">
                  Copy the extracted text and use it in your documents, emails, or any other application.
                </p>
              </div>
            </div>
            
            <h2 className="mt-10 text-2xl font-semibold text-gray-800">Technologies Used</h2>
            <p className="mt-4 text-gray-600">
              PixelParse is built using modern web technologies including React, TypeScript, and Tailwind CSS. For the OCR functionality, we leverage advanced machine learning algorithms to ensure accurate text extraction from various image formats.
            </p>
            
            <div className="mt-10 flex justify-center">
              <Button asChild className="bg-blue-500 hover:bg-blue-600">
                <Link to="/">Try PixelParse Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>© 2025 PixelParse - OCR Text Extraction Tool</p>
      </footer>
    </div>
  );
};

export default AboutPage;

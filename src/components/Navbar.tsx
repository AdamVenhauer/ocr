
import React from 'react';
import { Scan } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="w-full border-b border-gray-200">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <div className="flex items-center">
          <Scan className="h-6 w-6 text-blue-500" />
          <span className="ml-2 text-xl font-semibold text-gray-800">PixelParse</span>
        </div>
        <nav className="ml-auto flex items-center gap-4">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

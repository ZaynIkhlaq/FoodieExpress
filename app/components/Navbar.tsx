"use client"
import Link from 'next/link';
import { FaBars, FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-lg shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600 ${
              isScrolled ? 'opacity-100' : 'opacity-90'
            }`}>
              Foodie Express
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-600 hover:text-red-500' 
                  : 'text-white hover:text-red-200'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/restaurants" 
              className={`text-sm font-medium transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-600 hover:text-red-500' 
                  : 'text-white hover:text-red-200'
              }`}
            >
              Restaurants
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-600 hover:text-red-500' 
                  : 'text-white hover:text-red-200'
              }`}
            >
              About
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button className={`p-2 rounded-full transition-colors duration-300 ${
              isScrolled 
                ? 'text-gray-600 hover:text-red-500 hover:bg-gray-100' 
                : 'text-white hover:text-red-200 hover:bg-white/10'
            }`}>
              <FaSearch className="h-5 w-5" />
            </button>
            <button className={`p-2 rounded-full transition-colors duration-300 ${
              isScrolled 
                ? 'text-gray-600 hover:text-red-500 hover:bg-gray-100' 
                : 'text-white hover:text-red-200 hover:bg-white/10'
            }`}>
              <FaUser className="h-5 w-5" />
            </button>
            <button className={`relative p-2 rounded-full transition-colors duration-300 ${
              isScrolled 
                ? 'text-gray-600 hover:text-red-500 hover:bg-gray-100' 
                : 'text-white hover:text-red-200 hover:bg-white/10'
            }`}>
              <FaShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button className={`p-2 rounded-full transition-colors duration-300 ${
              isScrolled 
                ? 'text-gray-600 hover:text-red-500 hover:bg-gray-100' 
                : 'text-white hover:text-red-200 hover:bg-white/10'
            }`}>
              <FaShoppingCart className="h-5 w-5" />
            </button>
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-600 hover:text-red-500 hover:bg-gray-100' 
                  : 'text-white hover:text-red-200 hover:bg-white/10'
              }`}
            >
              <span className="sr-only">Open menu</span>
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
            <Link 
              href="/" 
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-600 hover:text-red-500 hover:bg-gray-50 transition-colors duration-300"
            >
              Home
            </Link>
            <Link 
              href="/restaurants" 
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-600 hover:text-red-500 hover:bg-gray-50 transition-colors duration-300"
            >
              Restaurants
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-600 hover:text-red-500 hover:bg-gray-50 transition-colors duration-300"
            >
              About
            </Link>
            <div className="border-t border-gray-200 mt-2 pt-2">
              <button className="w-full flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-600 hover:text-red-500 hover:bg-gray-50 transition-colors duration-300">
                <FaSearch className="h-5 w-5 mr-3" />
                Search
              </button>
              <button className="w-full flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-600 hover:text-red-500 hover:bg-gray-50 transition-colors duration-300">
                <FaUser className="h-5 w-5 mr-3" />
                Account
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 

import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white py-4 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="h-12 w-12 relative">
            <img 
              src="/lovable-uploads/7b1f715c-e43b-4c11-b2e1-6a57f96baa21.png" 
              alt="Agro-Nexus Logo" 
              className="h-full w-full object-contain"
            />
          </div>
          <div className="ml-2 text-agro-blue font-bold">
            <span className="text-xl">AGRO-</span>
            <span className="text-xl">NEXUS</span>
            <span className="block text-xs text-gray-500 font-normal tracking-widest ml-1">LIMITED</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-800 hover:text-agro-green font-medium">
            Home
          </Link>
          <Link to="/about" className="text-gray-800 hover:text-agro-green font-medium">
            About Us
          </Link>
          <Link to="/services" className="text-gray-800 hover:text-agro-green font-medium">
            Services
          </Link>
          <Link to="/news" className="text-gray-800 hover:text-agro-green font-medium">
            News
          </Link>
          <Link to="/gallery" className="text-gray-800 hover:text-agro-green font-medium">
            Gallery
          </Link>
          <Link to="/applications" className="text-gray-800 hover:text-agro-green font-medium">
            Applications
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-500 hover:text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="h-6 w-6"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-lg">
          <Link 
            to="/" 
            className="block py-2 text-gray-800 hover:text-agro-green font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="block py-2 text-gray-800 hover:text-agro-green font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link 
            to="/services" 
            className="block py-2 text-gray-800 hover:text-agro-green font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>
          <Link 
            to="/news" 
            className="block py-2 text-gray-800 hover:text-agro-green font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            News
          </Link>
          <Link 
            to="/gallery" 
            className="block py-2 text-gray-800 hover:text-agro-green font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Gallery
          </Link>
          <Link 
            to="/applications" 
            className="block py-2 text-gray-800 hover:text-agro-green font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Applications
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

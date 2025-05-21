
import React from 'react';
import { Link } from 'react-router-dom';
import { CaseSensitive, Hash, Palette, Zap, Image, FileType } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const toolLinks = [
    { name: 'Image Compressor', path: '/image-compressor', icon: Zap },
    { name: 'Image to URL', path: '/image-to-url', icon: Image },
    { name: 'SVG to JPG', path: '/svg-to-jpg', icon: FileType },
    { name: 'JPG to PDF', path: '/jpg-to-pdf', icon: Image },
    { name: 'Case Converter', path: '/case-converter', icon: CaseSensitive },
    { name: 'Hash Generator', path: '/hash-generator', icon: Hash },
    { name: 'Color Converter', path: '/color-converter', icon: Palette },
  ];

  const companyLinks = [
    { name: 'About Us', path: '/about-us' },
    { name: 'Contact Us', path: '/contact-us' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block">
              <span className="text-xl font-bold gradient-text">Quick Converter</span>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm">
              Your one-stop solution for fast, free, and secure online file conversions and utilities. We offer a suite of tools to handle your image, document, and data needs without any software installation.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Tools</h3>
            <ul className="space-y-2">
              {toolLinks.slice(0, 4).map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Quick Converter. All rights reserved. Designed to make your digital life easier.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

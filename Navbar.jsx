
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Zap, Image as ImageIconLucide, FileType, Hash, CaseSensitive, Palette, FileImage, Scissors, UserSquare, Sparkles, MoveHorizontal, FileType2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getTools } from '@/lib/toolsData';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const location = useLocation();
  const toolsMenuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTools = () => setIsToolsOpen(!isToolsOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsToolsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target)) {
        setIsToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toolsMenuRef]);


  const allTools = getTools();

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "circOut" }}
            >
              <span className="text-2xl font-bold gradient-text">Quick Convert</span>
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button
                variant={location.pathname === '/' ? 'secondary' : 'ghost'}
                className="font-medium transition-colors duration-200"
              >
                Home
              </Button>
            </Link>
            
            <div className="relative" ref={toolsMenuRef}>
              <Button
                variant="ghost"
                className="font-medium flex items-center transition-colors duration-200"
                onClick={toggleTools}
                aria-expanded={isToolsOpen}
              >
                Tools <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              <AnimatePresence>
                {isToolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-72 rounded-md shadow-xl bg-background border border-border overflow-hidden z-50"
                  >
                    <div className="py-1 max-h-96 overflow-y-auto grid grid-cols-1">
                      {allTools.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={`flex items-center px-4 py-2.5 text-sm hover:bg-secondary transition-colors duration-150 ${
                            location.pathname === link.path ? 'bg-primary/10 text-primary font-medium' : 'text-foreground'
                          }`}
                        >
                          <link.icon className="mr-3 h-4 w-4 text-primary/80 flex-shrink-0" />
                          {link.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={isOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden mt-3 pb-3 border-t border-border"
            >
              <div className="flex flex-col space-y-1 pt-2">
                 <Link
                    to='/'
                    className={`flex items-center px-3 py-2.5 rounded-md transition-colors duration-150 ${
                      location.pathname === '/'
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-secondary text-foreground'
                    }`}
                  >
                    Home
                  </Link>
                {allTools.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center px-3 py-2.5 rounded-md transition-colors duration-150 ${
                      location.pathname === link.path
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-secondary text-foreground'
                    }`}
                  >
                    {link.icon && <link.icon className="mr-3 h-4 w-4 flex-shrink-0" />}
                    {link.title}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;

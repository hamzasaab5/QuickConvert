
import React, { useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Palette, Copy, Check, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import ToolHeader from '@/components/ToolHeader';

const ColorConverter = () => {
  const [hex, setHex] = useState('#ffffff');
  const [rgb, setRgb] = useState({ r: 255, g: 255, b: 255 });
  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 100 });
  const [copiedValue, setCopiedValue] = useState('');
  const { toast } = useToast();

  const isValidHex = (h) => /^#([0-9A-F]{3}){1,2}$/i.test(h);
  const isValidRgbVal = (val) => !isNaN(val) && val >= 0 && val <= 255;
  const isValidHslVal = (val, type) => {
    if (type === 'h') return !isNaN(val) && val >= 0 && val <= 360;
    if (type === 's' || type === 'l') return !isNaN(val) && val >= 0 && val <= 100;
    return false;
  };

  const hexToRgb = (h) => {
    let r = 0, g = 0, b = 0;
    if (h.length === 4) {
      r = parseInt(h[1] + h[1], 16);
      g = parseInt(h[2] + h[2], 16);
      b = parseInt(h[3] + h[3], 16);
    } else if (h.length === 7) {
      r = parseInt(h[1] + h[2], 16);
      g = parseInt(h[3] + h[4], 16);
      b = parseInt(h[5] + h[6], 16);
    }
    return { r, g, b };
  };

  const rgbToHex = (r, g, b) => {
    const toHex = (c) => c.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0; 
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h=0; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };
  
  const hslToRgb = (h, s, l) => {
    s /= 100; l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return { r: Math.round(255 * f(0)), g: Math.round(255 * f(8)), b: Math.round(255 * f(4)) };
  };

  const updateFromHex = useCallback((newHex) => {
    setHex(newHex);
    if (isValidHex(newHex)) {
      const newRgb = hexToRgb(newHex);
      setRgb(newRgb);
      setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
    }
  }, []);

  const updateFromRgb = useCallback((newRgb) => {
    setRgb(newRgb);
    if (isValidRgbVal(newRgb.r) && isValidRgbVal(newRgb.g) && isValidRgbVal(newRgb.b)) {
      setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
      setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
    }
  }, []);
  
  const updateFromHsl = useCallback((newHsl) => {
    setHsl(newHsl);
     if (isValidHslVal(newHsl.h, 'h') && isValidHslVal(newHsl.s, 's') && isValidHslVal(newHsl.l, 'l')) {
      const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
      setRgb(newRgb);
      setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }
  }, []);
  
  useEffect(() => { // Initial sync if needed, e.g. from a color picker
    if(isValidHex(hex)){
        const initialRgb = hexToRgb(hex);
        if(rgb.r !== initialRgb.r || rgb.g !== initialRgb.g || rgb.b !== initialRgb.b) {
            setRgb(initialRgb);
            setHsl(rgbToHsl(initialRgb.r, initialRgb.g, initialRgb.b));
        }
    }
  }, [hex]);


  const handleCopy = useCallback((value) => {
    navigator.clipboard.writeText(value)
      .then(() => {
        setCopiedValue(value);
        toast({ title: `Copied "${value}" to clipboard!` });
        setTimeout(() => setCopiedValue(''), 2000);
      })
      .catch(err => {
        toast({ title: "Copy failed", description: "Could not copy value.", variant: "destructive" });
        console.error('Copy failed:', err);
      });
  }, [toast]);

  return (
    <>
      <Helmet>
        <title>Color Converter - HEX, RGB, HSL | Quick Converter</title>
        <meta name="description" content="Convert colors between HEX, RGB, and HSL formats with Quick Converter's free online color tool. Includes a color picker for easy selection." />
        <meta name="keywords" content="color converter, hex to rgb, rgb to hex, hsl converter, online color tool, color picker, css colors" />
        <link rel="canonical" href="https://yourwebsite.com/color-converter" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-32 pb-20"
      >
        <ToolHeader
          title="Color Converter"
          description="Easily convert colors between HEX, RGB, and HSL formats. Use the color picker or enter values manually."
          icon={Palette}
        />
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8 mb-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          >
            <div>
              <label htmlFor="colorPicker" className="block text-sm font-medium text-muted-foreground mb-2">Color Picker</label>
              <Input 
                type="color" 
                id="colorPicker" 
                value={hex} 
                onChange={(e) => updateFromHex(e.target.value)} 
                className="w-full h-20 p-1 cursor-pointer rounded-md border-border bg-background"
                aria-label="Color Picker"
              />
              <div className="mt-4 p-4 rounded-md h-20" style={{ backgroundColor: hex }}></div>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="hexInput" className="block text-sm font-medium text-muted-foreground mb-1">HEX</label>
                <div className="flex items-center">
                  <Input id="hexInput" value={hex} onChange={(e) => updateFromHex(e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`)} placeholder="#RRGGBB" className="bg-background/50 font-mono" />
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(hex)} className="ml-2">
                    {copiedValue === hex ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">RGB</label>
                <div className="flex gap-2 items-center">
                  <Input type="number" value={rgb.r} onChange={(e) => updateFromRgb({ ...rgb, r: parseInt(e.target.value) || 0 })} placeholder="R" min="0" max="255" className="bg-background/50" />
                  <Input type="number" value={rgb.g} onChange={(e) => updateFromRgb({ ...rgb, g: parseInt(e.target.value) || 0 })} placeholder="G" min="0" max="255" className="bg-background/50" />
                  <Input type="number" value={rgb.b} onChange={(e) => updateFromRgb({ ...rgb, b: parseInt(e.target.value) || 0 })} placeholder="B" min="0" max="255" className="bg-background/50" />
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)} className="ml-1">
                     {copiedValue === `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
               <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">HSL</label>
                <div className="flex gap-2 items-center">
                  <Input type="number" value={hsl.h} onChange={(e) => updateFromHsl({ ...hsl, h: parseInt(e.target.value) || 0 })} placeholder="H" min="0" max="360" className="bg-background/50" />
                  <Input type="number" value={hsl.s} onChange={(e) => updateFromHsl({ ...hsl, s: parseInt(e.target.value) || 0 })} placeholder="S (%)" min="0" max="100" className="bg-background/50" />
                  <Input type="number" value={hsl.l} onChange={(e) => updateFromHsl({ ...hsl, l: parseInt(e.target.value) || 0 })} placeholder="L (%)" min="0" max="100" className="bg-background/50" />
                   <Button variant="ghost" size="icon" onClick={() => handleCopy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)} className="ml-1">
                     {copiedValue === `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <SeoContentColorConverter />
      </motion.div>
    </>
  );
};

const SeoContentColorConverter = () => (
  <section className="mt-12 py-8 bg-secondary/10 rounded-xl">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Master Colors with HEX, RGB & HSL Conversion</h2>
      <div className="space-y-4 text-muted-foreground text-sm">
        <p>
          Quick Converter's <strong>Color Converter</strong> is an essential <strong>online color tool</strong> for designers, developers, and artists. Seamlessly convert color values between <strong>HEX</strong>, <strong>RGB</strong> (Red, Green, Blue), and <strong>HSL</strong> (Hue, Saturation, Lightness) formats. Our intuitive interface includes a handy color picker, allowing you to select colors visually and instantly see their corresponding values in all three formats.
        </p>
        <p>
          Whether you need to find the RGB equivalent of a HEX code for CSS, or want to understand the HSL values of a chosen color, this tool provides accurate and immediate results. It's perfect for web design, graphic design, and any project where precise color management is crucial. Keywords like <strong>hex to rgb converter</strong>, <strong>rgb to hex online</strong>, <strong>hsl color picker</strong>, and <strong>free color conversion tool</strong> highlight its utility. All conversions happen in your browser for quick and private use.
        </p>
      </div>
    </div>
  </section>
);

export default ColorConverter;

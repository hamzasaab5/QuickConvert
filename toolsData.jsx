
import { Zap, Link2, FileVolume, Image as ImageIcon, CaseSensitive, Hash, Palette, Sparkles, UserSquare, MoveHorizontal, Wand2 } from 'lucide-react';

const tools = [
  { 
    title: 'Image Compressor', 
    description: 'Efficiently reduce image file sizes (JPG, PNG, WebP) while maintaining quality. Perfect for web optimization and storage.', 
    icon: Zap, 
    path: '/image-compressor' 
  },
  {
    title: 'Image Resizer',
    description: 'Quickly resize your images to precise dimensions or by percentage. Supports JPG, PNG, and WebP formats.',
    icon: MoveHorizontal,
    path: '/image-resizer'
  },
  { 
    title: 'Image to URL (Base64)', 
    description: 'Convert images into Base64 data URLs for seamless embedding in HTML, CSS, or JavaScript. Supports various image types.', 
    icon: Link2, 
    path: '/image-to-url' 
  },
  { 
    title: 'SVG to JPG Converter', 
    description: 'Transform Scalable Vector Graphics (SVG) into high-quality JPG raster images. Control output scale and background color.', 
    icon: FileVolume, 
    path: '/svg-to-jpg' 
  },
  { 
    title: 'JPG to PDF Converter', 
    description: 'Combine multiple JPG or PNG images into a single, easily shareable PDF document. Customize page settings.', 
    icon: ImageIcon, 
    path: '/jpg-to-pdf' 
  },
  { 
    title: 'Case Converter', 
    description: 'Instantly change text capitalization: UPPERCASE, lowercase, Title Case, Sentence case, and more.', 
    icon: CaseSensitive, 
    path: '/case-converter' 
  },
  { 
    title: 'Hash Generator', 
    description: 'Generate secure cryptographic hashes (SHA-1, SHA-256, SHA-512) from text for data integrity and security.', 
    icon: Hash, 
    path: '/hash-generator' 
  },
  { 
    title: 'Color Converter', 
    description: 'Convert color codes between HEX, RGB, and HSL formats. Features an interactive color picker for easy selection.', 
    icon: Palette, 
    path: '/color-converter' 
  },
  {
    title: 'Passport Photo Maker',
    description: 'Create perfectly sized photos for passports, visas, or IDs by cropping your image to standard dimensions.',
    icon: UserSquare,
    path: '/passport-photo-maker'
  },
  {
    title: 'Image Enhancer (Visual Adjustments)',
    description: 'Improve image appearance by adjusting brightness, contrast, and saturation with intuitive controls.',
    icon: Sparkles,
    path: '/image-enhancer'
  },
  {
    title: 'AI Background Remover',
    description: 'Automatically remove backgrounds from images using AI. Powered by @img.ly for precise results.',
    icon: Wand2,
    path: '/background-remover'
  }
];

export const getTools = () => tools.sort((a, b) => a.title.localeCompare(b.title));

export const getToolByPath = (path) => tools.find(tool => tool.path === path);

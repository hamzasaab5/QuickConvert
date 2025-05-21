
import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CaseSensitive, Copy, Check, Trash2, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import ToolHeader from '@/components/ToolHeader';

const CaseConverter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const convertCase = useCallback((type) => {
    if (!inputText) {
      toast({ title: "Input is empty", description: "Please enter some text to convert.", variant: "destructive" });
      return;
    }
    let result = '';
    switch (type) {
      case 'uppercase':
        result = inputText.toUpperCase();
        break;
      case 'lowercase':
        result = inputText.toLowerCase();
        break;
      case 'sentencecase':
        result = inputText.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case 'titlecase':
        result = inputText.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        break;
      case 'togglecase':
        result = inputText.split('').map(char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()).join('');
        break;
      default:
        result = inputText;
    }
    setOutputText(result);
    toast({ title: "Text Converted", description: `Converted to ${type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}.` });
  }, [inputText, toast]);

  const handleCopy = useCallback(() => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText)
      .then(() => {
        setIsCopied(true);
        toast({ title: "Copied to clipboard!" });
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        toast({ title: "Copy failed", description: "Could not copy text.", variant: "destructive" });
        console.error('Copy failed:', err);
      });
  }, [outputText, toast]);

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    toast({ title: "Text Cleared" });
  };
  
  const handleSwap = () => {
    const temp = inputText;
    setInputText(outputText);
    setOutputText(temp);
    toast({ title: "Text Swapped" });
  };

  const caseButtons = [
    { label: 'UPPER CASE', type: 'uppercase' },
    { label: 'lower case', type: 'lowercase' },
    { label: 'Sentence case', type: 'sentencecase' },
    { label: 'Title Case', type: 'titlecase' },
    { label: 'tOGGLE cASE', type: 'togglecase'},
  ];

  return (
    <>
      <Helmet>
        <title>Case Converter - Uppercase, Lowercase & More | Quick Converter</title>
        <meta name="description" content="Easily convert text between uppercase, lowercase, title case, sentence case, and more with Quick Converter's free online case converter tool." />
        <meta name="keywords" content="case converter, text converter, uppercase, lowercase, title case, sentence case, online text tools, free case converter" />
        <link rel="canonical" href="https://yourwebsite.com/case-converter" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-32 pb-20"
      >
        <ToolHeader
          title="Case Converter"
          description="Quickly change the case of your text. Supports Uppercase, Lowercase, Sentence Case, Title Case, and Toggle Case."
          icon={CaseSensitive}
        />
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8 mb-8"
          >
            <h3 className="text-xl font-semibold mb-1">Input Text</h3>
            <p className="text-sm text-muted-foreground mb-4">Paste or type your text below.</p>
            <Textarea
              placeholder="Enter your text here..."
              value={inputText}
              onChange={handleInputChange}
              className="min-h-[150px] bg-background/50 focus:border-primary transition-colors"
              aria-label="Input text for case conversion"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
              {caseButtons.map(btn => (
                <Button key={btn.type} onClick={() => convertCase(btn.type)} variant="outline" className="text-xs sm:text-sm">
                  {btn.label}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
                <Button onClick={handleSwap} variant="ghost" size="sm" disabled={!inputText && !outputText}>
                  <ArrowRightLeft className="mr-2 h-4 w-4" /> Swap
                </Button>
                <Button onClick={handleClear} variant="ghost" size="sm" className="text-destructive hover:text-destructive" disabled={!inputText && !outputText}>
                  <Trash2 className="mr-2 h-4 w-4" /> Clear All
                </Button>
            </div>
          </motion.div>

          {outputText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8"
            >
              <h3 className="text-xl font-semibold mb-1">Output Text</h3>
              <p className="text-sm text-muted-foreground mb-4">Your converted text appears below.</p>
              <Textarea
                placeholder="Converted text will appear here..."
                value={outputText}
                readOnly
                className="min-h-[150px] bg-background/50"
                aria-label="Output converted text"
              />
              <Button onClick={handleCopy} className="mt-4 w-full relative overflow-hidden group">
                <span className="relative z-10 flex items-center justify-center">
                  {isCopied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {isCopied ? 'Copied!' : 'Copy to Clipboard'}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
            </motion.div>
          )}
        </div>
        <SeoContentCaseConverter />
      </motion.div>
    </>
  );
};

const SeoContentCaseConverter = () => (
  <section className="mt-12 py-8 bg-secondary/10 rounded-xl">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Master Your Text with Case Conversion</h2>
      <div className="space-y-4 text-muted-foreground text-sm">
        <p>
          Quick Converter's <strong>Case Converter</strong> is your go-to <strong>online text tool</strong> for effortlessly changing text capitalization. Whether you need to convert a block of text to <strong>UPPERCASE</strong> for emphasis, <strong>lowercase</strong> for consistency, <strong>Sentence case</strong> for proper grammar, or <strong>Title Case</strong> for headlines, our tool handles it all in seconds. We even offer a tOGGLE cASE option for quirky text transformations.
        </p>
        <p>
          This <strong>free case converter</strong> is perfect for writers, editors, students, developers, and anyone who works with text regularly. Forget manual editing; simply paste your text, choose your desired case, and get instant results. Our tool is designed to be fast, user-friendly, and completely free, with no need to download any software. It's an essential utility for quick text manipulation and ensuring your content meets specific formatting requirements.
        </p>
      </div>
    </div>
  </section>
);


export default CaseConverter;

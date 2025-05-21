
import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Hash, Copy, Check, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import ToolHeader from '@/components/ToolHeader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HashGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [hashedText, setHashedText] = useState('');
  const [hashType, setHashType] = useState('sha-256');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const generateHash = useCallback(async () => {
    if (!inputText) {
      toast({ title: "Input is empty", description: "Please enter some text to hash.", variant: "destructive" });
      return;
    }
    setIsGenerating(true);
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(inputText);
      let algorithm;
      switch (hashType) {
        case 'sha-1': algorithm = 'SHA-1'; break;
        case 'sha-256': algorithm = 'SHA-256'; break;
        case 'sha-512': algorithm = 'SHA-512'; break;
        default: throw new Error('Invalid hash type');
      }
      const hashBuffer = await crypto.subtle.digest(algorithm, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setHashedText(hashHex);
      toast({ title: "Hash Generated", description: `${algorithm} hash created successfully.` });
    } catch (error) {
      console.error('Hash generation error:', error);
      toast({ title: "Error Generating Hash", description: error.message, variant: "destructive" });
      setHashedText('');
    } finally {
      setIsGenerating(false);
    }
  }, [inputText, hashType, toast]);

  const handleCopy = useCallback(() => {
    if (!hashedText) return;
    navigator.clipboard.writeText(hashedText)
      .then(() => {
        setIsCopied(true);
        toast({ title: "Copied to clipboard!" });
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        toast({ title: "Copy failed", description: "Could not copy text.", variant: "destructive" });
        console.error('Copy failed:', err);
      });
  }, [hashedText, toast]);

  const hashTypes = [
    { value: 'sha-1', label: 'SHA-1' },
    { value: 'sha-256', label: 'SHA-256' },
    { value: 'sha-512', label: 'SHA-512' },
  ];

  return (
    <>
      <Helmet>
        <title>Hash Generator - SHA-1, SHA-256, SHA-512 | Quick Converter</title>
        <meta name="description" content="Generate SHA-1, SHA-256, and SHA-512 hashes from your text data online. Free and secure hash calculation tool by Quick Converter." />
        <meta name="keywords" content="hash generator, sha1 generator, sha256 generator, sha512 generator, online hash calculator, text to hash, crypto hash" />
        <link rel="canonical" href="https://yourwebsite.com/hash-generator" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-32 pb-20"
      >
        <ToolHeader
          title="Hash Generator"
          description="Create cryptographic hashes (SHA-1, SHA-256, SHA-512) from your text input. Securely processed in your browser."
          icon={Hash}
        />
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8 mb-8"
          >
            <h3 className="text-xl font-semibold mb-1">Input Data</h3>
            <p className="text-sm text-muted-foreground mb-4">Enter the text you want to hash.</p>
            <Textarea
              placeholder="Paste your text or data here..."
              value={inputText}
              onChange={handleInputChange}
              className="min-h-[150px] bg-background/50 focus:border-primary transition-colors"
              aria-label="Input data for hash generation"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="hashType" className="text-sm font-medium text-muted-foreground">Hash Algorithm</label>
                <Select value={hashType} onValueChange={setHashType}>
                  <SelectTrigger id="hashType" className="w-full bg-background/80">
                    <SelectValue placeholder="Select hash type" />
                  </SelectTrigger>
                  <SelectContent>
                    {hashTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:self-end">
                <Button onClick={generateHash} disabled={isGenerating} className="w-full relative overflow-hidden group">
                  <span className="relative z-10 flex items-center justify-center">
                    {isGenerating ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Hash className="mr-2 h-4 w-4" />}
                    {isGenerating ? 'Generating...' : 'Generate Hash'}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Button>
              </div>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-md p-3 mt-4">
              <div className="flex items-start">
                <AlertTriangle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Hashing is a one-way process. It's computationally infeasible to reverse a hash to its original input. All processing is done in your browser.
                </p>
              </div>
            </div>
          </motion.div>

          {hashedText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8"
            >
              <h3 className="text-xl font-semibold mb-1">Generated Hash ({hashType.toUpperCase()})</h3>
              <p className="text-sm text-muted-foreground mb-4">Your generated hash value.</p>
              <Textarea
                value={hashedText}
                readOnly
                className="min-h-[100px] bg-background/50 font-mono text-sm"
                aria-label="Generated hash output"
              />
              <Button onClick={handleCopy} className="mt-4 w-full relative overflow-hidden group">
                 <span className="relative z-10 flex items-center justify-center">
                  {isCopied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {isCopied ? 'Copied!' : 'Copy Hash'}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
            </motion.div>
          )}
        </div>
        <SeoContentHashGenerator />
      </motion.div>
    </>
  );
};

const SeoContentHashGenerator = () => (
  <section className="mt-12 py-8 bg-secondary/10 rounded-xl">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Securely Generate Hashes Online</h2>
      <div className="space-y-4 text-muted-foreground text-sm">
        <p>
          Quick Converter's <strong>Hash Generator</strong> provides a secure and easy way to create cryptographic hashes for your text data. Our tool supports popular algorithms like <strong>SHA-1</strong>, <strong>SHA-256</strong>, and <strong>SHA-512</strong>. Hashing is essential for data integrity verification, password storage, and various cryptographic applications. With this <strong>online hash calculator</strong>, you can quickly generate a hash from any text input.
        </p>
        <p>
          All hash computations are performed directly in your browser using the Web Crypto API, ensuring that your sensitive data is never transmitted to our servers. This makes our <strong>text to hash</strong> tool both fast and private. Whether you're a developer needing to verify checksums or a user curious about hashing, our free tool is at your service. Keywords include <strong>crypto hash online</strong>, <strong>generate SHA256</strong>, and <strong>free hash tool</strong>.
        </p>
      </div>
    </div>
  </section>
);

export default HashGenerator;

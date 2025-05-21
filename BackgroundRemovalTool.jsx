
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Wand2 } from 'lucide-react';
import ToolHeader from '@/components/ToolHeader';
import BackgroundRemovalMain from '@/components/background-remover/BackgroundRemovalMain';
import SeoContentBackgroundRemover from '@/components/background-remover/SeoContentBackgroundRemover';

const BackgroundRemovalTool = () => {
  return (
    <>
      <Helmet>
        <title>AI Background Remover | Quick Convert</title>
        <meta name="description" content="Automatically remove backgrounds from your images using AI. Fast, easy, and free online tool by Quick Convert, powered by @img.ly. Supports files up to 25MB." />
        <meta name="keywords" content="background remover, remove background, ai background removal, transparent background, image editing, quick convert, imgly, 25MB limit" />
        <link rel="canonical" href="https://yourwebsite.com/background-remover" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-32 pb-20"
      >
        <ToolHeader
          title="AI Background Remover"
          description="Automatically remove the background from your images using advanced AI. Powered by @img.ly SDK for precise results. Supports files up to 25MB for optimal browser performance."
          icon={Wand2}
        />
        <BackgroundRemovalMain />
        <SeoContentBackgroundRemover />
      </motion.div>
    </>
  );
};

export default BackgroundRemovalTool;

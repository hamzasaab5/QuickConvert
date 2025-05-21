
import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { getTools } from '@/lib/toolsData.js';
import HeroSection from '@/components/home/HeroSection';
import ShowcaseSection from '@/components/home/ShowcaseSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ToolsGridSection from '@/components/home/ToolsGridSection';
import CallToActionSection from '@/components/home/CallToActionSection';

const HomePage = () => {
  const tools = getTools();
  const toolsSectionRef = useRef(null);

  const scrollToTools = () => {
    toolsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Quick Convert - Free Online File Conversion & Utility Tools</title>
        <meta name="description" content="Quick Convert offers a suite of free online tools for image compression, resizing, format conversion (SVG to JPG, JPG to PDF), text utilities, and more. Fast, secure, and easy to use." />
        <meta name="keywords" content="online tools, free converter, image compressor, image resizer, svg to jpg, jpg to pdf, case converter, hash generator, color converter, passport photo, image enhancer, background remover" />
        <link rel="canonical" href="https://yourwebsite.com/" />
      </Helmet>
      
      <HeroSection 
        scrollToTools={scrollToTools}
      />

      <ShowcaseSection 
        title="Simplify Your Digital Tasks"
        paragraph1="Quick Convert provides a curated collection of essential online utilities designed to make your digital life easier. From image manipulation to text processing, we've got you covered."
        paragraph2="Our tools are built for speed and simplicity, running directly in your browser for maximum privacy and efficiency. Get your tasks done in seconds!"
      />
      
      <FeaturesSection 
        title="Why Choose Quick Convert?"
        subtitle="We focus on providing a seamless experience with tools that are fast, secure, and always free for core functionalities."
      />

      <div ref={toolsSectionRef}>
        <ToolsGridSection 
          tools={tools}
          title="Discover Our Powerful Tools"
          subtitle="A comprehensive suite of utilities to handle your everyday conversion and creation needs. Select a tool to get started."
        />
      </div>
      
      <CallToActionSection 
        title="Ready to Boost Your Productivity?"
        subtitle="Try Quick Convert today and experience the ease of our free online tools. No downloads, no hassle – just quick, reliable results."
        buttonText="Get Started Now"
        firstToolPath="#tools"
        scrollToTools={scrollToTools}
      />
    </>
  );
};

export default HomePage;

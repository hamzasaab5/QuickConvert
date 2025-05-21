
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Zap, Users, ShieldCheck, Target } from 'lucide-react';

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Quick Convert</title>
        <meta name="description" content="Learn about Quick Convert, our mission to provide fast, free, and secure online file conversion and utility tools for everyone." />
        <link rel="canonical" href="https://yourwebsite.com/about-us" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-32 pb-20"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "circOut" }}
            className="text-5xl md:text-6xl font-bold mb-6 gradient-text"
          >
            About Quick Convert
          </motion.h1>
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "circOut" }}
            className="text-xl text-muted-foreground mb-12"
          >
            Your trusted partner for simple, fast, and free online utilities.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            <img 
              className="rounded-xl shadow-2xl w-full h-auto object-cover"
              alt="Modern office workspace with computers"
             src="https://images.unsplash.com/photo-1538688554366-621d446302aa" />
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-semibold text-foreground">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Quick Convert, our mission is to simplify everyday digital tasks by providing a suite of high-quality, easy-to-use online tools that are accessible to everyone, completely free of charge. We believe that powerful utilities shouldn't be complicated or expensive.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We strive to empower individuals, students, and professionals by offering reliable solutions for image compression, format conversion, text manipulation, and more, all within a secure and user-friendly environment.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-semibold text-foreground mb-10">Why Choose Us?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Speed & Efficiency', text: 'Our tools are designed for rapid performance, processing your files directly in your browser.' },
              { icon: ShieldCheck, title: 'Privacy Focused', text: 'Client-side processing for most tools means your files stay on your device, ensuring your data remains private.' },
              { icon: Users, title: 'User-Friendly', text: 'We prioritize intuitive design, making our tools accessible to users of all technical skill levels.' },
              { icon: Target, title: 'Constantly Improving', text: 'We are committed to regularly updating and expanding our toolset based on user needs and technological advancements.' },
            ].map((item, index) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.15 }}
                className="bg-secondary/30 p-8 rounded-xl shadow-lg border border-border/50"
              >
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4 mx-auto">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold text-foreground mb-6">Our Current Tools</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            We offer a growing range of tools to help you with your daily tasks, including:
          </p>
          <ul className="list-disc list-inside text-muted-foreground max-w-md mx-auto text-left space-y-1">
            <li>Image Compressor</li>
            <li>Image Resizer</li>
            <li>Image to URL (Base64)</li>
            <li>SVG to JPG Converter</li>
            <li>JPG to PDF Converter</li>
            <li>Case Converter</li>
            <li>Hash Generator</li>
            <li>Color Converter</li>
            <li>Passport Photo Maker</li>
            <li>Image Enhancer (Visual Adjustments)</li>
          </ul>
           <p className="text-muted-foreground max-w-2xl mx-auto mt-8">
            ...and we're always working on adding more useful utilities!
          </p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default AboutUs;

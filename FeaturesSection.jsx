
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Lock, Globe } from 'lucide-react';

const FeaturesSection = ({ title, subtitle }) => {
  const features = [
    { title: 'Lightning Fast', description: 'Most conversions and operations happen instantly in your browser, saving you time.', icon: Zap },
    { title: 'Secure & Private', description: 'Your files and data are processed locally on your device for most tools, ensuring privacy.', icon: Lock },
    { title: 'Completely Free', description: 'All our tools are 100% free to use, with no hidden charges or sign-ups for core features.', icon: Globe }
  ];

  return (
    <section className="py-24 bg-secondary/10 mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration:0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{title}
          </motion.h2>
          <motion.p 
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration:0.5, delay:0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
              className="bg-background border border-border/70 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="bg-primary/10 p-3.5 rounded-full w-fit mb-5">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

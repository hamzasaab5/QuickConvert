
import React from 'react';
import { motion } from 'framer-motion';
import ToolCard from '@/components/ToolCard';

const ToolsGridSection = ({ tools, title, subtitle }) => {
  return (
    <section id="tools" className="py-24">
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <ToolCard
              key={index}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              path={tool.path}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsGridSection;

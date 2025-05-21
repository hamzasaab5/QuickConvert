
import React from 'react';
import { motion } from 'framer-motion';

const ToolHeader = ({ title, description, icon: Icon }) => {
  return (
    <div className="text-center mb-10">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4"
      >
        <Icon className="h-6 w-6 text-primary" />
      </motion.div>
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold mb-4"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-muted-foreground max-w-2xl mx-auto"
      >
        {description}
      </motion.p>
    </div>
  );
};

export default ToolHeader;

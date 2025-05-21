
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ToolCard = ({ title, description, icon: Icon, path }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="perspective-container"
    >
      <Link to={path} className="block">
        <div className="card-3d tool-card bg-secondary/30 border border-border rounded-xl p-6 h-full">
          <div className="flex flex-col h-full">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            
            <p className="text-muted-foreground text-sm mb-6 flex-grow">
              {description}
            </p>
            
            <div className="flex items-center text-primary font-medium group">
              <span>Try Now</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ToolCard;

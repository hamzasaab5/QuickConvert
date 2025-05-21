
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Mail, MessageSquare, User, Send } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent (Simulated)",
        description: "Thank you for your message! We'll get back to you if a response is needed. (This is a demo, no email was actually sent).",
      });
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Quick Convert</title>
        <meta name="description" content="Get in touch with Quick Convert. We welcome your feedback, suggestions, and inquiries about our free online tools." />
        <link rel="canonical" href="https://yourwebsite.com/contact-us" />
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
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "circOut" }}
            className="text-xl text-muted-foreground mb-12"
          >
            We'd love to hear from you! Whether you have a question, suggestion, or just want to say hello, feel free to reach out.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="max-w-xl mx-auto bg-secondary/30 border border-border/50 rounded-xl p-8 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="text" 
                  name="name" 
                  id="name" 
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="you@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Message</label>
              <div className="relative">
                 <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Textarea 
                  name="message" 
                  id="message" 
                  rows="4" 
                  placeholder="Your message..." 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                  className="pl-10 pt-2"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full relative overflow-hidden group"
              disabled={isSubmitting}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <Send className="h-4 w-4" />
                    </motion.div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message (Simulated)
                  </>
                )}
              </span>
               <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Button>
             <p className="text-xs text-muted-foreground text-center">
                Note: This contact form is for demonstration purposes. No email will actually be sent.
              </p>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ContactUs;

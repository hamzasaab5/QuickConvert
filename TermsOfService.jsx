
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Quick Convert</title>
        <meta name="description" content="Read the Terms of Service for Quick Convert. Understand the rules and guidelines for using our free online file conversion and utility tools." />
        <link rel="canonical" href="https://yourwebsite.com/terms-of-service" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-32 pb-20"
      >
        <div className="max-w-3xl mx-auto">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "circOut" }}
            className="text-4xl md:text-5xl font-bold mb-8 text-center gradient-text"
          >
            Terms of Service
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 bg-secondary/20 border border-border/30 p-6 md:p-8 rounded-xl shadow-lg"
          >
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <p className="text-foreground">
              Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Quick Convert website (the "Service") operated by Quick Convert ("us", "we", or "our").
            </p>
            <p className="text-foreground">
              Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
            <p className="text-foreground">
              By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
            </p>

            <h2 className="text-2xl font-semibold text-foreground pt-4">Use of Service</h2>
            <p className="text-muted-foreground">
              Quick Convert provides a collection of online tools for file conversion, image manipulation, and other utilities. These tools include, but are not limited to: Image Compressor, Image Resizer, Image to URL, SVG to JPG Converter, JPG to PDF Converter, Case Converter, Hash Generator, Color Converter, Passport Photo Maker, and Image Enhancer.
            </p>
            <p className="text-muted-foreground">
              You agree to use the Service only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the Service.
            </p>
            <p className="text-muted-foreground">
              Many of our tools operate client-side, meaning your files are processed in your browser and not uploaded to our servers. You are responsible for the content you process through our tools.
            </p>

            <h2 className="text-2xl font-semibold text-foreground pt-4">Intellectual Property</h2>
            <p className="text-muted-foreground">
              The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Quick Convert and its licensors. The Service is protected by copyright, trademark, and other laws of both foreign and domestic countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Quick Convert.
            </p>

            <h2 className="text-2xl font-semibold text-foreground pt-4">Disclaimer of Warranties</h2>
            <p className="text-muted-foreground">
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
            </p>
            <p className="text-muted-foreground">
              Quick Convert does not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.
            </p>
            
            <h2 className="text-2xl font-semibold text-foreground pt-4">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              In no event shall Quick Convert, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
            </p>

            <h2 className="text-2xl font-semibold text-foreground pt-4">Changes</h2>
            <p className="text-muted-foreground">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p className="text-muted-foreground">
              By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
            </p>

            <h2 className="text-2xl font-semibold text-foreground pt-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms, please contact us via the "Contact Us" page (please note the contact form is a simulation).
            </p>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default TermsOfService;

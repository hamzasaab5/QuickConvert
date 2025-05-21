
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Quick Convert</title>
        <meta name="description" content="Read the Privacy Policy for Quick Convert to understand how we handle your data when you use our free online tools." />
        <link rel="canonical" href="https://yourwebsite.com/privacy-policy" />
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
            Privacy Policy
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 bg-secondary/20 border border-border/30 p-6 md:p-8 rounded-xl shadow-lg"
          >
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <p className="text-foreground">
              Welcome to Quick Convert ("us", "we", or "our"). We are committed to protecting your privacy. This Privacy Policy explains how we handle your information when you use our website and its associated tools (collectively, the "Service").
            </p>

            <h2 className="text-2xl font-semibold text-foreground pt-4">Information We Collect</h2>
            <p className="text-muted-foreground">
              For most of our tools, we operate on a client-side basis. This means that the files you upload and the data you input are processed directly in your web browser and are <strong>not</strong> uploaded to or stored on our servers.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-4">
              <li><strong>Files and Data for Processing:</strong> When you use tools like the Image Compressor, Image Resizer, SVG to JPG Converter, JPG to PDF Converter, Case Converter, Hash Generator, Color Converter, Passport Photo Maker, or Image Enhancer, the data processing occurs locally in your browser. We do not have access to these files or data.</li>
              <li><strong>Usage Data (Analytics):</strong> We may use third-party analytics services (like Google Analytics) to collect standard internet log information and details of visitor behavior patterns. This helps us understand website traffic and usage of our tools, such as which tools are most popular. This information is processed in a way that does not directly identify anyone.</li>
              <li><strong>Contact Information (Simulated):</strong> If you use our contact form, the information you provide (name, email, message) is part of a simulated process for demonstration purposes and is not actually transmitted or stored by us.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground pt-4">How We Use Your Information</h2>
            <p className="text-muted-foreground">
              Since most processing is client-side:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-4">
              <li>We do not use your uploaded files or input data for any purpose other than enabling the functionality of the tool you are using.</li>
              <li>Aggregated and anonymized analytics data is used to improve our Service, understand user preferences, and enhance user experience.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground pt-4">Data Security</h2>
            <p className="text-muted-foreground">
              We prioritize your security. By processing data client-side for many tools, we minimize the risk associated with data transmission and server storage. However, please remember that no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
            
            <h2 className="text-2xl font-semibold text-foreground pt-4">Third-Party Services</h2>
             <p className="text-muted-foreground">
              Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
            </p>
            <p className="text-muted-foreground">
              Our analytics providers (e.g., Google Analytics) have their own privacy policies.
            </p>

            <h2 className="text-2xl font-semibold text-foreground pt-4">Children's Privacy</h2>
            <p className="text-muted-foreground">
              Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13.
            </p>

            <h2 className="text-2xl font-semibold text-foreground pt-4">Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>

            <h2 className="text-2xl font-semibold text-foreground pt-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us through the "Contact Us" page (please note the contact form is a simulation).
            </p>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default PrivacyPolicy;

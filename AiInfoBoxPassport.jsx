
import React from 'react';
import { AlertTriangle, Wand2 } from 'lucide-react';

const AiInfoBoxPassport = ({ toolName }) => {
  return (
    <div className="bg-accent/20 border border-accent/30 rounded-xl p-6 mb-8">
      <div className="flex items-start">
        <Wand2 className="h-6 w-6 text-accent mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-md font-semibold mb-1 text-accent-foreground">AI Feature Demonstration for {toolName}</h3>
          <p className="text-xs text-muted-foreground">
            The AI-simulated features in this {toolName}, such as automatic background adjustment or biometric compliance checks, are for <strong>demonstration purposes</strong>.
            Implementing real AI for these tasks requires sophisticated models and often server-side processing to meet official standards accurately.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            This demo helps visualize how AI could assist. For official use, always verify photo requirements with the issuing authority. The core cropping functionality to standard sizes is operational.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiInfoBoxPassport;

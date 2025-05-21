
import React from 'react';
import { AlertTriangle, Wand2 } from 'lucide-react';

const AiInfoBox = ({ toolName, libraryName }) => {
  return (
    <div className="bg-accent/20 border border-accent/30 rounded-xl p-6 mb-8">
      <div className="flex items-start">
        <Wand2 className="h-6 w-6 text-accent mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-md font-semibold mb-1 text-accent-foreground">AI Feature Demonstration</h3>
          <p className="text-xs text-muted-foreground">
            The AI-powered aspects of this {toolName} are currently for <strong>demonstration purposes</strong>.
            True AI processing, especially for complex tasks like advanced image enhancement or precise background removal 
            {libraryName ? ` (potentially using libraries like ${libraryName})` : ''}, 
            often requires significant computational resources (powerful client-side WebAssembly modules or server-side processing).
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            This demo simulates the user experience and potential outcomes. A full implementation would involve integrating and optimizing these advanced technologies, which can be resource-intensive.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiInfoBox;

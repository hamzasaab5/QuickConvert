
import React from 'react';
import { KeyRound, AlertTriangle } from 'lucide-react';

const ApiKeyInfoBoxBg = ({ apiKey, serviceName, apiUrl }) => {
  return (
    <div className={`rounded-xl p-4 mb-8 border ${apiKey ? 'bg-green-500/10 border-green-500/30' : 'bg-destructive/10 border-destructive/30'}`}>
      <div className="flex items-start">
        {apiKey ? <KeyRound className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" /> : <AlertTriangle className="h-5 w-5 text-destructive mr-2 mt-0.5 flex-shrink-0" />}
        <div>
          <h3 className={`text-sm font-medium mb-1 ${apiKey ? 'text-green-700' : 'text-destructive-foreground'}`}>
            {serviceName} API Key Status
          </h3>
          {apiKey ? (
            <>
              <p className="text-xs text-green-600">
                API Key is configured. The tool will attempt to use the API ({apiUrl}) for processing.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Ensure the API key is valid and has permissions for this domain if required by the provider.
              </p>
            </>
          ) : (
            <p className="text-xs text-destructive-foreground">
              API Key is <strong>NOT</strong> configured for {serviceName}. The API functionality will be disabled. Please provide an API key in the code to enable this feature.
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Note: For production, API keys should ideally be handled via a backend proxy to prevent exposure. This implementation uses a client-side key for demonstration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyInfoBoxBg;

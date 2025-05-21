
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound } from 'lucide-react';

const ApiKeyInput = ({ apiKey, setApiKey }) => {
  return (
    <div className="mt-6">
      <Label htmlFor="apiKey" className="text-sm font-medium text-foreground flex items-center mb-2">
        <KeyRound className="h-4 w-4 mr-2 text-muted-foreground" />
        Optional: @img.ly API Key
      </Label>
      <Input
        type="text"
        id="apiKey"
        placeholder="Enter your @img.ly API key (optional)"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="bg-background/70"
      />
      <p className="text-xs text-muted-foreground mt-1">
        Using your own key might be necessary for extended use or specific features.
      </p>
    </div>
  );
};

export default ApiKeyInput;

import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');

  const handleVoiceInput = () => {
    if (isListening) {
      // Stop listening
      setIsListening(false);
      setVoiceText('');
    } else {
      // Start listening (mock implementation)
      setIsListening(true);
      setVoiceText('Listening...');
      
      // Simulate voice recognition
      setTimeout(() => {
        setVoiceText('Voice input detected: "Login to my account"');
        setTimeout(() => {
          setIsListening(false);
          setVoiceText('');
        }, 2000);
      }, 2000);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Mic" size={16} color="var(--color-muted-foreground)" />
          <span className="text-sm font-medium text-muted-foreground">
            Voice Assistant
          </span>
        </div>
        
        <Button
          variant={isListening ? "destructive" : "outline"}
          size="sm"
          onClick={handleVoiceInput}
          iconName={isListening ? "MicOff" : "Mic"}
          iconPosition="left"
        >
          {isListening ? 'Stop' : 'Speak'}
        </Button>
      </div>
      
      {voiceText && (
        <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon 
              name={isListening ? "Volume2" : "CheckCircle"} 
              size={16} 
              color="var(--color-primary)" 
            />
            <span className="text-sm text-primary font-medium">
              {voiceText}
            </span>
          </div>
        </div>
      )}
      
      <p className="text-xs text-muted-foreground">
        Use voice commands to navigate or fill forms
      </p>
    </div>
  );
};

export default VoiceAssistant;
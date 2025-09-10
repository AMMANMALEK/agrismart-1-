import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const VoiceAssistant = ({ onVoiceInput }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  const startVoiceInput = () => {
    // Check if speech recognition is supported
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      return;
    }

    setIsListening(true);
    
    // Mock voice recognition functionality
    setTimeout(() => {
      setIsListening(false);
      // Simulate voice input result
      if (onVoiceInput) {
        onVoiceInput("Sample voice input text");
      }
    }, 3000);
  };

  const stopVoiceInput = () => {
    setIsListening(false);
  };

  if (!isSupported) {
    return (
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
          <div>
            <p className="text-sm font-medium text-warning">
              Voice input not supported
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Your browser doesn't support voice recognition. Please use manual input.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isListening ? 'bg-primary animate-pulse' : 'bg-primary/20'
          }`}>
            <Icon 
              name={isListening ? 'MicOff' : 'Mic'} 
              size={20} 
              color={isListening ? 'white' : 'var(--color-primary)'} 
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary">
              Voice Assistant
            </h4>
            <p className="text-xs text-muted-foreground">
              {isListening ? 'Listening... Speak now' : 'Click to use voice input'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isListening ? (
            <Button
              variant="outline"
              size="sm"
              onClick={stopVoiceInput}
              iconName="Square"
              iconPosition="left"
            >
              Stop
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={startVoiceInput}
              iconName="Mic"
              iconPosition="left"
            >
              Start
            </Button>
          )}
        </div>
      </div>
      {isListening && (
        <div className="mt-4 flex items-center justify-center space-x-2">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5]?.map((i) => (
              <div
                key={i}
                className="w-1 bg-primary rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 20 + 10}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
          <span className="text-xs text-primary font-medium ml-3">
            Listening for voice input...
          </span>
        </div>
      )}
      {/* Language Support Info */}
      <div className="mt-3 pt-3 border-t border-primary/10">
        <p className="text-xs text-muted-foreground">
          <Icon name="Globe" size={12} color="var(--color-muted-foreground)" className="inline mr-1" />
          Supports: English, Hindi, Telugu, Tamil, and 6 more languages
        </p>
      </div>
    </div>
  );
};

export default VoiceAssistant;
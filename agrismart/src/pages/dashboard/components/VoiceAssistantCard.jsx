import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceAssistantCard = () => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastCommand, setLastCommand] = useState('');

  const recentCommands = [
    {
      id: 1,
      command: "What\'s the weather forecast for tomorrow?",
      response: "Tomorrow will be partly cloudy with 28°C temperature and 15mm rainfall expected.",
      timestamp: '2 minutes ago'
    },
    {
      id: 2,
      command: "Show me soil health status",
      response: "Your soil pH is 6.8 (Good), moisture at 65% (Good), NPK levels are optimal.",
      timestamp: '15 minutes ago'
    },
    {
      id: 3,
      command: "Any pest alerts for my crops?",
      response: "High risk aphid infestation detected in wheat field A-3. Apply neem oil spray.",
      timestamp: '1 hour ago'
    }
  ];

  const quickCommands = [
    { text: "Weather forecast", icon: "Cloud" },
    { text: "Soil status", icon: "Sprout" },
    { text: "Market prices", icon: "TrendingUp" },
    { text: "Schedule tasks", icon: "Calendar" }
  ];

  const handleVoiceCommand = () => {
    if (isListening) {
      setIsListening(false);
      setIsProcessing(true);
      // Simulate processing
      setTimeout(() => {
        setIsProcessing(false);
        setLastCommand("Weather forecast for today");
      }, 2000);
    } else {
      setIsListening(true);
    }
  };

  const handleQuickCommand = (command) => {
    setLastCommand(command);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Mic" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Voice Assistant</h3>
            <p className="text-sm text-muted-foreground">Hands-free farm management</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
          <span className="text-xs text-muted-foreground">
            {isListening ? 'Listening...' : isProcessing ? 'Processing...' : 'Ready'}
          </span>
        </div>
      </div>
      {/* Voice Command Button */}
      <div className="text-center mb-6">
        <Button
          variant={isListening ? "destructive" : "default"}
          size="lg"
          onClick={handleVoiceCommand}
          disabled={isProcessing}
          loading={isProcessing}
          className="w-20 h-20 rounded-full"
          iconName={isListening ? "MicOff" : "Mic"}
        >
          {isListening ? '' : isProcessing ? '' : ''}
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          {isListening ? 'Tap to stop listening' : 'Tap and speak your command'}
        </p>
        {lastCommand && (
          <div className="mt-3 p-3 bg-primary/5 rounded-lg">
            <p className="text-sm text-primary font-medium">Last command: "{lastCommand}"</p>
          </div>
        )}
      </div>
      {/* Quick Commands */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-card-foreground mb-3">Quick Commands</h4>
        <div className="grid grid-cols-2 gap-2">
          {quickCommands?.map((cmd, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickCommand(cmd?.text)}
              disabled={isListening || isProcessing}
              iconName={cmd?.icon}
              iconPosition="left"
              className="justify-start"
            >
              {cmd?.text}
            </Button>
          ))}
        </div>
      </div>
      {/* Recent Commands */}
      <div>
        <h4 className="text-sm font-medium text-card-foreground mb-3">Recent Commands</h4>
        <div className="space-y-3 max-h-40 overflow-y-auto">
          {recentCommands?.slice(0, 2)?.map((item) => (
            <div key={item?.id} className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-start space-x-2 mb-2">
                <Icon name="MessageSquare" size={14} color="var(--color-primary)" />
                <p className="text-sm font-medium text-card-foreground flex-1">{item?.command}</p>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="Bot" size={14} color="var(--color-success)" />
                <p className="text-sm text-muted-foreground flex-1">{item?.response}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-right">{item?.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Supports English, Hindi, and regional languages
          </div>
          <Button variant="ghost" size="sm" iconName="Settings">
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistantCard;
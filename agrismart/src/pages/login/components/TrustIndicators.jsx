import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const trustSignals = [
    {
      icon: 'Shield',
      text: 'Government Certified',
      color: 'var(--color-success)'
    },
    {
      icon: 'Award',
      text: 'ISO 27001 Certified',
      color: 'var(--color-primary)'
    },
    {
      icon: 'Users',
      text: 'Trusted by 50,000+ Farmers',
      color: 'var(--color-secondary)'
    },
    {
      icon: 'Leaf',
      text: 'Sustainable Agriculture Partner',
      color: 'var(--color-success)'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground text-center">
        Trusted Agricultural Platform
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {trustSignals?.map((signal, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg border border-border/50"
          >
            <Icon 
              name={signal?.icon} 
              size={16} 
              color={signal?.color} 
            />
            <span className="text-xs text-muted-foreground font-medium">
              {signal?.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustIndicators;
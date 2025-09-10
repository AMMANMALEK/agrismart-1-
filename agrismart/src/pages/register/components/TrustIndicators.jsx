import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const trustElements = [
    {
      icon: 'Award',
      title: 'Government Certified',
      description: 'Approved by Ministry of Agriculture',
      color: 'var(--color-success)'
    },
    {
      icon: 'Users',
      title: '50,000+ Farmers',
      description: 'Trusted by farmers nationwide',
      color: 'var(--color-primary)'
    },
    {
      icon: 'Shield',
      title: 'Data Secure',
      description: 'Bank-level security standards',
      color: 'var(--color-accent)'
    },
    {
      icon: 'TrendingUp',
      title: '30% Yield Increase',
      description: 'Average improvement reported',
      color: 'var(--color-success)'
    }
  ];

  const certifications = [
    {
      name: 'Digital India',
      logo: '🇮🇳',
      description: 'Part of Digital India initiative'
    },
    {
      name: 'ISO Certified',
      logo: '🏆',
      description: 'ISO 27001 certified for security'
    },
    {
      name: 'Startup India',
      logo: '🚀',
      description: 'Recognized by Startup India'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Trust Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {trustElements?.map((element, index) => (
          <div
            key={index}
            className="bg-muted/50 rounded-lg p-4 text-center border border-border/50"
          >
            <div className="flex justify-center mb-2">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
                <Icon name={element?.icon} size={20} color={element?.color} />
              </div>
            </div>
            <h4 className="text-sm font-semibold text-card-foreground mb-1">
              {element?.title}
            </h4>
            <p className="text-xs text-muted-foreground leading-tight">
              {element?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Certifications */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
        <h4 className="text-sm font-semibold text-card-foreground mb-3 flex items-center space-x-2">
          <Icon name="BadgeCheck" size={16} color="var(--color-primary)" />
          <span>Certifications & Recognition</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {certifications?.map((cert, index) => (
            <div key={index} className="flex items-center space-x-3">
              <span className="text-2xl">{cert?.logo}</span>
              <div>
                <p className="text-sm font-medium text-card-foreground">
                  {cert?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {cert?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Features */}
      <div className="bg-success/5 rounded-lg p-4 border border-success/20">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon name="Lock" size={16} color="var(--color-success)" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-success mb-1">
              Your Data is Protected
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We use advanced encryption and follow strict privacy guidelines to protect your personal and farm data. Your information is never shared without your consent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;
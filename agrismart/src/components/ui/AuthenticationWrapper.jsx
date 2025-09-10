import React from 'react';
import Icon from '../AppIcon';

const AuthenticationWrapper = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-agricultural">
              <Icon name="Leaf" size={32} color="white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">AgriSmart</h1>
          <p className="text-muted-foreground text-sm">Smart farming solutions for modern agriculture</p>
        </div>

        {/* Authentication Card */}
        <div className="bg-card rounded-lg shadow-agricultural-lg border border-border p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-card-foreground mb-2">{title}</h2>
            {subtitle && (
              <p className="text-muted-foreground text-sm">{subtitle}</p>
            )}
          </div>
          
          {children}
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-6 text-muted-foreground text-xs">
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={14} color="var(--color-success)" />
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} color="var(--color-success)" />
              <span>Trusted by 10k+ farmers</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Award" size={14} color="var(--color-success)" />
              <span>Award winning</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationWrapper;
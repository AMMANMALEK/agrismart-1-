import React from 'react';
import Icon from '../AppIcon';

const AuthenticationWrapper = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background gradient and decorative shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/60 via-white to-emerald-50 dark:from-emerald-950/40 dark:via-background dark:to-emerald-900/20" />
        <div className="pointer-events-none">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-800/30" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-lime-200/40 blur-3xl dark:bg-lime-800/20" />
        </div>
      </div>
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
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-agricultural-lg border border-border p-6">
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
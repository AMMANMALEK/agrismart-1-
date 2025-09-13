import React from 'react';
import Icon from '../AppIcon';
import { useTranslation } from 'react-i18next';

const AuthenticationWrapper = ({ children, title, subtitle, theme = 'default' }) => {
  const { t } = useTranslation();
  return (
    <div className={
      theme === 'neon'
        ? "min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-black text-[#39ff14]"
        : theme === 'earth'
        ? "min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-[#FAF9F6] text-[#444444]"
        : theme === 'plain'
        ? "min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-white"
        : "min-h-screen relative flex items-center justify-center p-4 overflow-hidden"
    }>
      {/* Background gradient and decorative shapes */}
      {theme === 'default' && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/60 via-white to-emerald-50 dark:from-emerald-950/40 dark:via-background dark:to-emerald-900/20" />
          <div className="pointer-events-none">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-800/30" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-lime-200/40 blur-3xl dark:bg-lime-800/20" />
          </div>
        </div>
      )}
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl shadow-agricultural">
              <img 
                src="/assets/images/agrivision-logo.jpg" 
                alt="AgriVision Logo" 
                className="w-16 h-16 object-contain rounded-2xl"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className={theme === 'earth' ? "hidden items-center justify-center w-16 h-16 rounded-2xl shadow-agricultural" : "hidden items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-agricultural"} style={theme === 'earth' ? { backgroundColor: '#228B22' } : undefined}>
                <Icon name="Leaf" size={32} color="white" />
              </div>
            </div>
          </div>
          <h1 className={
            theme === 'neon'
              ? "text-2xl font-bold mb-2"
              : theme === 'earth'
              ? "text-2xl font-bold mb-2"
              : "text-2xl font-bold text-foreground mb-2"
          } style={theme === 'earth' ? { color: '#228B22' } : undefined}>AgriVision</h1>
          <p className={theme === 'neon' ? "text-sm opacity-80" : theme === 'earth' ? "text-sm opacity-90" : "text-muted-foreground text-sm"}>{t('app.tagline')}</p>
        </div>

        {/* Authentication Card */}
        <div className={
          theme === 'neon'
            ? "rounded-2xl p-6 border backdrop-blur-sm bg-black/60 border-[#39ff14]/30 shadow-[0_0_20px_rgba(57,255,20,0.15)]"
            : theme === 'earth'
            ? "rounded-2xl p-6 border bg-white/90"
            : "bg-card/80 backdrop-blur-sm rounded-2xl shadow-agricultural-lg border border-border p-6"
        } style={theme === 'earth' ? { borderColor: '#8B4513' } : undefined}>
          <div className="mb-6">
            <h2 className={theme === 'neon' ? "text-xl font-semibold mb-2" : theme === 'earth' ? "text-xl font-semibold mb-2" : "text-xl font-semibold text-card-foreground mb-2"} style={theme === 'earth' ? { color: '#228B22' } : undefined}>{title}</h2>
            {subtitle && (
              <p className={theme === 'neon' ? "text-sm opacity-80" : theme === 'earth' ? "text-sm" : "text-muted-foreground text-sm"}>{subtitle}</p>
            )}
          </div>
          
          {children}
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 text-center">
          <div className={theme === 'neon' ? "flex items-center justify-center space-x-6 text-xs opacity-80" : "flex items-center justify-center space-x-6 text-muted-foreground text-xs"}>
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
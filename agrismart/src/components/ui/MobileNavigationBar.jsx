import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileNavigationBar = () => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard'
    },
    {
      label: 'Soil Health',
      path: '/soil-health-monitor',
      icon: 'Sprout'
    },
    {
      label: 'Pest Detection',
      path: '/pest-detection',
      icon: 'Bug'
    },
    {
      label: 'Reports',
      path: '/reports-analytics',
      icon: 'BarChart3'
    }
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border lg:hidden">
      <div className="flex items-center justify-around h-16 px-2 safe-area-pb">
        {navigationItems?.map((item) => {
          const isActive = isActiveRoute(item?.path);
          return (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-agricultural min-w-0 flex-1 ${
                isActive
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                color={isActive ? 'var(--color-primary)' : 'currentColor'} 
              />
              <span className="text-xs font-medium truncate max-w-full">{item?.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigationBar;
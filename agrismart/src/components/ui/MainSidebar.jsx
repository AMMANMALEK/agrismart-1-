import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const MainSidebar = ({ isCollapsed = false, onToggle, userData = null }) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(!isCollapsed);

  // Default user data if none provided - in real app, this would come from authentication context
  const defaultUserData = {
    username: "Guest User",
    email: "guest@farm.com",
    phone: "+91 9876543210"
  };

  const currentUser = userData || defaultUserData;

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Overview of your farm operations'
    },
    {
      label: 'Soil Health',
      path: '/soil-health-monitor',
      icon: 'Sprout',
      tooltip: 'Monitor soil conditions and nutrients'
    },
    {
      label: 'Pest Detection',
      path: '/pest-detection',
      icon: 'Bug',
      tooltip: 'AI-powered pest identification'
    },
    {
      label: 'Reports',
      path: '/reports-analytics',
      icon: 'BarChart3',
      tooltip: 'Analytics and performance reports'
    }
  ];

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (onToggle) {
      onToggle(!isExpanded);
    }
  };

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-agricultural ${
        isExpanded ? 'w-60' : 'w-16'
      } hidden lg:block`}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8">
                <img 
                  src="/assets/images/agrivision-logo.jpg" 
                  alt="AgriVision Logo" 
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <Icon name="Leaf" size={20} color="white" />
                </div>
              </div>
              {isExpanded && (
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-foreground">AgriVision</span>
                  <span className="text-xs text-muted-foreground">Farm Management</span>
                </div>
              )}
            </div>
            <button
              onClick={handleToggle}
              className="p-1.5 rounded-md hover:bg-muted transition-agricultural"
              aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              <Icon 
                name={isExpanded ? 'ChevronLeft' : 'ChevronRight'} 
                size={16} 
                color="var(--color-muted-foreground)" 
              />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems?.map((item) => {
              const isActive = isActiveRoute(item?.path);
              return (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-agricultural group relative ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-agricultural'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  title={!isExpanded ? item?.tooltip : ''}
                >
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    color={isActive ? 'white' : 'currentColor'} 
                  />
                  {isExpanded && (
                    <span className="font-medium">{item?.label}</span>
                  )}
                  {/* Tooltip for collapsed state */}
                  {!isExpanded && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-agricultural-lg opacity-0 group-hover:opacity-100 transition-agricultural pointer-events-none whitespace-nowrap z-50">
                      {item?.tooltip}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-border">
            <div className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-agricultural cursor-pointer ${
              !isExpanded ? 'justify-center' : ''
            }`}>
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              {isExpanded && (
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm font-medium text-foreground truncate">{currentUser.username}</span>
                  <span className="text-xs text-muted-foreground truncate">{currentUser.email}</span>
                  <span className="text-xs text-muted-foreground truncate">{currentUser.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border lg:hidden">
        <div className="flex items-center justify-around h-16 px-2">
          {navigationItems?.map((item) => {
            const isActive = isActiveRoute(item?.path);
            return (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-agricultural min-w-0 flex-1 ${
                  isActive
                    ? 'text-primary' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  color={isActive ? 'var(--color-primary)' : 'currentColor'} 
                />
                <span className="text-xs font-medium truncate">{item?.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default MainSidebar;
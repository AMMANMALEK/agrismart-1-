import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const AuthenticationLinks = () => {
  return (
    <div className="space-y-4">
      {/* Forgot Password Link */}
      <div className="text-center">
        <Link
          to="/forgot-password"
          className="inline-flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-agricultural"
        >
          <Icon name="Key" size={14} />
          <span>Forgot your password?</span>
        </Link>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            New to AgriVision?
          </span>
        </div>
      </div>

      {/* Registration Link */}
      <div className="text-center">
        <Link
          to="/register"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-secondary/10 hover:bg-secondary/20 text-secondary hover:text-secondary/80 rounded-lg transition-agricultural border border-secondary/20"
        >
          <Icon name="UserPlus" size={16} />
          <span className="font-medium">Create New Account</span>
        </Link>
      </div>

      {/* Help Text */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Join thousands of farmers using smart agriculture technology
        </p>
      </div>
    </div>
  );
};

export default AuthenticationLinks;
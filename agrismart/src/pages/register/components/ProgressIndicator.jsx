import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep = 1, totalSteps = 4 }) => {
  const steps = [
    {
      id: 1,
      title: 'Personal Info',
      description: 'Basic details',
      icon: 'User'
    },
    {
      id: 2,
      title: 'Security',
      description: 'Password setup',
      icon: 'Shield'
    },
    {
      id: 3,
      title: 'Farm Details',
      description: 'Farm information',
      icon: 'MapPin'
    },
    {
      id: 4,
      title: 'Complete',
      description: 'Terms & finish',
      icon: 'CheckCircle'
    }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed':
        return 'var(--color-success)';
      case 'current':
        return 'var(--color-primary)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const getStepBgColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success';
      case 'current':
        return 'bg-primary';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="ClipboardList" size={20} color="var(--color-primary)" />
          <span className="text-sm font-medium text-card-foreground">
            Registration Progress
          </span>
        </div>
        <span className="text-sm text-muted-foreground">
          {currentStep} of {totalSteps} steps
        </span>
      </div>
      {/* Desktop Progress Steps */}
      <div className="hidden md:flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-6 right-6 h-0.5 bg-muted">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>

        {steps?.map((step, index) => {
          const status = getStepStatus(step?.id);
          return (
            <div key={step?.id} className="flex flex-col items-center relative z-10">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                status === 'completed' 
                  ? 'bg-success border-success' 
                  : status === 'current' ?'bg-primary border-primary' :'bg-background border-muted'
              }`}>
                <Icon 
                  name={status === 'completed' ? 'Check' : step?.icon} 
                  size={20} 
                  color={status === 'upcoming' ? 'var(--color-muted-foreground)' : 'white'} 
                />
              </div>
              <div className="mt-2 text-center">
                <p className={`text-sm font-medium ${
                  status === 'upcoming' ? 'text-muted-foreground' : 'text-card-foreground'
                }`}>
                  {step?.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {step?.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Mobile Progress Bar */}
      <div className="md:hidden">
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex-1 bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium text-card-foreground">
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepBgColor(getStepStatus(currentStep))}`}>
            <Icon 
              name={steps?.[currentStep - 1]?.icon || 'User'} 
              size={16} 
              color="white" 
            />
          </div>
          <div>
            <p className="text-sm font-medium text-card-foreground">
              {steps?.[currentStep - 1]?.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {steps?.[currentStep - 1]?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
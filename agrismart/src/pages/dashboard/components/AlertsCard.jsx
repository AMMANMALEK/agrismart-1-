import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsCard = () => {
  const alerts = [
    {
      id: 1,
      type: 'pest',
      severity: 'high',
      title: 'Aphid Infestation Detected',
      description: 'High risk of aphid infestation in wheat field section A-3',
      action: 'Apply neem oil spray immediately',
      timestamp: '2 hours ago',
      icon: 'Bug'
    },
    {
      id: 2,
      type: 'disease',
      severity: 'medium',
      title: 'Leaf Rust Warning',
      description: 'Weather conditions favor leaf rust development',
      action: 'Monitor crops closely and prepare fungicide',
      timestamp: '4 hours ago',
      icon: 'AlertTriangle'
    },
    {
      id: 3,
      type: 'weather',
      severity: 'low',
      title: 'Heavy Rain Expected',
      description: 'Rainfall expected in next 24 hours - 25mm',
      action: 'Ensure proper drainage in low-lying areas',
      timestamp: '6 hours ago',
      icon: 'CloudRain'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'var(--color-error)';
      case 'medium': return 'var(--color-warning)';
      case 'low': return 'var(--color-success)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'high': return 'bg-error/10';
      case 'medium': return 'bg-warning/10';
      case 'low': return 'bg-success/10';
      default: return 'bg-muted/10';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-error/10 rounded-lg">
            <Icon name="AlertCircle" size={24} color="var(--color-error)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Quick Alerts</h3>
            <p className="text-sm text-muted-foreground">Pest & disease warnings</p>
          </div>
        </div>
        <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
          Settings
        </Button>
      </div>
      <div className="space-y-4">
        {alerts?.map((alert) => (
          <div 
            key={alert?.id} 
            className={`p-4 rounded-lg border-l-4 ${getSeverityBg(alert?.severity)}`}
            style={{ borderLeftColor: getSeverityColor(alert?.severity) }}
          >
            <div className="flex items-start space-x-3">
              <div className="p-1.5 rounded-md" style={{ backgroundColor: getSeverityColor(alert?.severity) + '20' }}>
                <Icon 
                  name={alert?.icon} 
                  size={16} 
                  color={getSeverityColor(alert?.severity)} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-card-foreground truncate">{alert?.title}</h4>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {alert?.timestamp}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{alert?.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium" style={{ color: getSeverityColor(alert?.severity) }}>
                    Action: {alert?.action}
                  </p>
                  <Button variant="ghost" size="sm" iconName="ChevronRight">
                    Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="outline" fullWidth iconName="Bell" iconPosition="left">
          View All Alerts (12)
        </Button>
      </div>
    </div>
  );
};

export default AlertsCard;
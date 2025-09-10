import React from 'react';
import Icon from '../../../components/AppIcon';

const SoilMetricsCard = ({ title, value, unit, status, icon, recommendation, trend }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return 'text-success bg-success/10 border-success/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'critical':
        return 'AlertCircle';
      default:
        return 'Info';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural transition-agricultural hover:shadow-agricultural-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name={icon} size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-2xl font-bold text-card-foreground">{value}</span>
              <span className="text-sm text-muted-foreground">{unit}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
            <Icon name={getStatusIcon(status)} size={12} />
            <span className="capitalize">{status}</span>
          </div>
          {trend && (
            <div className={`flex items-center space-x-1 ${getTrendColor(trend)}`}>
              <Icon name={getTrendIcon(trend)} size={16} />
            </div>
          )}
        </div>
      </div>
      
      {recommendation && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">{recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default SoilMetricsCard;
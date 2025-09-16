import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import { apiGet } from '../../../lib/api';


const AlertsCard = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAlerts() {
      setLoading(true);
      setError(null);
      try {
        // Adjust endpoint as per your backend API docs
        const data = await apiGet('/dashboard/overview');
        setAlerts(data?.alerts || []);
      } catch (e) {
        setError('Failed to load alerts');
      } finally {
        setLoading(false);
      }
    }
    fetchAlerts();
  }, []);

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

  if (loading) {
    return <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">Loading alerts...</div>;
  }
  if (error) {
    return <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural text-red-500">{error}</div>;
  }
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
      </div>
      <div className="space-y-4">
        {alerts?.map((alert) => (
          <div 
            key={alert?.id || alert?.title} 
            className={`p-4 rounded-lg border-l-4 ${getSeverityBg(alert?.severity)}`}
            style={{ borderLeftColor: getSeverityColor(alert?.severity) }}
          >
            <div className="flex items-start space-x-3">
              <div className="p-1.5 rounded-md" style={{ backgroundColor: getSeverityColor(alert?.severity) + '20' }}>
                <Icon 
                  name={alert?.icon || 'AlertCircle'} 
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
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsCard;
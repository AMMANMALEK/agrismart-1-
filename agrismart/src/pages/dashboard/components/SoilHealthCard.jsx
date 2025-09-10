import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

const SoilHealthCard = () => {
  const soilData = {
    ph: 6.8,
    moisture: 65,
    temperature: 24,
    npk: {
      nitrogen: 78,
      phosphorus: 65,
      potassium: 82
    }
  };

  const npkData = [
    { name: 'N', value: soilData?.npk?.nitrogen, color: 'var(--color-primary)' },
    { name: 'P', value: soilData?.npk?.phosphorus, color: 'var(--color-secondary)' },
    { name: 'K', value: soilData?.npk?.potassium, color: 'var(--color-accent)' }
  ];

  const getHealthStatus = (value, type) => {
    if (type === 'ph') {
      if (value >= 6.0 && value <= 7.5) return { status: 'Good', color: 'var(--color-success)' };
      if (value >= 5.5 && value <= 8.0) return { status: 'Fair', color: 'var(--color-warning)' };
      return { status: 'Poor', color: 'var(--color-error)' };
    }
    if (value >= 70) return { status: 'Good', color: 'var(--color-success)' };
    if (value >= 50) return { status: 'Fair', color: 'var(--color-warning)' };
    return { status: 'Poor', color: 'var(--color-error)' };
  };

  const phStatus = getHealthStatus(soilData?.ph, 'ph');
  const moistureStatus = getHealthStatus(soilData?.moisture);

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <Icon name="Sprout" size={24} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Soil Health Monitor</h3>
            <p className="text-sm text-muted-foreground">Real-time soil conditions</p>
          </div>
        </div>
        <Link to="/soil-health-monitor">
          <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
            View Details
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Droplets" size={16} color="var(--color-primary)" />
              <span className="text-sm font-medium text-card-foreground">pH Level</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-card-foreground">{soilData?.ph}</div>
              <div 
                className="text-xs font-medium"
                style={{ color: phStatus?.color }}
              >
                {phStatus?.status}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Waves" size={16} color="var(--color-primary)" />
              <span className="text-sm font-medium text-card-foreground">Moisture</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-card-foreground">{soilData?.moisture}%</div>
              <div 
                className="text-xs font-medium"
                style={{ color: moistureStatus?.color }}
              >
                {moistureStatus?.status}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Thermometer" size={16} color="var(--color-primary)" />
              <span className="text-sm font-medium text-card-foreground">Temperature</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-card-foreground">{soilData?.temperature}°C</div>
              <div className="text-xs text-muted-foreground">Optimal</div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-card-foreground mb-3">NPK Levels</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={npkData}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                />
                <YAxis hide />
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]}
                  fill="var(--color-primary)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>N: {soilData?.npk?.nitrogen}%</span>
            <span>P: {soilData?.npk?.phosphorus}%</span>
            <span>K: {soilData?.npk?.potassium}%</span>
          </div>
        </div>
      </div>
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-muted-foreground">Last updated: 2 hours ago</span>
          </div>
          <Button variant="ghost" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SoilHealthCard;
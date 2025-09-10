import React from 'react';
import Icon from '../../../components/AppIcon';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const QuickStatsCard = () => {
  const stats = [
    {
      id: 1,
      title: 'Total Farm Area',
      value: '125.5',
      unit: 'acres',
      change: '+2.3%',
      changeType: 'positive',
      icon: 'MapPin',
      color: 'var(--color-primary)',
      bgColor: 'bg-primary/10'
    },
    {
      id: 2,
      title: 'Active Crops',
      value: '8',
      unit: 'varieties',
      change: '+1',
      changeType: 'positive',
      icon: 'Wheat',
      color: 'var(--color-success)',
      bgColor: 'bg-success/10'
    },
    {
      id: 3,
      title: 'Water Usage',
      value: '2,450',
      unit: 'liters/day',
      change: '-12%',
      changeType: 'positive',
      icon: 'Droplets',
      color: 'var(--color-accent)',
      bgColor: 'bg-accent/10'
    },
    {
      id: 4,
      title: 'Energy Consumption',
      value: '145',
      unit: 'kWh/day',
      change: '-8%',
      changeType: 'positive',
      icon: 'Zap',
      color: 'var(--color-warning)',
      bgColor: 'bg-warning/10'
    }
  ];

  const trendData = [
    { day: 1, value: 20 },
    { day: 2, value: 25 },
    { day: 3, value: 22 },
    { day: 4, value: 28 },
    { day: 5, value: 32 },
    { day: 6, value: 30 },
    { day: 7, value: 35 }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Activity" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Farm Overview</h3>
            <p className="text-sm text-muted-foreground">Key performance metrics</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-success">+15.2%</div>
          <div className="text-xs text-muted-foreground">vs last month</div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {stats?.map((stat) => (
          <div key={stat?.id} className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-md ${stat?.bgColor}`}>
                <Icon name={stat?.icon} size={16} color={stat?.color} />
              </div>
              <span 
                className="text-xs font-medium"
                style={{ 
                  color: stat?.changeType === 'positive' ? 'var(--color-success)' : 'var(--color-error)' 
                }}
              >
                {stat?.change}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline space-x-1">
                <span className="text-xl font-bold text-card-foreground">{stat?.value}</span>
                <span className="text-sm text-muted-foreground">{stat?.unit}</span>
              </div>
              <p className="text-sm text-muted-foreground">{stat?.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-card-foreground">7-Day Trend</h4>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={14} color="var(--color-success)" />
            <span className="text-xs text-success font-medium">+12% growth</span>
          </div>
        </div>
        <div className="h-16">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStatsCard;
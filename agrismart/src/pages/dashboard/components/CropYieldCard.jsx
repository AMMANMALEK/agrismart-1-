import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const CropYieldCard = () => {
  const yieldData = [
    { crop: 'Wheat', current: 85, predicted: 92, increase: 8.2 },
    { crop: 'Rice', current: 78, predicted: 88, increase: 12.8 },
    { crop: 'Corn', current: 92, predicted: 95, increase: 3.3 },
    { crop: 'Soybean', current: 76, predicted: 84, increase: 10.5 }
  ];

  const getStatusColor = (increase) => {
    if (increase >= 10) return 'var(--color-success)';
    if (increase >= 5) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  const getStatusIcon = (increase) => {
    if (increase >= 10) return 'TrendingUp';
    if (increase >= 5) return 'Minus';
    return 'TrendingDown';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-success/10 rounded-lg">
            <Icon name="BarChart3" size={24} color="var(--color-success)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Crop Yield Predictions</h3>
            <p className="text-sm text-muted-foreground">AI-powered yield forecasts</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-success">+8.7% Avg</div>
          <div className="text-xs text-muted-foreground">Expected increase</div>
        </div>
      </div>
      <div className="space-y-4 mb-6">
        {yieldData?.map((crop) => (
          <div key={crop?.crop} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Wheat" size={20} color="var(--color-primary)" />
              <div>
                <div className="font-medium text-card-foreground">{crop?.crop}</div>
                <div className="text-sm text-muted-foreground">Current: {crop?.current}% efficiency</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Icon 
                name={getStatusIcon(crop?.increase)} 
                size={16} 
                color={getStatusColor(crop?.increase)} 
              />
              <div className="text-right">
                <div 
                  className="font-semibold"
                  style={{ color: getStatusColor(crop?.increase) }}
                >
                  +{crop?.increase}%
                </div>
                <div className="text-xs text-muted-foreground">Predicted: {crop?.predicted}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={yieldData}>
            <XAxis 
              dataKey="crop" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
            />
            <YAxis hide />
            <Bar 
              dataKey="predicted" 
              fill="var(--color-primary)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CropYieldCard;
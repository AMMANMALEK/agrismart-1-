import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const SoilTrendChart = ({ data, title, parameters }) => {
  const colors = {
    nitrogen: '#2D5016',
    phosphorus: '#8B4513',
    potassium: '#FF6B35',
    ph: '#16A34A',
    moisture: '#EAB308'
  };

  const formatTooltipValue = (value, name) => {
    const units = {
      nitrogen: 'kg/ha',
      phosphorus: 'kg/ha',
      potassium: 'kg/ha',
      ph: 'pH',
      moisture: '%'
    };
    return [`${value} ${units?.[name] || ''}`, name?.charAt(0)?.toUpperCase() + name?.slice(1)];
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">{title}</h3>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                color: 'var(--color-popover-foreground)'
              }}
              formatter={formatTooltipValue}
            />
            <Legend />
            {parameters?.map((param) => (
              <Line
                key={param}
                type="monotone"
                dataKey={param}
                stroke={colors?.[param]}
                strokeWidth={2}
                dot={{ fill: colors?.[param], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: colors?.[param], strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SoilTrendChart;
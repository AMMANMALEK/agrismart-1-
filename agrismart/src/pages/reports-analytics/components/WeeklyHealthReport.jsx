import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeeklyHealthReport = () => {
  const [selectedWeek, setSelectedWeek] = useState('current');

  const weeklyData = [
    { day: 'Mon', soilMoisture: 65, temperature: 28, cropHealth: 85, pestRisk: 15 },
    { day: 'Tue', soilMoisture: 62, temperature: 30, cropHealth: 82, pestRisk: 18 },
    { day: 'Wed', soilMoisture: 58, temperature: 32, cropHealth: 78, pestRisk: 22 },
    { day: 'Thu', soilMoisture: 55, temperature: 31, cropHealth: 80, pestRisk: 20 },
    { day: 'Fri', soilMoisture: 60, temperature: 29, cropHealth: 83, pestRisk: 17 },
    { day: 'Sat', soilMoisture: 63, temperature: 27, cropHealth: 87, pestRisk: 13 },
    { day: 'Sun', soilMoisture: 68, temperature: 26, cropHealth: 90, pestRisk: 10 }
  ];

  const healthDistribution = [
    { name: 'Excellent', value: 45, color: 'var(--color-success)' },
    { name: 'Good', value: 35, color: 'var(--color-primary)' },
    { name: 'Fair', value: 15, color: 'var(--color-warning)' },
    { name: 'Poor', value: 5, color: 'var(--color-error)' }
  ];

  const weekOptions = [
    { value: 'current', label: 'Current Week' },
    { value: 'last', label: 'Last Week' },
    { value: 'twoWeeks', label: '2 Weeks Ago' },
    { value: 'threeWeeks', label: '3 Weeks Ago' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Activity" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Weekly Farm Health Report</h3>
            <p className="text-sm text-muted-foreground">Comprehensive health analysis for your farm</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {weekOptions?.map(option => (
              <option key={option?.value} value={option?.value}>{option?.label}</option>
            ))}
          </select>
          <Button variant="outline" iconName="Download" iconPosition="left" size="sm">
            Export
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Health Metrics */}
        <div className="space-y-4">
          <h4 className="font-medium text-card-foreground">Daily Health Metrics</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="day" 
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
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="cropHealth" 
                  stroke="var(--color-success)" 
                  strokeWidth={2}
                  name="Crop Health %"
                />
                <Line 
                  type="monotone" 
                  dataKey="soilMoisture" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  name="Soil Moisture %"
                />
                <Line 
                  type="monotone" 
                  dataKey="pestRisk" 
                  stroke="var(--color-error)" 
                  strokeWidth={2}
                  name="Pest Risk %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Health Distribution */}
        <div className="space-y-4">
          <h4 className="font-medium text-card-foreground">Overall Health Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={healthDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {healthDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {healthDistribution?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item?.color }}
                ></div>
                <span className="text-sm text-muted-foreground">{item?.name}: {item?.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Key Insights */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium text-card-foreground mb-3 flex items-center">
          <Icon name="Lightbulb" size={16} color="var(--color-warning)" className="mr-2" />
          Key Insights
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start space-x-2">
            <Icon name="TrendingUp" size={14} color="var(--color-success)" className="mt-0.5" />
            <span className="text-muted-foreground">Crop health improved by 8% this week</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Droplets" size={14} color="var(--color-primary)" className="mt-0.5" />
            <span className="text-muted-foreground">Soil moisture levels are optimal</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={14} color="var(--color-warning)" className="mt-0.5" />
            <span className="text-muted-foreground">Monitor pest activity on Wednesday</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Sun" size={14} color="var(--color-accent)" className="mt-0.5" />
            <span className="text-muted-foreground">Temperature stress detected mid-week</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyHealthReport;
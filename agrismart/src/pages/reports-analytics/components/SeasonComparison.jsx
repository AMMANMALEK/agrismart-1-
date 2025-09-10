import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';


const SeasonComparison = () => {
  const [comparisonType, setComparisonType] = useState('yield');
  const [selectedCrop, setSelectedCrop] = useState('wheat');

  const seasonData = [
    { season: '2021-22', wheat: 4.2, rice: 3.8, corn: 5.1, profit: 125000, cost: 85000 },
    { season: '2022-23', wheat: 4.5, rice: 4.1, corn: 5.4, profit: 142000, cost: 92000 },
    { season: '2023-24', wheat: 4.8, rice: 4.3, corn: 5.7, profit: 158000, cost: 98000 },
    { season: '2024-25', wheat: 5.1, rice: 4.6, corn: 6.0, profit: 175000, cost: 105000 }
  ];

  const monthlyComparison = [
    { month: 'Jan', current: 85, previous: 78, average: 82 },
    { month: 'Feb', current: 88, previous: 82, average: 85 },
    { month: 'Mar', current: 92, previous: 85, average: 88 },
    { month: 'Apr', current: 95, previous: 88, average: 91 },
    { month: 'May', current: 89, previous: 92, average: 90 },
    { month: 'Jun', current: 87, previous: 89, average: 88 },
    { month: 'Jul', current: 91, previous: 86, average: 89 },
    { month: 'Aug', current: 94, previous: 90, average: 92 },
    { month: 'Sep', current: 96, previous: 93, average: 94 },
    { month: 'Oct', current: 98, previous: 95, average: 96 },
    { month: 'Nov', current: 93, previous: 91, average: 92 },
    { month: 'Dec', current: 90, previous: 88, average: 89 }
  ];

  const crops = [
    { value: 'wheat', label: 'Wheat' },
    { value: 'rice', label: 'Rice' },
    { value: 'corn', label: 'Corn' }
  ];

  const comparisonTypes = [
    { value: 'yield', label: 'Yield Comparison' },
    { value: 'profit', label: 'Profit Analysis' },
    { value: 'efficiency', label: 'Efficiency Metrics' }
  ];

  const getCurrentSeasonData = () => {
    const currentSeason = seasonData?.[seasonData?.length - 1];
    const previousSeason = seasonData?.[seasonData?.length - 2];
    
    return {
      current: currentSeason,
      previous: previousSeason,
      yieldChange: ((currentSeason?.[selectedCrop] - previousSeason?.[selectedCrop]) / previousSeason?.[selectedCrop] * 100)?.toFixed(1),
      profitChange: ((currentSeason?.profit - previousSeason?.profit) / previousSeason?.profit * 100)?.toFixed(1)
    };
  };

  const seasonStats = getCurrentSeasonData();

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <Icon name="TrendingUp" size={24} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Season Comparison Analytics</h3>
            <p className="text-sm text-muted-foreground">Compare performance across different seasons</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {crops?.map(crop => (
              <option key={crop?.value} value={crop?.value}>{crop?.label}</option>
            ))}
          </select>
          <select
            value={comparisonType}
            onChange={(e) => setComparisonType(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {comparisonTypes?.map(type => (
              <option key={type?.value} value={type?.value}>{type?.label}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-success/10 rounded-lg border border-success/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Yield</p>
              <p className="text-2xl font-bold text-success">{seasonStats?.current?.[selectedCrop]} t/ha</p>
            </div>
            <Icon name="TrendingUp" size={20} color="var(--color-success)" />
          </div>
          <p className="text-xs text-success mt-1">+{seasonStats?.yieldChange}% from last season</p>
        </div>

        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Profit</p>
              <p className="text-2xl font-bold text-primary">₹{(seasonStats?.current?.profit / 1000)?.toFixed(0)}K</p>
            </div>
            <Icon name="DollarSign" size={20} color="var(--color-primary)" />
          </div>
          <p className="text-xs text-primary mt-1">+{seasonStats?.profitChange}% from last season</p>
        </div>

        <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Input Costs</p>
              <p className="text-2xl font-bold text-warning">₹{(seasonStats?.current?.cost / 1000)?.toFixed(0)}K</p>
            </div>
            <Icon name="Calculator" size={20} color="var(--color-warning)" />
          </div>
          <p className="text-xs text-warning mt-1">Cost per hectare</p>
        </div>

        <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">ROI</p>
              <p className="text-2xl font-bold text-accent">{((seasonStats?.current?.profit / seasonStats?.current?.cost) * 100)?.toFixed(0)}%</p>
            </div>
            <Icon name="Target" size={20} color="var(--color-accent)" />
          </div>
          <p className="text-xs text-accent mt-1">Return on Investment</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Season-wise Yield Trends */}
        <div className="space-y-4">
          <h4 className="font-medium text-card-foreground">4-Year Yield Trends</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={seasonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="season" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  label={{ value: 'Yield (t/ha)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey={selectedCrop} fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Performance Comparison */}
        <div className="space-y-4">
          <h4 className="font-medium text-card-foreground">Monthly Performance vs Previous Year</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  label={{ value: 'Performance %', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="current" 
                  stackId="1" 
                  stroke="var(--color-success)" 
                  fill="var(--color-success)"
                  fillOpacity={0.3}
                  name="Current Year"
                />
                <Area 
                  type="monotone" 
                  dataKey="previous" 
                  stackId="2" 
                  stroke="var(--color-secondary)" 
                  fill="var(--color-secondary)"
                  fillOpacity={0.3}
                  name="Previous Year"
                />
                <Line 
                  type="monotone" 
                  dataKey="average" 
                  stroke="var(--color-warning)" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Regional Average"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Improvement Recommendations */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium text-card-foreground mb-3 flex items-center">
          <Icon name="Target" size={16} color="var(--color-primary)" className="mr-2" />
          Performance Insights & Recommendations
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5" />
              <span className="text-muted-foreground">Consistent yield improvement over 4 seasons</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="TrendingUp" size={14} color="var(--color-success)" className="mt-0.5" />
              <span className="text-muted-foreground">Profit margins increased by 15% annually</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Icon name="AlertCircle" size={14} color="var(--color-warning)" className="mt-0.5" />
              <span className="text-muted-foreground">Input costs rising faster than yield gains</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Target" size={14} color="var(--color-primary)" className="mt-0.5" />
              <span className="text-muted-foreground">Focus on efficiency improvements for next season</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonComparison;
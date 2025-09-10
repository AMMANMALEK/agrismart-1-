import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadialBarChart, RadialBar, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceDashboard = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const performanceData = [
    { month: 'Jan', yieldPerAcre: 4.2, inputCost: 25000, revenue: 85000, efficiency: 85 },
    { month: 'Feb', yieldPerAcre: 4.5, inputCost: 28000, revenue: 92000, efficiency: 88 },
    { month: 'Mar', yieldPerAcre: 4.8, inputCost: 32000, revenue: 98000, efficiency: 90 },
    { month: 'Apr', yieldPerAcre: 5.1, inputCost: 35000, revenue: 105000, efficiency: 92 },
    { month: 'May', yieldPerAcre: 4.9, inputCost: 33000, revenue: 102000, efficiency: 89 },
    { month: 'Jun', yieldPerAcre: 5.3, inputCost: 38000, revenue: 112000, efficiency: 94 }
  ];

  const resourceUtilization = [
    { name: 'Water Usage', value: 78, fill: 'var(--color-primary)' },
    { name: 'Fertilizer Efficiency', value: 85, fill: 'var(--color-success)' },
    { name: 'Labor Productivity', value: 72, fill: 'var(--color-warning)' },
    { name: 'Equipment Usage', value: 88, fill: 'var(--color-accent)' }
  ];

  const kpiData = [
    {
      title: 'Average Yield',
      value: '4.8 t/ha',
      change: '+12%',
      trend: 'up',
      icon: 'TrendingUp',
      color: 'success'
    },
    {
      title: 'Cost per Hectare',
      value: '₹32,000',
      change: '+8%',
      trend: 'up',
      icon: 'Calculator',
      color: 'warning'
    },
    {
      title: 'Revenue per Hectare',
      value: '₹99,000',
      change: '+15%',
      trend: 'up',
      icon: 'DollarSign',
      color: 'success'
    },
    {
      title: 'Profit Margin',
      value: '67.7%',
      change: '+5%',
      trend: 'up',
      icon: 'Target',
      color: 'primary'
    }
  ];

  const timeRanges = [
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' },
    { value: '2years', label: 'Last 2 Years' }
  ];

  const getColorByType = (type) => {
    const colors = {
      success: 'var(--color-success)',
      warning: 'var(--color-warning)',
      primary: 'var(--color-primary)',
      accent: 'var(--color-accent)'
    };
    return colors?.[type] || 'var(--color-muted-foreground)';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Icon name="BarChart3" size={24} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Performance Dashboard</h3>
            <p className="text-sm text-muted-foreground">Key performance indicators and metrics</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {timeRanges?.map(range => (
              <option key={range?.value} value={range?.value}>{range?.label}</option>
            ))}
          </select>
          <Button variant="outline" iconName="RefreshCw" iconPosition="left" size="sm">
            Refresh
          </Button>
        </div>
      </div>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiData?.map((kpi, index) => (
          <div key={index} className="p-4 bg-background rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg bg-${kpi?.color}/10`}>
                <Icon name={kpi?.icon} size={16} color={getColorByType(kpi?.color)} />
              </div>
              <div className={`flex items-center space-x-1 text-xs ${
                kpi?.trend === 'up' ? 'text-success' : 'text-error'
              }`}>
                <Icon 
                  name={kpi?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                  size={12} 
                  color={kpi?.trend === 'up' ? 'var(--color-success)' : 'var(--color-error)'} 
                />
                <span>{kpi?.change}</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{kpi?.value}</p>
              <p className="text-sm text-muted-foreground">{kpi?.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Trends */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-medium text-card-foreground">Performance Trends</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
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
                  yAxisId="left"
                  type="monotone" 
                  dataKey="yieldPerAcre" 
                  stroke="var(--color-success)" 
                  strokeWidth={2}
                  name="Yield per Acre (t/ha)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  name="Efficiency %"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--color-accent)" 
                  strokeWidth={2}
                  name="Revenue (₹)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resource Utilization */}
        <div className="space-y-4">
          <h4 className="font-medium text-card-foreground">Resource Utilization</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={resourceUtilization}>
                <RadialBar
                  minAngle={15}
                  label={{ position: 'insideStart', fill: '#fff' }}
                  background
                  clockWise
                  dataKey="value"
                />
                <Legend 
                  iconSize={10}
                  layout="vertical"
                  verticalAlign="bottom"
                  wrapperStyle={{
                    fontSize: '12px',
                    paddingTop: '10px'
                  }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Cost vs Revenue Analysis */}
      <div className="mt-6 space-y-4">
        <h4 className="font-medium text-card-foreground">Cost vs Revenue Analysis</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="inputCost" fill="var(--color-error)" name="Input Cost" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue" fill="var(--color-success)" name="Revenue" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Performance Summary */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium text-card-foreground mb-3 flex items-center">
          <Icon name="BarChart3" size={16} color="var(--color-accent)" className="mr-2" />
          Performance Summary
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Icon name="TrendingUp" size={14} color="var(--color-success)" className="mt-0.5" />
              <span className="text-muted-foreground">Yield increased by 12% over 6 months</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="DollarSign" size={14} color="var(--color-success)" className="mt-0.5" />
              <span className="text-muted-foreground">Revenue growth of 15% achieved</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={14} color="var(--color-warning)" className="mt-0.5" />
              <span className="text-muted-foreground">Input costs rising at 8% rate</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Target" size={14} color="var(--color-primary)" className="mt-0.5" />
              <span className="text-muted-foreground">Efficiency improvements needed</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Icon name="Award" size={14} color="var(--color-accent)" className="mt-0.5" />
              <span className="text-muted-foreground">Above regional average performance</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5" />
              <span className="text-muted-foreground">Sustainable growth trajectory</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
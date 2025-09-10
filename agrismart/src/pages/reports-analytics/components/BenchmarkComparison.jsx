import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BenchmarkComparison = () => {
  const [comparisonLevel, setComparisonLevel] = useState('regional');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const performanceMetrics = [
    { metric: 'Yield per Hectare', yourFarm: 5.2, regional: 4.8, national: 4.5, topPerformers: 6.1, unit: 't/ha' },
    { metric: 'Cost Efficiency', yourFarm: 85, regional: 78, national: 75, topPerformers: 92, unit: '%' },
    { metric: 'Water Usage', yourFarm: 72, regional: 80, national: 85, topPerformers: 65, unit: '%' },
    { metric: 'Fertilizer Efficiency', yourFarm: 88, regional: 82, national: 79, topPerformers: 94, unit: '%' },
    { metric: 'Pest Management', yourFarm: 91, regional: 85, national: 82, topPerformers: 96, unit: '%' },
    { metric: 'Profit Margin', yourFarm: 68, regional: 62, national: 58, topPerformers: 75, unit: '%' }
  ];

  const radarData = [
    { subject: 'Yield', yourFarm: 85, regional: 78, topPerformers: 95, fullMark: 100 },
    { subject: 'Cost Control', yourFarm: 88, regional: 82, topPerformers: 92, fullMark: 100 },
    { subject: 'Sustainability', yourFarm: 75, regional: 70, topPerformers: 90, fullMark: 100 },
    { subject: 'Technology', yourFarm: 70, regional: 65, topPerformers: 95, fullMark: 100 },
    { subject: 'Quality', yourFarm: 82, regional: 78, topPerformers: 88, fullMark: 100 },
    { subject: 'Innovation', yourFarm: 68, regional: 60, topPerformers: 85, fullMark: 100 }
  ];

  const trendData = [
    { month: 'Jan', yourFarm: 78, regional: 75, national: 72 },
    { month: 'Feb', yourFarm: 82, regional: 78, national: 74 },
    { month: 'Mar', yourFarm: 85, regional: 80, national: 76 },
    { month: 'Apr', yourFarm: 88, regional: 82, national: 78 },
    { month: 'May', yourFarm: 91, regional: 85, national: 80 },
    { month: 'Jun', yourFarm: 94, regional: 87, national: 82 }
  ];

  const rankings = [
    { category: 'Overall Performance', rank: 12, total: 150, percentile: 92 },
    { category: 'Yield Efficiency', rank: 8, total: 150, percentile: 95 },
    { category: 'Cost Management', rank: 15, total: 150, percentile: 90 },
    { category: 'Sustainability', rank: 25, total: 150, percentile: 83 },
    { category: 'Technology Adoption', rank: 35, total: 150, percentile: 77 },
    { category: 'Market Performance', rank: 18, total: 150, percentile: 88 }
  ];

  const comparisonLevels = [
    { value: 'regional', label: 'Regional Comparison' },
    { value: 'national', label: 'National Comparison' },
    { value: 'global', label: 'Global Benchmarks' }
  ];

  const getPerformanceColor = (yourValue, benchmark) => {
    const ratio = yourValue / benchmark;
    if (ratio >= 1.1) return 'var(--color-success)';
    if (ratio >= 0.9) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  const getRankColor = (percentile) => {
    if (percentile >= 90) return 'var(--color-success)';
    if (percentile >= 75) return 'var(--color-primary)';
    if (percentile >= 50) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-warning/10 rounded-lg">
            <Icon name="Award" size={24} color="var(--color-warning)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Benchmark Comparison</h3>
            <p className="text-sm text-muted-foreground">Compare your performance against industry standards</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={comparisonLevel}
            onChange={(e) => setComparisonLevel(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {comparisonLevels?.map(level => (
              <option key={level?.value} value={level?.value}>{level?.label}</option>
            ))}
          </select>
          <Button variant="outline" iconName="Download" iconPosition="left" size="sm">
            Export Report
          </Button>
        </div>
      </div>
      {/* Performance Rankings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-success/10 rounded-lg border border-success/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Overall Rank</p>
              <p className="text-2xl font-bold text-success">#12</p>
            </div>
            <Icon name="Trophy" size={20} color="var(--color-success)" />
          </div>
          <p className="text-xs text-success mt-1">Top 8% in region</p>
        </div>

        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Performance Score</p>
              <p className="text-2xl font-bold text-primary">92.5</p>
            </div>
            <Icon name="Target" size={20} color="var(--color-primary)" />
          </div>
          <p className="text-xs text-primary mt-1">Above regional average</p>
        </div>

        <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Improvement Areas</p>
              <p className="text-2xl font-bold text-warning">2</p>
            </div>
            <Icon name="TrendingUp" size={20} color="var(--color-warning)" />
          </div>
          <p className="text-xs text-warning mt-1">Focus areas identified</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Radar Chart */}
        <div className="space-y-4">
          <h4 className="font-medium text-card-foreground">Performance Radar</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]}
                  tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }}
                />
                <Radar
                  name="Your Farm"
                  dataKey="yourFarm"
                  stroke="var(--color-primary)"
                  fill="var(--color-primary)"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="Regional Average"
                  dataKey="regional"
                  stroke="var(--color-warning)"
                  fill="var(--color-warning)"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Radar
                  name="Top Performers"
                  dataKey="topPerformers"
                  stroke="var(--color-success)"
                  fill="var(--color-success)"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Metrics Comparison */}
        <div className="space-y-4">
          <h4 className="font-medium text-card-foreground">Detailed Metrics Comparison</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {performanceMetrics?.map((metric, index) => (
              <div key={index} className="p-3 bg-background rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-card-foreground text-sm">{metric?.metric}</span>
                  <span className="text-xs text-muted-foreground">{metric?.unit}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Your Farm:</span>
                    <span 
                      className="font-medium"
                      style={{ color: getPerformanceColor(metric?.yourFarm, metric?.regional) }}
                    >
                      {metric?.yourFarm}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Regional Avg:</span>
                    <span className="font-medium text-muted-foreground">{metric?.regional}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Top Performers:</span>
                    <span className="font-medium text-success">{metric?.topPerformers}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(metric?.yourFarm / metric?.topPerformers) * 100}%`,
                        backgroundColor: getPerformanceColor(metric?.yourFarm, metric?.regional)
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Performance Trend */}
      <div className="mt-6 space-y-4">
        <h4 className="font-medium text-card-foreground">Performance Trend (6 Months)</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: 'Performance Score', angle: -90, position: 'insideLeft' }}
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
                dataKey="yourFarm" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                name="Your Farm"
              />
              <Line 
                type="monotone" 
                dataKey="regional" 
                stroke="var(--color-warning)" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Regional Average"
              />
              <Line 
                type="monotone" 
                dataKey="national" 
                stroke="var(--color-muted-foreground)" 
                strokeWidth={2}
                strokeDasharray="3 3"
                name="National Average"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Category Rankings */}
      <div className="mt-6 space-y-4">
        <h4 className="font-medium text-card-foreground">Category Rankings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rankings?.map((ranking, index) => (
            <div key={index} className="p-4 bg-background rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-card-foreground">{ranking?.category}</span>
                <div className="flex items-center space-x-2">
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${getRankColor(ranking?.percentile)}20`,
                      color: getRankColor(ranking?.percentile)
                    }}
                  >
                    {ranking?.percentile}th percentile
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Rank: #{ranking?.rank} of {ranking?.total}</span>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name="TrendingUp" 
                    size={12} 
                    color={getRankColor(ranking?.percentile)} 
                  />
                  <span style={{ color: getRankColor(ranking?.percentile) }}>
                    Top {Math.round((1 - ranking?.rank / ranking?.total) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Improvement Recommendations */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium text-card-foreground mb-3 flex items-center">
          <Icon name="Target" size={16} color="var(--color-primary)" className="mr-2" />
          Improvement Recommendations
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5" />
              <span className="text-muted-foreground">Excellent performance in yield and cost efficiency</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="TrendingUp" size={14} color="var(--color-primary)" className="mt-0.5" />
              <span className="text-muted-foreground">Consistent improvement over past 6 months</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={14} color="var(--color-warning)" className="mt-0.5" />
              <span className="text-muted-foreground">Focus on technology adoption and sustainability</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Target" size={14} color="var(--color-accent)" className="mt-0.5" />
              <span className="text-muted-foreground">Potential to reach top 5% with targeted improvements</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkComparison;
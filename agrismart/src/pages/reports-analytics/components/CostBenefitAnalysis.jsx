import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CostBenefitAnalysis = () => {
  const [analysisType, setAnalysisType] = useState('monthly');
  const [selectedStrategy, setSelectedStrategy] = useState('current');

  const costBreakdown = [
    { category: 'Seeds', amount: 15000, percentage: 18, color: 'var(--color-primary)' },
    { category: 'Fertilizers', amount: 25000, percentage: 30, color: 'var(--color-success)' },
    { category: 'Pesticides', amount: 12000, percentage: 14, color: 'var(--color-warning)' },
    { category: 'Labor', amount: 20000, percentage: 24, color: 'var(--color-accent)' },
    { category: 'Equipment', amount: 8000, percentage: 10, color: 'var(--color-secondary)' },
    { category: 'Others', amount: 3000, percentage: 4, color: 'var(--color-error)' }
  ];

  const monthlyAnalysis = [
    { month: 'Jan', costs: 45000, revenue: 85000, profit: 40000, roi: 89 },
    { month: 'Feb', costs: 52000, revenue: 92000, profit: 40000, roi: 77 },
    { month: 'Mar', costs: 58000, revenue: 98000, profit: 40000, roi: 69 },
    { month: 'Apr', costs: 62000, revenue: 105000, profit: 43000, roi: 69 },
    { month: 'May', costs: 55000, revenue: 102000, profit: 47000, roi: 85 },
    { month: 'Jun', costs: 48000, revenue: 112000, profit: 64000, roi: 133 }
  ];

  const strategyComparison = [
    {
      strategy: 'Current Practice',
      initialCost: 83000,
      annualCost: 320000,
      annualRevenue: 580000,
      netProfit: 260000,
      roi: 81.3,
      paybackPeriod: 3.8
    },
    {
      strategy: 'Organic Farming',
      initialCost: 125000,
      annualCost: 280000,
      annualRevenue: 650000,
      netProfit: 370000,
      roi: 132.1,
      paybackPeriod: 2.7
    },
    {
      strategy: 'Precision Agriculture',
      initialCost: 180000,
      annualCost: 350000,
      annualRevenue: 720000,
      netProfit: 370000,
      roi: 105.7,
      paybackPeriod: 3.2
    },
    {
      strategy: 'Integrated Approach',
      initialCost: 150000,
      annualCost: 310000,
      annualRevenue: 680000,
      netProfit: 370000,
      roi: 119.4,
      paybackPeriod: 2.9
    }
  ];

  const analysisTypes = [
    { value: 'monthly', label: 'Monthly Analysis' },
    { value: 'strategy', label: 'Strategy Comparison' },
    { value: 'breakdown', label: 'Cost Breakdown' }
  ];

  const strategies = [
    { value: 'current', label: 'Current Practice' },
    { value: 'organic', label: 'Organic Farming' },
    { value: 'precision', label: 'Precision Agriculture' },
    { value: 'integrated', label: 'Integrated Approach' }
  ];

  const getStrategyData = () => {
    return strategyComparison?.find(s => 
      s?.strategy?.toLowerCase()?.replace(' ', '') === selectedStrategy?.replace('_', '')
    ) || strategyComparison?.[0];
  };

  const currentStrategy = getStrategyData();

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-success/10 rounded-lg">
            <Icon name="Calculator" size={24} color="var(--color-success)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Cost-Benefit Analysis</h3>
            <p className="text-sm text-muted-foreground">Evaluate farming strategies and investments</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={analysisType}
            onChange={(e) => setAnalysisType(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {analysisTypes?.map(type => (
              <option key={type?.value} value={type?.value}>{type?.label}</option>
            ))}
          </select>
          {analysisType === 'strategy' && (
            <select
              value={selectedStrategy}
              onChange={(e) => setSelectedStrategy(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {strategies?.map(strategy => (
                <option key={strategy?.value} value={strategy?.value}>{strategy?.label}</option>
              ))}
            </select>
          )}
          <Button variant="outline" iconName="Download" iconPosition="left" size="sm">
            Export
          </Button>
        </div>
      </div>
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-success/10 rounded-lg border border-success/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold text-success">₹{(currentStrategy?.annualRevenue / 1000)?.toFixed(0)}K</p>
            </div>
            <Icon name="TrendingUp" size={20} color="var(--color-success)" />
          </div>
          <p className="text-xs text-success mt-1">Annual projection</p>
        </div>

        <div className="p-4 bg-error/10 rounded-lg border border-error/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Costs</p>
              <p className="text-2xl font-bold text-error">₹{(currentStrategy?.annualCost / 1000)?.toFixed(0)}K</p>
            </div>
            <Icon name="TrendingDown" size={20} color="var(--color-error)" />
          </div>
          <p className="text-xs text-error mt-1">Including all expenses</p>
        </div>

        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Net Profit</p>
              <p className="text-2xl font-bold text-primary">₹{(currentStrategy?.netProfit / 1000)?.toFixed(0)}K</p>
            </div>
            <Icon name="DollarSign" size={20} color="var(--color-primary)" />
          </div>
          <p className="text-xs text-primary mt-1">After all deductions</p>
        </div>

        <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">ROI</p>
              <p className="text-2xl font-bold text-accent">{currentStrategy?.roi?.toFixed(1)}%</p>
            </div>
            <Icon name="Target" size={20} color="var(--color-accent)" />
          </div>
          <p className="text-xs text-accent mt-1">Return on investment</p>
        </div>
      </div>
      {analysisType === 'monthly' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Cost vs Revenue */}
          <div className="space-y-4">
            <h4 className="font-medium text-card-foreground">Monthly Cost vs Revenue</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="month" 
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
                  <Bar dataKey="costs" fill="var(--color-error)" name="Costs" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="revenue" fill="var(--color-success)" name="Revenue" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ROI Trend */}
          <div className="space-y-4">
            <h4 className="font-medium text-card-foreground">ROI Trend</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                    label={{ value: 'ROI %', angle: -90, position: 'insideLeft' }}
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
                    dataKey="roi" 
                    stroke="var(--color-primary)" 
                    strokeWidth={3}
                    name="ROI %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      {analysisType === 'breakdown' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cost Breakdown Pie Chart */}
          <div className="space-y-4">
            <h4 className="font-medium text-card-foreground">Cost Distribution</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="amount"
                  >
                    {costBreakdown?.map((entry, index) => (
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
          </div>

          {/* Cost Details */}
          <div className="space-y-4">
            <h4 className="font-medium text-card-foreground">Detailed Cost Breakdown</h4>
            <div className="space-y-3">
              {costBreakdown?.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item?.color }}
                    ></div>
                    <span className="font-medium text-card-foreground">{item?.category}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-card-foreground">₹{item?.amount?.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{item?.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {analysisType === 'strategy' && (
        <div className="space-y-6">
          {/* Strategy Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium text-card-foreground">Strategy</th>
                  <th className="text-right p-3 font-medium text-card-foreground">Initial Cost</th>
                  <th className="text-right p-3 font-medium text-card-foreground">Annual Cost</th>
                  <th className="text-right p-3 font-medium text-card-foreground">Annual Revenue</th>
                  <th className="text-right p-3 font-medium text-card-foreground">Net Profit</th>
                  <th className="text-right p-3 font-medium text-card-foreground">ROI</th>
                  <th className="text-right p-3 font-medium text-card-foreground">Payback</th>
                </tr>
              </thead>
              <tbody>
                {strategyComparison?.map((strategy, index) => (
                  <tr key={index} className={`border-b border-border ${
                    strategy?.strategy?.toLowerCase()?.replace(' ', '') === selectedStrategy?.replace('_', '') 
                      ? 'bg-primary/5' :'hover:bg-muted/50'
                  }`}>
                    <td className="p-3 font-medium text-card-foreground">{strategy?.strategy}</td>
                    <td className="p-3 text-right text-muted-foreground">₹{(strategy?.initialCost / 1000)?.toFixed(0)}K</td>
                    <td className="p-3 text-right text-muted-foreground">₹{(strategy?.annualCost / 1000)?.toFixed(0)}K</td>
                    <td className="p-3 text-right text-success">₹{(strategy?.annualRevenue / 1000)?.toFixed(0)}K</td>
                    <td className="p-3 text-right text-primary font-medium">₹{(strategy?.netProfit / 1000)?.toFixed(0)}K</td>
                    <td className="p-3 text-right text-accent font-medium">{strategy?.roi?.toFixed(1)}%</td>
                    <td className="p-3 text-right text-muted-foreground">{strategy?.paybackPeriod} years</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Investment Recommendations */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium text-card-foreground mb-3 flex items-center">
          <Icon name="TrendingUp" size={16} color="var(--color-success)" className="mr-2" />
          Investment Recommendations
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5" />
              <span className="text-muted-foreground">Organic farming shows highest ROI potential</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="TrendingUp" size={14} color="var(--color-primary)" className="mt-0.5" />
              <span className="text-muted-foreground">Precision agriculture offers long-term benefits</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={14} color="var(--color-warning)" className="mt-0.5" />
              <span className="text-muted-foreground">Monitor fertilizer costs - 30% of total expenses</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Target" size={14} color="var(--color-accent)" className="mt-0.5" />
              <span className="text-muted-foreground">Consider integrated approach for balanced returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostBenefitAnalysis;
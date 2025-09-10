import React, { useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PredictiveAnalytics = () => {
  const [predictionType, setPredictionType] = useState('yield');
  const [timeHorizon, setTimeHorizon] = useState('6months');

  const yieldPrediction = [
    { month: 'Jan', actual: 4.2, predicted: 4.3, confidence: 95 },
    { month: 'Feb', actual: 4.5, predicted: 4.4, confidence: 92 },
    { month: 'Mar', actual: 4.8, predicted: 4.7, confidence: 90 },
    { month: 'Apr', actual: 5.1, predicted: 5.0, confidence: 88 },
    { month: 'May', actual: null, predicted: 5.2, confidence: 85 },
    { month: 'Jun', actual: null, predicted: 5.4, confidence: 82 },
    { month: 'Jul', actual: null, predicted: 5.1, confidence: 78 },
    { month: 'Aug', actual: null, predicted: 4.9, confidence: 75 }
  ];

  const marketPrediction = [
    { month: 'Jan', price: 2800, predicted: 2850, demand: 85 },
    { month: 'Feb', price: 2950, predicted: 2920, demand: 88 },
    { month: 'Mar', price: 3100, predicted: 3080, demand: 92 },
    { month: 'Apr', price: 3250, predicted: 3200, demand: 90 },
    { month: 'May', price: null, predicted: 3350, demand: 87 },
    { month: 'Jun', price: null, predicted: 3450, demand: 85 },
    { month: 'Jul', price: null, predicted: 3300, demand: 89 },
    { month: 'Aug', price: null, predicted: 3200, demand: 92 }
  ];

  const riskFactors = [
    { factor: 'Weather Risk', current: 25, predicted: 35, impact: 'Medium' },
    { factor: 'Pest Risk', current: 15, predicted: 20, impact: 'Low' },
    { factor: 'Market Risk', current: 30, predicted: 25, impact: 'High' },
    { factor: 'Input Cost Risk', current: 40, predicted: 45, impact: 'High' }
  ];

  const predictionTypes = [
    { value: 'yield', label: 'Yield Forecast' },
    { value: 'market', label: 'Market Prices' },
    { value: 'weather', label: 'Weather Impact' },
    { value: 'risk', label: 'Risk Assessment' }
  ];

  const timeHorizons = [
    { value: '3months', label: 'Next 3 Months' },
    { value: '6months', label: 'Next 6 Months' },
    { value: '1year', label: 'Next Year' }
  ];

  const getCurrentData = () => {
    switch (predictionType) {
      case 'yield':
        return yieldPrediction;
      case 'market':
        return marketPrediction;
      default:
        return yieldPrediction;
    }
  };

  const getRiskColor = (impact) => {
    switch (impact) {
      case 'High':
        return 'var(--color-error)';
      case 'Medium':
        return 'var(--color-warning)';
      case 'Low':
        return 'var(--color-success)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="TrendingUp" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Predictive Analytics</h3>
            <p className="text-sm text-muted-foreground">AI-powered forecasts and predictions</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={predictionType}
            onChange={(e) => setPredictionType(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {predictionTypes?.map(type => (
              <option key={type?.value} value={type?.value}>{type?.label}</option>
            ))}
          </select>
          <select
            value={timeHorizon}
            onChange={(e) => setTimeHorizon(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {timeHorizons?.map(horizon => (
              <option key={horizon?.value} value={horizon?.value}>{horizon?.label}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Prediction Accuracy Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-success/10 rounded-lg border border-success/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Model Accuracy</p>
              <p className="text-2xl font-bold text-success">92.5%</p>
            </div>
            <Icon name="Target" size={20} color="var(--color-success)" />
          </div>
          <p className="text-xs text-success mt-1">Based on historical data</p>
        </div>

        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Confidence Level</p>
              <p className="text-2xl font-bold text-primary">85%</p>
            </div>
            <Icon name="Shield" size={20} color="var(--color-primary)" />
          </div>
          <p className="text-xs text-primary mt-1">For next 3 months</p>
        </div>

        <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Data Points</p>
              <p className="text-2xl font-bold text-warning">1,247</p>
            </div>
            <Icon name="Database" size={20} color="var(--color-warning)" />
          </div>
          <p className="text-xs text-warning mt-1">Training dataset size</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prediction Chart */}
        <div className="space-y-4">
          <h4 className="font-medium text-card-foreground">
            {predictionType === 'yield' ? 'Yield Forecast' : 'Market Price Forecast'}
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={getCurrentData()}>
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
                <Area 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="var(--color-primary)" 
                  fill="var(--color-primary)"
                  fillOpacity={0.3}
                  name="Predicted"
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="var(--color-success)" 
                  strokeWidth={2}
                  name="Actual"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="space-y-4">
          <h4 className="font-medium text-card-foreground">Risk Assessment Matrix</h4>
          <div className="space-y-3">
            {riskFactors?.map((risk, index) => (
              <div key={index} className="p-3 bg-background rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-card-foreground">{risk?.factor}</span>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${getRiskColor(risk?.impact)}20`,
                      color: getRiskColor(risk?.impact)
                    }}
                  >
                    {risk?.impact}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">Current:</span>
                    <span className="font-medium">{risk?.current}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={risk?.predicted > risk?.current ? 'TrendingUp' : 'TrendingDown'} 
                      size={12} 
                      color={risk?.predicted > risk?.current ? 'var(--color-error)' : 'var(--color-success)'} 
                    />
                    <span className="text-muted-foreground">Predicted:</span>
                    <span className="font-medium">{risk?.predicted}%</span>
                  </div>
                </div>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${risk?.predicted}%`,
                      backgroundColor: getRiskColor(risk?.impact)
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Recommendations */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium text-card-foreground mb-3 flex items-center">
          <Icon name="Lightbulb" size={16} color="var(--color-warning)" className="mr-2" />
          AI Recommendations
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5" />
              <span className="text-muted-foreground">Optimal planting window: Next 2-3 weeks</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="TrendingUp" size={14} color="var(--color-primary)" className="mt-0.5" />
              <span className="text-muted-foreground">Expected yield increase of 8% this season</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="DollarSign" size={14} color="var(--color-success)" className="mt-0.5" />
              <span className="text-muted-foreground">Market prices favorable for next 4 months</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={14} color="var(--color-warning)" className="mt-0.5" />
              <span className="text-muted-foreground">Monitor weather patterns closely in May</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Shield" size={14} color="var(--color-primary)" className="mt-0.5" />
              <span className="text-muted-foreground">Implement pest control measures early</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Target" size={14} color="var(--color-accent)" className="mt-0.5" />
              <span className="text-muted-foreground">Consider crop diversification strategy</span>
            </div>
          </div>
        </div>
      </div>
      {/* Model Information */}
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>Last updated: {new Date()?.toLocaleDateString()}</span>
          <span>Model version: v2.1.3</span>
        </div>
        <Button variant="ghost" size="sm" iconName="Info">
          Model Details
        </Button>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;
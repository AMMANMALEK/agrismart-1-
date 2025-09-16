import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

import { apiGet } from '../../../lib/api';


const QuickStatsCard = () => {
  const [stats, setStats] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      setError(null);
      try {
        const data = await apiGet('/dashboard/stats');
        setStats(data?.stats || []);
        setTrendData(data?.trendData || []);
      } catch (e) {
        setError('Failed to load stats');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">Loading stats...</div>;
  }
  if (error) {
    return <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural text-red-500">{error}</div>;
  }
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
          <div key={stat?.id || stat?.title} className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-md ${stat?.bgColor || ''}`}>
                <Icon name={stat?.icon || 'Activity'} size={16} color={stat?.color || 'var(--color-primary)'} />
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
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import MainSidebar from '../../components/ui/MainSidebar';
import MobileNavigationBar from '../../components/ui/MobileNavigationBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import WeeklyHealthReport from './components/WeeklyHealthReport';
import SeasonComparison from './components/SeasonComparison';
import PerformanceDashboard from './components/PerformanceDashboard';
import PredictiveAnalytics from './components/PredictiveAnalytics';
import CostBenefitAnalysis from './components/CostBenefitAnalysis';
import BenchmarkComparison from './components/BenchmarkComparison';
import ExportReports from './components/ExportReports';
import { useTranslation } from 'react-i18next';

const ReportsAnalytics = () => {
  const { t } = useTranslation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: t('reports.tabs.overview'), icon: 'LayoutDashboard' },
    { id: 'weekly', label: t('reports.tabs.weekly'), icon: 'Activity' },
    { id: 'seasonal', label: t('reports.tabs.seasonal'), icon: 'TrendingUp' },
    { id: 'performance', label: t('reports.tabs.performance'), icon: 'BarChart3' },
    { id: 'predictions', label: t('reports.tabs.predictions'), icon: 'Brain' },
    { id: 'financial', label: t('reports.tabs.financial'), icon: 'Calculator' },
    { id: 'benchmarks', label: t('reports.tabs.benchmarks'), icon: 'Award' },
    { id: 'export', label: t('reports.tabs.export'), icon: 'Download' }
  ];

  const overviewStats = [
    {
      title: t('reports.overview.totalReports'),
      value: '247',
      change: '+12%',
      trend: 'up',
      icon: 'FileText',
      color: 'primary'
    },
    {
      title: t('reports.overview.dataPoints'),
      value: '15.2K',
      change: '+8%',
      trend: 'up',
      icon: 'Database',
      color: 'success'
    },
    {
      title: t('reports.overview.insights'),
      value: '89',
      change: '+15%',
      trend: 'up',
      icon: 'Lightbulb',
      color: 'warning'
    },
    {
      title: t('reports.overview.accuracy'),
      value: '94.5%',
      change: '+2%',
      trend: 'up',
      icon: 'Target',
      color: 'accent'
    }
  ];

  const quickActions = [
    { label: t('reports.quick.generateWeekly'), icon: 'Plus', action: () => setActiveTab('weekly') },
    { label: t('reports.quick.compareSeasons'), icon: 'GitCompare', action: () => setActiveTab('seasonal') },
    { label: t('reports.quick.viewPredictions'), icon: 'TrendingUp', action: () => setActiveTab('predictions') },
    { label: t('reports.quick.exportAll'), icon: 'Download', action: () => setActiveTab('export') }
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'weekly':
        return <WeeklyHealthReport />;
      case 'seasonal':
        return <SeasonComparison />;
      case 'performance':
        return <PerformanceDashboard />;
      case 'predictions':
        return <PredictiveAnalytics />;
      case 'financial':
        return <CostBenefitAnalysis />;
      case 'benchmarks':
        return <BenchmarkComparison />;
      case 'export':
        return <ExportReports />;
      default:
        return (
          <div className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {overviewStats?.map((stat, index) => (
                <div key={index} className="p-4 bg-card rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg bg-${stat?.color}/10`}>
                      <Icon name={stat?.icon} size={16} color={getColorByType(stat?.color)} />
                    </div>
                    <div className={`flex items-center space-x-1 text-xs ${
                      stat?.trend === 'up' ? 'text-success' : 'text-error'
                    }`}>
                      <Icon 
                        name={stat?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                        size={12} 
                        color={stat?.trend === 'up' ? 'var(--color-success)' : 'var(--color-error)'} 
                      />
                      <span>{stat?.change}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">{stat?.value}</p>
                    <p className="text-sm text-muted-foreground">{stat?.title}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Quick Actions */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">{t('reports.quick.title')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions?.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={action?.action}
                    iconName={action?.icon}
                    iconPosition="left"
                    className="h-16 flex-col space-y-2"
                  >
                    <span className="text-sm font-medium">{action?.label}</span>
                  </Button>
                ))}
              </div>
            </div>
            {/* Recent Activity */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-card-foreground">{t('reports.recent.title')}</h3>
                <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                  {t('reports.recent.viewAll')}
                </Button>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Weekly Farm Health Report', date: 'September 8, 2024', type: t('reports.recent.type.health'), status: 'completed' },
                  { name: 'Season Comparison Analysis', date: 'September 5, 2024', type: t('reports.recent.type.analytics'), status: 'completed' },
                  { name: 'Cost-Benefit Analysis Q3', date: 'September 1, 2024', type: t('reports.recent.type.financial'), status: 'completed' },
                  { name: 'Predictive Yield Forecast', date: 'August 28, 2024', type: t('reports.recent.type.predictions'), status: 'completed' }
                ]?.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon name="FileText" size={16} color="var(--color-primary)" />
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">{report?.name}</p>
                        <p className="text-sm text-muted-foreground">{report?.date} • {report?.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                        {t('reports.recent.status.completed')}
                      </span>
                      <Button variant="ghost" size="sm" iconName="Download">
                        {t('reports.download')}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('reports.title')} - AgriSmart</title>
        <meta name="description" content={t('reports.metaDescription')} />
      </Helmet>
      <div className="min-h-screen bg-background">
        <MainSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={setSidebarCollapsed} 
        />
        
        <div className={`transition-agricultural ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
        } pb-16 lg:pb-0`}>
          {/* Header */}
          <div className="bg-card border-b border-border px-4 py-4 lg:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-card-foreground">{t('reports.title')}</h1>
                <p className="text-muted-foreground mt-1">
                  {t('reports.subtitle')}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-card border-b border-border px-4 lg:px-6">
            <div className="flex space-x-1 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-agricultural whitespace-nowrap ${
                    activeTab === tab?.id
                      ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon 
                    name={tab?.icon} 
                    size={16} 
                    color={activeTab === tab?.id ? 'var(--color-primary)' : 'currentColor'} 
                  />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 lg:p-6">
            {renderTabContent()}
          </div>
        </div>

        <MobileNavigationBar />
      </div>
    </>
  );
};

export default ReportsAnalytics;
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
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('csv');

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

  const downloadFormats = [
    { id: 'csv', label: 'CSV', description: 'Comma-separated values', icon: 'FileText' },
    { id: 'excel', label: 'Excel', description: 'Microsoft Excel format', icon: 'FileSpreadsheet' },
    { id: 'pdf', label: 'PDF', description: 'Portable Document Format', icon: 'FileImage' },
    { id: 'json', label: 'JSON', description: 'JavaScript Object Notation', icon: 'Code' }
  ];

  const handleDownload = (format) => {
    // Sample data for demonstration
    const sampleData = [
      { date: '2024-09-01', crop: 'Wheat', yield: '4.2 tons', health: '95%', cost: '$1200' },
      { date: '2024-09-02', crop: 'Rice', yield: '3.8 tons', health: '92%', cost: '$980' },
      { date: '2024-09-03', crop: 'Corn', yield: '5.1 tons', health: '88%', cost: '$1450' },
      { date: '2024-09-04', crop: 'Soybeans', yield: '2.9 tons', health: '94%', cost: '$850' },
      { date: '2024-09-05', crop: 'Barley', yield: '3.5 tons', health: '91%', cost: '$1100' }
    ];

    const filename = `farm-report-${new Date().toISOString().split('T')[0]}`;

    switch (format) {
      case 'csv':
        downloadCSV(sampleData, filename);
        break;
      case 'excel':
        downloadExcel(sampleData, filename);
        break;
      case 'pdf':
        downloadPDF(sampleData, filename);
        break;
      case 'json':
        downloadJSON(sampleData, filename);
        break;
      default:
        break;
    }
    setShowDownloadModal(false);
  };

  const downloadCSV = (data, filename) => {
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
  };

  const downloadJSON = (data, filename) => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.json`;
    link.click();
  };

  const downloadExcel = (data, filename) => {
    // For Excel, we'll create a CSV with .xlsx extension for simplicity
    // In a real app, you'd use a library like xlsx or exceljs
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join('\t'),
      ...data.map(row => headers.map(header => row[header]).join('\t'))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.xlsx`;
    link.click();
  };

  const downloadPDF = (data, filename) => {
    // For PDF, we'll create a simple HTML content and convert it
    // In a real app, you'd use a library like jsPDF or html2pdf
    const htmlContent = `
      <html>
        <head>
          <title>Farm Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          <h1>Farm Report - ${new Date().toLocaleDateString()}</h1>
          <table>
            <thead>
              <tr>
                ${Object.keys(data[0]).map(key => `<th>${key.charAt(0).toUpperCase() + key.slice(1)}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${data.map(row => `
                <tr>
                  ${Object.values(row).map(value => `<td>${value}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.html`;
    link.click();
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
              <div className="flex items-center space-x-3">
                <Button
                  variant="default"
                  iconName="Download"
                  iconPosition="left"
                  size="sm"
                  onClick={() => setShowDownloadModal(true)}
                >
                  Export Data
                </Button>
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

        {/* Download Modal */}
        {showDownloadModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-lg border border-border w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-card-foreground">Export Data</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={() => setShowDownloadModal(false)}
                  />
                </div>
                
                <p className="text-muted-foreground mb-6">
                  Choose your preferred format to download the farm data and reports.
                </p>

                <div className="space-y-3 mb-6">
                  {downloadFormats.map((format) => (
                    <div
                      key={format.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-agricultural ${
                        selectedFormat === format.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedFormat(format.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          selectedFormat === format.id ? 'bg-primary/10' : 'bg-muted/50'
                        }`}>
                          <Icon 
                            name={format.icon} 
                            size={16} 
                            color={selectedFormat === format.id ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
                          />
                        </div>
                        <div>
                          <p className="font-medium text-card-foreground">{format.label}</p>
                          <p className="text-sm text-muted-foreground">{format.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setShowDownloadModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    fullWidth
                    iconName="Download"
                    iconPosition="left"
                    onClick={() => handleDownload(selectedFormat)}
                  >
                    Download {downloadFormats.find(f => f.id === selectedFormat)?.label}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ReportsAnalytics;
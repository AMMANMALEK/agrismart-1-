import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportReports = () => {
  const [selectedReports, setSelectedReports] = useState([]);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState('lastMonth');
  const [isExporting, setIsExporting] = useState(false);

  const availableReports = [
    {
      id: 'weekly-health',
      name: 'Weekly Farm Health Report',
      description: 'Comprehensive health analysis with charts and insights',
      size: '2.3 MB',
      icon: 'Activity',
      category: 'Health'
    },
    {
      id: 'season-comparison',
      name: 'Season Comparison Analytics',
      description: 'Multi-season performance comparison and trends',
      size: '1.8 MB',
      icon: 'TrendingUp',
      category: 'Analytics'
    },
    {
      id: 'performance-dashboard',
      name: 'Performance Dashboard',
      description: 'KPI metrics and performance indicators',
      size: '1.5 MB',
      icon: 'BarChart3',
      category: 'Performance'
    },
    {
      id: 'predictive-analytics',
      name: 'Predictive Analytics Report',
      description: 'AI-powered forecasts and predictions',
      size: '3.1 MB',
      icon: 'Brain',
      category: 'Predictions'
    },
    {
      id: 'cost-benefit',
      name: 'Cost-Benefit Analysis',
      description: 'Financial analysis and investment recommendations',
      size: '2.7 MB',
      icon: 'Calculator',
      category: 'Financial'
    },
    {
      id: 'benchmark-comparison',
      name: 'Benchmark Comparison',
      description: 'Performance comparison against industry standards',
      size: '2.0 MB',
      icon: 'Award',
      category: 'Benchmarks'
    }
  ];

  const exportFormats = [
    { value: 'pdf', label: 'PDF Document', icon: 'FileText' },
    { value: 'excel', label: 'Excel Spreadsheet', icon: 'FileSpreadsheet' },
    { value: 'csv', label: 'CSV Data', icon: 'Database' },
    { value: 'json', label: 'JSON Data', icon: 'Code' }
  ];

  const dateRanges = [
    { value: 'lastWeek', label: 'Last Week' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'last3Months', label: 'Last 3 Months' },
    { value: 'last6Months', label: 'Last 6 Months' },
    { value: 'lastYear', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const recentExports = [
    {
      name: 'Weekly Health Report - September 2024',
      format: 'PDF',
      date: '2024-09-08',
      size: '2.3 MB',
      status: 'completed'
    },
    {
      name: 'Season Comparison - Q3 2024',
      format: 'Excel',
      date: '2024-09-05',
      size: '1.8 MB',
      status: 'completed'
    },
    {
      name: 'Performance Dashboard - August 2024',
      format: 'PDF',
      date: '2024-09-01',
      size: '1.5 MB',
      status: 'completed'
    }
  ];

  const handleReportToggle = (reportId) => {
    setSelectedReports(prev => 
      prev?.includes(reportId) 
        ? prev?.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleSelectAll = () => {
    if (selectedReports?.length === availableReports?.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(availableReports?.map(report => report?.id));
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsExporting(false);
    // Reset selections
    setSelectedReports([]);
  };

  const getTotalSize = () => {
    const selectedReportObjects = availableReports?.filter(report => 
      selectedReports?.includes(report?.id)
    );
    const totalMB = selectedReportObjects?.reduce((total, report) => {
      return total + parseFloat(report?.size?.replace(' MB', ''));
    }, 0);
    return totalMB?.toFixed(1);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Health: 'var(--color-success)',
      Analytics: 'var(--color-primary)',
      Performance: 'var(--color-accent)',
      Predictions: 'var(--color-warning)',
      Financial: 'var(--color-secondary)',
      Benchmarks: 'var(--color-error)'
    };
    return colors?.[category] || 'var(--color-muted-foreground)';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <Icon name="Download" size={24} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Export Reports</h3>
            <p className="text-sm text-muted-foreground">Download reports in various formats</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            onClick={handleSelectAll}
            iconName={selectedReports?.length === availableReports?.length ? "Square" : "CheckSquare"}
            iconPosition="left"
            size="sm"
          >
            {selectedReports?.length === availableReports?.length ? 'Deselect All' : 'Select All'}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Selection */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-medium text-card-foreground">Available Reports</h4>
          <div className="space-y-3">
            {availableReports?.map((report) => (
              <div 
                key={report?.id}
                className={`p-4 rounded-lg border transition-agricultural cursor-pointer ${
                  selectedReports?.includes(report?.id)
                    ? 'border-primary bg-primary/5' :'border-border bg-background hover:bg-muted/50'
                }`}
                onClick={() => handleReportToggle(report?.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedReports?.includes(report?.id) ? 'bg-primary' : 'bg-muted'
                    }`}>
                      <Icon 
                        name={selectedReports?.includes(report?.id) ? 'Check' : report?.icon} 
                        size={20} 
                        color={selectedReports?.includes(report?.id) ? 'white' : 'var(--color-muted-foreground)'} 
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-medium text-card-foreground truncate">{report?.name}</h5>
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: `${getCategoryColor(report?.category)}20`,
                          color: getCategoryColor(report?.category)
                        }}
                      >
                        {report?.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{report?.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Icon name="HardDrive" size={12} />
                        <span>{report?.size}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Configuration */}
        <div className="space-y-6">
          {/* Export Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-card-foreground">Export Settings</h4>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Format</label>
                <div className="space-y-2">
                  {exportFormats?.map((format) => (
                    <label key={format?.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        value={format?.value}
                        checked={exportFormat === format?.value}
                        onChange={(e) => setExportFormat(e?.target?.value)}
                        className="w-4 h-4 text-primary border-border focus:ring-primary"
                      />
                      <div className="flex items-center space-x-2">
                        <Icon name={format?.icon} size={16} color="var(--color-muted-foreground)" />
                        <span className="text-sm text-card-foreground">{format?.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {dateRanges?.map(range => (
                    <option key={range?.value} value={range?.value}>{range?.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Export Summary */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h5 className="font-medium text-card-foreground mb-3">Export Summary</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Selected Reports:</span>
                <span className="font-medium text-card-foreground">{selectedReports?.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Size:</span>
                <span className="font-medium text-card-foreground">{getTotalSize()} MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Format:</span>
                <span className="font-medium text-card-foreground">{exportFormats?.find(f => f?.value === exportFormat)?.label}</span>
              </div>
            </div>
          </div>

          {/* Export Button */}
          <Button
            variant="default"
            fullWidth
            disabled={selectedReports?.length === 0 || isExporting}
            loading={isExporting}
            onClick={handleExport}
            iconName="Download"
            iconPosition="left"
          >
            {isExporting ? 'Exporting...' : `Export ${selectedReports?.length} Report${selectedReports?.length !== 1 ? 's' : ''}`}
          </Button>

          {/* Recent Exports */}
          <div className="space-y-4">
            <h5 className="font-medium text-card-foreground">Recent Exports</h5>
            <div className="space-y-2">
              {recentExports?.map((export_, index) => (
                <div key={index} className="p-3 bg-background rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-card-foreground truncate">{export_?.name}</span>
                    <Icon name="Download" size={14} color="var(--color-primary)" className="cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{export_?.format} • {export_?.size}</span>
                    <span>{new Date(export_.date)?.toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Export Tips */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium text-card-foreground mb-3 flex items-center">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mr-2" />
          Export Tips
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Icon name="FileText" size={14} color="var(--color-primary)" className="mt-0.5" />
              <span className="text-muted-foreground">PDF format is best for sharing and presentations</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="FileSpreadsheet" size={14} color="var(--color-success)" className="mt-0.5" />
              <span className="text-muted-foreground">Excel format allows for further data analysis</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Icon name="Database" size={14} color="var(--color-warning)" className="mt-0.5" />
              <span className="text-muted-foreground">CSV format is ideal for data integration</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Clock" size={14} color="var(--color-accent)" className="mt-0.5" />
              <span className="text-muted-foreground">Large exports may take a few minutes to process</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportReports;
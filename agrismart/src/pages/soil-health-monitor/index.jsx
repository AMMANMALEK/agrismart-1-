import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MainSidebar from '../../components/ui/MainSidebar';
import MobileNavigationBar from '../../components/ui/MobileNavigationBar';

import Button from '../../components/ui/Button';
import { useTranslation } from 'react-i18next';
import SoilMetricsCard from './components/SoilMetricsCard';
import SoilTrendChart from './components/SoilTrendChart';
import SoilTestingCard from './components/SoilTestingCard';
import SoilRecommendationCard from './components/SoilRecommendationCard';
import SoilParameterFilter from './components/SoilParameterFilter';

const SoilHealthMonitor = () => {
  const { t } = useTranslation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedField, setSelectedField] = useState('field_1');
  const [filters, setFilters] = useState({
    parameter: 'all',
    field: 'all',
    timeRange: '30d',
    depthMin: '',
    depthMax: '',
    startDate: '',
    endDate: ''
  });

  // Mock soil metrics data
  const soilMetrics = [
    {
      title: 'Nitrogen (N)',
      value: '45',
      unit: 'kg/ha',
      status: 'warning',
      icon: 'Leaf',
      recommendation: 'Consider nitrogen fertilizer application. Current levels are below optimal range.',
      trend: 'down'
    },
    {
      title: 'Phosphorus (P)',
      value: '28',
      unit: 'kg/ha',
      status: 'good',
      icon: 'Sprout',
      recommendation: 'Phosphorus levels are within optimal range. Continue current management.',
      trend: 'up'
    },
    {
      title: 'Potassium (K)',
      value: '62',
      unit: 'kg/ha',
      status: 'good',
      icon: 'Zap',
      recommendation: 'Potassium levels are excellent. No immediate action required.',
      trend: 'up'
    },
    {
      title: 'pH Level',
      value: '5.8',
      unit: 'pH',
      status: 'critical',
      icon: 'Beaker',
      recommendation: 'Soil is acidic. Apply lime to increase pH to 6.0-7.0 range.',
      trend: 'down'
    },
    {
      title: 'Moisture Content',
      value: '32',
      unit: '%',
      status: 'warning',
      icon: 'Droplets',
      recommendation: 'Soil moisture is low. Increase irrigation frequency.',
      trend: 'down'
    },
    {
      title: 'Organic Matter',
      value: '3.2',
      unit: '%',
      status: 'good',
      icon: 'TreePine',
      recommendation: 'Organic matter content is healthy. Continue composting practices.',
      trend: 'stable'
    }
  ];

  // Mock trend data
  const trendData = [
    { date: '2024-08-10', nitrogen: 52, phosphorus: 25, potassium: 58, ph: 6.2, moisture: 45 },
    { date: '2024-08-17', nitrogen: 50, phosphorus: 26, potassium: 60, ph: 6.0, moisture: 42 },
    { date: '2024-08-24', nitrogen: 48, phosphorus: 27, potassium: 61, ph: 5.9, moisture: 38 },
    { date: '2024-08-31', nitrogen: 46, phosphorus: 28, potassium: 62, ph: 5.8, moisture: 35 },
    { date: '2024-09-07', nitrogen: 45, phosphorus: 28, potassium: 62, ph: 5.8, moisture: 32 }
  ];

  // Mock testing facilities
  const testingFacilities = [
    {
      id: 1,
      name: 'AgriLab Testing Center',
      address: '123 Farm Road, Agricultural District',
      distance: 3.2,
      rating: 4.8,
      turnaroundTime: '3-5 days',
      price: 1500,
      availableTests: ['NPK Analysis', 'pH Testing', 'Micronutrients', 'Organic Matter']
    },
    {
      id: 2,
      name: 'Soil Science Institute',
      address: '456 Research Avenue, University Campus',
      distance: 8.7,
      rating: 4.9,
      turnaroundTime: '5-7 days',
      price: 2200,
      availableTests: ['Complete Analysis', 'Heavy Metals', 'Salinity', 'Biological Activity']
    },
    {
      id: 3,
      name: 'FarmTech Diagnostics',
      address: '789 Technology Park, Innovation Hub',
      distance: 12.5,
      rating: 4.6,
      turnaroundTime: '2-3 days',
      price: 1800,
      availableTests: ['Quick NPK', 'pH & EC', 'Moisture Analysis', 'Texture Analysis']
    }
  ];

  // Mock recommendations
  const recommendations = [
    {
      id: 1,
      title: 'Apply Lime for pH Correction',
      category: 'pH Management',
      type: 'ph_adjustment',
      priority: 'high',
      description: 'Your soil pH is 5.8, which is too acidic for optimal crop growth. Apply agricultural lime to raise pH to 6.0-7.0 range.',
      details: [
        'Apply 2-3 tons of agricultural lime per hectare',
        'Incorporate lime into top 15cm of soil',
        'Allow 2-3 months for pH adjustment',
        'Retest soil pH after application'
      ],
      expectedOutcome: 'Improved nutrient availability and better crop yields by 15-20%',
      cost: 8500,
      timeframe: '2-3 months'
    },
    {
      id: 2,
      title: 'Nitrogen Fertilizer Application',
      category: 'Nutrient Management',
      type: 'fertilizer',
      priority: 'medium',
      description: 'Nitrogen levels are below optimal. Apply nitrogen-rich fertilizer to support crop growth.',
      details: [
        'Apply 60-80 kg/ha of nitrogen fertilizer',
        'Split application: 50% at planting, 50% at flowering',
        'Use urea or ammonium sulfate',
        'Monitor crop response after 2-3 weeks'
      ],
      expectedOutcome: 'Enhanced vegetative growth and improved crop yield',
      cost: 4200,
      timeframe: '2-4 weeks'
    },
    {
      id: 3,
      title: 'Increase Irrigation Frequency',
      category: 'Water Management',
      type: 'irrigation',
      priority: 'medium',
      description: 'Soil moisture content is low at 32%. Increase irrigation to maintain optimal moisture levels.',
      details: [
        'Increase irrigation frequency to every 2-3 days',
        'Apply 25-30mm of water per irrigation',
        'Monitor soil moisture at 15cm depth',
        'Adjust based on weather conditions'
      ],
      expectedOutcome: 'Better water stress management and consistent crop growth',
      cost: 2800,
      timeframe: 'Immediate'
    }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleScheduleTest = (facility) => {
    console.log('Scheduling test with:', facility?.name);
    // Mock scheduling functionality
    alert(`Test scheduled with ${facility?.name}. You will receive a confirmation email shortly.`);
  };

  const handleApplyRecommendation = (recommendation) => {
    console.log('Applying recommendation:', recommendation?.title);
    // Mock apply functionality
    alert(`Recommendation "${recommendation?.title}" has been added to your action plan.`);
  };

  return (
    <>
      <Helmet>
        <title>{t('soil.title')} - AgriSmart</title>
        <meta name="description" content="Monitor and analyze critical soil parameters for optimal crop management decisions with real-time metrics and recommendations." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <MainSidebar isCollapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />
        
        <main className={`transition-agricultural ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'} pb-16 lg:pb-0`}>
          {/* Header */}
          <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
            <div className="px-4 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{t('soil.title')}</h1>
                  <p className="text-muted-foreground">{t('soil.subtitle')}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" iconName="Download" iconPosition="left">
                    {t('soil.export')}
                  </Button>
                  <Button variant="default" iconName="RefreshCw" iconPosition="left">
                    {t('soil.refresh')}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 lg:px-8 py-6 space-y-6">
            {/* Filter Section */}
            <SoilParameterFilter filters={filters} onFilterChange={handleFilterChange} />

            {/* Current Soil Metrics */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">{t('soil.currentMetrics')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {soilMetrics?.map((metric, index) => (
                  <SoilMetricsCard
                    key={index}
                    title={metric?.title}
                    value={metric?.value}
                    unit={metric?.unit}
                    status={metric?.status}
                    icon={metric?.icon}
                    recommendation={metric?.recommendation}
                    trend={metric?.trend}
                  />
                ))}
              </div>
            </div>

            {/* Trend Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SoilTrendChart
                data={trendData}
                title={t('soil.trendNpk')}
                parameters={['nitrogen', 'phosphorus', 'potassium']}
              />
              <SoilTrendChart
                data={trendData}
                title={t('soil.trendPhMoist')}
                parameters={['ph', 'moisture']}
              />
            </div>

            {/* Recommendations */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">{t('soil.recommendations')}</h2>
                <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
                  {t('soil.customize')}
                </Button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {recommendations?.map((recommendation) => (
                  <SoilRecommendationCard
                    key={recommendation?.id}
                    recommendation={recommendation}
                    onApplyRecommendation={handleApplyRecommendation}
                  />
                ))}
              </div>
            </div>

            {/* Soil Testing Facilities */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">{t('soil.testingFacilities')}</h2>
                <Button variant="outline" size="sm" iconName="MapPin" iconPosition="left">
                  {t('soil.viewMap')}
                </Button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {testingFacilities?.map((facility) => (
                  <SoilTestingCard
                    key={facility?.id}
                    facility={facility}
                    onScheduleTest={handleScheduleTest}
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">{t('soil.quickActions')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" fullWidth iconName="Calendar" iconPosition="left">
                  {t('soil.scheduleTest')}
                </Button>
                <Button variant="outline" fullWidth iconName="FileText" iconPosition="left">
                  {t('soil.viewHistory')}
                </Button>
                <Button variant="outline" fullWidth iconName="Bell" iconPosition="left">
                  {t('soil.setAlerts')}
                </Button>
                <Button variant="outline" fullWidth iconName="Share2" iconPosition="left">
                  {t('soil.shareReport')}
                </Button>
              </div>
            </div>
          </div>
        </main>

        <MobileNavigationBar />
      </div>
    </>
  );
};

export default SoilHealthMonitor;
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MainSidebar from '../../components/ui/MainSidebar';
import MobileNavigationBar from '../../components/ui/MobileNavigationBar';

// Import all dashboard components
import WeatherCard from './components/WeatherCard';
import CropYieldCard from './components/CropYieldCard';
import AlertsCard from './components/AlertsCard';
import SoilHealthCard from './components/SoilHealthCard';
import ScheduleCard from './components/ScheduleCard';
import MarketPriceCard from './components/MarketPriceCard';
import VoiceAssistantCard from './components/VoiceAssistantCard';
import QuickStatsCard from './components/QuickStatsCard';

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime?.getHours();
    if (hour < 12) {
      setGreeting(t('dashboard.greetMorning'));
    } else if (hour < 17) {
      setGreeting(t('dashboard.greetAfternoon'));
    } else {
      setGreeting(t('dashboard.greetEvening'));
    }
  }, [currentTime, t, i18n.language]);

  const quickActions = [
    {
      title: t('dashboard.soilAnalysis'),
      description: t('dashboard.soilAnalysisDesc'),
      icon: 'Sprout',
      path: '/soil-health-monitor',
      color: 'var(--color-secondary)',
      bgColor: 'bg-secondary/10'
    },
    {
      title: t('dashboard.pestDetection'),
      description: t('dashboard.pestDetectionDesc'),
      icon: 'Bug',
      path: '/pest-detection',
      color: 'var(--color-error)',
      bgColor: 'bg-error/10'
    },
    {
      title: t('dashboard.reports'),
      description: t('dashboard.reportsDesc'),
      icon: 'BarChart3',
      path: '/reports-analytics',
      color: 'var(--color-accent)',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={setSidebarCollapsed} 
      />
      <div className={`transition-agricultural ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        {/* Header */}
        <header className="bg-card border-b border-border p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-card-foreground">
                {greeting}, Farm Manager! 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                {currentTime?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} • {currentTime?.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" iconName="Bell" iconPosition="left">
                <span className="hidden sm:inline">{t('dashboard.notifications')}</span>
              </Button>
              <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
                <span className="hidden sm:inline">{t('dashboard.settings')}</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 lg:p-6 pb-20 lg:pb-6">
          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">{t('dashboard.quickActions')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quickActions?.map((action, index) => (
                <Link key={index} to={action?.path}>
                  <div className="p-4 bg-card rounded-lg border border-border hover:shadow-agricultural-lg transition-agricultural cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${action?.bgColor}`}>
                        <Icon name={action?.icon} size={24} color={action?.color} />
                      </div>
                      <div>
                        <h3 className="font-medium text-card-foreground">{action?.title}</h3>
                        <p className="text-sm text-muted-foreground">{action?.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Row 1 */}
            <div className="xl:col-span-1">
              <WeatherCard />
            </div>
            <div className="xl:col-span-1">
              <CropYieldCard />
            </div>
            <div className="xl:col-span-1">
              <QuickStatsCard />
            </div>

            {/* Row 2 */}
            <div className="lg:col-span-2 xl:col-span-2">
              <AlertsCard />
            </div>
            <div className="xl:col-span-1">
              <VoiceAssistantCard />
            </div>

            {/* Row 3 */}
            <div className="xl:col-span-1">
              <SoilHealthCard />
            </div>
            <div className="xl:col-span-1">
              <ScheduleCard />
            </div>
            <div className="xl:col-span-1">
              <MarketPriceCard />
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name="Lightbulb" size={20} color="var(--color-primary)" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">{t('dashboard.todaysTips')}</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-card-foreground font-medium">{t('dashboard.tipIrrigationTitle')}</p>
                  <p className="text-sm text-muted-foreground">{t('dashboard.tipIrrigationBody')}</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-card-foreground font-medium">{t('dashboard.tipPestTitle')}</p>
                  <p className="text-sm text-muted-foreground">{t('dashboard.tipPestBody')}</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Icon name="Award" size={20} color="var(--color-success)" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">{t('dashboard.farmPerformance')}</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t('dashboard.efficiency')}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full">
                      <div className="w-16 h-2 bg-success rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-success">85%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t('dashboard.sustainability')}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full">
                      <div className="w-18 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-primary">92%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t('dashboard.profitability')}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full">
                      <div className="w-14 h-2 bg-accent rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-accent">78%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <MobileNavigationBar />
    </div>
  );
};

export default Dashboard;
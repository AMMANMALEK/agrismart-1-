import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherRiskForecast = ({ forecast }) => {
  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'high':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getRiskBg = (level) => {
    switch (level?.toLowerCase()) {
      case 'low':
        return 'bg-success/10';
      case 'medium':
        return 'bg-warning/10';
      case 'high':
        return 'bg-error/10';
      default:
        return 'bg-muted';
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'sunny':
        return 'Sun';
      case 'cloudy':
        return 'Cloud';
      case 'rainy':
        return 'CloudRain';
      case 'stormy':
        return 'CloudLightning';
      default:
        return 'Cloud';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="CloudRain" size={24} color="var(--color-primary)" />
        <h2 className="text-xl font-semibold text-card-foreground">Weather-Based Risk Forecast</h2>
      </div>
      {/* Current Risk Alert */}
      {forecast?.currentAlert && (
        <div className={`p-4 rounded-lg mb-6 ${getRiskBg(forecast?.currentAlert?.level)}`}>
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
            <div>
              <h3 className={`font-semibold ${getRiskColor(forecast?.currentAlert?.level)}`}>
                {forecast?.currentAlert?.level?.toUpperCase()} RISK ALERT
              </h3>
              <p className="text-card-foreground mt-1">{forecast?.currentAlert?.message}</p>
              <p className="text-muted-foreground text-sm mt-2">
                Conditions favorable for: {forecast?.currentAlert?.threatenedPests?.join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* 7-Day Forecast */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-card-foreground">7-Day Pest Risk Forecast</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {forecast?.dailyForecast?.map((day, index) => (
            <div key={index} className="border border-border rounded-lg p-3 text-center">
              <div className="space-y-2">
                <p className="text-sm font-medium text-card-foreground">
                  {formatDate(day?.date)}
                </p>
                
                <div className="flex items-center justify-center">
                  <Icon 
                    name={getWeatherIcon(day?.weather?.condition)} 
                    size={24} 
                    color="var(--color-primary)" 
                  />
                </div>
                
                <div className="text-xs text-muted-foreground">
                  <p>{day?.weather?.temperature}°C</p>
                  <p>{day?.weather?.humidity}% humidity</p>
                  <p>{day?.weather?.rainfall}mm rain</p>
                </div>
                
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskBg(day?.riskLevel)} ${getRiskColor(day?.riskLevel)}`}>
                  {day?.riskLevel} Risk
                </div>
                
                {day?.threatenedPests?.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium">At Risk:</p>
                    <p>{day?.threatenedPests?.slice(0, 2)?.join(', ')}</p>
                    {day?.threatenedPests?.length > 2 && (
                      <p>+{day?.threatenedPests?.length - 2} more</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Risk Factors */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Key Risk Factors</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {forecast?.riskFactors?.map((factor, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRiskBg(factor?.impact)}`}>
                <Icon name={factor?.icon} size={16} color={getRiskColor(factor?.impact)?.replace('text-', 'var(--color-')} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-card-foreground">{factor?.name}</h4>
                <p className="text-sm text-muted-foreground">{factor?.description}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs font-medium text-card-foreground">Impact:</span>
                  <span className={`text-xs font-medium ${getRiskColor(factor?.impact)}`}>
                    {factor?.impact}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recommendations */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Weather-Based Recommendations</h3>
        
        <div className="space-y-3">
          {forecast?.recommendations?.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Lightbulb" size={12} color="var(--color-primary)" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-card-foreground">{recommendation?.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{recommendation?.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                  <span>Priority: {recommendation?.priority}</span>
                  <span>Timing: {recommendation?.timing}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Data Source */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Database" size={12} color="var(--color-muted-foreground)" />
            <span>Data updated: {new Date()?.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={12} color="var(--color-muted-foreground)" />
            <span>Location: {forecast?.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherRiskForecast;
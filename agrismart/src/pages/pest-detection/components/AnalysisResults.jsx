import React from 'react';
import Icon from '../../../components/AppIcon';


const AnalysisResults = ({ results }) => {
  if (!results) return null;

  const getStatusColor = (severity) => {
    switch (severity?.toLowerCase()) {
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

  const getStatusBg = (severity) => {
    switch (severity?.toLowerCase()) {
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

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Search" size={24} color="var(--color-primary)" />
        <h2 className="text-xl font-semibold text-card-foreground">Analysis Results</h2>
      </div>
      <div className="space-y-6">
        {/* Primary Detection */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                {results?.pestName}
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                {results?.scientificName}
              </p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBg(results?.severity)} ${getStatusColor(results?.severity)}`}>
                {results?.severity} Risk
              </span>
              <span className={`text-sm font-medium ${getConfidenceColor(results?.confidence)}`}>
                {results?.confidence}% Confidence
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-card-foreground">Affected Crop:</span>
                <p className="text-muted-foreground">{results?.cropType}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-card-foreground">Stage:</span>
                <p className="text-muted-foreground">{results?.stage}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-card-foreground">Damage Level:</span>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        results?.damageLevel <= 30 ? 'bg-success' :
                        results?.damageLevel <= 60 ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${results?.damageLevel}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">{results?.damageLevel}%</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-card-foreground">Favorable Conditions:</span>
                <ul className="text-muted-foreground text-sm mt-1 space-y-1">
                  {results?.conditions?.map((condition, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Icon name="Dot" size={12} color="var(--color-muted-foreground)" />
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Detections */}
        {results?.alternatives && results?.alternatives?.length > 0 && (
          <div>
            <h4 className="text-md font-semibold text-card-foreground mb-3">
              Alternative Possibilities
            </h4>
            <div className="space-y-2">
              {results?.alternatives?.map((alt, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-card-foreground">{alt?.name}</span>
                    <p className="text-xs text-muted-foreground">{alt?.scientificName}</p>
                  </div>
                  <span className={`text-sm font-medium ${getConfidenceColor(alt?.confidence)}`}>
                    {alt?.confidence}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          <button className="flex items-center space-x-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-agricultural">
            <Icon name="Shield" size={16} color="white" />
            <span className="text-sm">View Treatment</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-agricultural">
            <Icon name="BookOpen" size={16} color="white" />
            <span className="text-sm">Learn More</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-agricultural">
            <Icon name="Share2" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-muted-foreground">Share Results</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
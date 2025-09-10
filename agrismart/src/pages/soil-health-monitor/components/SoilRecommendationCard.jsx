import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SoilRecommendationCard = ({ recommendation, onApplyRecommendation }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertCircle';
      case 'medium':
        return 'AlertTriangle';
      case 'low':
        return 'Info';
      default:
        return 'Circle';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'fertilizer':
        return 'Sprout';
      case 'irrigation':
        return 'Droplets';
      case 'ph_adjustment':
        return 'Beaker';
      case 'organic_matter':
        return 'Leaf';
      default:
        return 'Settings';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Icon name={getTypeIcon(recommendation?.type)} size={24} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{recommendation?.title}</h3>
            <p className="text-sm text-muted-foreground">{recommendation?.category}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(recommendation?.priority)}`}>
          <Icon name={getPriorityIcon(recommendation?.priority)} size={12} />
          <span className="capitalize">{recommendation?.priority} Priority</span>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-3">{recommendation?.description}</p>
        
        {recommendation?.details && (
          <div className="space-y-2">
            {recommendation?.details?.map((detail, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Icon name="ChevronRight" size={14} color="var(--color-primary)" className="mt-0.5" />
                <span className="text-sm text-card-foreground">{detail}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {recommendation?.expectedOutcome && (
        <div className="mb-4 p-3 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Target" size={16} color="var(--color-success)" />
            <span className="text-sm font-medium text-success">Expected Outcome</span>
          </div>
          <p className="text-sm text-muted-foreground">{recommendation?.expectedOutcome}</p>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          {recommendation?.cost && (
            <div className="flex items-center space-x-1">
              <Icon name="DollarSign" size={14} />
              <span>₹{recommendation?.cost}</span>
            </div>
          )}
          {recommendation?.timeframe && (
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{recommendation?.timeframe}</span>
            </div>
          )}
        </div>
        <Button
          variant="default"
          size="sm"
          iconName="CheckCircle"
          iconPosition="left"
          onClick={() => onApplyRecommendation(recommendation)}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default SoilRecommendationCard;
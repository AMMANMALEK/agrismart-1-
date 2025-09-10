import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SoilTestingCard = ({ facility, onScheduleTest }) => {
  const getDistanceColor = (distance) => {
    if (distance <= 5) return 'text-success';
    if (distance <= 15) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <Icon name="MapPin" size={24} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{facility?.name}</h3>
            <p className="text-sm text-muted-foreground">{facility?.address}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-sm font-medium ${getDistanceColor(facility?.distance)}`}>
            {facility?.distance} km away
          </div>
          <div className="flex items-center space-x-1 mt-1">
            <Icon name="Star" size={14} color="var(--color-warning)" />
            <span className="text-sm text-muted-foreground">{facility?.rating}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
          <span className="text-sm text-muted-foreground">Results in {facility?.turnaroundTime}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="DollarSign" size={16} color="var(--color-muted-foreground)" />
          <span className="text-sm text-muted-foreground">₹{facility?.price}</span>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="text-sm font-medium text-card-foreground mb-2">Available Tests:</h4>
        <div className="flex flex-wrap gap-2">
          {facility?.availableTests?.map((test, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
            >
              {test}
            </span>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        fullWidth
        iconName="Calendar"
        iconPosition="left"
        onClick={() => onScheduleTest(facility)}
      >
        Schedule Test
      </Button>
    </div>
  );
};

export default SoilTestingCard;
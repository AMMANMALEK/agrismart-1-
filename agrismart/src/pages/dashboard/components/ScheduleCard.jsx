import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScheduleCard = () => {
  const scheduleItems = [
    {
      id: 1,
      type: 'irrigation',
      title: 'Irrigation Schedule',
      description: 'Water wheat field section A-1 to A-3',
      time: '06:00 AM',
      date: 'Today',
      status: 'pending',
      icon: 'Droplets',
      priority: 'high'
    },
    {
      id: 2,
      type: 'fertilizer',
      title: 'Fertilizer Application',
      description: 'Apply NPK fertilizer to corn field B-2',
      time: '08:30 AM',
      date: 'Today',
      status: 'completed',
      icon: 'Beaker',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'inspection',
      title: 'Field Inspection',
      description: 'Check for pest activity in rice field C-1',
      time: '10:00 AM',
      date: 'Tomorrow',
      status: 'scheduled',
      icon: 'Search',
      priority: 'medium'
    },
    {
      id: 4,
      type: 'harvest',
      title: 'Harvest Planning',
      description: 'Prepare equipment for wheat harvest',
      time: '02:00 PM',
      date: 'Tomorrow',
      status: 'scheduled',
      icon: 'Scissors',
      priority: 'low'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'var(--color-success)';
      case 'pending': return 'var(--color-warning)';
      case 'scheduled': return 'var(--color-primary)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'completed': return 'bg-success/10';
      case 'pending': return 'bg-warning/10';
      case 'scheduled': return 'bg-primary/10';
      default: return 'bg-muted/10';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertCircle';
      case 'medium': return 'Clock';
      case 'low': return 'Info';
      default: return 'Clock';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Icon name="Calendar" size={24} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Farm Schedule</h3>
            <p className="text-sm text-muted-foreground">Irrigation & fertilizer planning</p>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {scheduleItems?.slice(0, 2)?.map((item) => (
          <div 
            key={item?.id} 
            className={`p-4 rounded-lg border ${getStatusBg(item?.status)}`}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-md" style={{ backgroundColor: getStatusColor(item?.status) + '20' }}>
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  color={getStatusColor(item?.status)} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-card-foreground truncate">{item?.title}</h4>
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getPriorityIcon(item?.priority)} 
                      size={12} 
                      color="var(--color-muted-foreground)" 
                    />
                    <span className="text-xs text-muted-foreground">{item?.time}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{item?.description}</p>
                <div className="flex items-center justify-between">
                  <span 
                    className="text-xs font-medium px-2 py-1 rounded-full"
                    style={{ 
                      color: getStatusColor(item?.status),
                      backgroundColor: getStatusColor(item?.status) + '20'
                    }}
                  >
                    {item?.status?.charAt(0)?.toUpperCase() + item?.status?.slice(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">{item?.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          {scheduleItems?.filter(item => item?.status === 'pending')?.length} pending tasks
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
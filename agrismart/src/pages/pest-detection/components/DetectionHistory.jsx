import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DetectionHistory = ({ history }) => {
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'severity', label: 'Severity' },
    { value: 'confidence', label: 'Confidence' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Records' },
    { value: 'high', label: 'High Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'low', label: 'Low Risk' }
  ];

  const getSeverityColor = (severity) => {
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

  const getSeverityBg = (severity) => {
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

  const getEffectivenessColor = (rating) => {
    if (rating >= 4) return 'text-success';
    if (rating >= 3) return 'text-warning';
    return 'text-error';
  };

  const sortedAndFilteredHistory = history?.filter(record => filterBy === 'all' || record?.severity?.toLowerCase() === filterBy)?.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'severity':
          const severityOrder = { high: 3, medium: 2, low: 1 };
          return severityOrder?.[b?.severity?.toLowerCase()] - severityOrder?.[a?.severity?.toLowerCase()];
        case 'confidence':
          return b?.confidence - a?.confidence;
        default:
          return 0;
      }
    });

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="History" size={24} color="var(--color-primary)" />
          <h2 className="text-xl font-semibold text-card-foreground">Detection History</h2>
        </div>
        <span className="text-sm text-muted-foreground">
          {history?.length} total detections
        </span>
      </div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="ArrowUpDown" size={16} color="var(--color-muted-foreground)" />
          <span className="text-sm font-medium text-card-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-1 border border-border rounded-md text-sm bg-background text-foreground"
          >
            {sortOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={16} color="var(--color-muted-foreground)" />
          <span className="text-sm font-medium text-card-foreground">Filter:</span>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e?.target?.value)}
            className="px-3 py-1 border border-border rounded-md text-sm bg-background text-foreground"
          >
            {filterOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* History List */}
      <div className="space-y-4">
        {sortedAndFilteredHistory?.map((record) => (
          <div key={record?.id} className="border border-border rounded-lg p-4 hover:shadow-agricultural transition-agricultural">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Image */}
              <div className="w-full lg:w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={record?.image}
                  alt={`Detection of ${record?.pestName}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-card-foreground">{record?.pestName}</h3>
                    <p className="text-sm text-muted-foreground italic">{record?.scientificName}</p>
                    <p className="text-sm text-muted-foreground">{record?.cropType} • {formatDate(record?.date)}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityBg(record?.severity)} ${getSeverityColor(record?.severity)}`}>
                      {record?.severity} Risk
                    </span>
                    <span className="text-sm font-medium text-card-foreground">
                      {record?.confidence}%
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-card-foreground">Field:</span>
                    <p className="text-muted-foreground">{record?.fieldLocation}</p>
                  </div>
                  <div>
                    <span className="font-medium text-card-foreground">Treatment:</span>
                    <p className="text-muted-foreground">{record?.treatmentApplied || 'Not applied'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-card-foreground">Status:</span>
                    <p className={`font-medium ${
                      record?.status === 'Resolved' ? 'text-success' :
                      record?.status === 'In Progress' ? 'text-warning' : 'text-error'
                    }`}>
                      {record?.status}
                    </p>
                  </div>
                  {record?.effectivenessRating && (
                    <div>
                      <span className="font-medium text-card-foreground">Effectiveness:</span>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5]?.map((star) => (
                          <Icon
                            key={star}
                            name="Star"
                            size={12}
                            color={star <= record?.effectivenessRating ? 'var(--color-warning)' : 'var(--color-muted)'}
                            className={star <= record?.effectivenessRating ? 'fill-current' : ''}
                          />
                        ))}
                        <span className={`text-xs ml-1 ${getEffectivenessColor(record?.effectivenessRating)}`}>
                          {record?.effectivenessRating}/5
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                
                {record?.notes && (
                  <div className="pt-2 border-t border-border">
                    <span className="text-sm font-medium text-card-foreground">Notes:</span>
                    <p className="text-sm text-muted-foreground mt-1">{record?.notes}</p>
                  </div>
                )}
              </div>
              
              {/* Actions */}
              <div className="flex lg:flex-col gap-2 flex-shrink-0">
                <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                  <Icon name="Eye" size={14} color="currentColor" className="mr-1" />
                  View
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 lg:flex-none">
                  <Icon name="MoreHorizontal" size={14} color="currentColor" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {sortedAndFilteredHistory?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileX" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-card-foreground mb-2">No records found</h3>
          <p className="text-muted-foreground">
            {filterBy === 'all' ? 'No detection history available' : `No ${filterBy} risk detections found`}
          </p>
        </div>
      )}
    </div>
  );
};

export default DetectionHistory;
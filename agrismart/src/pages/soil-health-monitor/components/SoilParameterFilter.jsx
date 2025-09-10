import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const SoilParameterFilter = ({ filters, onFilterChange }) => {
  const parameterOptions = [
    { value: 'all', label: 'All Parameters' },
    { value: 'nitrogen', label: 'Nitrogen (N)' },
    { value: 'phosphorus', label: 'Phosphorus (P)' },
    { value: 'potassium', label: 'Potassium (K)' },
    { value: 'ph', label: 'pH Level' },
    { value: 'moisture', label: 'Moisture Content' }
  ];

  const fieldOptions = [
    { value: 'all', label: 'All Fields' },
    { value: 'field_1', label: 'North Field' },
    { value: 'field_2', label: 'South Field' },
    { value: 'field_3', label: 'East Field' },
    { value: 'field_4', label: 'West Field' }
  ];

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 3 Months' },
    { value: '1y', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Filter Data</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Parameter"
          options={parameterOptions}
          value={filters?.parameter}
          onChange={(value) => onFilterChange('parameter', value)}
        />
        
        <Select
          label="Field Section"
          options={fieldOptions}
          value={filters?.field}
          onChange={(value) => onFilterChange('field', value)}
        />
        
        <Select
          label="Time Range"
          options={timeRangeOptions}
          value={filters?.timeRange}
          onChange={(value) => onFilterChange('timeRange', value)}
        />
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-card-foreground">Depth (cm)</label>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters?.depthMin}
              onChange={(e) => onFilterChange('depthMin', e?.target?.value)}
              className="flex-1"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters?.depthMax}
              onChange={(e) => onFilterChange('depthMax', e?.target?.value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>
      {filters?.timeRange === 'custom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input
            label="Start Date"
            type="date"
            value={filters?.startDate}
            onChange={(e) => onFilterChange('startDate', e?.target?.value)}
          />
          <Input
            label="End Date"
            type="date"
            value={filters?.endDate}
            onChange={(e) => onFilterChange('endDate', e?.target?.value)}
          />
        </div>
      )}
    </div>
  );
};

export default SoilParameterFilter;
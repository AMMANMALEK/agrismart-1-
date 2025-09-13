import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const SoilParameterFilter = ({ filters, onFilterChange }) => {
  const cropOptions = [
    { value: 'all', label: 'Select Crop' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'rice', label: 'Rice' },
    { value: 'maize', label: 'Maize' },
    { value: 'sugarcane', label: 'Sugarcane' },
    { value: 'cotton', label: 'Cotton' }
  ];

  const cropFertilizers = {
    wheat: [
      { value: 'urea', label: 'Urea' },
      { value: 'dap', label: 'DAP' },
      { value: 'mop', label: 'MOP' },
      { value: 'compost', label: 'Compost' },
      { value: 'zinc_sulphate', label: 'Zinc Sulphate' }
    ],
    rice: [
      { value: 'urea', label: 'Urea' },
      { value: 'potash', label: 'Potash' },
      { value: 'superphosphate', label: 'Superphosphate' },
      { value: 'compost', label: 'Compost' },
      { value: 'biofertilizer', label: 'Biofertilizer' }
    ],
    maize: [
      { value: 'npk', label: 'NPK' },
      { value: 'urea', label: 'Urea' },
      { value: 'gypsum', label: 'Gypsum' },
      { value: 'compost', label: 'Compost' },
      { value: 'potash', label: 'Potash' }
    ],
    sugarcane: [
      { value: 'urea', label: 'Urea' },
      { value: 'pressmud', label: 'Pressmud' },
      { value: 'compost', label: 'Compost' },
      { value: 'mop', label: 'MOP' },
      { value: 'zinc', label: 'Zinc' }
    ],
    cotton: [
      { value: 'urea', label: 'Urea' },
      { value: 'npk', label: 'NPK' },
      { value: 'potash', label: 'Potash' },
      { value: 'compost', label: 'Compost' },
      { value: 'boron', label: 'Boron' }
    ]
  };

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

  // Get fertilizer options based on selected crop
  const getFertilizerOptions = () => {
    if (!filters?.crop || filters?.crop === 'all') {
      return [{ value: 'all', label: 'Select Crop First' }];
    }
    return [
      { value: 'all', label: 'Select Fertilizer' },
      ...cropFertilizers[filters?.crop] || []
    ];
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Filter Data</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Crop Type"
          options={cropOptions}
          value={filters?.crop}
          onChange={(value) => {
            onFilterChange('crop', value);
            // Reset fertilizer when crop changes
            onFilterChange('fertilizer', 'all');
          }}
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
        
        <Select
          label="Fertilizer Type"
          options={getFertilizerOptions()}
          value={filters?.fertilizer}
          onChange={(value) => onFilterChange('fertilizer', value)}
        />
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
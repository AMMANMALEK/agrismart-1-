import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { useTranslation } from 'react-i18next';

const SoilMetricsInputForm = ({ onSubmit, initialValues = {} }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nitrogen: initialValues.nitrogen || '',
    phosphorus: initialValues.phosphorus || '',
    temperature: initialValues.temperature || '',
    soilType: initialValues.soilType || 'loamy',
    humidity: initialValues.humidity || '',
    ...initialValues
  });

  const [errors, setErrors] = useState({});

  const soilTypeOptions = [
    { value: 'sandy', label: 'Sandy' },
    { value: 'loamy', label: 'Loamy' },
    { value: 'clay', label: 'Clay' },
    { value: 'silt', label: 'Silt' },
    { value: 'peaty', label: 'Peaty' },
    { value: 'chalky', label: 'Chalky' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nitrogen || formData.nitrogen < 0 || formData.nitrogen > 200) {
      newErrors.nitrogen = 'Nitrogen must be between 0-200 kg/ha';
    }

    if (!formData.phosphorus || formData.phosphorus < 0 || formData.phosphorus > 100) {
      newErrors.phosphorus = 'Phosphorus must be between 0-100 kg/ha';
    }

    if (!formData.temperature || formData.temperature < -10 || formData.temperature > 60) {
      newErrors.temperature = 'Temperature must be between -10°C to 60°C';
    }

    if (!formData.humidity || formData.humidity < 0 || formData.humidity > 100) {
      newErrors.humidity = 'Humidity must be between 0-100%';
    }

    if (!formData.soilType) {
      newErrors.soilType = 'Please select a soil type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      nitrogen: '',
      phosphorus: '',
      temperature: '',
      soilType: 'loamy',
      humidity: ''
    });
    setErrors({});
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">
          Enter Soil Metrics
        </h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleReset}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nitrogen Input */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Nitrogen (N) *
            </label>
            <Input
              type="number"
              placeholder="Enter nitrogen level (kg/ha)"
              value={formData.nitrogen}
              onChange={(e) => handleInputChange('nitrogen', e.target.value)}
              error={errors.nitrogen}
              min="0"
              max="200"
              step="0.1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Range: 0-200 kg/ha
            </p>
          </div>

          {/* Phosphorus Input */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Phosphorus (P) *
            </label>
            <Input
              type="number"
              placeholder="Enter phosphorus level (kg/ha)"
              value={formData.phosphorus}
              onChange={(e) => handleInputChange('phosphorus', e.target.value)}
              error={errors.phosphorus}
              min="0"
              max="100"
              step="0.1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Range: 0-100 kg/ha
            </p>
          </div>

          {/* Temperature Input */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Temperature *
            </label>
            <Input
              type="number"
              placeholder="Enter temperature (°C)"
              value={formData.temperature}
              onChange={(e) => handleInputChange('temperature', e.target.value)}
              error={errors.temperature}
              min="-10"
              max="60"
              step="0.1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Range: -10°C to 60°C
            </p>
          </div>

          {/* Humidity Input */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Humidity *
            </label>
            <Input
              type="number"
              placeholder="Enter humidity (%)"
              value={formData.humidity}
              onChange={(e) => handleInputChange('humidity', e.target.value)}
              error={errors.humidity}
              min="0"
              max="100"
              step="0.1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Range: 0-100%
            </p>
          </div>

          {/* Soil Type Select */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Soil Type *
            </label>
            <Select
              value={formData.soilType}
              onChange={(value) => handleInputChange('soilType', value)}
              options={soilTypeOptions}
              placeholder="Select soil type"
              error={errors.soilType}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Select the predominant soil type in your field
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            type="submit" 
            iconName="Save" 
            iconPosition="left"
            className="flex-1"
          >
            Update Soil Metrics
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleReset}
            iconName="X"
            iconPosition="left"
          >
            Cancel
          </Button>
        </div>
      </form>

      <div className="mt-4 p-3 bg-muted/50 rounded-md">
        <p className="text-xs text-muted-foreground">
          <strong>Note:</strong> Enter accurate measurements for better soil health analysis and recommendations. 
          All fields marked with * are required.
        </p>
      </div>
    </div>
  );
};

export default SoilMetricsInputForm;

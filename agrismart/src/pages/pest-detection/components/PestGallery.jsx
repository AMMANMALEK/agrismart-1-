import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';

const PestGallery = ({ pests, onPestSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Pests', icon: 'Grid3X3' },
    { id: 'insects', label: 'Insects', icon: 'Bug' },
    { id: 'diseases', label: 'Diseases', icon: 'Zap' },
    { id: 'weeds', label: 'Weeds', icon: 'Sprout' },
    { id: 'deficiencies', label: 'Deficiencies', icon: 'AlertCircle' }
  ];

  const filteredPests = pests?.filter(pest => {
    const matchesSearch = pest?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         pest?.scientificName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         pest?.symptoms?.some(symptom => symptom?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || pest?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'low':
        return 'bg-success text-success-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'high':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="BookOpen" size={24} color="var(--color-primary)" />
        <h2 className="text-xl font-semibold text-card-foreground">Pest Identification Gallery</h2>
      </div>
      {/* Search and Filter */}
      <div className="space-y-4 mb-6">
        <Input
          type="search"
          placeholder="Search pests, diseases, or symptoms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="w-full"
        />
        
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-agricultural ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-card-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={category?.icon} size={16} color="currentColor" />
              <span>{category?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredPests?.length} of {pests?.length} pests
        </p>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={14} color="var(--color-muted-foreground)" />
          <span>Click on any pest for detailed information</span>
        </div>
      </div>
      {/* Pest Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPests?.map((pest) => (
          <div
            key={pest?.id}
            onClick={() => onPestSelect(pest)}
            className="border border-border rounded-lg overflow-hidden hover:shadow-agricultural-lg transition-agricultural cursor-pointer group"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={pest?.image}
                alt={pest?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-agricultural"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(pest?.severity)}`}>
                  {pest?.severity}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-card-foreground mb-1 group-hover:text-primary transition-agricultural">
                {pest?.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2 italic">
                {pest?.scientificName}
              </p>
              
              <div className="space-y-2">
                <div>
                  <span className="text-xs font-medium text-card-foreground">Affects:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {pest?.affectedCrops?.slice(0, 3)?.map((crop, index) => (
                      <span key={index} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                        {crop}
                      </span>
                    ))}
                    {pest?.affectedCrops?.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{pest?.affectedCrops?.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-card-foreground">Key Symptoms:</span>
                  <ul className="mt-1 space-y-0.5">
                    {pest?.symptoms?.slice(0, 2)?.map((symptom, index) => (
                      <li key={index} className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Icon name="Dot" size={8} color="var(--color-muted-foreground)" />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} color="var(--color-muted-foreground)" />
                  <span className="text-xs text-muted-foreground">{pest?.season}</span>
                </div>
                <div className="flex items-center space-x-1 text-primary">
                  <span className="text-xs font-medium">Learn More</span>
                  <Icon name="ArrowRight" size={12} color="var(--color-primary)" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredPests?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-card-foreground mb-2">No pests found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or category filter
          </p>
        </div>
      )}
    </div>
  );
};

export default PestGallery;
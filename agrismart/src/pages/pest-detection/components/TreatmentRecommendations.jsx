import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TreatmentRecommendations = ({ treatments }) => {
  const [activeTab, setActiveTab] = useState('organic');

  if (!treatments) return null;

  const tabs = [
    { id: 'organic', label: 'Organic Treatment', icon: 'Leaf' },
    { id: 'chemical', label: 'Chemical Treatment', icon: 'Beaker' },
    { id: 'prevention', label: 'Prevention', icon: 'Shield' }
  ];

  const getUrgencyColor = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case 'immediate':
        return 'text-error';
      case 'within 24 hours':
        return 'text-warning';
      case 'within week':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getUrgencyBg = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case 'immediate':
        return 'bg-error/10';
      case 'within 24 hours':
        return 'bg-warning/10';
      case 'within week':
        return 'bg-success/10';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Stethoscope" size={24} color="var(--color-primary)" />
        <h2 className="text-xl font-semibold text-card-foreground">Treatment Recommendations</h2>
      </div>
      {/* Urgency Alert */}
      {treatments?.urgency && (
        <div className={`p-4 rounded-lg mb-6 ${getUrgencyBg(treatments?.urgency)}`}>
          <div className="flex items-center space-x-3">
            <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
            <div>
              <span className="font-medium text-card-foreground">Action Required: </span>
              <span className={`font-medium ${getUrgencyColor(treatments?.urgency)}`}>
                {treatments?.urgency}
              </span>
            </div>
          </div>
        </div>
      )}
      {/* Treatment Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-agricultural flex-1 justify-center ${
              activeTab === tab?.id
                ? 'bg-card text-card-foreground shadow-agricultural'
                : 'text-muted-foreground hover:text-card-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} color="currentColor" />
            <span className="hidden sm:inline">{tab?.label}</span>
            <span className="sm:hidden">{tab?.label?.split(' ')?.[0]}</span>
          </button>
        ))}
      </div>
      {/* Treatment Content */}
      <div className="space-y-6">
        {activeTab === 'organic' && treatments?.organic && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Leaf" size={20} color="var(--color-success)" />
              <h3 className="text-lg font-semibold text-card-foreground">Organic Solutions</h3>
            </div>
            
            {treatments?.organic?.map((treatment, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-card-foreground">{treatment?.name}</h4>
                  <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                    {treatment?.effectiveness}% effective
                  </span>
                </div>
                
                <p className="text-muted-foreground text-sm mb-3">{treatment?.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-card-foreground">Ingredients:</span>
                    <ul className="mt-1 space-y-1">
                      {treatment?.ingredients?.map((ingredient, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Icon name="Dot" size={12} color="var(--color-muted-foreground)" />
                          <span>{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-card-foreground">Application Steps:</span>
                    <ol className="mt-1 space-y-1">
                      {treatment?.steps?.map((step, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                          <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Cost: {treatment?.cost}</span>
                      <span>Time: {treatment?.applicationTime}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Save Recipe
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'chemical' && treatments?.chemical && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Beaker" size={20} color="var(--color-warning)" />
              <h3 className="text-lg font-semibold text-card-foreground">Chemical Solutions</h3>
            </div>
            
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg mb-4">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-warning mb-1">Safety Warning</p>
                  <p className="text-muted-foreground">Always wear protective equipment and follow label instructions. Keep away from children and pets.</p>
                </div>
              </div>
            </div>
            
            {treatments?.chemical?.map((treatment, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-card-foreground">{treatment?.name}</h4>
                    <p className="text-sm text-muted-foreground">{treatment?.activeIngredient}</p>
                  </div>
                  <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded-full">
                    {treatment?.effectiveness}% effective
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-card-foreground">Dosage:</span>
                      <p className="text-sm text-muted-foreground">{treatment?.dosage}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-card-foreground">Application Method:</span>
                      <p className="text-sm text-muted-foreground">{treatment?.method}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-card-foreground">Frequency:</span>
                      <p className="text-sm text-muted-foreground">{treatment?.frequency}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-card-foreground">Pre-harvest Interval:</span>
                      <p className="text-sm text-muted-foreground">{treatment?.phi}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-border mt-3">
                  <span className="text-sm text-muted-foreground">Est. Cost: {treatment?.cost}</span>
                  <Button variant="outline" size="sm">
                    Find Suppliers
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'prevention' && treatments?.prevention && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Shield" size={20} color="var(--color-primary)" />
              <h3 className="text-lg font-semibold text-card-foreground">Prevention Strategies</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {treatments?.prevention?.map((strategy, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={strategy?.icon} size={20} color="var(--color-primary)" />
                    </div>
                    <h4 className="font-semibold text-card-foreground">{strategy?.title}</h4>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{strategy?.description}</p>
                  
                  <ul className="space-y-1">
                    {strategy?.practices?.map((practice, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="Check" size={12} color="var(--color-success)" />
                        <span>{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreatmentRecommendations;
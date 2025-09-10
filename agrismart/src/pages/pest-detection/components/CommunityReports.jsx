import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunityReports = ({ reports, onReportSubmit }) => {
  const [showReportForm, setShowReportForm] = useState(false);
  const [newReport, setNewReport] = useState({
    pestName: '',
    location: '',
    severity: 'medium',
    description: '',
    cropType: ''
  });

  const handleSubmitReport = (e) => {
    e?.preventDefault();
    const report = {
      ...newReport,
      id: Date.now(),
      author: 'Current User',
      date: new Date()?.toISOString(),
      verified: false,
      helpfulCount: 0
    };
    onReportSubmit(report);
    setNewReport({
      pestName: '',
      location: '',
      severity: 'medium',
      description: '',
      cropType: ''
    });
    setShowReportForm(false);
  };

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date?.toLocaleDateString();
  };

  const getDistanceColor = (distance) => {
    if (distance <= 5) return 'text-error';
    if (distance <= 15) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Users" size={24} color="var(--color-primary)" />
          <h2 className="text-xl font-semibold text-card-foreground">Community Reports</h2>
        </div>
        <Button
          variant="default"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowReportForm(!showReportForm)}
        >
          Report Pest
        </Button>
      </div>
      {/* Report Form */}
      {showReportForm && (
        <div className="mb-6 p-4 border border-border rounded-lg bg-muted/20">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Report a Pest Sighting</h3>
          <form onSubmit={handleSubmitReport} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Pest/Disease Name *
                </label>
                <input
                  type="text"
                  required
                  value={newReport?.pestName}
                  onChange={(e) => setNewReport({...newReport, pestName: e?.target?.value})}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="e.g., Aphids, Leaf Blight"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Crop Type *
                </label>
                <input
                  type="text"
                  required
                  value={newReport?.cropType}
                  onChange={(e) => setNewReport({...newReport, cropType: e?.target?.value})}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="e.g., Tomato, Wheat"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={newReport?.location}
                  onChange={(e) => setNewReport({...newReport, location: e?.target?.value})}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="Village/Area name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Severity Level
                </label>
                <select
                  value={newReport?.severity}
                  onChange={(e) => setNewReport({...newReport, severity: e?.target?.value})}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Description
              </label>
              <textarea
                value={newReport?.description}
                onChange={(e) => setNewReport({...newReport, description: e?.target?.value})}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                placeholder="Describe the symptoms, affected area, etc."
              />
            </div>
            
            <div className="flex space-x-3">
              <Button type="submit" variant="default">
                Submit Report
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowReportForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
      {/* Reports List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {reports?.length} reports from nearby farmers
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} color="var(--color-muted-foreground)" />
            <span>Within 25km radius</span>
          </div>
        </div>

        {reports?.map((report) => (
          <div key={report?.id} className="border border-border rounded-lg p-4 hover:shadow-agricultural transition-agricultural">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Report Image */}
              {report?.image && (
                <div className="w-full lg:w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={report?.image}
                    alt={`${report?.pestName} reported by ${report?.author}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Report Content */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-card-foreground">{report?.pestName}</h3>
                      {report?.verified && (
                        <div className="flex items-center space-x-1 text-success">
                          <Icon name="CheckCircle" size={14} color="var(--color-success)" />
                          <span className="text-xs font-medium">Verified</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {report?.cropType} • {report?.location}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                      <span>By {report?.author}</span>
                      <span>{formatDate(report?.date)}</span>
                      <span className={getDistanceColor(report?.distance)}>
                        {report?.distance}km away
                      </span>
                    </div>
                  </div>
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityBg(report?.severity)} ${getSeverityColor(report?.severity)}`}>
                    {report?.severity} Risk
                  </span>
                </div>
                
                {report?.description && (
                  <p className="text-sm text-muted-foreground">{report?.description}</p>
                )}
                
                {/* Treatment Applied */}
                {report?.treatmentApplied && (
                  <div className="p-3 bg-success/5 border border-success/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-success">Treatment Applied</p>
                        <p className="text-sm text-muted-foreground">{report?.treatmentApplied}</p>
                        {report?.treatmentEffectiveness && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Effectiveness: {report?.treatmentEffectiveness}/5 stars
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-agricultural">
                      <Icon name="ThumbsUp" size={14} color="currentColor" />
                      <span>Helpful ({report?.helpfulCount})</span>
                    </button>
                    <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-agricultural">
                      <Icon name="MessageCircle" size={14} color="currentColor" />
                      <span>Comment</span>
                    </button>
                    <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-agricultural">
                      <Icon name="Share2" size={14} color="currentColor" />
                      <span>Share</span>
                    </button>
                  </div>
                  
                  {report?.contactInfo && (
                    <Button variant="outline" size="sm">
                      <Icon name="Phone" size={14} color="currentColor" className="mr-1" />
                      Contact Farmer
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {reports?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-card-foreground mb-2">No community reports</h3>
          <p className="text-muted-foreground">
            Be the first to report pest activity in your area
          </p>
        </div>
      )}
    </div>
  );
};

export default CommunityReports;
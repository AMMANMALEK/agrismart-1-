import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import modelPredictionService from '../../../lib/modelPredictionService';


const CropYieldCard = ({ soilData, weatherData }) => {
  const [yieldData, setYieldData] = useState([]);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get soil metrics from localStorage if not provided as props
  const getSoilData = () => {
    if (soilData) return soilData;
    
    const savedMetrics = localStorage.getItem('userSoilMetrics');
    if (savedMetrics) {
      return JSON.parse(savedMetrics);
    }
    
    // Default values
    return {
      nitrogen: 45,
      phosphorus: 28,
      potassium: 62,
      ph: 6.5,
      organicMatter: 3.2,
      temperature: 25,
      humidity: 65
    };
  };

  // Get weather data from localStorage or use defaults
  const getWeatherData = () => {
    if (weatherData) return weatherData;
    
    // Try to get from weather service cache or use defaults
    return {
      temperature: 25,
      humidity: 65,
      rainfall: 120,
      pressure: 1013,
      windSpeed: 10
    };
  };

  const generatePredictions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Generating crop yield predictions using pretrained models...');
      
      const currentSoilData = getSoilData();
      const currentWeatherData = getWeatherData();
      
      console.log('Using soil data:', currentSoilData);
      console.log('Using weather data:', currentWeatherData);

      // Generate predictions for multiple crops
      const crops = ['wheat', 'rice', 'corn', 'soybean'];
      const cropPredictions = [];
      
      for (const crop of crops) {
        const prediction = await modelPredictionService.predictCropYield({
          soilData: currentSoilData,
          weatherData: currentWeatherData,
          cropType: crop,
          fieldArea: 1
        });
        
        cropPredictions.push({
          crop: crop.charAt(0).toUpperCase() + crop.slice(1),
          current: Math.round(prediction.predictedYield * 0.85), // Current efficiency
          predicted: Math.round(prediction.predictedYield * 100) / 100,
          increase: Math.round(((prediction.predictedYield * 0.15) / (prediction.predictedYield * 0.85)) * 100),
          confidence: prediction.confidence,
          totalProduction: prediction.totalProduction
        });
      }

      // Also get soil health and pest predictions
      const soilHealthPrediction = await modelPredictionService.predictSoilHealth(currentSoilData);
      const pestRiskPrediction = await modelPredictionService.predictPestRisk({
        ...currentWeatherData,
        cropType: 'wheat'
      });
      const rainfallPrediction = await modelPredictionService.predictRainfall(currentWeatherData);

      setYieldData(cropPredictions);
      setPredictions({
        soilHealth: soilHealthPrediction,
        pestRisk: pestRiskPrediction,
        rainfall: rainfallPrediction
      });

      console.log('Generated predictions:', {
        crops: cropPredictions,
        soilHealth: soilHealthPrediction,
        pestRisk: pestRiskPrediction,
        rainfall: rainfallPrediction
      });

    } catch (e) {
      console.error('Prediction generation failed:', e);
      setError('Failed to generate crop predictions');
      
      // Fallback to mock data
      setYieldData([
        { crop: 'Wheat', current: 75, predicted: 85, increase: 12, confidence: 82 },
        { crop: 'Rice', current: 68, predicted: 78, increase: 15, confidence: 78 },
        { crop: 'Corn', current: 82, predicted: 88, increase: 7, confidence: 85 },
        { crop: 'Soybean', current: 71, predicted: 79, increase: 11, confidence: 80 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generatePredictions();
  }, []);

  // Regenerate predictions when soil or weather data changes
  useEffect(() => {
    if (!loading) {
      generatePredictions();
    }
  }, [soilData, weatherData]);


  const getStatusColor = (increase) => {
    if (increase >= 10) return 'var(--color-success)';
    if (increase >= 5) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  const getStatusIcon = (increase) => {
    if (increase >= 10) return 'TrendingUp';
    if (increase >= 5) return 'Minus';
    return 'TrendingDown';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">AI Crop Yield Prediction</h3>
          <Icon name="BarChart3" className="w-5 h-5 text-gray-500" />
        </div>
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Analyzing with pretrained models...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">AI Crop Yield Prediction</h3>
          <Icon name="BarChart3" className="w-5 h-5 text-gray-500" />
        </div>
        <div className="flex flex-col items-center justify-center h-48">
          <Icon name="AlertTriangle" className="w-8 h-8 text-red-500 mb-2" />
          <p className="text-red-500 text-center">{error}</p>
          <button 
            onClick={generatePredictions}
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Retry Prediction
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-success/10 rounded-lg">
            <Icon name="BarChart3" size={24} color="var(--color-success)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Crop Yield Predictions</h3>
            <p className="text-sm text-muted-foreground">AI-powered yield forecasts</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-success">
            {predictions ? `${Math.round(predictions.soilHealth.confidence)}% Confidence` : '+8.7% Avg'}
          </div>
          <div className="text-xs text-muted-foreground">
            {predictions ? 'Model accuracy' : 'Expected increase'}
          </div>
        </div>
      </div>
      <div className="space-y-4 mb-6">
        {yieldData?.map((crop) => (
          <div key={crop?.crop} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Wheat" size={20} color="var(--color-primary)" />
              <div>
                <div className="font-medium text-card-foreground">{crop?.crop}</div>
                <div className="text-sm text-muted-foreground">Current: {crop?.current}% efficiency</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Icon 
                name={getStatusIcon(crop?.increase)} 
                size={16} 
                color={getStatusColor(crop?.increase)} 
              />
              <div className="text-right">
                <div 
                  className="font-semibold"
                  style={{ color: getStatusColor(crop?.increase) }}
                >
                  +{crop?.increase}%
                </div>
                <div className="text-xs text-muted-foreground">
                  Predicted: {crop?.predicted} tons/ha ({crop?.confidence}% confidence)
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={yieldData}>
            <XAxis 
              dataKey="crop" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
            />
            <YAxis hide />
            <Bar 
              dataKey="predicted" 
              fill="var(--color-primary)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CropYieldCard;
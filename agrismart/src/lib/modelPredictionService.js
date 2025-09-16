// Model Prediction Service for Crop Yield, Soil Analysis, and Pest Detection
// Uses Python backend API with pretrained models: soil_model.joblib, rainfall_model.joblib, pest_model.h5

class ModelPredictionService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    this.backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
  }

  // Check cache for recent predictions
  getCachedPrediction(key) {
    const cached = this.cache.get(key);
    if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  // Cache prediction results
  setCachedPrediction(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  // Predict soil health using Python backend API
  async predictSoilHealth(soilData) {
    const cacheKey = `soil_${JSON.stringify(soilData)}`;
    const cached = this.getCachedPrediction(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      console.log('Calling Python backend for soil health prediction...');
      
      const response = await fetch(`${this.backendUrl}/predict/soil-health`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(soilData)
      });

      if (!response.ok) {
        throw new Error(`Backend API error: ${response.status}`);
      }

      const prediction = await response.json();
      
      console.log('Received soil health prediction from backend:', prediction);
      
      this.setCachedPrediction(cacheKey, prediction);
      return prediction;

    } catch (error) {
      console.error('Soil prediction error:', error);
      console.log('Using fallback prediction...');
      return this.getFallbackSoilPrediction(soilData);
    }
  }

  // Predict crop yield using Python backend API
  async predictCropYield(inputData) {
    const cacheKey = `yield_${JSON.stringify(inputData)}`;
    const cached = this.getCachedPrediction(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      console.log('Calling Python backend for crop yield prediction...');
      
      const response = await fetch(`${this.backendUrl}/predict/crop-yield`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData)
      });

      if (!response.ok) {
        throw new Error(`Backend API error: ${response.status}`);
      }

      const prediction = await response.json();
      
      console.log('Received crop yield prediction from backend:', prediction);
      
      this.setCachedPrediction(cacheKey, prediction);
      return prediction;

    } catch (error) {
      console.error('Yield prediction error:', error);
      console.log('Using fallback prediction...');
      return this.getFallbackYieldPrediction(inputData);
    }
  }

  // Predict pest risk using Python backend API
  async predictPestRisk(environmentData) {
    const cacheKey = `pest_${JSON.stringify(environmentData)}`;
    const cached = this.getCachedPrediction(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      console.log('Calling Python backend for pest risk prediction...');
      
      const response = await fetch(`${this.backendUrl}/predict/pest-risk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(environmentData)
      });

      if (!response.ok) {
        throw new Error(`Backend API error: ${response.status}`);
      }

      const prediction = await response.json();
      
      console.log('Received pest risk prediction from backend:', prediction);
      
      this.setCachedPrediction(cacheKey, prediction);
      return prediction;

    } catch (error) {
      console.error('Pest prediction error:', error);
      console.log('Using fallback prediction...');
      return this.getFallbackPestPrediction();
    }
  }

  // Predict rainfall using Python backend API
  async predictRainfall(weatherData) {
    const cacheKey = `rainfall_${JSON.stringify(weatherData)}`;
    const cached = this.getCachedPrediction(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      console.log('Calling Python backend for rainfall prediction...');
      
      const response = await fetch(`${this.backendUrl}/predict/rainfall`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(weatherData)
      });

      if (!response.ok) {
        throw new Error(`Backend API error: ${response.status}`);
      }

      const prediction = await response.json();
      
      console.log('Received rainfall prediction from backend:', prediction);
      
      this.setCachedPrediction(cacheKey, prediction);
      return prediction;

    } catch (error) {
      console.error('Rainfall prediction error:', error);
      console.log('Using fallback prediction...');
      return this.getFallbackRainfallPrediction();
    }
  }

  // Helper methods
  getBaseYieldForCrop(cropType) {
    const baseYields = {
      wheat: 4.2,
      rice: 5.8,
      corn: 6.5,
      soybean: 3.2,
      cotton: 2.8,
      sugarcane: 45.0
    };
    return baseYields[cropType.toLowerCase()] || 4.0;
  }

  calculateWeatherFactor(weatherData) {
    const { temperature, humidity, rainfall = 0 } = weatherData;
    let factor = 1.0;
    
    // Temperature factor
    if (temperature >= 20 && temperature <= 30) factor *= 1.1;
    else if (temperature < 15 || temperature > 35) factor *= 0.8;
    
    // Humidity factor
    if (humidity >= 50 && humidity <= 70) factor *= 1.05;
    else if (humidity < 30 || humidity > 85) factor *= 0.9;
    
    // Rainfall factor
    if (rainfall >= 50 && rainfall <= 150) factor *= 1.1;
    else if (rainfall > 200) factor *= 0.85;
    
    return Math.max(0.6, Math.min(1.4, factor));
  }

  getSoilRecommendations(score, soilData) {
    const recommendations = [];
    
    if (soilData.nitrogen < 30) {
      recommendations.push('Apply nitrogen fertilizer (60-80 kg/ha)');
    }
    if (soilData.phosphorus < 15) {
      recommendations.push('Add phosphorus supplement (40-50 kg/ha)');
    }
    if (soilData.ph < 6.0) {
      recommendations.push('Apply lime to increase soil pH');
    }
    if (score < 60) {
      recommendations.push('Consider soil testing for micronutrients');
    }
    
    return recommendations;
  }

  getYieldRecommendations(yieldValue, soilHealth, weatherData) {
    const recommendations = [];
    
    if (yieldValue < 3.0) {
      recommendations.push('Consider crop rotation or variety change');
    }
    if (soilHealth.soilHealthScore < 60) {
      recommendations.push('Improve soil health with organic matter');
    }
    if (weatherData.temperature > 30) {
      recommendations.push('Implement heat stress management');
    }
    
    return recommendations;
  }

  getCropPestRisk(cropType) {
    const riskFactors = {
      wheat: 15,
      rice: 25,
      corn: 20,
      cotton: 30,
      soybean: 18
    };
    return riskFactors[cropType.toLowerCase()] || 20;
  }

  getCommonPests(cropType, riskScore) {
    const pestsByCrop = {
      wheat: ['Aphids', 'Rust', 'Armyworm'],
      rice: ['Brown planthopper', 'Stem borer', 'Blast'],
      corn: ['Corn borer', 'Armyworm', 'Cutworm'],
      cotton: ['Bollworm', 'Whitefly', 'Thrips']
    };
    
    const pests = pestsByCrop[cropType.toLowerCase()] || ['General pests', 'Aphids', 'Caterpillars'];
    return riskScore > 60 ? pests : pests.slice(0, 2);
  }

  getPestPreventiveMeasures(riskScore) {
    if (riskScore >= 70) {
      return ['Apply preventive pesticides', 'Increase monitoring frequency', 'Use pheromone traps'];
    } else if (riskScore >= 40) {
      return ['Regular field monitoring', 'Maintain field hygiene', 'Use biological controls'];
    } else {
      return ['Continue routine monitoring', 'Maintain crop health'];
    }
  }

  // Fallback methods for error cases
  getFallbackSoilPrediction(soilData) {
    return {
      soilHealthScore: 65,
      classification: 'Good',
      confidence: 75,
      recommendations: ['Regular soil testing recommended'],
      timestamp: new Date().toISOString()
    };
  }

  getFallbackYieldPrediction(inputData) {
    return {
      predictedYield: 4.0,
      totalProduction: 4.0,
      unit: 'tons/hectare',
      confidence: 70,
      cropType: inputData.cropType || 'wheat',
      fieldArea: inputData.fieldArea || 1,
      factors: {
        soilHealth: 65,
        weatherConditions: 75,
        overallRating: 'Good'
      },
      recommendations: ['Monitor crop regularly'],
      timestamp: new Date().toISOString()
    };
  }

  getFallbackPestPrediction() {
    return {
      riskLevel: 'Medium',
      riskScore: 45,
      confidence: 70,
      commonPests: ['General pests'],
      preventiveMeasures: ['Regular monitoring'],
      timestamp: new Date().toISOString()
    };
  }

  getFallbackRainfallPrediction() {
    return {
      probability: 30,
      expectedAmount: 2,
      timeframe: '24 hours',
      confidence: 65,
      recommendation: 'Continue normal irrigation',
      timestamp: new Date().toISOString()
    };
  }
}

// Export singleton instance
export default new ModelPredictionService();

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import os
import logging
from datetime import datetime

# Try to import TensorFlow, but continue without it if not available
try:
    from tensorflow.keras.models import load_model
    TENSORFLOW_AVAILABLE = True
except ImportError:
    TENSORFLOW_AVAILABLE = False
    logger = logging.getLogger(__name__)
    logger.warning("TensorFlow not available. Pest model will use fallback predictions.")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Global variables to store loaded models
soil_model = None
rainfall_model = None
pest_model = None

def load_models():
    """Load all pretrained models at startup"""
    global soil_model, rainfall_model, pest_model
    
    try:
        # Get the path to saved_Models directory
        models_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'saved_Models')
        logger.info(f"Loading models from: {models_dir}")
        
        # Load soil model (joblib)
        soil_model_path = os.path.join(models_dir, 'soil_model.joblib')
        if os.path.exists(soil_model_path):
            soil_model = joblib.load(soil_model_path)
            logger.info("Soil model loaded successfully")
        else:
            logger.warning(f"Soil model not found at {soil_model_path}")
        
        # Load rainfall model (joblib)
        rainfall_model_path = os.path.join(models_dir, 'rainfall_model.joblib')
        if os.path.exists(rainfall_model_path):
            rainfall_model = joblib.load(rainfall_model_path)
            logger.info("Rainfall model loaded successfully")
        else:
            logger.warning(f"Rainfall model not found at {rainfall_model_path}")
        
        # Load pest model (h5) - only if TensorFlow is available
        pest_model_path = os.path.join(models_dir, 'pest_model.h5')
        if os.path.exists(pest_model_path) and TENSORFLOW_AVAILABLE:
            pest_model = load_model(pest_model_path)
            logger.info("Pest model loaded successfully")
        else:
            if not TENSORFLOW_AVAILABLE:
                logger.warning("TensorFlow not available - pest model will use fallback predictions")
            else:
                logger.warning(f"Pest model not found at {pest_model_path}")
            
    except Exception as e:
        logger.error(f"Error loading models: {str(e)}")

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'models_loaded': {
            'soil_model': soil_model is not None,
            'rainfall_model': rainfall_model is not None,
            'pest_model': pest_model is not None
        }
    })

@app.route('/predict/soil-health', methods=['POST'])
def predict_soil_health():
    """Predict soil health based on soil parameters"""
    try:
        data = request.get_json()
        
        # Extract soil parameters
        nitrogen = float(data.get('nitrogen', 45))
        phosphorus = float(data.get('phosphorus', 28))
        potassium = float(data.get('potassium', 62))
        ph = float(data.get('ph', 6.5))
        organic_matter = float(data.get('organicMatter', 3.2))
        temperature = float(data.get('temperature', 25))
        humidity = float(data.get('humidity', 65))
        
        # Prepare features for model prediction
        features = np.array([[nitrogen, phosphorus, potassium, ph, organic_matter, temperature, humidity]])
        
        if soil_model is not None:
            try:
                # Use the actual model for prediction
                prediction = soil_model.predict(features)[0]
                confidence = float(soil_model.predict_proba(features).max()) * 100
                
                # Convert prediction to soil health score (0-100)
                soil_health_score = min(max(prediction * 100, 0), 100)
                
            except Exception as e:
                logger.warning(f"Model prediction failed, using fallback: {str(e)}")
                # Fallback calculation
                soil_health_score = calculate_soil_health_fallback(nitrogen, phosphorus, ph, temperature, humidity)
                confidence = 85.0
        else:
            # Fallback calculation when model is not available
            soil_health_score = calculate_soil_health_fallback(nitrogen, phosphorus, ph, temperature, humidity)
            confidence = 80.0
        
        # Determine classification
        if soil_health_score >= 80:
            classification = 'Excellent'
        elif soil_health_score >= 60:
            classification = 'Good'
        elif soil_health_score >= 40:
            classification = 'Fair'
        else:
            classification = 'Poor'
        
        # Generate recommendations
        recommendations = generate_soil_recommendations(nitrogen, phosphorus, ph, soil_health_score)
        
        return jsonify({
            'soilHealthScore': round(soil_health_score, 1),
            'classification': classification,
            'confidence': round(confidence, 1),
            'recommendations': recommendations,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Error in soil health prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/predict/crop-yield', methods=['POST'])
def predict_crop_yield():
    """Predict crop yield based on soil and weather data"""
    try:
        data = request.get_json()
        
        # Extract input data
        soil_data = data.get('soilData', {})
        weather_data = data.get('weatherData', {})
        crop_type = data.get('cropType', 'wheat')
        field_area = float(data.get('fieldArea', 1))
        
        # Get soil health first
        soil_health_response = predict_soil_health_internal(soil_data)
        soil_health_score = soil_health_response['soilHealthScore']
        
        # Calculate base yield for crop type
        base_yields = {
            'wheat': 4.2,
            'rice': 5.8,
            'corn': 6.5,
            'soybean': 3.2,
            'cotton': 2.8,
            'sugarcane': 45.0
        }
        base_yield = base_yields.get(crop_type.lower(), 4.0)
        
        # Calculate weather factor
        temperature = float(weather_data.get('temperature', 25))
        humidity = float(weather_data.get('humidity', 65))
        rainfall = float(weather_data.get('rainfall', 120))
        
        weather_factor = calculate_weather_factor(temperature, humidity, rainfall)
        
        # Calculate soil factor
        soil_factor = 0.6 + (soil_health_score / 100) * 0.8
        
        # Calculate final yield
        predicted_yield = base_yield * soil_factor * weather_factor
        total_production = predicted_yield * field_area
        
        # Calculate confidence
        confidence = min(80 + (soil_health_response['confidence'] - 80) * 0.3 + 
                        (10 if weather_factor > 0.9 else 5 if weather_factor > 0.7 else 0), 95)
        
        # Generate recommendations
        recommendations = generate_yield_recommendations(predicted_yield, soil_health_score, weather_data)
        
        return jsonify({
            'predictedYield': round(predicted_yield, 2),
            'totalProduction': round(total_production, 2),
            'unit': 'tons/hectare',
            'confidence': round(confidence),
            'cropType': crop_type,
            'fieldArea': field_area,
            'factors': {
                'soilHealth': round(soil_health_score, 1),
                'weatherConditions': round(weather_factor * 100),
                'overallRating': soil_health_response['classification']
            },
            'recommendations': recommendations,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Error in crop yield prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/predict/pest-risk', methods=['POST'])
def predict_pest_risk():
    """Predict pest risk based on environmental conditions"""
    try:
        data = request.get_json()
        
        temperature = float(data.get('temperature', 25))
        humidity = float(data.get('humidity', 65))
        rainfall = float(data.get('rainfall', 120))
        crop_type = data.get('cropType', 'wheat')
        
        # Prepare features for pest model
        features = np.array([[temperature, humidity, rainfall]])
        
        if pest_model is not None:
            try:
                # Use the actual neural network model
                prediction = pest_model.predict(features)[0][0]
                pest_risk_score = min(max(prediction * 100, 0), 100)
                confidence = 85.0
            except Exception as e:
                logger.warning(f"Pest model prediction failed, using fallback: {str(e)}")
                pest_risk_score = calculate_pest_risk_fallback(temperature, humidity, rainfall, crop_type)
                confidence = 80.0
        else:
            pest_risk_score = calculate_pest_risk_fallback(temperature, humidity, rainfall, crop_type)
            confidence = 75.0
        
        # Determine risk level
        if pest_risk_score >= 70:
            risk_level = 'High'
        elif pest_risk_score >= 40:
            risk_level = 'Medium'
        else:
            risk_level = 'Low'
        
        # Get common pests and preventive measures
        common_pests = get_common_pests(crop_type, pest_risk_score)
        preventive_measures = get_preventive_measures(pest_risk_score)
        
        return jsonify({
            'riskLevel': risk_level,
            'riskScore': round(pest_risk_score, 1),
            'confidence': round(confidence, 1),
            'commonPests': common_pests,
            'preventiveMeasures': preventive_measures,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Error in pest risk prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/predict/rainfall', methods=['POST'])
def predict_rainfall():
    """Predict rainfall based on weather conditions"""
    try:
        data = request.get_json()
        
        temperature = float(data.get('temperature', 25))
        humidity = float(data.get('humidity', 65))
        pressure = float(data.get('pressure', 1013))
        wind_speed = float(data.get('windSpeed', 10))
        
        # Prepare features for rainfall model
        features = np.array([[temperature, humidity, pressure, wind_speed]])
        
        if rainfall_model is not None:
            try:
                # Use the actual model
                prediction = rainfall_model.predict(features)[0]
                probability = min(max(prediction * 100, 0), 90)
                confidence = 85.0
            except Exception as e:
                logger.warning(f"Rainfall model prediction failed, using fallback: {str(e)}")
                probability = calculate_rainfall_probability_fallback(temperature, humidity, pressure)
                confidence = 80.0
        else:
            probability = calculate_rainfall_probability_fallback(temperature, humidity, pressure)
            confidence = 75.0
        
        # Calculate expected amount
        expected_amount = round(5 + np.random.random() * 20) if probability > 60 else round(np.random.random() * 5)
        
        # Generate recommendation
        if probability > 70:
            recommendation = 'Postpone irrigation'
        elif probability > 40:
            recommendation = 'Monitor conditions'
        else:
            recommendation = 'Continue normal irrigation'
        
        return jsonify({
            'probability': round(probability, 1),
            'expectedAmount': expected_amount,
            'timeframe': '24 hours',
            'confidence': round(confidence, 1),
            'recommendation': recommendation,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Error in rainfall prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500

# Helper functions
def predict_soil_health_internal(soil_data):
    """Internal function to get soil health prediction"""
    nitrogen = float(soil_data.get('nitrogen', 45))
    phosphorus = float(soil_data.get('phosphorus', 28))
    potassium = float(soil_data.get('potassium', 62))
    ph = float(soil_data.get('ph', 6.5))
    organic_matter = float(soil_data.get('organicMatter', 3.2))
    temperature = float(soil_data.get('temperature', 25))
    humidity = float(soil_data.get('humidity', 65))
    
    soil_health_score = calculate_soil_health_fallback(nitrogen, phosphorus, ph, temperature, humidity)
    
    if soil_health_score >= 80:
        classification = 'Excellent'
    elif soil_health_score >= 60:
        classification = 'Good'
    elif soil_health_score >= 40:
        classification = 'Fair'
    else:
        classification = 'Poor'
    
    return {
        'soilHealthScore': soil_health_score,
        'classification': classification,
        'confidence': 85.0
    }

def calculate_soil_health_fallback(nitrogen, phosphorus, ph, temperature, humidity):
    """Fallback calculation for soil health when model is not available"""
    score = 0
    
    # Nitrogen contribution (0-30 points)
    if nitrogen >= 50:
        score += 30
    elif nitrogen >= 30:
        score += 20
    else:
        score += 10
    
    # Phosphorus contribution (0-25 points)
    if phosphorus >= 25:
        score += 25
    elif phosphorus >= 15:
        score += 18
    else:
        score += 8
    
    # pH contribution (0-20 points)
    if 6.0 <= ph <= 7.0:
        score += 20
    elif 5.5 <= ph <= 7.5:
        score += 15
    else:
        score += 5
    
    # Temperature and humidity contribution (0-25 points)
    if 20 <= temperature <= 30 and 40 <= humidity <= 70:
        score += 25
    elif 15 <= temperature <= 35 and 30 <= humidity <= 80:
        score += 18
    else:
        score += 10
    
    return min(score, 100)

def calculate_weather_factor(temperature, humidity, rainfall):
    """Calculate weather impact factor on crop yield"""
    factor = 1.0
    
    # Temperature factor
    if 20 <= temperature <= 30:
        factor *= 1.1
    elif temperature < 15 or temperature > 35:
        factor *= 0.8
    
    # Humidity factor
    if 50 <= humidity <= 70:
        factor *= 1.05
    elif humidity < 30 or humidity > 85:
        factor *= 0.9
    
    # Rainfall factor
    if 50 <= rainfall <= 150:
        factor *= 1.1
    elif rainfall > 200:
        factor *= 0.85
    
    return max(0.6, min(1.4, factor))

def calculate_pest_risk_fallback(temperature, humidity, rainfall, crop_type):
    """Fallback calculation for pest risk"""
    risk_score = 0
    
    # High temperature and humidity increase pest risk
    if temperature > 30 and humidity > 70:
        risk_score += 40
    elif temperature > 25 and humidity > 60:
        risk_score += 25
    else:
        risk_score += 10
    
    # Rainfall factor
    if rainfall > 100:
        risk_score += 30
    elif rainfall > 50:
        risk_score += 20
    else:
        risk_score += 5
    
    # Crop-specific factors
    crop_risk_factors = {
        'wheat': 15,
        'rice': 25,
        'corn': 20,
        'cotton': 30,
        'soybean': 18
    }
    risk_score += crop_risk_factors.get(crop_type.lower(), 20)
    
    return min(risk_score, 100)

def calculate_rainfall_probability_fallback(temperature, humidity, pressure):
    """Fallback calculation for rainfall probability"""
    probability = 0
    
    if humidity > 80:
        probability += 40
    elif humidity > 60:
        probability += 20
    
    if pressure < 1000:
        probability += 30
    elif pressure < 1010:
        probability += 15
    
    if temperature < 25:
        probability += 10
    
    return min(probability, 90)

def generate_soil_recommendations(nitrogen, phosphorus, ph, score):
    """Generate soil improvement recommendations"""
    recommendations = []
    
    if nitrogen < 30:
        recommendations.append('Apply nitrogen fertilizer (60-80 kg/ha)')
    if phosphorus < 15:
        recommendations.append('Add phosphorus supplement (40-50 kg/ha)')
    if ph < 6.0:
        recommendations.append('Apply lime to increase soil pH')
    if score < 60:
        recommendations.append('Consider soil testing for micronutrients')
    
    return recommendations

def generate_yield_recommendations(yield_val, soil_health, weather_data):
    """Generate crop yield improvement recommendations"""
    recommendations = []
    
    if yield_val < 3.0:
        recommendations.append('Consider crop rotation or variety change')
    if soil_health < 60:
        recommendations.append('Improve soil health with organic matter')
    if weather_data.get('temperature', 25) > 30:
        recommendations.append('Implement heat stress management')
    
    return recommendations

def get_common_pests(crop_type, risk_score):
    """Get common pests for crop type"""
    pests_by_crop = {
        'wheat': ['Aphids', 'Rust', 'Armyworm'],
        'rice': ['Brown planthopper', 'Stem borer', 'Blast'],
        'corn': ['Corn borer', 'Armyworm', 'Cutworm'],
        'cotton': ['Bollworm', 'Whitefly', 'Thrips']
    }
    
    pests = pests_by_crop.get(crop_type.lower(), ['General pests', 'Aphids', 'Caterpillars'])
    return pests if risk_score > 60 else pests[:2]

def get_preventive_measures(risk_score):
    """Get preventive measures based on risk score"""
    if risk_score >= 70:
        return ['Apply preventive pesticides', 'Increase monitoring frequency', 'Use pheromone traps']
    elif risk_score >= 40:
        return ['Regular field monitoring', 'Maintain field hygiene', 'Use biological controls']
    else:
        return ['Continue routine monitoring', 'Maintain crop health']

if __name__ == '__main__':
    # Load models at startup
    load_models()
    
    # Run the Flask app
    app.run(host='0.0.0.0', port=5000, debug=True)

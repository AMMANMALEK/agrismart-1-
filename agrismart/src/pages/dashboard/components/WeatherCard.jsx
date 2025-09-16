import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

import { apiGet } from '../../../lib/api';


const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [currentWeather, setCurrentWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      setError(null);
      try {
        // Adjust endpoint as per your backend API docs
        const data = await apiGet('/weather/current');
        if (data) {
          setCurrentWeather(data);
          // Create hourly data from temperature with some variance
          const hourlyData = Array.from({ length: 24 }, (_, i) => ({
            time: `${i}:00`,
            temperature: data.temperature + (Math.random() - 0.5) * 2
          }));
          setWeatherData(hourlyData);
        }
      } catch (e) {
        setError('Failed to load weather data');
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  if (loading) {
    return <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">Loading weather...</div>;
  }
  if (error) {
    return <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural text-red-500">{error}</div>;
  }
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Cloud" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Weather Forecast</h3>
            <p className="text-sm text-muted-foreground">{currentWeather?.location || 'Farm Location'}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-card-foreground">{currentWeather?.temperature ?? '--'}°C</div>
          <div className="text-sm text-muted-foreground">{currentWeather?.condition || '--'}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Droplets" size={16} color="var(--color-primary)" />
          <div>
            <div className="text-sm font-medium text-card-foreground">{currentWeather?.humidity ?? '--'}%</div>
            <div className="text-xs text-muted-foreground">Humidity</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CloudRain" size={16} color="var(--color-primary)" />
          <div>
            <div className="text-sm font-medium text-card-foreground">{currentWeather?.rainfall ?? '--'}mm</div>
            <div className="text-xs text-muted-foreground">Rainfall</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Wind" size={16} color="var(--color-primary)" />
          <div>
            <div className="text-sm font-medium text-card-foreground">{currentWeather?.windSpeed ?? '--'} km/h</div>
            <div className="text-xs text-muted-foreground">Wind Speed</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={16} color="var(--color-primary)" />
          <div>
            <div className="text-sm font-medium text-card-foreground">{currentWeather?.visibility ?? '10'} km</div>
            <div className="text-xs text-muted-foreground">Visibility</div>
          </div>
        </div>
      </div>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weatherData}>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
            />
            <YAxis hide />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 0, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeatherCard;
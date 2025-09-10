import React from 'react';
import Icon from '../../../components/AppIcon';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const WeatherCard = () => {
  const weatherData = [
    { time: '6AM', temp: 22, humidity: 85 },
    { time: '9AM', temp: 26, humidity: 78 },
    { time: '12PM', temp: 32, humidity: 65 },
    { time: '3PM', temp: 35, humidity: 58 },
    { time: '6PM', temp: 28, humidity: 72 },
    { time: '9PM', temp: 24, humidity: 80 }
  ];

  const currentWeather = {
    temperature: 28,
    humidity: 72,
    rainfall: 15,
    windSpeed: 12,
    condition: "Partly Cloudy",
    location: "Farm Location"
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Cloud" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Weather Forecast</h3>
            <p className="text-sm text-muted-foreground">{currentWeather?.location}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-card-foreground">{currentWeather?.temperature}°C</div>
          <div className="text-sm text-muted-foreground">{currentWeather?.condition}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Droplets" size={16} color="var(--color-primary)" />
          <div>
            <div className="text-sm font-medium text-card-foreground">{currentWeather?.humidity}%</div>
            <div className="text-xs text-muted-foreground">Humidity</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CloudRain" size={16} color="var(--color-primary)" />
          <div>
            <div className="text-sm font-medium text-card-foreground">{currentWeather?.rainfall}mm</div>
            <div className="text-xs text-muted-foreground">Rainfall</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Wind" size={16} color="var(--color-primary)" />
          <div>
            <div className="text-sm font-medium text-card-foreground">{currentWeather?.windSpeed} km/h</div>
            <div className="text-xs text-muted-foreground">Wind Speed</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={16} color="var(--color-primary)" />
          <div>
            <div className="text-sm font-medium text-card-foreground">10 km</div>
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
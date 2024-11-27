import { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  conditions: string;
}

// Simulated weather data for Wacol, QLD
const getLocalWeather = (): WeatherData => {
  const now = new Date();
  const hour = now.getHours();
  
  // Simulate temperature based on time of day
  let baseTemp = 25; // Base temperature
  
  if (hour >= 0 && hour < 6) {
    baseTemp = 18;
  } else if (hour >= 6 && hour < 12) {
    baseTemp = 23;
  } else if (hour >= 12 && hour < 18) {
    baseTemp = 28;
  } else {
    baseTemp = 22;
  }
  
  // Add some randomness to temperature
  const temperature = baseTemp + (Math.random() * 4 - 2);
  
  // Simulate weather conditions
  const conditions = [
    'Sunny',
    'Partly Cloudy',
    'Clear',
    'Mostly Sunny',
    'Hot and Humid',
  ];
  
  return {
    temperature: Math.round(temperature * 10) / 10,
    conditions: conditions[Math.floor(Math.random() * conditions.length)],
  };
};

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchWeather = () => {
      const data = getLocalWeather();
      setWeather(data);
      setLoading(false);
    };
    
    fetchWeather();
    // Update weather every 5 minutes
    const interval = setInterval(fetchWeather, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return { weather, loading };
};
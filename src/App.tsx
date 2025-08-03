import React, { useState, useEffect } from 'react';
import { CloudSun, AlertCircle } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import LocationInput from './components/LocationInput';
import { 
  fetchWeatherByCoords, 
  fetchWeatherByCity, 
  getCurrentPosition,
  WeatherResponse 
} from './services/weatherService';

interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  feelsLike: number;
  icon: string;
}

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transformWeatherData = (data: WeatherResponse): WeatherData => ({
    location: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    condition: data.weather[0].main,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    visibility: data.visibility / 1000, // Convert to km
    pressure: data.main.pressure,
    feelsLike: data.main.feels_like,
    icon: data.weather[0].icon,
  });

  const handleLocationSubmit = async (location: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherByCity(location);
      setWeather(transformWeatherData(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCurrentLocation = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      const data = await fetchWeatherByCoords(latitude, longitude);
      setWeather(transformWeatherData(data));
    } catch (err) {
      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('Location access denied. Please enter a city manually.');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('Location information unavailable. Please enter a city manually.');
            break;
          case err.TIMEOUT:
            setError('Location request timed out. Please enter a city manually.');
            break;
          default:
            setError('An unknown error occurred. Please enter a city manually.');
            break;
        }
      } else {
        setError(err instanceof Error ? err.message : 'Failed to get current location');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Load weather for a default city on initial load
  useEffect(() => {
    handleLocationSubmit('London');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 via-blue-50 to-cyan-100 animate-gradient-x">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-xl border-b border-white/30">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center space-x-3">
            <CloudSun className="w-12 h-12 text-blue-500 animate-bounce" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Weather App
            </h1>
          </div>
          <p className="text-center text-gray-700 mt-4 text-xl font-medium">
            Get real-time weather information for any location
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center">
          <LocationInput
            onLocationSubmit={handleLocationSubmit}
            onCurrentLocation={handleCurrentLocation}
            isLoading={isLoading}
          />

          {error && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6 mb-10 max-w-lg w-full shadow-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-lg font-medium">{error}</p>
              </div>
            </div>
          )}

          {(weather || isLoading) && (
            <WeatherCard weather={weather!} isLoading={isLoading} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/70 backdrop-blur-xl border-t border-white/30 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-10 text-center">
          <p className="text-gray-700 text-lg font-medium">
            Weather data provided by OpenWeatherMap API
          </p>
          <p className="text-gray-600 text-sm mt-3">
            Demo version with mock data - Replace with real API key for production use
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
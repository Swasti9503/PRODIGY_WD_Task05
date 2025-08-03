import React from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  Eye, 
  Droplets, 
  Wind,
  Thermometer,
  Gauge,
  Sunrise,
  Sunset
} from 'lucide-react';

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

interface WeatherCardProps {
  weather: WeatherData;
  isLoading: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, isLoading }) => {
  const getWeatherIcon = (condition: string) => {
    const iconClass = "w-20 h-20 text-white drop-shadow-2xl animate-pulse";
    
    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return <Sun className={iconClass} />;
      case 'clouds':
      case 'cloudy':
      case 'overcast':
        return <Cloud className={iconClass} />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className={iconClass} />;
      case 'snow':
        return <CloudSnow className={iconClass} />;
      case 'thunderstorm':
        return <CloudLightning className={iconClass} />;
      default:
        return <Cloud className={iconClass} />;
    }
  };

  const getBackgroundGradient = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return 'from-orange-400 via-yellow-500 to-pink-500';
      case 'clouds':
      case 'cloudy':
      case 'overcast':
        return 'from-slate-400 via-gray-500 to-blue-600';
      case 'rain':
      case 'drizzle':
        return 'from-blue-500 via-indigo-600 to-purple-700';
      case 'snow':
        return 'from-cyan-300 via-blue-400 to-indigo-500';
      case 'thunderstorm':
        return 'from-purple-600 via-pink-600 to-red-600';
      default:
        return 'from-teal-400 via-cyan-500 to-blue-600';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-2xl p-8 max-w-md w-full animate-pulse border border-gray-200">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full mx-auto mb-6 animate-spin"></div>
          <div className="h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg mb-3"></div>
          <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg mb-8"></div>
          <div className="h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg mb-8"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-xl"></div>
            <div className="h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-xl"></div>
            <div className="h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-xl"></div>
            <div className="h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br ${getBackgroundGradient(weather.condition)} rounded-3xl shadow-2xl p-8 max-w-lg w-full text-white transform hover:scale-105 transition-all duration-500 hover:shadow-3xl border border-white/20 backdrop-blur-sm`}>
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          {getWeatherIcon(weather.condition)}
        </div>
        <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">{weather.location}</h2>
        <p className="text-white/90 text-lg font-medium">{weather.country}</p>
      </div>

      <div className="text-center mb-10">
        <div className="text-7xl font-bold mb-3 drop-shadow-2xl bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          {Math.round(weather.temperature)}°C
        </div>
        <p className="text-white/95 text-xl capitalize font-semibold mb-2">{weather.description}</p>
        <p className="text-white/80 text-lg">Feels like {Math.round(weather.feelsLike)}°C</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/15 backdrop-blur-md rounded-xl p-5 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
          <Droplets className="w-8 h-8 mx-auto mb-3 text-cyan-200 drop-shadow-lg" />
          <p className="text-sm text-white/80 font-medium">Humidity</p>
          <p className="text-xl font-bold text-white">{weather.humidity}%</p>
        </div>
        
        <div className="bg-white/15 backdrop-blur-md rounded-xl p-5 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
          <Wind className="w-8 h-8 mx-auto mb-3 text-green-200 drop-shadow-lg" />
          <p className="text-sm text-white/80 font-medium">Wind Speed</p>
          <p className="text-xl font-bold text-white">{weather.windSpeed} m/s</p>
        </div>
        
        <div className="bg-white/15 backdrop-blur-md rounded-xl p-5 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
          <Eye className="w-8 h-8 mx-auto mb-3 text-purple-200 drop-shadow-lg" />
          <p className="text-sm text-white/80 font-medium">Visibility</p>
          <p className="text-xl font-bold text-white">{weather.visibility} km</p>
        </div>
        
        <div className="bg-white/15 backdrop-blur-md rounded-xl p-5 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
          <Gauge className="w-8 h-8 mx-auto mb-3 text-orange-200 drop-shadow-lg" />
          <p className="text-sm text-white/80 font-medium">Pressure</p>
          <p className="text-xl font-bold text-white">{weather.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
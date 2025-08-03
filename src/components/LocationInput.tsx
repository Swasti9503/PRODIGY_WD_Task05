import React, { useState } from 'react';
import { Search, MapPin, Loader } from 'lucide-react';

interface LocationInputProps {
  onLocationSubmit: (location: string) => void;
  onCurrentLocation: () => void;
  isLoading: boolean;
}

const LocationInput: React.FC<LocationInputProps> = ({ 
  onLocationSubmit, 
  onCurrentLocation, 
  isLoading 
}) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onLocationSubmit(location.trim());
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 max-w-lg w-full mb-10 border border-gray-100 hover:shadow-3xl transition-all duration-300">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Get Weather Information
      </h3>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city name..."
            className="w-full px-6 py-4 pr-14 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg font-medium bg-white/80 backdrop-blur-sm hover:border-blue-300"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !location.trim()}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 text-gray-400 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 rounded-xl hover:bg-blue-50"
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin text-blue-500" />
            ) : (
              <Search className="w-6 h-6" />
            )}
          </button>
        </div>
      </form>

      <div className="text-center">
        <p className="text-gray-500 text-lg mb-4 font-medium">or</p>
        <button
          onClick={onCurrentLocation}
          disabled={isLoading}
          className="flex items-center justify-center space-x-3 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:shadow-2xl disabled:cursor-not-allowed transform hover:scale-105 hover:-translate-y-1"
        >
          {isLoading ? (
            <Loader className="w-6 h-6 animate-spin" />
          ) : (
            <MapPin className="w-6 h-6" />
          )}
          <span className="text-lg">Use Current Location</span>
        </button>
      </div>
    </div>
  );
};

export default LocationInput;
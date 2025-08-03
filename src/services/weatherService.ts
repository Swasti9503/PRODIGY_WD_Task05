// Using OpenWeatherMap API (free tier)
const API_KEY = 'demo_key'; // In production, use environment variables
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherResponse {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
}

export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
};

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherResponse> => {
  // For demo purposes, return mock data since we don't have a real API key
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Current Location',
        sys: { country: 'Demo' },
        main: {
          temp: 22,
          feels_like: 25,
          humidity: 65,
          pressure: 1013,
        },
        weather: [{
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        }],
        wind: { speed: 3.5 },
        visibility: 10000,
      });
    }, 1000);
  });

  // Real API call (uncomment when you have an API key):
  /*
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  return response.json();
  */
};

export const fetchWeatherByCity = async (city: string): Promise<WeatherResponse> => {
  // For demo purposes, return mock data based on city name
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (city.toLowerCase().includes('error')) {
        reject(new Error('City not found'));
        return;
      }

      const mockWeatherConditions = [
        { main: 'Clear', description: 'clear sky', temp: 25 },
        { main: 'Clouds', description: 'scattered clouds', temp: 18 },
        { main: 'Rain', description: 'light rain', temp: 15 },
        { main: 'Snow', description: 'light snow', temp: -2 },
      ];

      const randomCondition = mockWeatherConditions[Math.floor(Math.random() * mockWeatherConditions.length)];

      resolve({
        name: city,
        sys: { country: 'Demo' },
        main: {
          temp: randomCondition.temp,
          feels_like: randomCondition.temp + Math.floor(Math.random() * 5) - 2,
          humidity: Math.floor(Math.random() * 40) + 40,
          pressure: Math.floor(Math.random() * 50) + 1000,
        },
        weather: [{
          main: randomCondition.main,
          description: randomCondition.description,
          icon: '01d',
        }],
        wind: { speed: Math.random() * 10 },
        visibility: Math.floor(Math.random() * 5000) + 5000,
      });
    }, 1000);
  });

  // Real API call (uncomment when you have an API key):
  /*
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error('City not found');
  }
  
  return response.json();
  */
};
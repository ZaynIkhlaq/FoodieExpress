'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaStar, FaHeart, FaFilter } from 'react-icons/fa';
interface Review {
  _id: string;
  rating: number;
  comment: string;
  user: {
    name: string;
  };
  createdAt: string;
}
interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviews: Array<Review>;
  deliveryTime: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  image: string;
}
interface Cuisine {
  name: string;
}
export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const restaurantsRes = await fetch('/api/restaurants');
        const restaurantsData = await restaurantsRes.json();
        const cuisinesRes = await fetch('/api/cuisines');
        const cuisinesData = await cuisinesRes.json();
        setRestaurants(restaurantsData.data || []);
        setFilteredRestaurants(restaurantsData.data || []);
        setCuisines(cuisinesData.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    let result = [...restaurants];
    if (selectedCuisine !== 'all') {
      result = result.filter(restaurant => 
        restaurant.cuisine.toLowerCase() === selectedCuisine.toLowerCase()
      );
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(restaurant => 
        restaurant.name.toLowerCase().includes(query) || 
        restaurant.cuisine.toLowerCase().includes(query)
      );
    }
    setFilteredRestaurants(result);
  }, [searchQuery, selectedCuisine, restaurants]);
  const formatNameForUrl = (name: string): string => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleCuisineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCuisine(e.target.value);
  };
  return (
    <div className="bg-gray-100 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Restaurants</h1>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative rounded-md shadow-sm md:w-1/2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="focus:ring-red-500 focus:border-red-500 block w-full pl-10 py-3 sm:text-sm border-gray-300 rounded-md"
            placeholder="Search for restaurants or cuisines"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Filter by:</span>
          <div className="relative">
            <select 
              className="focus:ring-red-500 focus:border-red-500 h-full py-2 pl-3 pr-7 border-gray-300 bg-white rounded-md text-gray-700"
              value={selectedCuisine}
              onChange={handleCuisineChange}
            >
              <option value="all">All</option>
              {cuisines.map((cuisine, index) => (
                <option key={index} value={cuisine.name.toLowerCase()}>
                  {cuisine.name}
                </option>
              ))}
            </select>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600">
            <FaFilter className="mr-2" />
            Filters
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <Link 
                key={restaurant._id} 
                href={`/restaurants/name/${formatNameForUrl(restaurant.name)}`} 
                className="group"
              >
                <div className="overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow">
                  <div className="relative h-48 w-full bg-cover bg-center" style={{ backgroundImage: `url(${restaurant.image})` }}>
                    <div className="absolute top-2 right-2 bg-white rounded-full p-2 z-10">
                      <FaHeart className="h-4 w-4 text-gray-400 group-hover:text-red-500" />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all">
                      <div className="absolute bottom-0 left-0 p-4">
                        <span className="text-white font-bold text-xl">{restaurant.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
                    <p className="text-sm text-gray-600">{restaurant.cuisine} • {restaurant.deliveryTime} min</p>
                    <p className="text-sm text-gray-600">
                      {restaurant.address?.street || 'Address not available'}
                    </p>
                    <div className="mt-2 flex items-center">
                      <FaStar className="text-yellow-500 mr-1" />
                      <span className="text-sm font-medium text-gray-900">{restaurant.rating || 'New'}</span>
                      <span className="mx-1 text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{restaurant.reviews?.length || 0} reviews</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500">
                {searchQuery || selectedCuisine !== 'all' 
                  ? 'No restaurants match your search criteria.' 
                  : 'No restaurants available at the moment.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 
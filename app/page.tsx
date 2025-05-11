import Link from 'next/link';
import { FaSearch, FaUtensils, FaMotorcycle, FaHeart } from 'react-icons/fa';

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
  image?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

interface Cuisine {
  name: string;
}

// Fallback data in case API calls fail
const FALLBACK_RESTAURANTS: Restaurant[] = [
  {
    _id: '1',
    name: 'Pizza Palace',
    cuisine: 'Italian',
    rating: 4.5,
    reviews: []
  },
  {
    _id: '2',
    name: 'Burger Joint',
    cuisine: 'American',
    rating: 4.2,
    reviews: []
  },
  {
    _id: '3',
    name: 'Sushi Spot',
    cuisine: 'Japanese',
    rating: 4.7,
    reviews: []
  }
];

const FALLBACK_CUISINES: Cuisine[] = [
  { name: 'Italian' },
  { name: 'American' },
  { name: 'Japanese' },
  { name: 'Chinese' },
  { name: 'Mexican' },
  { name: 'Indian' }
];

async function getRestaurants() {
  try {
    const apiUrl = 'http://localhost:3000/api/restaurants';
    console.log('Fetching restaurants from:', apiUrl);
    
    const response = await fetch(apiUrl, { 
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch restaurants: Status ${response.status}`);
      return FALLBACK_RESTAURANTS;
    }
    
    const data = await response.json();
    return data.data || FALLBACK_RESTAURANTS;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return FALLBACK_RESTAURANTS;
  }
}

async function getCuisines() {
  try {
    const apiUrl = 'http://localhost:3000/api/cuisines';
    console.log('Fetching cuisines from:', apiUrl);
    
    const response = await fetch(apiUrl, { 
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch cuisines: Status ${response.status}`);
      return FALLBACK_CUISINES;
    }
    
    const data = await response.json();
    return data.data || FALLBACK_CUISINES;
  } catch (error) {
    console.error('Error fetching cuisines:', error);
    return FALLBACK_CUISINES;
  }
}

export default async function Home() {
  console.log('Rendering Home page');
  
  // Fetch data with fallback
  let restaurants: Restaurant[] = [];
  let cuisines: Cuisine[] = [];
  
  try {
    restaurants = await getRestaurants();
  } catch {
    console.error('Failed to get restaurants, using fallback data');
    restaurants = FALLBACK_RESTAURANTS;
  }
  
  try {
    cuisines = await getCuisines();
  } catch {
    console.error('Failed to get cuisines, using fallback data');
    cuisines = FALLBACK_CUISINES;
  }
  
  const featuredRestaurants = restaurants.slice(0, 3);
  
  const formatNameForUrl = (name: string): string => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Updated with a more dynamic layout */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />
        <div className="relative max-w-7xl mx-auto py-32 px-4 sm:py-40 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className='text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600 mb-6'>
              Foodie Express
            </h1>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl mb-8">
              Your Favorite Food
              <br />
              <span className="text-red-400">Delivered Fast & Fresh</span>
            </h2>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
              Order food from the best local restaurants and get it delivered to your doorstep.
            </p>
            <div className="mt-12">
              <div className="relative max-w-xl mx-auto">
                <div className="flex items-center rounded-full overflow-hidden bg-white shadow-xl">
                  <FaSearch className="absolute left-6 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your delivery address"
                    className="w-full py-5 pl-14 pr-32 rounded-full focus:outline-none text-gray-800 text-lg"
                  />
                  <Link href="/restaurants" className="absolute right-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-full font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg">
                    Find Food
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section - Updated with cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              How It Works
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Ordering your favorite food has never been easier.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white p-8 rounded-lg shadow-lg">
                <div className="flex justify-center">
                  <div className="bg-red-100 p-4 rounded-full">
                    <FaSearch className="h-8 w-8 text-red-500" />
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">Find Restaurants</h3>
                <p className="mt-4 text-gray-600">
                  Browse restaurants and cuisines available in your area.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white p-8 rounded-lg shadow-lg">
                <div className="flex justify-center">
                  <div className="bg-red-100 p-4 rounded-full">
                    <FaUtensils className="h-8 w-8 text-red-500" />
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">Choose Dishes</h3>
                <p className="mt-4 text-gray-600">
                  Select from a variety of menu items and customize to your liking.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white p-8 rounded-lg shadow-lg">
                <div className="flex justify-center">
                  <div className="bg-red-100 p-4 rounded-full">
                    <FaMotorcycle className="h-8 w-8 text-red-500" />
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">Fast Delivery</h3>
                <p className="mt-4 text-gray-600">
                  Get your order delivered quickly and enjoy your meal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Cuisines Section - Updated with a modern grid */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Popular Cuisines
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Explore restaurants by your favorite cuisine.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {cuisines.length > 0 ? cuisines.map((cuisine: Cuisine, index: number) => (
              <Link 
                key={index} 
                href={`/restaurants?cuisine=${cuisine.name.toLowerCase()}`} 
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                  <div className="aspect-w-1 aspect-h-1 w-full">
                    <div className="relative h-40 w-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-600/20 group-hover:from-red-500/30 group-hover:to-red-600/30 transition-all duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">{cuisine.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )) : (
              <p className="col-span-full text-center text-gray-500">No cuisines available at the moment.</p>
            )}
          </div>
        </div>
      </section>
      
      {/* Featured Restaurants Section - Updated with modern cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Featured Restaurants
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our top-rated places to eat.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredRestaurants.length > 0 ? featuredRestaurants.map((restaurant: Restaurant) => (
              <Link 
                key={restaurant._id} 
                href={`/restaurants/name/${formatNameForUrl(restaurant.name)}`} 
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                  <div className="relative h-64 w-full bg-gray-200">
                    <div className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg z-10">
                      <FaHeart className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors duration-300" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-bold text-white">{restaurant.name}</h3>
                      <p className="text-gray-200 mt-1">{restaurant.cuisine}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-red-500">{restaurant.rating || 'New'}</span>
                        {restaurant.rating && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600">{restaurant.reviews?.length || 0} reviews</span>
                          </>
                        )}
                      </div>
                      <span className="text-gray-600">20-30 min</span>
                    </div>
                  </div>
                </div>
              </Link>
            )) : (
              <p className="col-span-full text-center text-gray-500">No restaurants available at the moment.</p>
            )}
          </div>
          <div className="mt-16 text-center">
            <Link 
              href="/restaurants" 
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              View All Restaurants
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer - Updated with a modern design */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600">Foodie Express</h3>
              <p className="text-gray-400 mb-6">
                Bringing your favorite food right to your doorstep.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-300">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>  
                </a>
                <a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-300">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-6">
                Company
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-red-400 transition-colors duration-300">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-red-400 transition-colors duration-300">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-red-400 transition-colors duration-300">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-red-400 transition-colors duration-300">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-6">
                Support
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-red-400 transition-colors duration-300">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-red-400 transition-colors duration-300">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-red-400 transition-colors duration-300">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-red-400 transition-colors duration-300">
                    Delivery Areas
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-6">
                Legal
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-red-400 transition-colors duration-300">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-red-400 transition-colors duration-300">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-red-400 transition-colors duration-300">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-sm text-center">
              &copy; {new Date().getFullYear()} Foodie Express. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { FaStar, FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';
interface Review {
  _id: string;
  rating: number;
  comment: string;
  user: {
    name: string;
  };
  createdAt: string;
}
interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  vegetarian: boolean;
}
interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviews: Array<Review>;
  menuItems: Array<MenuItem>;
  description: string;
  deliveryTime: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  image: string;
}
async function getRestaurantByName(name: string) {
  try {
    const decodedName = name.replace(/-/g, ' ');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/restaurants/name/${decodedName}`,
      { next: { revalidate: 60 } }
    );
    if (!response.ok) throw new Error('Failed to fetch restaurant');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    return null;
  }
}
export default async function RestaurantPage({ params }: { params: { name: string } }) {
  const name = await params.name;
  const restaurant = await getRestaurantByName(name) as Restaurant | null;
  if (!restaurant) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Restaurant not found</h2>
          <p className="mt-2 text-gray-600">
            The restaurant you&apos;re looking for could not be found.
          </p>
        </div>
      </div>
    );
  }
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <FaStar
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'
          }`}
        />
      ));
  };
  const menuItemsByCategory = restaurant.menuItems?.reduce((acc: Record<string, MenuItem[]>, item: MenuItem) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {}) || {};
  const menuCategories = Object.keys(menuItemsByCategory).map(category => ({
    id: category,
    name: category.charAt(0).toUpperCase() + category.slice(1)
  }));
  return (
    <div className="bg-white">
      <div className="relative">
        <div className="h-64 w-full bg-cover bg-center" style={{ backgroundImage: `url(${restaurant.image})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative h-full flex items-center justify-center">
            <span className="text-white font-bold text-3xl">{restaurant.name}</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="flex">
              <div className="h-24 w-24 rounded-xl shadow-lg overflow-hidden bg-white border-4 border-white">
                <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${restaurant.image})` }}></div>
              </div>
            </div>
            <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-gray-900 truncate">{restaurant.name}</h1>
                <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
              </div>
            </div>
          </div>
          <div className="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-gray-900 truncate">{restaurant.name}</h1>
          </div>
        </div>
      </div>
      <div className="mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {restaurant.address && (
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                <FaMapMarkerAlt className="inline mr-2 text-gray-400" />
                Address
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {restaurant.address.street}, {restaurant.address.city}, {restaurant.address.state} {restaurant.address.zipCode}
              </dd>
            </div>
          )}
          {restaurant.phone && (
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                <FaPhone className="inline mr-2 text-gray-400" />
                Phone
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{restaurant.phone}</dd>
            </div>
          )}
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              <FaClock className="inline mr-2 text-gray-400" />
              Delivery Time
            </dt>
            <dd className="mt-1 text-sm text-gray-900">{restaurant.deliveryTime} min</dd>
          </div>
        </dl>
        <div className="mt-6">
          <div className="flex items-center">
            <div className="flex items-center">
              {renderStars(restaurant.rating || 0)}
            </div>
            <p className="ml-2 text-sm text-gray-900">
              {restaurant.rating || 'New'} ({restaurant.reviews?.length || 0} reviews)
            </p>
            <span className="mx-2 text-gray-500">•</span>
            <p className="text-sm text-gray-900">{restaurant.deliveryTime} min delivery time</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">About</h3>
          <p className="mt-2 text-sm text-gray-600">{restaurant.description}</p>
        </div>
        {menuCategories.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">Menu</h2>
            <div className="mt-4 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Menu Categories">
                {menuCategories.map((category) => (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                  >
                    {category.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="mt-8 space-y-12">
              {menuCategories.map((category) => (
                <div key={category.id} id={category.id} className="space-y-5">
                  <h3 className="text-xl font-medium text-gray-900">{category.name}</h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {menuItemsByCategory[category.id].map((item: MenuItem) => (
                      <div key={item._id} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="h-36 bg-gray-200 w-full">
                          <div className="bg-orange-100 h-full w-full flex items-center justify-center">
                            <span className="text-orange-500 font-bold">{item.name}</span>
                          </div>
                        </div>
                        <div className="px-4 py-4">
                          <div className="flex justify-between">
                            <h4 className="text-lg font-medium text-gray-900">{item.name}</h4>
                            <span className="text-orange-500 font-semibold">${item.price.toFixed(2)}</span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                          {item.vegetarian && (
                            <div className="mt-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                                Vegetarian
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {restaurant.reviews?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
            <div className="mt-6 space-y-10">
              {restaurant.reviews.map((review: Review) => (
                <div key={review._id} className="border-t border-gray-200 pt-10">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 font-bold">{review.user?.name?.[0] || 'U'}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-bold text-gray-900">{review.user?.name || 'Anonymous'}</h4>
                      <div className="mt-1 flex items-center">
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-base text-gray-600">
                    <p>{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
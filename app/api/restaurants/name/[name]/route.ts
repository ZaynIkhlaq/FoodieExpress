import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    // Return static dummy data for testing
    const dummyRestaurants = [
      {
        _id: '1',
        name: 'Pizza Palace',
        cuisine: 'Italian',
        rating: 4.5,
        reviews: [
          {
            _id: '101',
            rating: 4,
            comment: 'Great pizza, fast delivery!',
            user: {
              name: 'John Doe'
            },
            createdAt: '2023-09-15T14:30:00Z'
          }
        ],
        menuItems: [
          {
            _id: '201',
            name: 'Margherita Pizza',
            description: 'Classic pizza with tomato sauce, mozzarella, and basil',
            price: 12.99,
            category: 'pizza',
            vegetarian: true
          },
          {
            _id: '202',
            name: 'Pepperoni Pizza',
            description: 'Pizza with tomato sauce, mozzarella, and pepperoni',
            price: 14.99,
            category: 'pizza',
            vegetarian: false
          }
        ],
        description: 'Authentic Italian pizzeria serving traditional wood-fired pizzas.',
        deliveryTime: 30,
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345'
        },
        phone: '555-123-4567',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
      },
      {
        _id: '2',
        name: 'Burger Joint',
        cuisine: 'American',
        rating: 4.2,
        reviews: [
          {
            _id: '102',
            rating: 5,
            comment: 'Best burgers in town!',
            user: {
              name: 'Jane Smith'
            },
            createdAt: '2023-10-05T18:15:00Z'
          }
        ],
        menuItems: [
          {
            _id: '203',
            name: 'Classic Burger',
            description: 'Beef patty with lettuce, tomato, and special sauce',
            price: 9.99,
            category: 'burgers',
            vegetarian: false
          },
          {
            _id: '204',
            name: 'Veggie Burger',
            description: 'Plant-based patty with avocado and vegan aioli',
            price: 11.99,
            category: 'burgers',
            vegetarian: true
          }
        ],
        description: 'Gourmet burgers made with locally sourced ingredients.',
        deliveryTime: 25,
        address: {
          street: '456 Oak Ave',
          city: 'Somewhere',
          state: 'NY',
          zipCode: '67890'
        },
        phone: '555-987-6543',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'
      },
      {
        _id: '3',
        name: 'Sushi Spot',
        cuisine: 'Japanese',
        rating: 4.7,
        reviews: [
          {
            _id: '103',
            rating: 4,
            comment: 'Fresh fish and great service!',
            user: {
              name: 'Mike Johnson'
            },
            createdAt: '2023-11-10T20:45:00Z'
          }
        ],
        menuItems: [
          {
            _id: '205',
            name: 'California Roll',
            description: 'Crab, avocado, and cucumber roll',
            price: 8.99,
            category: 'rolls',
            vegetarian: false
          },
          {
            _id: '206',
            name: 'Vegetable Tempura',
            description: 'Assorted vegetables in a light batter, deep-fried',
            price: 7.99,
            category: 'appetizers',
            vegetarian: true
          }
        ],
        description: 'Premium sushi restaurant with the freshest seafood.',
        deliveryTime: 35,
        address: {
          street: '789 Pine Rd',
          city: 'Nowhere',
          state: 'TX',
          zipCode: '54321'
        },
        phone: '555-789-0123',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c'
      }
    ];
    
    const decodedName = params.name.replace(/-/g, ' ').toLowerCase();
    const restaurant = dummyRestaurants.find(
      (r) => r.name.toLowerCase() === decodedName
    );
    
    if (!restaurant) {
      return NextResponse.json(
        { success: false, message: 'Restaurant not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: restaurant });
  } catch (error) {
    console.error('Error in restaurant detail API:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch restaurant details' },
      { status: 500 }
    );
  }
} 
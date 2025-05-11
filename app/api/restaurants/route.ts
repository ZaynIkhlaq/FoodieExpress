import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Return static dummy data for testing
    const dummyRestaurants = [
      {
        _id: '1',
        name: 'Pizza Palace',
        cuisine: 'Italian',
        rating: 4.5,
        reviews: [],
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345'
        }
      },
      {
        _id: '2',
        name: 'Burger Joint',
        cuisine: 'American',
        rating: 4.2,
        reviews: [],
        address: {
          street: '456 Oak Ave',
          city: 'Somewhere',
          state: 'NY',
          zipCode: '67890'
        }
      },
      {
        _id: '3',
        name: 'Sushi Spot',
        cuisine: 'Japanese',
        rating: 4.7,
        reviews: [],
        address: {
          street: '789 Pine Rd',
          city: 'Nowhere',
          state: 'TX',
          zipCode: '54321'
        }
      }
    ];
    
    return NextResponse.json({ success: true, data: dummyRestaurants });
  } catch (error) {
    console.error('Error in restaurants API:', error);
    return NextResponse.json(
      { success: false, message: `Failed to fetch restaurants` },
      { status: 500 }
    );
  }
} 
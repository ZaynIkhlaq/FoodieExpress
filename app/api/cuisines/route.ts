import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Return static dummy data for testing
    const dummyCuisines = [
      { name: 'Italian' },
      { name: 'American' },
      { name: 'Japanese' },
      { name: 'Chinese' },
      { name: 'Mexican' },
      { name: 'Indian' }
    ];
    
    return NextResponse.json({ 
      success: true, 
      data: dummyCuisines 
    });
  } catch (error) {
    console.error('Error in cuisines API:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch cuisines' },
      { status: 500 }
    );
  }
} 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectDBModule = await import('../lib/db.js');
const connectDB = connectDBModule.default || connectDBModule;
const RestaurantModule = await import('../models/Restaurant.js');
const Restaurant = RestaurantModule.default || RestaurantModule;


const restaurants = [
  {
    name: "Pizza Palace",
    description: "Authentic Italian pizzas made with fresh ingredients. Our wood-fired oven gives our pizzas that perfect crispy crust.",
    cuisine: "Italian",
    address: { street: "123 Main Street", city: "Foodville", state: "NY", zipCode: "10001" },
    phone: "555-123-4567",
    rating: 4.7,
    priceLevel: 2,
    image: "https://images.unsplash.com/photo-1601924582975-7d7bd1d6fdb5", // Pizza restaurant
    deliveryTime: 30,
    deliveryFee: 2.99,
    menuItems: [
      {
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and basil",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1585238342028-96639bbee53b", // Margherita pizza
        category: "main",
        vegetarian: true,
        spicyLevel: 0
      },
      {
        name: "Pepperoni Pizza",
        description: "Pizza topped with pepperoni, mozzarella, and tomato sauce",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1601924638867-3ec6a032c2b1", // Pepperoni pizza
        category: "main",
        vegetarian: false,
        spicyLevel: 1
      },
      {
        name: "Tiramisu",
        description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
        price: 6.99,
        image: "https://images.unsplash.com/photo-1613145993481-9921e290529f", // Tiramisu
        category: "dessert",
        vegetarian: true,
        spicyLevel: 0
      }
    ]
  },
  {
    name: "Taco Town",
    description: "Authentic Mexican street food. Our tacos are made with fresh ingredients and house-made tortillas.",
    cuisine: "Mexican",
    address: { street: "456 Taco Blvd", city: "Foodville", state: "NY", zipCode: "10002" },
    phone: "555-234-5678",
    rating: 4.5,
    priceLevel: 1,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092", // Tacos on plate
    deliveryTime: 25,
    deliveryFee: 1.99,
    menuItems: [
      {
        name: "Carne Asada Tacos",
        description: "Grilled steak tacos with onion, cilantro, and lime",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1601924638867-3ec6a032c2b1", // Beef tacos
        category: "main",
        vegetarian: false,
        spicyLevel: 2
      },
      {
        name: "Guacamole & Chips",
        description: "Fresh guacamole made with avocados, tomatoes, onions, and cilantro",
        price: 5.99,
        image: "https://images.unsplash.com/photo-1606788075761-974f8299b785", // Guac & chips
        category: "appetizer",
        vegetarian: true,
        vegan: true,
        spicyLevel: 1
      },
      {
        name: "Horchata",
        description: "Sweet rice milk drink with cinnamon",
        price: 2.99,
        image: "https://images.unsplash.com/photo-1626073606857-0d5a8e4a385d", // Horchata
        category: "beverage",
        vegetarian: true,
        vegan: true,
        spicyLevel: 0
      }
    ]
  },
  {
    name: "Sushi Sensation",
    description: "Premium sushi restaurant offering the freshest fish and traditional Japanese dishes.",
    cuisine: "Japanese",
    address: { street: "789 Ocean Drive", city: "Foodville", state: "NY", zipCode: "10003" },
    phone: "555-345-6789",
    rating: 4.8,
    priceLevel: 3,
    image: "https://images.unsplash.com/photo-1587397845856-cf1fe2828c9b", // Sushi bar
    deliveryTime: 40,
    deliveryFee: 3.99,
    menuItems: [
      {
        name: "California Roll",
        description: "Crab, avocado, and cucumber roll with tobiko",
        price: 7.99,
        image: "https://images.unsplash.com/photo-1612197521842-96a3e4e92b98", // California roll
        category: "main",
        vegetarian: false,
        spicyLevel: 0
      },
      {
        name: "Spicy Tuna Roll",
        description: "Fresh tuna with spicy mayo and cucumber",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1626082892832-4f2ac90f99d6", // Spicy tuna roll
        category: "main",
        vegetarian: false,
        spicyLevel: 2
      },
      {
        name: "Miso Soup",
        description: "Traditional Japanese soup with tofu, seaweed, and green onions",
        price: 3.99,
        image: "https://images.unsplash.com/photo-1606788075761-974f8299b785", // Miso soup
        category: "appetizer",
        vegetarian: true,
        spicyLevel: 0
      }
    ]
  },
  {
    name: "Burger Bistro",
    description: "Gourmet burgers made with locally-sourced ingredients and house-made sauces.",
    cuisine: "American",
    address: { street: "321 Patty Place", city: "Foodville", state: "NY", zipCode: "10004" },
    phone: "555-456-7890",
    rating: 4.6,
    priceLevel: 2,
    image: "https://images.unsplash.com/photo-1601050690129-1748633f0f19", // Burger restaurant
    deliveryTime: 35,
    deliveryFee: 2.49,
    menuItems: [
      {
        name: "Classic Cheeseburger",
        description: "Angus beef patty with cheddar, lettuce, tomato, and special sauce",
        price: 10.99,
        image: "https://images.unsplash.com/photo-1603052875674-b4e7f31225be", // Cheeseburger
        category: "main",
        vegetarian: false,
        spicyLevel: 0
      },
      {
        name: "Truffle Fries",
        description: "Crispy fries tossed in truffle oil and parmesan",
        price: 5.99,
        image: "https://images.unsplash.com/photo-1579762672311-12b9c24f84e7", // Fries
        category: "appetizer",
        vegetarian: true,
        spicyLevel: 0
      },
      {
        name: "Milkshake",
        description: "Hand-spun vanilla milkshake topped with whipped cream",
        price: 4.99,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e17d", // Milkshake
        category: "beverage",
        vegetarian: true,
        spicyLevel: 0
      }
    ]
  },
  {
    name: "Thai Delight",
    description: "Authentic Thai cuisine with bold flavors and fresh ingredients.",
    cuisine: "Thai",
    address: { street: "567 Spice Avenue", city: "Foodville", state: "NY", zipCode: "10005" },
    phone: "555-567-8901",
    rating: 4.4,
    priceLevel: 2,
    image: "https://images.unsplash.com/photo-1635341436952-03db9c7f20cc", // Thai dishes
    deliveryTime: 45,
    deliveryFee: 2.99,
    menuItems: [
      {
        name: "Pad Thai",
        description: "Stir-fried rice noodles with eggs, tofu, bean sprouts, and peanuts",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1604908177225-e38731b48f29", // Pad Thai
        category: "main",
        vegetarian: true,
        spicyLevel: 1
      },
      {
        name: "Green Curry",
        description: "Spicy curry with bamboo shoots, eggplant, and basil in coconut milk",
        price: 13.99,
        image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f", // Thai green curry
        category: "main",
        vegetarian: false,
        spicyLevel: 3
      },
      {
        name: "Spring Rolls",
        description: "Crispy vegetable spring rolls with sweet chili sauce",
        price: 6.99,
        image: "https://images.unsplash.com/photo-1585238342028-96639bbee53b", // Spring rolls
        category: "appetizer",
        vegetarian: true,
        vegan: true,
        spicyLevel: 0
      }
    ]
  }
];

async function seedRestaurants() {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Clearing existing restaurant data...');
    await Restaurant.deleteMany({});
    console.log('Inserting new restaurant data...');
    const result = await Restaurant.insertMany(restaurants);
    console.log(`Successfully seeded ${result.length} restaurants!`);
    console.log('Restaurant IDs for reference:');
    result.forEach(restaurant => {
      console.log(`${restaurant.name}: ${restaurant._id}`);
    });
    mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error seeding restaurants:', error);
    process.exit(1);
  }
}
await seedRestaurants(); 
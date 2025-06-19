import {apiHelpers} from "../axios";
import type {FoodItem, Restaurant} from "@/types/food";

// Food API functions
export const foodAPI = {
	// Get all foods
	getAllFoods: (): Promise<FoodItem[]> => {
		return apiHelpers.get<FoodItem[]>("/Food");
	},

	// Get food by ID
	getFoodById: (id: string): Promise<FoodItem> => {
		return apiHelpers.get<FoodItem>(`/Food/${id}`);
	},

	// Search foods (if the API supports search)
	searchFoods: (query: string): Promise<FoodItem[]> => {
		return apiHelpers.get<FoodItem[]>("/Food", {params: {search: query}});
	},

	// Get foods with pagination (if supported)
	getFoodsWithPagination: (page: number = 1, limit: number = 10): Promise<FoodItem[]> => {
		return apiHelpers.get<FoodItem[]>("/Food", {params: {page, limit}});
	},

	// Get only open restaurants
	getOpenFoods: async (): Promise<FoodItem[]> => {
		const foods = await apiHelpers.get<FoodItem[]>("/Food");
		return foods.filter((food) => food.restaurant.isOpen);
	},

	// Get foods by rating (filter client-side)
	getFoodsByRating: async (minRating: number): Promise<FoodItem[]> => {
		const foods = await apiHelpers.get<FoodItem[]>("/Food");
		return foods.filter((food) => food.restaurant.rating >= minRating);
	},

	// Get foods sorted by price
	getFoodsSortedByPrice: async (ascending: boolean = true): Promise<FoodItem[]> => {
		const foods = await apiHelpers.get<FoodItem[]>("/Food");
		return foods.sort((a, b) => {
			return ascending ? a.price - b.price : b.price - a.price;
		});
	},

	// Get foods sorted by rating
	getFoodsSortedByRating: async (ascending: boolean = true): Promise<FoodItem[]> => {
		const foods = await apiHelpers.get<FoodItem[]>("/Food");
		return foods.sort((a, b) => {
			return ascending ? a.restaurant.rating - b.restaurant.rating : b.restaurant.rating - a.restaurant.rating;
		});
	},
};

// Restaurant API functions
export const restaurantAPI = {
	// Get all restaurants (extracted from food data)
	getAllRestaurants: async (): Promise<Restaurant[]> => {
		const foods = await apiHelpers.get<any[]>("/Food");
		const restaurants = new Map<string, Restaurant>();

		foods.forEach((food) => {
			const restaurantId = food.id;
			if (!restaurants.has(restaurantId)) {
				restaurants.set(restaurantId, {
					id: restaurantId,
					name: food.name,
					logo: food.logo,
					rating: parseFloat(food.rating) || 0,
					isOpen: food.open,
				});
			}
		});

		return Array.from(restaurants.values());
	},

	// Get featured restaurants (top rated and open)
	getFeaturedRestaurants: async (limit: number = 6): Promise<Restaurant[]> => {
		const restaurants = await restaurantAPI.getAllRestaurants();
		return restaurants
			.filter((restaurant) => restaurant.isOpen)
			.sort((a, b) => b.rating - a.rating)
			.slice(0, limit);
	},

	// Get open restaurants only
	getOpenRestaurants: async (): Promise<Restaurant[]> => {
		const restaurants = await restaurantAPI.getAllRestaurants();
		return restaurants.filter((restaurant) => restaurant.isOpen);
	},

	// Get restaurants by rating
	getRestaurantsByRating: async (minRating: number): Promise<Restaurant[]> => {
		const restaurants = await restaurantAPI.getAllRestaurants();
		return restaurants.filter((restaurant) => restaurant.rating >= minRating);
	},

	// Get restaurant by ID
	getRestaurantById: async (id: string): Promise<Restaurant | null> => {
		const restaurants = await restaurantAPI.getAllRestaurants();
		return restaurants.find((restaurant) => restaurant.id === id) || null;
	},

	// Search restaurants by name
	searchRestaurants: async (query: string): Promise<Restaurant[]> => {
		const restaurants = await restaurantAPI.getAllRestaurants();
		return restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(query.toLowerCase()));
	},
};

// Utility functions for food data
export const foodUtils = {
	// Format price for display
	formatPrice: (price: number): string => {
		return `$${price.toFixed(2)}`;
	},

	// Get average rating
	getAverageRating: (foods: FoodItem[]): number => {
		if (foods.length === 0) return 0;
		const totalRating = foods.reduce((sum, food) => sum + food.restaurant.rating, 0);
		return totalRating / foods.length;
	},

	// Filter foods by price range
	filterByPriceRange: (foods: FoodItem[], minPrice: number, maxPrice: number): FoodItem[] => {
		return foods.filter((food) => {
			return food.price >= minPrice && food.price <= maxPrice;
		});
	},

	// Get unique categories
	getCategories: (foods: FoodItem[]): string[] => {
		const categories = new Set<string>();
		foods.forEach((food) => {
			categories.add(food.category);
		});
		return Array.from(categories);
	},
};

// Utility functions for restaurant data
export const restaurantUtils = {
	// Get average restaurant rating
	getAverageRating: (restaurants: Restaurant[]): number => {
		if (restaurants.length === 0) return 0;
		const totalRating = restaurants.reduce((sum, restaurant) => sum + restaurant.rating, 0);
		return totalRating / restaurants.length;
	},

	// Get restaurants by rating range
	filterByRatingRange: (restaurants: Restaurant[], minRating: number, maxRating: number): Restaurant[] => {
		return restaurants.filter((restaurant) => restaurant.rating >= minRating && restaurant.rating <= maxRating);
	},

	// Get top rated restaurants
	getTopRatedRestaurants: (restaurants: Restaurant[], limit: number = 5): Restaurant[] => {
		return restaurants.sort((a, b) => b.rating - a.rating).slice(0, limit);
	},

	// Get newly opened restaurants (if createdAt is available)
	getNewRestaurants: (restaurants: Restaurant[], days: number = 7): Restaurant[] => {
		const cutoffDate = new Date();
		cutoffDate.setDate(cutoffDate.getDate() - days);

		return restaurants.filter((restaurant) => {
			// This would need to be implemented based on your data structure
			// For now, returning all restaurants
			return true;
		});
	},
};

export default foodAPI;

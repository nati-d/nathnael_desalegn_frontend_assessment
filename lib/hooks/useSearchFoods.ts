import {useState, useEffect} from "react";
import axios from "axios";
import type {FoodItem} from "../../types/food";

interface UseSearchFoodsReturn {
	searchResults: FoodItem[];
	loading: boolean;
	error: string | null;
	searchFoods: (query: string) => Promise<void>;
}

export function useSearchFoods(): UseSearchFoodsReturn {
	const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const searchFoods = async (query: string) => {
		if (!query.trim()) {
			setSearchResults([]);
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const response = await axios.get(`https://6852821e0594059b23cdd834.mockapi.io/Food?name=${encodeURIComponent(query)}`);

			// Map the API response to our FoodItem type
			const mappedResults: FoodItem[] = response.data.map((item: any) => ({
				id: item.id,
				name: item.name,
				price: parseFloat(item.Price) || 0,
				image:
					item.avatar ||
					item.food_image ||
					"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
				rating: parseFloat(item.rating) || 0,
				restaurant: {
					name: item.restaurant_name || "Unknown Restaurant",
					logo:
						item.logo ||
						item.restaurant_logo ||
						"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
					isOpen: item.open || false,
				},
			}));

			setSearchResults(mappedResults);
		} catch (err) {
			console.error("Error searching foods:", err);
			setError("Failed to search foods. Please try again.");
			setSearchResults([]);
		} finally {
			setLoading(false);
		}
	};

	return {
		searchResults,
		loading,
		error,
		searchFoods,
	};
}

import {useState, useEffect} from "react";
import {apiHelpers} from "@/lib/api/axios";
import type {FoodItem} from "@/types/food";

interface MockAPIFood {
	id: string;
	name: string;
	avatar: string;
	rating: string | number;
	open: boolean;
	logo: string;
	Price: string;
	price?: string;
	food_name?: string;
	food_rating?: number;
	food_image?: string;
	restaurant_name?: string;
	restaurant_logo?: string;
	restaurant_status?: string;
	image?: string;
	restaurant?: string;
	status?: string;
}

interface UseFeaturedFoodsReturn {
	foods: FoodItem[];
	loading: boolean;
	error: string | null;
	refetch: () => Promise<void>;
}

export const useFeaturedFoods = (limit: number = 8): UseFeaturedFoodsReturn => {
	const [foods, setFoods] = useState<FoodItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchFoods = async () => {
		try {
			setLoading(true);
			setError(null);

			const data: MockAPIFood[] = await apiHelpers.get("/Food");

			// Map the API data to our FoodItem type
			const mappedFoods: FoodItem[] = data
				.filter((item) => {
					// Filter out items that don't have essential data
					return item.name && (item.avatar || item.food_image || item.image);
				})
				.map((item) => ({
					id: item.id,
					name: item.food_name || item.name,
					price: parseFloat(item.price || item.Price) || 0,
					image: item.food_image || "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&w=600&h=400&fit=crop",
					restaurant: {
						id: item.id,
						name: item.restaurant_name || item.restaurant || item.name,
						logo: item.restaurant_logo || item.logo,
						rating: typeof item.rating === "string" ? parseFloat(item.rating) : item.rating || 0,
						isOpen: item.open,
					},
					category: "Featured", // Default category since it's not in the API
				}))
				.slice(0, limit);

			setFoods(mappedFoods);
		} catch (err: any) {
			setError(err.message || "Failed to fetch featured foods");
			console.error("Error fetching featured foods:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchFoods();
	}, [limit]);

	return {
		foods,
		loading,
		error,
		refetch: fetchFoods,
	};
};

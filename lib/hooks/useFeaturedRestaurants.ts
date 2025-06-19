import {useState, useEffect} from "react";
import {restaurantAPI} from "@/lib/api/food";
import type {Restaurant} from "@/types/food";

interface UseFeaturedRestaurantsReturn {
	restaurants: Restaurant[];
	loading: boolean;
	error: string | null;
	refetch: () => Promise<void>;
}

export const useFeaturedRestaurants = (limit: number = 6): UseFeaturedRestaurantsReturn => {
	const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchRestaurants = async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await restaurantAPI.getFeaturedRestaurants(limit);
			setRestaurants(data);
		} catch (err: any) {
			setError(err.message || "Failed to fetch featured restaurants");
			console.error("Error fetching featured restaurants:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchRestaurants();
	}, [limit]);

	return {
		restaurants,
		loading,
		error,
		refetch: fetchRestaurants,
	};
};

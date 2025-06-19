"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {FoodCard} from "./food-card";
import {useFeaturedFoods} from "@/lib/hooks/useFeaturedFoods";
import type {FoodItem} from "../types/food";
import AddOrEditMealModal from "./add-meal-modal";

interface FeaturedMealsProps {
	title?: string;
	itemsPerPage?: number;
	limit?: number;
}

export function FeaturedMeals({title = "Featured Meals", itemsPerPage = 8, limit = 12}: FeaturedMealsProps) {
	const [displayedItems, setDisplayedItems] = useState(itemsPerPage);
	const {foods, loading, error, refetch} = useFeaturedFoods(limit);

	// Modal state for add/edit
	const [modalOpen, setModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState<"add" | "edit">("add");
	const [editInitialValues, setEditInitialValues] = useState<any>(undefined);
	const [editId, setEditId] = useState<string | null>(null);

	const handleLoadMore = () => {
		setDisplayedItems((prev) => prev + itemsPerPage);
	};

	const handleCardClick = (item: FoodItem) => {
		console.log("Food item clicked:", item);
		// Handle navigation to food detail page
	};

	const handleEdit = (meal: FoodItem) => {
		setModalMode("edit");
		setEditId(meal.id);
		setEditInitialValues({
			name: meal.name,
			price: meal.price.toString(),
			image: meal.image,
			restaurant: meal.restaurant.name,
			logo: meal.restaurant.logo,
			status: meal.restaurant.isOpen ? "Open" : "Closed",
		});
		setModalOpen(true);
	};

	const handleEditSubmit = async (values: any) => {
		if (!editId) return;
		await fetch(`https://6852821e0594059b23cdd834.mockapi.io/Food/${editId}`, {
			method: "PUT",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				name: values.name,
				Price: values.price,
				avatar: values.image,
				restaurant_name: values.restaurant,
				logo: values.logo,
				open: values.status === "Open",
			}),
		});
		setModalOpen(false);
		setEditId(null);
		refetch();
	};

	const visibleMeals = foods.slice(0, displayedItems);
	const showLoadMore = displayedItems < foods.length;

	if (error) {
		return (
			<section className='py-12 bg-gray-50'>
				<div className='container mx-auto px-4'>
					<div className='text-center'>
						<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>{title}</h2>
						<p className='text-red-600 mb-4'>Error: {error}</p>
						<Button
							onClick={refetch}
							className='bg-orange-500 hover:bg-orange-600 text-white'
						>
							Try Again
						</Button>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className='py-12 bg-gray-50'>
			<div className='container mx-auto px-4'>
				{/* Section Header */}
				<div className='text-center mb-8'>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>{title}</h2>
					<div className='w-20 h-1 bg-orange-500 mx-auto rounded-full'></div>
				</div>

				{/* Loading State */}
				{loading && (
					<div className='text-center py-12'>
						<div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500'></div>
						<p className='mt-2 text-gray-600'>Loading featured meals...</p>
					</div>
				)}

				{/* Food Grid */}
				{!loading && foods.length > 0 && (
					<>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8'>
							{visibleMeals.map((meal) => (
								<FoodCard
									key={meal.id}
									item={meal}
									onCardClick={handleCardClick}
									onEdit={handleEdit}
								/>
							))}
						</div>

						{/* Load More Button */}
						{showLoadMore && (
							<div className='text-center'>
								<Button
									onClick={handleLoadMore}
									className='bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold'
								>
									Load More
								</Button>
							</div>
						)}
					</>
				)}

				{/* Empty State */}
				{!loading && foods.length === 0 && (
					<div className='text-center py-12'>
						<p className='text-gray-600 mb-4'>No featured meals available at the moment.</p>
						<Button
							onClick={refetch}
							className='bg-orange-500 hover:bg-orange-600 text-white'
						>
							Refresh
						</Button>
					</div>
				)}

				{/* Edit Modal */}
				<AddOrEditMealModal
					open={modalOpen}
					onOpenChange={setModalOpen}
					mode={modalMode}
					initialValues={editInitialValues}
					onSubmit={handleEditSubmit}
				/>
			</div>
		</section>
	);
}

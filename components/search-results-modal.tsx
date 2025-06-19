"use client";

import {useState, useEffect} from "react";
import {X, Search, ArrowLeft} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {FoodCard} from "./food-card";
import type {FoodItem} from "../types/food";

interface SearchResultsModalProps {
	isOpen: boolean;
	onClose: () => void;
	searchResults: FoodItem[];
	loading: boolean;
	error: string | null;
	onSearch: (query: string) => Promise<void>;
	initialQuery?: string;
}

export default function SearchResultsModal({isOpen, onClose, searchResults, loading, error, onSearch, initialQuery = ""}: SearchResultsModalProps) {
	const [searchQuery, setSearchQuery] = useState(initialQuery);
	const [isSearching, setIsSearching] = useState(false);

	useEffect(() => {
		setSearchQuery(initialQuery);
	}, [initialQuery]);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!searchQuery.trim()) return;

		setIsSearching(true);
		await onSearch(searchQuery);
		setIsSearching(false);
	};

	const handleCardClick = (item: FoodItem) => {
		console.log("Food item clicked:", item);
		// Handle navigation to food detail page
	};

	const handleEdit = (meal: FoodItem) => {
		console.log("Edit meal:", meal);
		// Handle edit functionality
	};

	const handleDelete = (meal: FoodItem) => {
		console.log("Delete meal:", meal);
		// Handle delete functionality
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm'>
			<div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
				<div className='bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden'>
					{/* Header */}
					<div className='flex items-center justify-between p-6 border-b border-gray-200'>
						<div className='flex items-center gap-4'>
							<button
								onClick={onClose}
								className='p-2 hover:bg-gray-100 rounded-full transition-colors'
							>
								<ArrowLeft className='h-5 w-5 text-gray-600' />
							</button>
							<div>
								<h2 className='text-2xl font-bold text-gray-900'>Search Results</h2>
								<p className='text-sm text-gray-600'>
									{searchResults.length > 0
										? `Found ${searchResults.length} meal${searchResults.length !== 1 ? "s" : ""}`
										: "Search for delicious meals"}
								</p>
							</div>
						</div>
						<button
							onClick={onClose}
							className='p-2 hover:bg-gray-100 rounded-full transition-colors'
						>
							<X className='h-5 w-5 text-gray-600' />
						</button>
					</div>

					{/* Search Bar */}
					<div className='p-6 border-b border-gray-200'>
						<form
							onSubmit={handleSearch}
							className='flex gap-3'
						>
							<div className='relative flex-1'>
								<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
								<Input
									type='text'
									placeholder='Search for meals...'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className='pl-10 pr-4 h-12 text-lg'
								/>
							</div>
							<Button
								type='submit'
								disabled={isSearching || !searchQuery.trim()}
								className='bg-orange-500 hover:bg-orange-600 text-white px-8 h-12 disabled:opacity-50 disabled:cursor-not-allowed'
							>
								{isSearching ? "Searching..." : "Search"}
							</Button>
						</form>
					</div>

					{/* Content */}
					<div className='flex-1 overflow-y-auto p-6'>
						{loading && (
							<div className='flex flex-col items-center justify-center h-full'>
								<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500'></div>
								<p className='text-gray-600 mt-4 text-lg'>Searching for meals...</p>
							</div>
						)}

						{error && (
							<div className='flex flex-col items-center justify-center h-full'>
								<div className='text-center max-w-md'>
									<p className='text-red-600 text-lg mb-4'>{error}</p>
									<Button
										onClick={() => onSearch(searchQuery)}
										className='bg-orange-500 hover:bg-orange-600 text-white'
									>
										Try Again
									</Button>
								</div>
							</div>
						)}

						{!loading && !error && searchResults.length === 0 && searchQuery && (
							<div className='flex flex-col items-center justify-center h-full'>
								<div className='text-center max-w-md'>
									<div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
										<Search className='h-8 w-8 text-gray-400' />
									</div>
									<h3 className='text-xl font-semibold text-gray-900 mb-2'>No meals found</h3>
									<p className='text-gray-600 mb-4'>We couldn't find any meals matching "{searchQuery}"</p>
									<p className='text-sm text-gray-500'>Try searching with different keywords or check your spelling</p>
								</div>
							</div>
						)}

						{!loading && !error && searchResults.length > 0 && (
							<div className='space-y-6'>
								<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
									{searchResults.map((meal) => (
										<div
											key={meal.id}
											className='transition-all duration-300 hover:scale-105'
										>
											<FoodCard
												item={meal}
												onCardClick={handleCardClick}
												onEdit={handleEdit}
												onDelete={handleDelete}
											/>
										</div>
									))}
								</div>
							</div>
						)}

						{!loading && !error && !searchQuery && (
							<div className='flex flex-col items-center justify-center h-full'>
								<div className='text-center max-w-md'>
									<div className='w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4'>
										<Search className='h-8 w-8 text-orange-500' />
									</div>
									<h3 className='text-xl font-semibold text-gray-900 mb-2'>Search for meals</h3>
									<p className='text-gray-600'>Enter a meal name above to discover delicious options</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

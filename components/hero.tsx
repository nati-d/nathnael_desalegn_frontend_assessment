"use client";

import type React from "react";

import {useState} from "react";
import {Search, Bike, ShoppingBag, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useSearchFoods} from "@/lib/hooks/useSearchFoods";
import SearchResultsModal from "./search-results-modal";

export default function Hero() {
	const [searchQuery, setSearchQuery] = useState("");
	const [activeTab, setActiveTab] = useState("delivery");
	const [showModal, setShowModal] = useState(false);
	const {searchResults, loading, error, searchFoods} = useSearchFoods();

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!searchQuery.trim()) return;

		setShowModal(true);
		await searchFoods(searchQuery);
	};

	const handleModalSearch = async (query: string) => {
		await searchFoods(query);
	};

	const clearSearch = () => {
		setSearchQuery("");
	};

	return (
		<section className='relative bg-gradient-to-r from-primary to-primary/50 overflow-hidden'>
			<div className='container mx-auto px-4 py-16 md:py-24'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
					{/* Left Content */}
					<div className='text-white space-y-6'>
						<div className='space-y-2'>
							<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>Are you starving?</h1>
							<p className='text-sm md:text-base opacity-90 max-w-xl font-light'>Within a few clicks, find meals that are accessible near you</p>
						</div>

						{/* Search Form */}
						<div className='bg-white rounded-lg p-6 shadow-lg max-w-xl'>
							<Tabs
								value={activeTab}
								onValueChange={setActiveTab}
								className='w-full'
							>
								<TabsList className='grid w-full grid-cols-2 mb-4'>
									<TabsTrigger
										value='delivery'
										className='data-[state=active]:text-primary data-[state=active]:bg-white flex items-center gap-2'
									>
										<Bike className='h-4 w-4' />
										Delivery
									</TabsTrigger>
									<TabsTrigger
										value='pickup'
										className='data-[state=active]:text-primary data-[state=active]:bg-white flex items-center gap-2'
									>
										<ShoppingBag className='h-4 w-4' />
										Pickup
									</TabsTrigger>
								</TabsList>
							</Tabs>

							<form
								onSubmit={handleSearch}
								className='flex flex-col sm:flex-row gap-2'
							>
								<div className='relative flex-1'>
									<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
									<Input
										type='text'
										placeholder='What do you like to eat today...'
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className='pl-10 pr-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500 text-black'
									/>
									{searchQuery && (
										<button
											type='button'
											onClick={clearSearch}
											className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
										>
											<X className='h-4 w-4' />
										</button>
									)}
								</div>
								<Button
									type='submit'
									disabled={loading || !searchQuery.trim()}
									className='bg-orange-500 hover:bg-orange-600 text-white px-6 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed'
								>
									{loading ? "Searching..." : "Find Meal"}
								</Button>
							</form>
						</div>
					</div>

					{/* Right Content - Food Image */}
					<div className='flex justify-center lg:justify-end'>
						<div className='relative'>
							<div className='w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl'>
								<img
									src='https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
									alt='Delicious noodle bowl with vegetables'
									className='w-full h-full object-cover'
								/>
							</div>
							{/* Decorative elements */}
							<div className='absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full opacity-20'></div>
							<div className='absolute -bottom-6 -left-6 w-12 h-12 bg-white rounded-full opacity-10'></div>
							<div className='absolute top-1/4 -left-8 w-6 h-6 bg-white rounded-full opacity-15'></div>
						</div>
					</div>
				</div>
			</div>

			{/* Background decorative elements */}
			<div className='absolute top-10 right-10 w-20 h-20 bg-white rounded-full opacity-5'></div>
			<div className='absolute bottom-20 left-10 w-16 h-16 bg-white rounded-full opacity-5'></div>
			<div className='absolute top-1/2 left-1/4 w-4 h-4 bg-white rounded-full opacity-10'></div>

			{/* Search Results Modal */}
			<SearchResultsModal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				searchResults={searchResults}
				loading={loading}
				error={error}
				onSearch={handleModalSearch}
				initialQuery={searchQuery}
			/>
		</section>
	);
}

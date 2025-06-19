"use client";

import {useState, useEffect} from "react";
import {X, Search, ArrowLeft} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {FoodCard} from "./food-card";
import type {FoodItem} from "../types/food";
import {motion, AnimatePresence} from "framer-motion";
import {Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription} from "@/components/ui/dialog";

interface SearchResultsModalProps {
	isOpen: boolean;
	onClose: () => void;
	searchResults: FoodItem[];
	loading: boolean;
	error: string | null;
	onSearch: (query: string) => Promise<void>;
	initialQuery?: string;
}

const overlayVariants = {
	hidden: {opacity: 0, backdropFilter: "blur(0px)"},
	visible: {opacity: 1, backdropFilter: "blur(8px)"},
	exit: {opacity: 0, backdropFilter: "blur(0px)"},
};

const modalVariants = {
	hidden: {opacity: 0, y: 60, scale: 0.96},
	visible: {opacity: 1, y: 0, scale: 1, transition: {type: "spring", stiffness: 300, damping: 30}},
	exit: {opacity: 0, y: 60, scale: 0.96, transition: {duration: 0.2}},
};

export default function SearchResultsModal({isOpen, onClose, searchResults, loading, error, onSearch, initialQuery = ""}: SearchResultsModalProps) {
	const [searchQuery, setSearchQuery] = useState(initialQuery);
	const [isSearching, setIsSearching] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [pendingDelete, setPendingDelete] = useState<FoodItem | null>(null);

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
		setPendingDelete(meal);
		setConfirmOpen(true);
	};

	const confirmDelete = () => {
		if (pendingDelete) {
			// Call the actual delete logic here (e.g., API call or callback)
			console.log("Confirmed delete:", pendingDelete);
			// TODO: Replace with actual delete logic, e.g. onDelete(pendingDelete)
		}
		setConfirmOpen(false);
		setPendingDelete(null);
	};

	const cancelDelete = () => {
		setConfirmOpen(false);
		setPendingDelete(null);
	};

	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						key='overlay'
						initial='hidden'
						animate='visible'
						exit='exit'
						variants={overlayVariants}
						transition={{duration: 0.35, ease: "easeInOut"}}
						className='fixed inset-0 z-50 bg-black/40 backdrop-blur-lg flex items-center justify-center'
						onClick={onClose}
						style={{WebkitBackdropFilter: "blur(8px)", backdropFilter: "blur(8px)"}}
					>
						<motion.div
							key='modal'
							initial='hidden'
							animate='visible'
							exit='exit'
							variants={modalVariants}
							className='relative w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden shadow-2xl rounded-3xl border border-white/20 bg-white/70 dark:bg-zinc-900/80 backdrop-blur-xl'
							onClick={(e) => e.stopPropagation()}
							style={{boxShadow: "0 8px 40px 0 rgba(0,0,0,0.18)"}}
						>
							{/* Header */}
							<div className='flex items-center justify-between p-6 border-b border-white/20 bg-white/60 dark:bg-zinc-900/70 backdrop-blur-xl'>
								<div className='flex items-center gap-4'>
									<motion.button
										whileHover={{scale: 1.08}}
										whileTap={{scale: 0.95}}
										onClick={onClose}
										className='p-2 hover:bg-orange-100 dark:hover:bg-zinc-800 rounded-full transition-colors'
									>
										<ArrowLeft className='h-5 w-5 text-gray-700 dark:text-gray-200' />
									</motion.button>
									<div>
										<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Search Results</h2>
										<p className='text-sm text-gray-600 dark:text-gray-300'>
											{searchResults.length > 0
												? `Found ${searchResults.length} meal${searchResults.length !== 1 ? "s" : ""}`
												: "Search for delicious meals"}
										</p>
									</div>
								</div>
								<motion.button
									whileHover={{scale: 1.08}}
									whileTap={{scale: 0.95}}
									onClick={onClose}
									className='p-2 hover:bg-orange-100 dark:hover:bg-zinc-800 rounded-full transition-colors'
								>
									<X className='h-5 w-5 text-gray-700 dark:text-gray-200' />
								</motion.button>
							</div>

							{/* Search Bar */}
							<div className='p-6 border-b border-white/20 bg-white/60 dark:bg-zinc-900/70 backdrop-blur-xl'>
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
											className='pl-10 pr-4 h-12 text-lg bg-white/80 dark:bg-zinc-900/80 border border-white/30 dark:border-zinc-800 rounded-xl shadow-sm focus:ring-orange-500 focus:border-orange-500'
										/>
									</div>
									<motion.div
										whileHover={{scale: 1.04}}
										whileTap={{scale: 0.98}}
									>
										<Button
											type='submit'
											disabled={isSearching || !searchQuery.trim()}
											className='bg-orange-500 hover:bg-orange-600 text-white px-8 h-12 rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed'
										>
											{isSearching ? "Searching..." : "Search"}
										</Button>
									</motion.div>
								</form>
							</div>

							{/* Content */}
							<div className='flex-1 overflow-y-auto p-6 bg-white/70 dark:bg-zinc-900/80'>
								{loading && (
									<div className='flex flex-col items-center justify-center h-full'>
										<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500'></div>
										<p className='text-gray-600 dark:text-gray-300 mt-4 text-lg'>Searching for meals...</p>
									</div>
								)}

								{error && (
									<div className='flex flex-col items-center justify-center h-full'>
										<div className='text-center max-w-md'>
											<p className='text-red-600 text-lg mb-4'>{error}</p>
											<motion.div
												whileHover={{scale: 1.05}}
												whileTap={{scale: 0.95}}
											>
												<Button
													onClick={() => onSearch(searchQuery)}
													className='bg-orange-500 hover:bg-orange-600 text-white'
												>
													Try Again
												</Button>
											</motion.div>
										</div>
									</div>
								)}

								{!loading && !error && searchResults.length === 0 && searchQuery && (
									<div className='flex flex-col items-center justify-center h-full'>
										<div className='text-center max-w-md'>
											<div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
												<Search className='h-8 w-8 text-gray-400' />
											</div>
											<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>No meals found</h3>
											<p className='text-gray-600 dark:text-gray-300 mb-4'>We couldn't find any meals matching "{searchQuery}"</p>
											<p className='text-sm text-gray-500'>Try searching with different keywords or check your spelling</p>
										</div>
									</div>
								)}

								{!loading && !error && searchResults.length > 0 && (
									<div className='space-y-6'>
										<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
											{searchResults.map((meal, index) => (
												<motion.div
													key={meal.id}
													initial={{opacity: 0, y: 20, scale: 0.9}}
													animate={{opacity: 1, y: 0, scale: 1}}
													transition={{
														duration: 0.4,
														delay: 0.1 + index * 0.07,
														ease: [0.25, 0.46, 0.45, 0.94],
													}}
													whileHover={{scale: 1.04, y: -4}}
													className='transition-all duration-300'
												>
													<FoodCard
														item={meal}
														onCardClick={handleCardClick}
														onEdit={handleEdit}
														onDelete={handleDelete}
													/>
												</motion.div>
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
											<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>Search for meals</h3>
											<p className='text-gray-600 dark:text-gray-300'>Enter a meal name above to discover delicious options</p>
										</div>
									</div>
								)}
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Delete Confirmation Dialog */}
			<Dialog
				open={confirmOpen}
				onOpenChange={setConfirmOpen}
			>
				<DialogContent className='max-w-sm rounded-2xl p-6'>
					<DialogHeader>
						<DialogTitle>Delete Meal?</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete <span className='font-semibold text-orange-600'>{pendingDelete?.name}</span>? This action cannot be
							undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className='flex gap-2 justify-end mt-4'>
						<button
							onClick={cancelDelete}
							className='px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium'
						>
							Cancel
						</button>
						<button
							onClick={confirmDelete}
							className='px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow'
						>
							Yes, Delete
						</button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}

"use client";

import {Star, MoreVertical} from "lucide-react";
import {CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from "@/components/ui/dropdown-menu";
import type {FoodItem} from "../types/food";
import {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription} from "@/components/ui/dialog";

interface FoodCardProps {
	item: FoodItem;
	onCardClick?: (item: FoodItem) => void;
	onEdit?: (item: FoodItem) => void;
	onDelete?: (item: FoodItem) => void;
}

export function FoodCard({item, onCardClick, onEdit, onDelete}: FoodCardProps) {
	const [confirmOpen, setConfirmOpen] = useState(false);

	const handleClick = () => {
		onCardClick?.(item);
	};

	const handleDeleteClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setConfirmOpen(true);
	};

	const confirmDelete = () => {
		if (onDelete) onDelete(item);
		setConfirmOpen(false);
	};

	const cancelDelete = () => {
		setConfirmOpen(false);
	};

	console.log(item);

	return (
		<>
			<div
				className='group cursor-pointer transition-all duration-300  hover:-translate-y-1 overflow-hidden rounded-lg overflow-hidden'
				onClick={handleClick}
			>
				<div className='p-0 rounded-lg overflow-hidden'>
					<div className='relative rounded-lg overflow-hidden'>
						{/* Food Image */}
						<div className='aspect-[4/3] overflow-hidden'>
							<img
								src={item.image || "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&w=600&h=400&fit=crop"}
								alt={item.name}
								className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
							/>
						</div>

						{/* Price Badge */}
						<div className='absolute left-3 top-3'>
							<Badge className='bg-primary hover:bg-primary/80 text-white font-semibold px-2 py-1 text-sm'>${item.price.toFixed(2)}</Badge>
						</div>
					</div>

					{/* Card Content */}
					<div className='py-4 space-y-3'>
						{/* Restaurant Logo and Menu Button */}
						<div className='flex items-center justify-between'>
							<div className='flex items-center space-x-3'>
								<div className='h-8 w-8 rounded-md overflow-hidden bg-blue-600 flex items-center justify-center'>
									<img
										src={item.restaurant.logo || "/placeholder.svg?height=240&width=320"}
										alt={item.restaurant.name}
										className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
									/>
								</div>
								<div className='flex-1 flex-col space-y-1'>
									<h3 className='font-semibold text-gray-900 text-sm'>{item.name}</h3>
									{/* Rating */}
									<div className='flex items-center space-x-1'>
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={`h-3 w-3 ${
													i < Math.floor(item.restaurant.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
												}`}
											/>
										))}
									</div>
								</div>
							</div>
							{/* Dropdown menu for edit/delete */}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<button
										className='text-gray-400 hover:text-gray-600 p-1'
										onClick={(e) => e.stopPropagation()}
									>
										<MoreVertical className='h-4 w-4' />
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end'>
									<DropdownMenuItem
										onClick={(e) => {
											e.stopPropagation();
											onEdit?.(item);
										}}
									>
										Edit
									</DropdownMenuItem>
									<DropdownMenuItem onClick={handleDeleteClick}>Delete</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						{/* Status */}
						<div>
							<Badge
								variant='secondary'
								className={`text-xs font-bold px-4  ${item.restaurant.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
							>
								{item.restaurant.isOpen ? "Open" : "Closed"}
							</Badge>
						</div>
					</div>
				</div>
			</div>

			{/* Delete Confirmation Dialog */}
			<Dialog
				open={confirmOpen}
				onOpenChange={setConfirmOpen}
			>
				<DialogContent className='max-w-sm rounded-2xl p-6'>
					<DialogHeader>
						<DialogTitle>Delete Meal?</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete <span className='font-semibold text-orange-600'>{item.name}</span>? This action cannot be undone.
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

"use client";

import {useFeaturedRestaurants} from "@/lib/hooks/useFeaturedRestaurants";
import {Star, Clock, MapPin} from "lucide-react";
import Image from "next/image";

export default function FeaturedRestaurants() {
	const {restaurants, loading, error, refetch} = useFeaturedRestaurants(6);

	if (loading) {
		return (
			<section className='py-16 bg-background'>
				<div className='container'>
					<h2 className='text-3xl font-bold text-center mb-12'>Featured Restaurants</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{[...Array(6)].map((_, index) => (
							<div
								key={index}
								className='bg-card rounded-lg p-4 animate-pulse'
							>
								<div className='bg-muted h-48 rounded-lg mb-4'></div>
								<div className='space-y-2'>
									<div className='bg-muted h-4 rounded w-3/4'></div>
									<div className='bg-muted h-4 rounded w-1/2'></div>
									<div className='bg-muted h-4 rounded w-1/4'></div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className='py-16 bg-background'>
				<div className='container'>
					<div className='text-center'>
						<h2 className='text-3xl font-bold mb-4'>Featured Restaurants</h2>
						<p className='text-muted-foreground mb-4'>Failed to load featured restaurants</p>
						<button
							onClick={refetch}
							className='bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90'
						>
							Try Again
						</button>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className='py-16 bg-background'>
			<div className='container'>
				<h2 className='text-3xl font-bold text-center mb-12'>Featured Restaurants</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{restaurants.map((restaurant) => (
						<div
							key={restaurant.id}
							className='bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow'
						>
							<div className='relative h-48'>
								<Image
									src={restaurant.logo}
									alt={restaurant.name}
									fill
									className='object-cover'
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								/>
								<div className='absolute top-2 right-2'>
									<div
										className={`px-2 py-1 rounded-full text-xs font-medium ${
											restaurant.isOpen ? "bg-green-500 text-white" : "bg-red-500 text-white"
										}`}
									>
										{restaurant.isOpen ? "Open" : "Closed"}
									</div>
								</div>
							</div>

							<div className='p-4'>
								<div className='flex items-center justify-between mb-2'>
									<h3 className='font-semibold text-lg truncate'>{restaurant.name}</h3>
									<div className='flex items-center gap-1'>
										<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
										<span className='text-sm font-medium'>{restaurant.rating}</span>
									</div>
								</div>

								<div className='flex items-center justify-between mb-3'>
									<div className='flex items-center gap-1 text-muted-foreground'>
										<Clock className='h-4 w-4' />
										<span className='text-sm'>20-30 min</span>
									</div>
									<div className='flex items-center gap-1 text-muted-foreground'>
										<MapPin className='h-4 w-4' />
										<span className='text-sm'>2.5 km</span>
									</div>
								</div>

								<div className='flex items-center justify-between'>
									<span className='text-sm text-muted-foreground'>Free delivery</span>
									<button className='bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors'>
										View Menu
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

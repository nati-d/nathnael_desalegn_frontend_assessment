"use client";

import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
	return (
		<header className='w-full border-b bg-background'>
			<div className='container flex h-16 items-center justify-between'>
				{/* Logo */}
				<Link
					href='/'
					className='flex items-center space-x-2'
				>
					<Image
						src='/images/Logo.png'
						alt='FoodWagon'
						width={150}
						height={60}
						className='object-contain'
					/>
				</Link>

				{/* CTA Button */}
				<Button className='bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full text-white'>Add Meal</Button>
			</div>
		</header>
	);
}

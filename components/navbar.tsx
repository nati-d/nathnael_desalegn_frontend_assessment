"use client";

import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import AddOrEditMealModal from "./add-meal-modal";

export default function Navbar() {
	const [open, setOpen] = useState(false);
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
				<Button
					className='bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full text-white'
					onClick={() => setOpen(true)}
				>
					Add Meal
				</Button>
				<AddOrEditMealModal
					open={open}
					onOpenChange={setOpen}
					mode='add'
					onSubmit={async (values) => {
						await fetch("https://6852821e0594059b23cdd834.mockapi.io/Food", {
							method: "POST",
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
						setOpen(false);
					}}
				/>
			</div>
		</header>
	);
}

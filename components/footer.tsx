"use client";

import type React from "react";

import {useState} from "react";
import {Facebook, Instagram, Twitter, Heart, Mail, Phone, MapPin, Clock, Truck} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

interface FooterLink {
	label: string;
	href: string;
}

interface FooterSection {
	title: string;
	links: FooterLink[];
}

export default function Footer() {
	const [email, setEmail] = useState("");
	const [isSubscribing, setIsSubscribing] = useState(false);

	const footerSections: FooterSection[] = [
		{
			title: "FoodWagon",
			links: [
				{label: "About Us", href: "/about"},
				{label: "Our Story", href: "/story"},
				{label: "Careers", href: "/careers"},
				{label: "Press & Media", href: "/press"},
				{label: "Blog", href: "/blog"},
			],
		},
		{
			title: "Services",
			links: [
				{label: "Food Delivery", href: "/delivery"},
				{label: "Restaurant Partners", href: "/partners"},
				{label: "Corporate Catering", href: "/catering"},
				{label: "Gift Cards", href: "/gift-cards"},
				{label: "FoodWagon Pro", href: "/pro"},
			],
		},
		{
			title: "Support",
			links: [
				{label: "Help Center", href: "/help"},
				{label: "Contact Us", href: "/contact"},
				{label: "Track Order", href: "/track"},
				{label: "Refund Policy", href: "/refund"},
				{label: "Safety Standards", href: "/safety"},
			],
		},
		{
			title: "Legal",
			links: [
				{label: "Terms of Service", href: "/terms"},
				{label: "Privacy Policy", href: "/privacy"},
				{label: "Cookie Policy", href: "/cookies"},
				{label: "Accessibility", href: "/accessibility"},
				{label: "Community Guidelines", href: "/guidelines"},
			],
		},
	];

	const socialLinks = [
		{icon: Instagram, href: "https://instagram.com/foodwagon", label: "Instagram"},
		{icon: Facebook, href: "https://facebook.com/foodwagon", label: "Facebook"},
		{icon: Twitter, href: "https://twitter.com/foodwagon", label: "Twitter"},
	];

	const contactInfo = [
		{icon: Phone, label: "+1 (555) 123-4567", href: "tel:+15551234567"},
		{icon: Mail, label: "hello@foodwagon.com", href: "mailto:hello@foodwagon.com"},
		{icon: MapPin, label: "123 Food Street, Cuisine City, CC 12345", href: "#"},
		{icon: Clock, label: "24/7 Delivery Available", href: "#"},
	];

	const handleSubscribe = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) return;

		setIsSubscribing(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));
		console.log("Subscribing email:", email);
		setEmail("");
		setIsSubscribing(false);
	};

	return (
		<footer className='bg-gray-900 text-white'>
			<div className='container mx-auto px-4 py-12'>
				{/* Main Footer Content */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>
					{/* Company Info */}
					<div className='lg:col-span-2 space-y-6'>
						<div>
							<h2 className='text-2xl font-bold text-white mb-2'>
								<span className='text-orange-500'>Food</span>Wagon
							</h2>
							<p className='text-gray-300 text-sm leading-relaxed'>
								Delivering delicious meals to your doorstep with speed, quality, and care. From local favorites to international cuisine, we
								bring the world's flavors to you.
							</p>
						</div>

						{/* Contact Information */}
						<div className='space-y-3'>
							{contactInfo.map((contact) => {
								const IconComponent = contact.icon;
								return (
									<div
										key={contact.label}
										className='flex items-center space-x-3'
									>
										<IconComponent className='w-4 h-4 text-orange-500 flex-shrink-0' />
										<a
											href={contact.href}
											className='text-gray-300 hover:text-white transition-colors duration-200 text-sm'
										>
											{contact.label}
										</a>
									</div>
								);
							})}
						</div>

						{/* Newsletter Subscription */}
						<div className='space-y-3'>
							<h4 className='text-white font-semibold'>Stay Updated</h4>
							<p className='text-gray-300 text-sm'>Get exclusive offers and food updates delivered to your inbox</p>
							<form
								onSubmit={handleSubscribe}
								className='space-y-3'
							>
								<div className='relative'>
									<Input
										type='email'
										placeholder='Enter your email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className='bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500 pr-24'
										required
									/>
									<Button
										type='submit'
										disabled={isSubscribing || !email}
										className='absolute right-1 top-1 bottom-1 bg-orange-500 hover:bg-orange-600 text-white px-4 text-sm font-medium'
									>
										{isSubscribing ? "..." : "Subscribe"}
									</Button>
								</div>
							</form>
						</div>
					</div>

					{/* Footer Sections */}
					{footerSections.map((section) => (
						<div
							key={section.title}
							className='space-y-4'
						>
							<h3 className='text-lg font-semibold text-white'>{section.title}</h3>
							<ul className='space-y-3'>
								{section.links.map((link) => (
									<li key={link.label}>
										<a
											href={link.href}
											className='text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm'
										>
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Social Media & Bottom Section */}
				<div className='border-t border-gray-800 mt-12 pt-8'>
					<div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
						{/* Social Media */}
						<div className='flex items-center space-x-4'>
							<span className='text-gray-400 text-sm'>Follow us:</span>
							{socialLinks.map((social) => {
								const IconComponent = social.icon;
								return (
									<a
										key={social.label}
										href={social.href}
										target='_blank'
										rel='noopener noreferrer'
										className='w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-200'
										aria-label={social.label}
									>
										<IconComponent className='w-4 h-4' />
									</a>
								);
							})}
						</div>

						{/* Copyright */}
						<div className='flex items-center text-gray-400 text-sm'>
							<span>© 2024 FoodWagon. All rights reserved.</span>
						</div>

						{/* Made with Love */}
						<div className='flex items-center text-gray-400 text-sm'>
							<span>Made with</span>
							<Heart className='w-4 h-4 mx-1 text-red-500 fill-current' />
							<span>for food lovers</span>
						</div>
					</div>
				</div>

				{/* Delivery Info */}
				<div className='border-t border-gray-800 mt-6 pt-6'>
					<div className='flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 text-center'>
						<div className='flex items-center space-x-2'>
							<Truck className='w-5 h-5 text-orange-500' />
							<span className='text-gray-300 text-sm'>Fast Delivery</span>
						</div>
						<div className='flex items-center space-x-2'>
							<Clock className='w-5 h-5 text-orange-500' />
							<span className='text-gray-300 text-sm'>24/7 Service</span>
						</div>
						<div className='flex items-center space-x-2'>
							<Heart className='w-5 h-5 text-orange-500' />
							<span className='text-gray-300 text-sm'>Fresh & Quality</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

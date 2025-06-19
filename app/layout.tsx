import type {Metadata} from "next";
import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
	title: "FoodWagon - Delicious Food Delivered",
	description: "Get your favorite food delivered fresh and fast with FoodWagon",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`antialiased`}>
				<Navbar />
				<main>{children}</main>
			</body>
		</html>
	);
}

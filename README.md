# 🍕 FoodWagon - Modern Food Delivery Web App

A beautiful, responsive food delivery web application built with Next.js 15, React 19, TypeScript, and Tailwind CSS. Features a modern UI with smooth
animations, real-time search, and full CRUD operations for food management.

![FoodWagon Preview](https://via.placeholder.com/800x400/ff7518/ffffff?text=FoodWagon+Preview)

## ✨ Features

### 🎯 Core Features

-   **Hero Section with Search**: Interactive search functionality with real-time API integration
-   **Featured Meals Grid**: Display food items with pagination and smooth loading animations
-   **Restaurant Management**: View restaurant information with status indicators
-   **Full CRUD Operations**: Add, edit, delete, and view food items
-   **Responsive Design**: Mobile-first approach with beautiful UI across all devices

### 🔍 Search & Discovery

-   **Real-time Search**: Search meals using MockAPI with instant results
-   **Full-page Search Modal**: Beautiful modal with smooth animations for search results
-   **Advanced Filtering**: Search by meal names with intelligent fallbacks
-   **Search History**: Maintains search state and results

### 🎨 UI/UX Features

-   **Modern Design System**: Custom color palette with orange primary theme
-   **Smooth Animations**: Framer Motion powered animations throughout the app
-   **Glassmorphism Effects**: Modern glass-like UI elements
-   **Dark Mode Ready**: CSS variables configured for dark mode support
-   **Loading States**: Skeleton loaders and smooth loading transitions
-   **Confirmation Dialogs**: Custom styled confirmation dialogs for destructive actions

### 🛠 Technical Features

-   **TypeScript**: Full type safety across the application
-   **API Integration**: Axios-based API layer with interceptors and error handling
-   **Custom Hooks**: Reusable hooks for data fetching and state management
-   **Component Library**: shadcn/ui components with custom styling
-   **Performance Optimized**: Next.js 15 with Turbopack for fast development

## 🏗 Architecture

### Project Structure

```
food-wagen/
├── app/                    # Next.js 15 App Router
│   ├── layout.tsx         # Root layout with Navbar & Footer
│   ├── page.tsx           # Home page with Hero & Featured Meals
│   └── globals.css        # Global styles and design tokens
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── hero.tsx          # Hero section with search
│   ├── food-card.tsx     # Individual food item card
│   ├── featured-meals.tsx # Featured meals grid
│   ├── search-results-modal.tsx # Full-page search modal
│   ├── add-meal-modal.tsx # Add/edit meal modal
│   ├── navbar.tsx        # Navigation bar
│   └── footer.tsx        # Footer component
├── lib/                  # Utility libraries
│   ├── api/             # API configuration and helpers
│   ├── hooks/           # Custom React hooks
│   └── utils.ts         # Utility functions
├── types/               # TypeScript type definitions
└── public/              # Static assets
```

### Key Technologies

| Technology        | Version | Purpose                         |
| ----------------- | ------- | ------------------------------- |
| **Next.js**       | 15.3.4  | React framework with App Router |
| **React**         | 19.0.0  | UI library                      |
| **TypeScript**    | 5.x     | Type safety                     |
| **Tailwind CSS**  | 4.x     | Utility-first CSS framework     |
| **shadcn/ui**     | Latest  | Component library               |
| **Framer Motion** | 12.18.1 | Animation library               |
| **Axios**         | 1.10.0  | HTTP client                     |
| **Zod**           | 3.25.67 | Schema validation               |
| **Lucide React**  | 0.518.0 | Icon library                    |

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn
-   Git

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/food-wagen.git
    cd food-wagen
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    ```bash
    # Create .env.local file
    NEXT_PUBLIC_API_URL=https://6852821e0594059b23cdd834.mockapi.io
    ```

4. **Run the development server**

    ```bash
    npm run dev
    ```

5. **Open your browser** Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📱 Usage

### Search for Meals

1. Use the search bar in the hero section
2. Type a meal name (e.g., "pizza", "burger")
3. Click "Find Meal" or press Enter
4. View results in the full-page modal
5. Click on any meal card for details

### Manage Food Items

1. **Add New Meal**: Click "Add Meal" in the navbar
2. **Edit Meal**: Click the three-dots menu on any food card → Edit
3. **Delete Meal**: Click the three-dots menu → Delete → Confirm in dialog

### Load More Meals

-   Scroll to the bottom of the featured meals section
-   Click "Load More" to see additional meals
-   Smooth loading animation with skeleton states

## 🎨 Design System

### Color Palette

-   **Primary**: `#ff7518` (Orange)
-   **Background**: `#faf9f6` (Light cream)
-   **Text**: `oklch(0.145 0 0)` (Dark gray)
-   **Accent**: Various shades of gray and white

### Typography

-   **Font Family**: Lato (Google Fonts)
-   **Weights**: 100, 300, 400, 700, 900
-   **Responsive**: Scales appropriately across devices

### Components

-   **Cards**: Rounded corners with hover effects
-   **Buttons**: Pill-shaped with orange theme
-   **Modals**: Glassmorphism with backdrop blur
-   **Forms**: Clean inputs with focus states

## 🔌 API Integration

### MockAPI Endpoint

-   **Base URL**: `https://6852821e0594059b23cdd834.mockapi.io`
-   **Food Endpoint**: `/Food`
-   **Search**: `/Food?name=[searchParam]`

### API Features

-   **Automatic Error Handling**: Interceptors for common HTTP errors
-   **Request/Response Logging**: Development mode logging
-   **Authentication Ready**: Token-based auth support
-   **Type Safety**: Full TypeScript integration

### Data Structure

```typescript
interface FoodItem {
	id: string;
	name: string;
	price: number;
	image: string;
	restaurant: {
		id: string;
		name: string;
		logo: string;
		rating: number;
		isOpen: boolean;
	};
	category: string;
}
```

## 🧩 Custom Hooks

### `useFeaturedFoods`

-   Fetches featured food items from API
-   Handles loading and error states
-   Supports pagination with limit parameter
-   Automatic data mapping and filtering

### `useSearchFoods`

-   Real-time search functionality
-   Debounced API calls
-   Error handling and retry logic
-   Type-safe search results

### `useFeaturedRestaurants`

-   Fetches restaurant data
-   Handles restaurant-specific operations
-   Consistent error handling

## 🎭 Animations

### Framer Motion Integration

-   **Modal Animations**: Smooth open/close with spring physics
-   **Card Hover Effects**: Scale and translate animations
-   **Loading States**: Staggered animations for lists
-   **Page Transitions**: Smooth navigation between states

### Animation Features

-   **Spring Physics**: Natural feeling animations
-   **Staggered Effects**: Sequential animations for lists
-   **Hover Interactions**: Micro-interactions for better UX
-   **Loading Skeletons**: Smooth loading states

## 🔧 Configuration

### Tailwind CSS

-   Custom color palette
-   Responsive breakpoints
-   Custom container classes
-   Dark mode support

### shadcn/ui

-   New York style variant
-   Custom component styling
-   Icon library integration
-   TypeScript support

### Next.js

-   App Router configuration
-   Turbopack for development
-   TypeScript strict mode
-   ESLint configuration

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

-   **Netlify**: Compatible with Next.js static export
-   **Railway**: Full-stack deployment support
-   **Docker**: Containerized deployment available

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

-   Follow TypeScript best practices
-   Use conventional commit messages
-   Maintain component reusability
-   Add proper error handling
-   Write meaningful comments

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

-   **shadcn/ui** for the beautiful component library
-   **Framer Motion** for smooth animations
-   **MockAPI** for the backend API
-   **Lucide** for the icon library
-   **Tailwind CSS** for the utility-first styling

## 📞 Support

For support, email support@foodwagon.com or create an issue in the GitHub repository.

---

**Built with ❤️ using Next.js, React, and TypeScript**

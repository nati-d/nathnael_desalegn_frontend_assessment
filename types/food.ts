export interface Restaurant {
    id: string
    name: string
    logo: string
    rating: number
    isOpen: boolean
  }
  
  export interface FoodItem {
    id: string
    name: string
    price: number
    image: string
    restaurant: Restaurant
    category: string
  }
  
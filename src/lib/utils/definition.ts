import { User } from 'firebase/auth';

export interface UserData {
    uid: string;
    email: string;
    username?: string;
    role: 'Admin' | 'Sales' | 'Manager';
    [key: string]: any; 
  }

  export interface UserContextType {
    user: User | null;
    userData: UserData | null;
    loading: boolean;
  }
  


export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  quantity: number;
  dateCreated: string;
  location: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  image: string; // URL for the product image
}

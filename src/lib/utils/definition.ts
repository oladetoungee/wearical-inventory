import { User } from 'firebase/auth';

export interface UserData {
    uid: string;
    email: string;
    fullName?: string;
    phone?: string;
    role: 'Admin' |  "Sub Admin" |   "Sales Personnel" | "Store Manager";
 createdAt?: string;
 createdBy?: string;
 avatarUrl?: string

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

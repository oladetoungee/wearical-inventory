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
  image: string;
}
export const ROLE_COLORS: Record<string, string> = {
  'Admin': 'bg-red-100 text-red-700',
  'Sub Admin': 'bg-blue-100 text-blue-700',
  'Sales Personnel': 'bg-green-100 text-green-700',
  'Store Manager': 'bg-yellow-100 text-yellow-700',
};

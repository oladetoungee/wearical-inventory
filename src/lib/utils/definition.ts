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
  'Store Manager': 'bg-amber-100 text-amber-700',
};


export interface InventoryData {
name: string;
description: string;
category: string;
quantity: number;
costPrice: number;
sellingPrice: number;
thresholdValue: number;
dateCreated: string;
dateUpdated: string;
createdBy: string;
outOfStockEmail: string;
lowStockEmail: string;
emailFrequency: string;
location: 'Online' | 'Store';
status: "In Stock" | "Low Stock" | "Out of Stock";
productImageUrl?: string;
}

export const STATUS_COLORS: Record<string, string> = {
  'In Stock': 'bg-green-100 text-green-700',
  'Low Stock': 'bg-amber-100 text-amber-700',
  'Out of Stock': 'bg-red-100 text-red-700',
};
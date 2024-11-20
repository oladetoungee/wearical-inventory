// data.ts
import { Product } from "@/lib/utils";

export const products: Product[] = [
  {
    id: 1,
    name: "Proddfguct 1",
    description: "This is a brief description of Product 1.",
    category: "Electronics",
    quantity: 10,
    dateCreated: "2024-01-10",
    location: "Warehouse A",
    status: "Low Stock",
    image: "/images/product1.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is a brief description of Product 2.",
    category: "Furniture",
    quantity: 5,
    dateCreated: "2024-02-15",
    location: "Warehouse B",
    status: "Out of Stock",
    image: "/images/product2.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    description: "This is a brief description of Product 3.",
    category: "Clothing",
    quantity: 15,
    dateCreated: "2024-03-20",
    location: "Warehouse C",
    status: "In Stock",
    image: "/images/product3.jpg",
  }
  // Add more products as needed
];

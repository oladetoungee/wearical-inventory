
'use client';
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Input,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { toast } from 'react-toastify';
import { addSales } from '@/lib/services/sales';
import { SalesData, SalesProduct } from '@/lib/utils'; 
import { useInventory } from '@/lib/hooks';
import { useUser } from "@/lib/hooks";
import { ca } from "date-fns/locale";

export const AddSaleModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SalesData>({
    defaultValues: {
      product: {
        id: "",
        name: "",
        category: "",
        costPrice: 0,
        sellingPrice: 0,
        thresholdValue: 0,
      },
      quantity: 1,
      totalCost: 0,
      totalSellingPrice: 0,
      totalProfit: 0,
      location: "Online",
    },
  });

  const [loading, setLoading] = useState(false);
  const { inventory } = useInventory(); // Use hook to fetch inventory list
  const { userData } = useUser();
  const [selectedProduct, setSelectedProduct] = useState<SalesProduct | null>(null); 

  const [quantity, setQuantity] = useState<number>(1);
  const [saleDate, setSaleDate] = useState<string>("");
  const totalSellingPrice = selectedProduct ? selectedProduct.sellingPrice * quantity : 0;

  // Reshape the inventory data to match SalesProduct type
  const products = inventory.map((item) => ({
    id: item.id,
    name: item.name,
    costPrice: item.costPrice,
    sellingPrice: item.sellingPrice,
    thresholdValue: item.thresholdValue,
    category: item.category,
  }));

  useEffect(() => {
    if (selectedProduct) {
      setValue("totalCost", selectedProduct.costPrice * quantity);
      setValue("totalSellingPrice", totalSellingPrice);
      setValue("totalProfit", (selectedProduct.sellingPrice - selectedProduct.costPrice) * quantity);
    }
  }, [selectedProduct, quantity, setValue]);

  const onSubmit = async (data: SalesData) => {
    setLoading(true);
    try {
      if (userData && selectedProduct) {
        const saleData = {
          ...data,
          dateCreated: saleDate,
          createdBy: {
            uid: userData.uid,
            email: userData.email,
            fullName: userData.fullName,
            avatarUrl: userData?.avatarUrl,
          },
          product: selectedProduct,
          quantity: quantity,
          deletedBy: null,
          dateDeleted: '',
        };
  
        // Add Sale to Database
        await addSales(saleData);
  
        reset();
        setQuantity(1);
        setSelectedProduct(null);
        onOpenChange(false);
        toast.success(`Sale recorded successfully.`);
      } else {
        toast.error('User data or product data is missing.');
      }
    } catch (error: any) {
      console.error('Error adding sale:', error);
  
      // Display appropriate error message
      if (error.message.includes('Insufficient stock')) {
        toast.error(error.message); // Use the descriptive error from `addSales`
      } else {
        toast.error('Failed to record sale. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record New Sale</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="product">Product</label>
              <Controller
                name="product"
                control={control}
                rules={{ required: "Product is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      const product = products.find(item => item.id === value) || null;
                      if (product) {
                        setSelectedProduct(product);
                        setValue("product", product);
                      } else {
                        setSelectedProduct(null);
                      }
                    }}
                    value={field.value?.id || ""} 
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id || ""}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.product && <p className="text-sm text-red-500">{errors.product.message}</p>}
            </div>

            <div>
              <label htmlFor="quantity">Quantity</label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                placeholder="Enter quantity"
              />
              {errors.quantity && <p className="text-sm text-red-500">{errors.quantity.message}</p>}
            </div>
            <div>
              <label htmlFor="totalSellingPrice">Total Price</label>
              <Input
                id="totalSellingPrice"
                value={totalSellingPrice}
                readOnly
                placeholder="Auto calculated"
              />
            </div>

            <div>
              <label htmlFor="saleDate">Sale Date</label>
              <Input
                id="saleDate"
                type="date"
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="location">Location</label>
              <Controller
                name="location"
                control={control}
                rules={{ required: "Location is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Online">Online</SelectItem>
                      <SelectItem value="Store">Store</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-white" disabled={loading}>
              {loading ? "Recording..." : "Record Sale"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

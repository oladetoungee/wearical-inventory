'use client';

import React, { useState } from "react";
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
import { addInventory } from '@/lib/services/inventory';
import { InventoryData } from '@/lib/utils';

export const AddInventoryModal = ({
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
    reset,
    formState: { errors },
  } = useForm<InventoryData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: InventoryData) => {
    setLoading(true);
    try {
      const result = await addInventory(data);
      reset();
      onOpenChange(false);
      toast.success(`Inventory item added successfully.`);
    } catch (error) {
      console.error('Error adding inventory:', error);
      toast.error('Failed to add inventory. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Inventory</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Item Name
            </label>
            <Input
              id="name"
              placeholder="Enter item name"
              {...register("name", { required: "Item name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <Input
              id="description"
              placeholder="Enter item description"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium">
              Category
            </label>
            <Input
              id="category"
              placeholder="Enter item category"
              {...register("category", { required: "Category is required" })}
            />
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="quantity" className="block text-sm font-medium">
              Quantity
            </label>
            <Input
              id="quantity"
              type="number"
              placeholder="Enter item quantity"
              {...register("quantity", { required: "Quantity is required", valueAsNumber: true })}
            />
            {errors.quantity && (
              <p className="text-sm text-red-500">{errors.quantity.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="price" className="block text-sm font-medium">
              Price
            </label>
            <Input
              id="price"
              type="number"
              placeholder="Enter item price"
              {...register("price", { required: "Price is required", valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm font-medium">
              Location
            </label>
            <Controller
              name="location"
              control={control}
              rules={{ required: "Location is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
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
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="image" className="block text-sm font-medium">
              Product Image
            </label>
            <Input
              id="image"
              type="file"
              {...register("productImageUrl")}
            />
            {errors.productImageUrl && (
              <p className="text-sm text-red-500">{errors.productImageUrl.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-white" disabled={loading}>
              {loading ? "Adding..." : "Add Inventory"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

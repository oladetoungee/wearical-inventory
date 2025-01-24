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
import { useCategory } from '@/lib/hooks';
import { Camera } from 'lucide-react';
import { Checkbox } from "@/components/ui";
import { handleFileChange } from "@/lib/utils/helpers";
import { useUser } from "@/lib/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";

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

  const { categories } = useCategory();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { userData } = useUser();

  const onSubmit = async (data: InventoryData) => {
    try {
      if (userData) {
        await addInventory(data, imageFile, userData);
        toast.success(`Inventory item added successfully.`);
      } else {
        toast.error('User data is missing. Please try again.');
      }
      reset();
      setImageFile(null);
      setImagePreview(null);
      onOpenChange(false);
    } catch (error) {
      console.error('Error adding inventory:', error);
      toast.error('Failed to add inventory. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Add New Inventory</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-6">
              {/* Product Image */}
              <div className="space-y-2">
                <label htmlFor="image" className="block">Product Image</label>
                <div className="relative cursor-pointer">
                  <Avatar className="w-full sm:w-48 h-48">
                    {imagePreview ? (
                      <AvatarImage src={imagePreview} alt="Product Image" />
                    ) : (
                      <AvatarFallback>Image</AvatarFallback>
                    )}
                  </Avatar>
                  <label
                    htmlFor="image"
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black100 text-white p-2 rounded-full cursor-pointer"
                  >
                    <Camera size={20} />
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setImagePreview, setImageFile)}
                    />
                  </label>
                </div>
              </div>

              {/* Email Notification Options */}
              <div className="space-y-4 mt-4">
                <p className="font-bold">Email Notifications</p>
                <div className="flex justify-between space-x-4">
                  <div className="flex flex-col">
                    <label>Out of Stock Email</label>
                    <small className="text-xs text-gray-400">
                      If the product quantity is equal to or less than the threshold value.
                    </small>
                  </div>
                  <Checkbox
                    id="outOfStockEmail"
                    {...register("outOfStockEmail")}
                  />
                </div>
                <div className="flex justify-between space-x-4">
                  <div className="flex flex-col">
                    <label>Low Stock Email</label>
                    <small className="text-xs text-gray-400">
                      If the product quantity reaches zero.
                    </small>
                  </div>
                  <Checkbox
                    id="lowStockEmail"
                    {...register("lowStockEmail")}
                  />
                </div>

                {/* Email Frequency */}
                <Controller
                  name="emailFrequency"
                  control={control}
                  rules={{ required: "Email frequency is required" }}
                  render={({ field }) => (
                    <>
                      <label htmlFor="emailFrequency" className="block my-1">Alert Frequency</label>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Email Frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Daily">Daily</SelectItem>
                          <SelectItem value="Weekly">Weekly</SelectItem>
                          <SelectItem value="Monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </>
                  )}
                />
                {errors.emailFrequency && (
                  <p className="text-sm text-red-500">{errors.emailFrequency.message}</p>
                )}
              </div>
            </div>

            {/* Item Details */}
            <div className="space-y-4">
              {/* Item Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block">Item Name</label>
                <Input
                  id="name"
                  placeholder="Enter item name"
                  {...register("name", { required: "Item name is required" })}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label htmlFor="category" className="block">Category</label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
              </div>

              {/* Item Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="block">Description</label>
                <Input
                  id="description"
                  placeholder="Enter item description"
                  {...register("description", { required: "Description is required" })}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label htmlFor="quantity" className="block">Quantity</label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter item quantity"
                  {...register("quantity", { required: "Quantity is required", valueAsNumber: true })}
                />
                {errors.quantity && <p className="text-sm text-red-500">{errors.quantity.message}</p>}
              </div>

              {/* Cost Price */}
              <div className="space-y-2">
                <label htmlFor="costPrice" className="block">Cost Price</label>
                <Input
                  id="costPrice"
                  type="number"
                  placeholder="Enter cost price"
                  {...register("costPrice", { required: "Cost price is required", valueAsNumber: true })}
                />
                {errors.costPrice && <p className="text-sm text-red-500">{errors.costPrice.message}</p>}
              </div>

              {/* Selling Price */}
              <div className="space-y-2">
                <label htmlFor="sellingPrice" className="block">Selling Price</label>
                <Input
                  id="sellingPrice"
                  type="number"
                  placeholder="Enter selling price"
                  {...register("sellingPrice", { required: "Selling price is required", valueAsNumber: true })}
                />
                {errors.sellingPrice && <p className="text-sm text-red-500">{errors.sellingPrice.message}</p>}
              </div>

              {/* Threshold Value */}
              <div className="space-y-2">
                <label htmlFor="thresholdValue" className="block">Threshold Value</label>
                <Input
                  id="thresholdValue"
                  type="number"
                  placeholder="Enter threshold value"
                  {...register("thresholdValue", { required: "Threshold value is required", valueAsNumber: true })}
                />
                {errors.thresholdValue && <p className="text-sm text-red-500">{errors.thresholdValue.message}</p>}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label htmlFor="location" className="block">Location</label>
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
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-white">
              Add Inventory
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

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

  const [loading, setLoading] = useState(false);
  const { categories } = useCategory();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); 
  const { userData } = useUser();

  const onSubmit = async (data: InventoryData) => {
    setLoading(true);
    try {
   
      if (userData) {
        const result = await addInventory(data, imageFile, userData);
      } else {
        toast.error('User data is missing. Please try again.');
      }
      reset();
      setImageFile(null);
      setImagePreview(null);
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="image">
                  Product Image
                </label>
                <div className="relative">
                  <Avatar className="w-48 h-48">
                    {imagePreview ? (
                      <AvatarImage src={imagePreview} alt="Product Image" />
                    ) : (
                      <AvatarFallback>Image</AvatarFallback>
                    )}
                  </Avatar>
                  <label
                    htmlFor="image"
                    className="absolute bottom-0 left-32 bg-black100 text-white p-2 rounded-full cursor-pointer"
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
              <div className="space-y-6 mt-4">
                <p className="font-bold">Email Notification</p>
                <div className="space-y-4">
                  <div className="flex  justify-between">

                    <div className="flex flex-col">
                      <label>Out of Stock Email</label>
                      <small className="text-xs text-gray-400">If the product quantity is equal to or less than the treshold value.</small>
                    </div>
                    <Checkbox
                      id="outOfStockEmail"
                      {...register("outOfStockEmail")}
                    />

                  </div>
                  <div className="flex  justify-between">
                    <div className="flex flex-col">
                      <label>Low Stock Email</label>
                      <small className="text-xs text-gray-400">If the product quantity reaches zero.</small>
                    </div>

                    <Checkbox
                      id="lowStockEmail"
                      {...register("lowStockEmail")}
                    />

                  </div>
                </div>
                <div>
                <Controller
                  name="emailFrequency"
                  control={control}
                  rules={{ required: "Email frequency is required" }}
                  render={({ field }) => (
                    <>
                      <label htmlFor="" className="my-1">Alert Frequency</label>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Email Frequency" />
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
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name">
                  Item Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter item name"
                  {...register("name", { required: "Item name is required" })}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="category">
                  Category
                </label>
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

              <div className="space-y-2">
                <label htmlFor="description">
                  Description
                </label>
                <Input
                  id="description"
                  placeholder="Enter item description"
                  {...register("description", { required: "Description is required" })}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="quantity">
                  Quantity
                </label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter item quantity"
                  {...register("quantity", { required: "Quantity is required", valueAsNumber: true })}
                />
                {errors.quantity && <p className="text-sm text-red-500">{errors.quantity.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="costPrice">
                  Cost Price
                </label>
                <Input
                  id="costPrice"
                  type="number"
                  placeholder="Enter item cost price"
                  {...register("costPrice", { required: "Cost price is required", valueAsNumber: true })}
                />
                {errors.costPrice && <p className="text-sm text-red-500">{errors.costPrice.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="sellingPrice">
                  Selling Price
                </label>
                <Input
                  id="sellingPrice"
                  type="number"
                  placeholder="Enter item selling price"
                  {...register("sellingPrice", { required: "Selling price is required", valueAsNumber: true })}
                />
                {errors.sellingPrice && <p className="text-sm text-red-500">{errors.sellingPrice.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="thresholdValue">
                  Threshold Value
                </label>
                <Input
                  id="thresholdValue"
                  type="number"
                  placeholder="Enter threshold value"
                  {...register("thresholdValue", { required: "Threshold value is required", valueAsNumber: true })}
                />
                {errors.thresholdValue && <p className="text-sm text-red-500">{errors.thresholdValue.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="location">
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
                {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
              </div>
            </div>
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

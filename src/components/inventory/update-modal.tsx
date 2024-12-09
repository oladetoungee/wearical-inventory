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
  Checkbox,
} from "@/components/ui";
import { toast } from "react-toastify";
import { updateInventory } from "@/lib/services/inventory";
import { InventoryData } from "@/lib/utils";
import { useCategory } from "@/lib/hooks";
import { Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { handleFileChange } from "@/lib/utils/helpers";

export const UpdateInventoryModal = ({
  open,
  onOpenChange,
  inventoryItem,
}: {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  inventoryItem: InventoryData;
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<InventoryData>({
    defaultValues: inventoryItem, 
  });

  const [loading, setLoading] = useState(false);
  const { categories } = useCategory();
  const [imagePreview, setImagePreview] = useState<string | null>(inventoryItem.productImageUrl || null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const onSubmit = async (data: InventoryData) => {
    setLoading(true);
    try {
      const updatedData = {
        ...data,
        restockQuantity: data.restockQuantity || 0,
        restockReason: data.restockReason || "",
      };
      await updateInventory(updatedData, imageFile);
      reset();
      setImageFile(null);
      setImagePreview(null);
      onOpenChange(false);
      toast.success("Inventory item updated successfully.");
    } catch (error) {
      console.error("Error updating inventory:", error);
      toast.error("Failed to update inventory. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Inventory</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="image">Product Image</label>
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
              <div className="space-y-2">
              <p className="font-bold">Email Notifications</p>
                <div className="flex justify-between">
                <div className="flex flex-col">
                      <label>Out of Stock Email</label>
                      <small className="text-xs text-gray-400">If the product quantity is equal to or less than the treshold value.</small>
                    </div>
                  <Checkbox
                    id="outOfStockEmail"
                    {...register("outOfStockEmail")}
                    defaultChecked={inventoryItem.outOfStockEmail === 'on'}
                  />
                </div>
                <div className="flex justify-between">
                <div className="flex flex-col">
                      <label>Low Stock Email</label>
                      <small className="text-xs text-gray-400">If the product quantity reaches zero.</small>
                    </div>
                  <Checkbox
                    id="lowStockEmail"
                    {...register("lowStockEmail")}
                    defaultChecked={inventoryItem.lowStockEmail === 'on'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="emailFrequency">Alert Frequency</label>
                <Controller
                  name="emailFrequency"
                  control={control}
                  rules={{ required: "Alert frequency is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.emailFrequency && (
                  <p className="text-sm text-red-500">{errors.emailFrequency.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name">Item Name</label>
                <Input
                  id="name"
                  placeholder="Enter item name"
                  {...register("name", { required: "Item name is required" })}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="quantity">Initial Quantity (Read-Only)</label>
                <Input
                  id="quantity"
                  type="number"
                  readOnly
                  value={inventoryItem.quantity}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="restockQuantity">Restock Quantity</label>
                <Input
                  id="restockQuantity"
                  type="number"
                  placeholder="Enter restock quantity"
                  {...register("restockQuantity", { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="restockReason">Restock Reason</label>
                <Input
                  id="restockReason"
                  placeholder="Enter reason for restocking"
                  {...register("restockReason")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="costPrice">Cost Price</label>
                <Input
                  id="costPrice"
                  type="number"
                  placeholder="Enter cost price"
                  {...register("costPrice", { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="sellingPrice">Selling Price</label>
                <Input
                  id="sellingPrice"
                  type="number"
                  placeholder="Enter selling price"
                  {...register("sellingPrice", { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-2">
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
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="thresholdValue">Threshold Value</label>
                <Input
                  id="thresholdValue"
                  type="number"
                  placeholder="Enter threshold value"
                  {...register("thresholdValue", { valueAsNumber: true })}
                />
              </div>

           
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-white" disabled={loading}>
              {loading ? "Updating..." : "Update Inventory"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

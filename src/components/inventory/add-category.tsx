'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input, Button } from "@/components/ui";
import { toast } from "react-toastify";
import { addCategory } from "@/lib/services/inventory"; // Create this service function

interface CategoryData {
  name: string;
  description?: string;
}

export const AddCategoryModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: CategoryData) => {
    setLoading(true);
    try {
      await addCategory(data);
      reset();
      onOpenChange(false);
      toast.success("Category added successfully.");
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label htmlFor="name">Category Name</label>
            <Input
              id="name"
              placeholder="Enter category name"
              {...register("name", { required: "Category name is required" })}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="description">Description (Optional)</label>
            <Input
              id="description"
              placeholder="Enter category description"
              {...register("description")}
            />
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-white" disabled={loading}>
              {loading ? "Adding..." : "Add Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

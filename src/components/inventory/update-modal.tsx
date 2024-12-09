'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input, Button } from '@/components/ui';
import { toast } from 'react-toastify';

interface UpdateModalProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  inventoryItem: any; // Replace `any` with the correct type of your inventory data
  onSave: (updatedData: any) => void; // Callback for saving changes
}

export const UpdateModal = ({ open, onOpenChange, inventoryItem, onSave }: UpdateModalProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: inventoryItem,
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await onSave(data);
      reset();
      onOpenChange(false);
      toast.success("Item updated successfully.");
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Failed to update item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name?.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="category">Category</label>
            <Input id="category" {...register('category')} />
          </div>

          <div className="space-y-2">
            <label htmlFor="quantity">Quantity</label>
            <Input
              id="quantity"
              type="number"
              {...register('quantity', { valueAsNumber: true })}
            />
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-white" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

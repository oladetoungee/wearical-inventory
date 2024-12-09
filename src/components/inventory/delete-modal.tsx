'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui';
import { toast } from 'react-toastify';

interface DeleteModalProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  inventoryItem: any; // Replace `any` with the correct type of your inventory data
  onDelete: (id: string) => void; // Callback for deletion
}

export const DeleteModal = ({ open, onOpenChange, inventoryItem, onDelete }: DeleteModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete(inventoryItem.id);
      onOpenChange(false);
      toast.success("Item deleted successfully.");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Item</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete <strong>{inventoryItem.name}</strong>?</p>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleDelete} className="bg-red-500 text-white" disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

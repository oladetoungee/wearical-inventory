'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui';
import { toast } from 'react-toastify';
import { deleteInventory } from '@/lib/services/inventory';
import { InventoryData } from '@/lib/utils';

interface DeleteModalProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  inventoryItem: InventoryData;

}

export const DeleteModal = ({ open, onOpenChange, inventoryItem }: DeleteModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteInventory(inventoryItem);
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
          <DialogTitle>Delete Inventory Item</DialogTitle>
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

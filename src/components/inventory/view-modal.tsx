'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui';

interface ViewModalProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  inventoryItem: any; // Replace `any` with the correct type of your inventory data
}

export const ViewModal = ({ open, onOpenChange, inventoryItem }: ViewModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Item Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p><strong>Name:</strong> {inventoryItem.name}</p>
          <p><strong>Category:</strong> {inventoryItem.category || 'N/A'}</p>
          <p><strong>Quantity:</strong> {inventoryItem.quantity}</p>
          <p><strong>Price:</strong> NGN{inventoryItem.costPrice.toFixed(2)}</p>
          <p><strong>Location:</strong> {inventoryItem.location || 'N/A'}</p>
          <p><strong>Status:</strong> {inventoryItem.status}</p>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

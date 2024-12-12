'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui';
import { toast } from 'react-toastify';
import { deleteSale } from '@/lib/services/sales';
import { SalesData } from '@/lib/utils';

interface DeleteSaleModalProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  sale: SalesData;
}

export const DeleteSaleModal = ({ open, onOpenChange, sale }: DeleteSaleModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteSale(sale);
      onOpenChange(false);
      toast.success(`Sale for ${sale.product.name} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting sale:', error);
      toast.error('Failed to delete sale. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Sale</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to delete the sale for <strong>{sale.product.name}</strong> recorded on{' '}
          <strong>{new Date(sale.dateCreated).toLocaleDateString()}</strong>?
        </p>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleDelete} className="bg-red-500 text-white" disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SalesData } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";

interface ViewSaleModalProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  sale: SalesData;
}

export const ViewSaleModal = ({ open, onOpenChange, sale }: ViewSaleModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sale Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-center">
          <Avatar className="w-full h-48 mx-auto rounded overflow-hidden">
            <AvatarImage
              src={sale.createdBy?.avatarUrl || undefined}
              alt={sale.product.name || 'N/A'}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="text-lg">
              {sale.createdBy.fullName ? sale.createdBy.fullName[0] : 'N/A'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{sale.createdBy?.fullName || 'N/A'}</h2>
            <p className="text-sm text-gray-500">Creator</p>
          </div>
        </div>

        <div className="space-y-4">
          <DetailRow name="Product" value={sale.product.name} />
          <DetailRow name="Quantity Sold" value={`${sale.quantity} pcs`} />
          <DetailRow name="Price" value={`NGN ${sale.totalSellingPrice.toFixed(2)}`} />
          <DetailRow name="Date of Sale" value={formatDate(sale.dateCreated)} />
          <DetailRow name="Location" value={sale.location} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const DetailRow = ({ name, value }: { name: string; value: string | number }) => {
  return (
    <>
      <div className="flex justify-between text-sm text-black100 leading-5">
        <p>{name}</p>
        <p>{value}</p>
      </div>
      <hr className="my-4 border-gray-100" />
    </>
  );
};

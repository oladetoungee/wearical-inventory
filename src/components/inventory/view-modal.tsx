'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { InventoryData, STATUS_COLORS } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";

interface ViewModalProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  inventoryItem: InventoryData;
}

export const ViewModal = ({ open, onOpenChange, inventoryItem }: ViewModalProps) => {

  const status =
    inventoryItem.quantity > inventoryItem.thresholdValue
      ? 'In Stock'
      : inventoryItem.quantity > 0
        ? 'Low Stock'
        : 'Out of Stock';


  const statusClass = STATUS_COLORS[status];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4  text-center">
          <Avatar className="w-full h-48 mx-auto rounded overflow-hidden">
            <AvatarImage
              src={inventoryItem.productImageUrl || undefined}
              alt={inventoryItem.name || 'N/A'}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="text-lg">{inventoryItem.name ? inventoryItem.name[0] : 'N/A'}</AvatarFallback>
          </Avatar>
        </div>


        <div className="space-y-4">
          {/* Detail Rows */}
          <DetailRow name="Name" value={inventoryItem.name} />
          <DetailRow name="Category" value={inventoryItem.category} />
          <DetailRow name="Description" value={inventoryItem.description} />
          <DetailRow name="Quantity" value={`${inventoryItem.quantity} pcs`} />
          <DetailRow name="Cost Price" value={`NGN ${inventoryItem.costPrice.toFixed(2)}`} />
          <DetailRow name="Selling Price" value={`NGN ${inventoryItem.sellingPrice.toFixed(2)}`} />
          <DetailRow name="Threshold Value" value={inventoryItem.thresholdValue} />
          <DetailRow name="Date Created" value={formatDate(inventoryItem.dateCreated)} />
          <DetailRow name="Date Updated" value={formatDate(inventoryItem.dateUpdated)} />
          <DetailRow name="Location" value={inventoryItem.location} />
          <div className="flex justify-between text-sm text-black100">
            <p>Status</p>
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusClass}`}>
              {status}
            </span>
          </div>
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

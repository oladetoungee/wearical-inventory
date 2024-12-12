'use client';

import { useState } from 'react';
import { formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { SalesData, STATUS_COLORS } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EyeIcon, EditIcon, DeleteIcon, MoreVertical } from 'lucide-react';
import {ViewModal, DeleteModal, UpdateInventoryModal} from '.';


export const columns: ColumnDef<SalesData>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'name',
    header: 'Product Name',
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
         
          <span>{row.original.product?.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => row.original.quantity || '0',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => `NGN${row.original.product?.sellingPrice.toFixed(2)}`,
  },
  {
    accessorKey: 'price',
    header: 'Total Amount',
    cell: ({ row }) => `NGN${row.original.totalSellingPrice.toFixed(2)}`,
  },
  
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => row.original.product?.category || 'N/A',
  },
 {
  accessorKey: 'createdBy',
  header: 'Created By',
  cell: ({ row }) => {
    return (
      <div className="flex items-center space-x-2">
       
        <span>{row.original.createdBy.fullName}</span>
      </div>
    );
  },
 },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => formatDate(row.original.dateCreated),
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => row.original.location || 'N/A',
  },
 
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const [viewModalOpen, setViewModalOpen] = useState(false);
      const [deleteModalOpen, setDeleteModalOpen] = useState(false);

      const inventoryItem = row.original;

      return (
        <div className="flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setViewModalOpen(true)}>
                <EyeIcon className="mr-2" /> View
              </DropdownMenuItem>
           
              <DropdownMenuItem onClick={() => setDeleteModalOpen(true)}>
                <DeleteIcon className="mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Modals */}
          {/* {viewModalOpen && (
            <ViewModal
              open={viewModalOpen}
              onOpenChange={setViewModalOpen}
              inventoryItem={inventoryItem}
            />
          )}
          {editModalOpen && (
            <UpdateInventoryModal
              open={editModalOpen}
              onOpenChange={setEditModalOpen}
              inventoryItem={inventoryItem}
            />
          )}
          {deleteModalOpen && (
            <DeleteModal
              open={deleteModalOpen}
              onOpenChange={setDeleteModalOpen}
              inventoryItem={inventoryItem}
            />
          )} */}
        </div>
      );
    },
  },
];

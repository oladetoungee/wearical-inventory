'use client';

import { useState } from 'react';
import { formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { InventoryData, STATUS_COLORS } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EyeIcon, EditIcon, DeleteIcon, MoreVertical } from 'lucide-react';
import {ViewModal, DeleteModal, UpdateInventoryModal} from './';


    const updateInventoryItem = async (data: InventoryData) => {
    // Implement your update logic here
    }

export const columns: ColumnDef<InventoryData>[] = [
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
          <Avatar>
            <AvatarFallback>{row.original.name[0]}</AvatarFallback>
            <AvatarImage src={row.original.productImageUrl} alt={row.original.name} />
          </Avatar>
          <span>{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => row.original.category || 'N/A',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => row.original.quantity || '0',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => `NGN${row.original.costPrice.toFixed(2)}`,
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Created',
    cell: ({ row }) => formatDate(row.original.dateCreated),
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => row.original.location || 'N/A',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status =
        row.original.quantity > row.original.thresholdValue
          ? 'In Stock'
          : row.original.quantity > 0
          ? 'Low Stock'
          : 'Out of Stock';
      const statusClass = STATUS_COLORS[status];
      return (
        <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusClass}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const [viewModalOpen, setViewModalOpen] = useState(false);
      const [editModalOpen, setEditModalOpen] = useState(false);
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
              <DropdownMenuItem onClick={() => setEditModalOpen(true)}>
                <EditIcon className="mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeleteModalOpen(true)}>
                <DeleteIcon className="mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Modals */}
          {viewModalOpen && (
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
          )}
        </div>
      );
    },
  },
];

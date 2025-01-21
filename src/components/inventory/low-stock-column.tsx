'use client';

import { ColumnDef } from '@tanstack/react-table';
import { InventoryData, STATUS_COLORS } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";

export const lowStockColumns: ColumnDef<InventoryData>[] = [
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
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => row.original.quantity || '0',
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
];

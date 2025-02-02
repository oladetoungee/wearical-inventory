'use client';

import React from "react";
import { useReactTable, ColumnDef, getCoreRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Avatar, AvatarFallback, AvatarImage } from "@/components/ui"; 
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, EyeIcon, UserPenIcon, DeleteIcon } from "lucide-react";
import { useInventory } from '@/lib/hooks';
import { InventoryData } from '@/lib/utils';

const columns: ColumnDef<InventoryData>[] = [
  {
    id: 'name',
    header: 'Product',
    cell: ({ row }) => (
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarFallback>{row.original.name[0]}</AvatarFallback>
          <AvatarImage src={row.original.productImageUrl} alt={row.original.name} />
        </Avatar>
        <div>
          <p className="font-medium">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.description}</p>
        </div>
      </div>
    ),
  },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "quantity", header: "Quantity" },
  { accessorKey: "dateCreated", header: "Date Created" },
  { accessorKey: "location", header: "Location" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusStyles = {
        "In Stock": "bg-greenFade text-green100",
        "Out of Stock": "bg-redFade text-red100",
        "Low Stock": "bg-orangeFade text-orange100",
      };
      const iconStyles = {
        "In Stock": "bg-green-600",
        "Out of Stock": "bg-red100",
        "Low Stock": "bg-orange100",
      };
      const status = row.original.status;
      return (
        <div className={`flex items-center space-x-2 px-2 py-1 rounded-lg text-[8px] ${statusStyles[status]}`}>
          <span className={`flex items-center justify-around w-4 h-4 rounded-full text-white ${iconStyles[status]}`}>
            {status === "In Stock" && "✔"}
            {status === "Out of Stock" && "✖"}
            {status === "Low Stock" && "!"}
          </span>
          <span>{status}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Action",
    cell: () => (
      <div className="flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger><MoreVertical className="cursor-pointer" /></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem><EyeIcon /> View</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><UserPenIcon /> Update</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><DeleteIcon /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

export const ProductTable = () => {
  const { inventory } = useInventory();
  const limitedInventory = inventory.slice(0, 4); // Limit to 4 items

  const table = useReactTable({
    data: limitedInventory,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <TableHead key={header.id}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              No data available.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

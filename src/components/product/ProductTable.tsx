'use client';

import React from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui"; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { products } from "@/data/product";
import { MoreVertical, EyeIcon, UserPenIcon, DeleteIcon } from "lucide-react"; 


const columns: ColumnDef<typeof products[number]>[] = [
  {
    id: 'name',
    header: 'Product',
    cell: ({ row }) => (
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={row.original.image} alt={row.original.name} />
          <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.description}</p>
        </div>
      </div>
    ),
  },

  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",

  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",

  },
  {
    accessorKey: "location",
    header: "Location",

  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusColors = {
        "In Stock": "bg-greenFade text-green100",
        "Out of Stock": "bg-redFade text-red100",
        "Low Stock": "bg-orangeFade text-orange100",
      };
  
      const iconColors = {
        "In Stock": "bg-green-600",
        "Out of Stock": "bg-red100",
        "Low Stock": "bg-orange100",
      };
  
      return (
        <div
          className={`flex items-center space-x-2 px-2 py-1 rounded-lg text-[8px] ${statusColors[row.original.status]}`}
        >
          <span
            className={`flex items-center justify-around w-4 h-4 rounded-full text-white ${iconColors[row.original.status]}`}
          >
            {/* Simple checkmark, exclamation, or cross icons */}
            {row.original.status === "In Stock" && "✔"}
            {row.original.status === "Out of Stock" && "✖"}
            {row.original.status === "Low Stock" && "!"}
          </span>
          <span>{row.original.status}</span>
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
  <DropdownMenuTrigger>  <MoreVertical className="cursor-pointer" /></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem><EyeIcon/> View</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem><UserPenIcon/> Update</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem><DeleteIcon/> Delete</DropdownMenuItem>

  </DropdownMenuContent>
</DropdownMenu>

      
      </div>
    ),
  },
];

const ProductTable = () => {
  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
    <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
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

    
    </div>
  );
};

export default ProductTable;

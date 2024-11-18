'use client';

import React from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
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
import { products } from "@/data/product";
import { MoreHorizontal } from "lucide-react"; 

const columns: ColumnDef<typeof products[number]>[] = [
  {
  accessorKey: "name",
    header: "Product",
    cell: ({ row }) => (
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={row.original.image} alt={row.original.name} />
            <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-sm text-muted-foreground">{row.original.description}</p>
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
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded ${
          row.original.status === "In Stock"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "actions",
    header: "Action",
    cell: () => (
      <div className="flex items-center justify-end">
        <MoreHorizontal className="cursor-pointer text-black" />
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
                  {header.isPlaceholder ? null : typeof header.column.columnDef.header === 'function' ? header.column.columnDef.header(header.getContext()) : header.column.columnDef.header}
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
                  <TableCell key={cell.id}>{cell.renderValue() as React.ReactNode}</TableCell>
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

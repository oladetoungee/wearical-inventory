'use client';
import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input, Button, Spinner, DatePickerWithRange } from '@/components/ui';

import { EmptyState } from '../layout';
import { useInventory } from '@/lib/hooks'; 
import {
  MoreVertical,
  EyeIcon,
  EditIcon,
  DeleteIcon,
  ChevronsLeft,
  ChevronsRight,
  ListFilterIcon,
} from 'lucide-react';
 import { AddInventoryModal } from './'; 
import { InventoryData, STATUS_COLORS } from '@/lib/utils';

const formatDate = (isoDate?: string) =>
  isoDate
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      }).format(new Date(isoDate))
    : 'N/A';

export const InventoryTable = () => {
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<InventoryData | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<[Date | null, Date | null]>([null, null]);

  const { inventory, loading, error } = useInventory();

  const filteredProducts = useMemo(() => {
    if (loading || error) return [];
    return inventory.filter((product) => {
      const matchesSearch = product?.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      const matchesLocation = locationFilter === 'all' || product.location === locationFilter;
      const matchesAvailability = availabilityFilter === 'all' || product.status === availabilityFilter;
      const matchesDate =
        (!dateFilter[0] || new Date(product.dateCreated) >= dateFilter[0]) &&
        (!dateFilter[1] || new Date(product.dateCreated) <= dateFilter[1]);

      return matchesSearch && matchesCategory && matchesLocation && matchesAvailability && matchesDate;
    });
  }, [inventory, search, categoryFilter, locationFilter, availabilityFilter, dateFilter, loading, error]);

  const columns = useMemo<ColumnDef<typeof inventory[number]>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: 'name',
        header: 'Product Name',
        cell: ({ row }) => row.original.name || 'N/A',
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
        cell: ({ row }) => `$${row.original.costPrice.toFixed(2)}`,
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
        cell: ({ row }) => (
          <div className="flex items-center justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedProduct(row.original);
                    setIsAddProductModalOpen(true);
                  }}
                >
                  <EyeIcon className="mr-2" /> View
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedProduct(row.original);
                    setIsAddProductModalOpen(true);
                  }}
                >
                  <EditIcon className="mr-2" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedProduct(row.original);
                    setIsAddProductModalOpen(true);
                  }}
                >
                  <DeleteIcon className="mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
        <div className="flex space-x-2">
          <DatePickerWithRange
        
          
          />
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-2 py-1">
              <ListFilterIcon className="mr-2 h-4 w-4" />
              <span>Filter</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setCategoryFilter('all')}
              >
                All Categories
              </DropdownMenuItem>
              {/* Add more filter options for categories, locations, availability */}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={() => setIsAddCategoryModalOpen(true)}
            className="bg-primary text-white"
          >
            Add Category
          </Button>
          <Button
            onClick={() => setIsAddProductModalOpen(true)}
            className="bg-primary text-white"
          >
            Add Product
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
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
                {loading ? <Spinner /> : <EmptyState type="product" />}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-end space-x-2">
        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <ChevronsLeft />
        </Button>
        <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <ChevronsRight />
        </Button>
      </div>

      {/* Modals */}
      {/* <AddCategoryModal open={isAddCategoryModalOpen} onOpenChange={setIsAddCategoryModalOpen} /> */}
      <AddInventoryModal open={isAddProductModalOpen} onOpenChange={setIsAddProductModalOpen}  />
    </div>
  );
};

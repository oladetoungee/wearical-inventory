'use client';
import React, { useState, useMemo } from 'react';
import {
  useReactTable,
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
import { columns } from './inventory-table-columns';
import { EmptyState } from '../layout';
import { useInventory } from '@/lib/hooks'; 
import {
  ChevronsLeft,
  ChevronsRight,
  ListFilterIcon,
} from 'lucide-react';
 import { AddInventoryModal, AddCategoryModal } from './'; 
import { InventoryData } from '@/lib/utils';


export const InventoryTable = () => {
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
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
      <AddCategoryModal open={isAddCategoryModalOpen} onOpenChange={setIsAddCategoryModalOpen} />
      <AddInventoryModal open={isAddProductModalOpen} onOpenChange={setIsAddProductModalOpen}  />
    </div>
  );
};

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
import { Input, Button, Spinner } from '@/components/ui';
import { columns } from './inventory-table-columns';
import { EmptyState } from '../layout';
import { useInventory } from '@/lib/hooks';
import {
  ChevronsLeft,
  ChevronsRight,
  ListFilterIcon,
} from 'lucide-react';
import { AddInventoryModal, AddCategoryModal } from './';
import { DatePickerWithRange } from '@/components/ui';
import { DateRange } from 'react-day-picker';
import { FilterModal } from './';

export const InventoryTable = () => {
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<[Date | null, Date | null]>([null, null]);


  const [tempCategoryFilter, setTempCategoryFilter] = useState<string>(categoryFilter);
  const [tempLocationFilter, setTempLocationFilter] = useState<string>(locationFilter);
  const [tempAvailabilityFilter, setTempAvailabilityFilter] = useState<string>(availabilityFilter);

  const { inventory, loading, error } = useInventory();


  const categories = useMemo(() => {
    if (!inventory) return [];
    const categorySet = new Set(inventory.map((p) => p.category).filter(Boolean));
    return Array.from(categorySet);
  }, [inventory]);

  const filteredProducts = useMemo(() => {
    if (loading || error || !inventory) return [];

    return inventory.filter((product) => {
      const productDate = new Date(product.dateCreated);
      const [start, end] = dateFilter;

      const matchesSearch = product?.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      const matchesLocation = locationFilter === 'all' || product.location === locationFilter;
      const matchesAvailability = availabilityFilter === 'all' || product.status === availabilityFilter;
      const matchesDate =
        (!start || productDate >= start) &&
        (!end || productDate <= end);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesAvailability &&
        matchesDate
      );
    });
  }, [inventory, search, categoryFilter, locationFilter, availabilityFilter, dateFilter, loading, error]);

  const table = useReactTable({
    data: filteredProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleDateChange = (value: DateRange | undefined) => {
    if (!value) {
      setDateFilter([null, null]);
    } else {
      setDateFilter([value.from ?? null, value.to ?? null]);
    }
  };

  const handleFilterApply = () => {
    setCategoryFilter(tempCategoryFilter);
    setLocationFilter(tempLocationFilter);
    setAvailabilityFilter(tempAvailabilityFilter);
    setIsFilterModalOpen(false);
  };

  const handleFilterCancel = () => {
    setTempCategoryFilter(categoryFilter);
    setTempLocationFilter(locationFilter);
    setTempAvailabilityFilter(availabilityFilter);
    setIsFilterModalOpen(false);
  };

  const handleFilterReset = () => {
    setTempCategoryFilter('all');
    setTempLocationFilter('all');
    setTempAvailabilityFilter('all');
  };

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
            value={{
              from: dateFilter[0] || undefined,
              to: dateFilter[1] || undefined,
            }}
            onChange={handleDateChange}
          />
          <Button
            onClick={() => setIsFilterModalOpen(true)}
            variant="outline"
            className="flex items-center px-2 py-1"
          >
            <ListFilterIcon className="mr-2 h-4 w-4" />
            <span>Filter</span>
          </Button>
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

      <AddCategoryModal open={isAddCategoryModalOpen} onOpenChange={setIsAddCategoryModalOpen} />
      <AddInventoryModal open={isAddProductModalOpen} onOpenChange={setIsAddProductModalOpen} />
      <FilterModal
        open={isFilterModalOpen}
        onOpenChange={setIsFilterModalOpen}
        categories={categories}
        tempCategoryFilter={tempCategoryFilter}
        tempLocationFilter={tempLocationFilter}
        tempAvailabilityFilter={tempAvailabilityFilter}
        setTempCategoryFilter={setTempCategoryFilter}
        setTempLocationFilter={setTempLocationFilter}
        setTempAvailabilityFilter={setTempAvailabilityFilter}
        onApply={handleFilterApply}
        onCancel={handleFilterCancel}
        onReset={handleFilterReset}
      />
    </div>
  );
};

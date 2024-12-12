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
import { Input, Button } from '@/components/ui';
import { columns } from './sales-table-columns';
import { EmptyState } from '../layout';
import { useSales } from '@/lib/hooks';
import {
  ChevronsLeft,
  ChevronsRight,
  ListFilterIcon,
} from 'lucide-react';
import { DatePickerWithRange } from '@/components/ui';
import { DateRange } from 'react-day-picker';
import { FilterModal } from '.';
import { Skeleton } from "@/components/ui/skeleton"


export const SalesTable = () => {

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);


  const [search, setSearch] = useState('');

  const [dateFilter, setDateFilter] = useState<[Date | null, Date | null]>([null, null]);



  const { sales, loading, error } = useSales();



  const table = useReactTable({
    data: sales,
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

            variant="outline"
            className="flex items-center px-2 py-1"
          >
            <ListFilterIcon className="mr-2 h-4 w-4" />
            <span>Location</span>
          </Button>
          <Button
            variant='outline'
            className="bg-primary text-white"
          >
            Export
          </Button>
          <Button
            onClick={() => setIsAddProductModalOpen(true)}
            className="bg-primary text-white"
          >
            Add Sales
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
                {loading ? (
                  <div className="flex justify-center">
                    {[...Array(columns.length)].map((_, index) => (
                      <Skeleton key={index} className="w-32 h-4 mx-2" />
                    ))}
                  </div>
                ) : (
                  <EmptyState type="sales" />
                )}
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


      {/* <AddSalesModal open={isAddProductModalOpen} onOpenChange={setIsAddProductModalOpen} /> */}

    </div>
  );
};

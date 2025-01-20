'use client';

import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
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
import { lowStockColumns } from './low-stock-column';
import { InventoryData } from '@/lib/utils';

export const LowStockTable = ({ inventoryData }: { inventoryData: InventoryData[] }) => {
  const [showAll, setShowAll] = useState(false);

  // Filter low-stock items
  const lowStockData = useMemo(() => {
    return inventoryData.filter(
      (item) => item.quantity > 0 && item.quantity <= item.thresholdValue
    );
  }, [inventoryData]);

  // Determine data to display
  const displayedData = showAll ? lowStockData : lowStockData.slice(0, 4);

  const table = useReactTable({
    data: displayedData,
    columns: lowStockColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 border rounded-md shadow-md max-w-sm">
      <h2 className="text-lg font-semibold mb-2">Low Stock Items</h2>
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
              <TableCell colSpan={lowStockColumns.length} className="text-center">
                No low stock items found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {lowStockData.length > 4 && (
        <button
          className="text-blue-500 hover:underline mt-2"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : 'See All'}
        </button>
      )}
    </div>
  );
};

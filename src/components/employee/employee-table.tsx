'use client';

import React, { useState, useMemo } from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui";
import { Input, Button } from "@/components/ui";
import { employees } from "@/data/employee";

export const EmployeeTable = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const columns = useMemo<ColumnDef<typeof employees[number]>[]>(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "role", header: "Role" },
      { accessorKey: "dateAdded", header: "Date Added" },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div>
            <Button onClick={() => console.log("View", row.original)}>View</Button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredEmployees,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search employees..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-64"
      />
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
                No employees found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
        Previous
      </Button>
      <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
        Next
      </Button>
    </div>
  );
};

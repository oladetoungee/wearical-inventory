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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input, Button } from "@/components/ui";
import { employees } from "@/data/employee";
import { MoreVertical, EyeIcon, UserPenIcon, DeleteIcon } from "lucide-react";

export const EmployeeTable = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoize filtered data
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Memoize columns to prevent unnecessary re-renders
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
          <div className="flex items-center justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <EyeIcon className="mr-2" /> View
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserPenIcon className="mr-2" /> Update
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
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
    data: filteredEmployees,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
        <div className="flex space-x-2">
          <Button variant="secondary">Filter by Account</Button>
          <Button onClick={toggleModal} className="bg-primary text-white">
            Add Employee
          </Button>
        </div>
      </div>

      {/* Employee Table */}
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
                No employees found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-end space-x-2">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      {/* Add Employee Modal */}
      {isModalOpen && <div>Add Employee Modal Here</div>}
    </div>
  );
};

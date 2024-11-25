'use client';

import React, { useState } from "react";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Input,
  Button,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui";
import { employees } from "@/data/employee";
import { EmptyState } from "@/components/layout";
import { MoreVertical, Edit3Icon, Trash2Icon, ChevronLeft, ChevronRight, SearchIcon, ListFilterIcon } from "lucide-react";

const columns: ColumnDef<typeof employees[number]>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span>{row.original.id}</span>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center space-x-4">
        <span className="font-medium">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "dateAdded",
    header: "Date Added",
  },
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
              <Edit3Icon className="mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2Icon className="mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

export const EmployeeTable = () => {
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = selectedRole ? employee.role === selectedRole : true;
    return matchesSearch && matchesRole;
  });

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
      <div className="flex items-center justify-between mt-2">
        <div className="relative">
          <Input
            placeholder="Search by name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 pl-10"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex space-x-2">
          <Select onValueChange={setSelectedRole}>
            <SelectTrigger className="text-xs w-48">
              <ListFilterIcon className="mr-2" />
              <SelectValue placeholder="Filter by Account Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Sub-admin">Sub-admin</SelectItem>
              <SelectItem value="Sales-person">Sales-person</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
            </SelectContent>       
          </Select>
          <Button onClick={toggleModal} className="bg-primary text-white">
            + Add Employee
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
                <EmptyState type="employee" />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-end space-x-2 mt-4">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </Button>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </Button>
      </div>

      {/* Add Employee Modal */}
      {isModalOpen && <p>Modal Component Here</p>}
    </div>
  );
};

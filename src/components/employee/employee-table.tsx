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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input, Button } from "@/components/ui";
import { employees } from "@/data/employee";
import { EmptyState } from "../layout";
import {
  MoreVertical,
  EyeIcon,
  UserPenIcon,
  DeleteIcon,
  ChevronsLeft,
  ChevronsRight,
  ListFilterIcon,
} from "lucide-react";
import { AddEmployeeModal } from "./add-modal";



export const EmployeeTable = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all"); // Role filter state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Define colors for roles
  const roleColors = {
    Admin: "bg-red-100 text-red-700",
    "Sub Admin": "bg-blue-100 text-blue-700",
    "Sales Personnel": "bg-green-100 text-green-700",
    "Store Manager": "bg-yellow-100 text-yellow-700",
  };

  // Memoize filtered data
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch = employee.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesRole = roleFilter === "all" || employee.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [search, roleFilter]);

  // Memoize columns to prevent unnecessary re-renders
  const columns = useMemo<ColumnDef<typeof employees[number]>[]>(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "email", header: "Email" },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
          const role = row.original.role as keyof typeof roleColors;
          const roleClass = roleColors[role] || "bg-gray-100 text-gray-700";
          return (
            <span
              className={`px-2 py-1 rounded-md text-sm font-medium ${roleClass}`}
            >
              {row.original.role}
            </span>
          );
        },
      },
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
                <DropdownMenuItem>
                  <UserPenIcon className="mr-2" /> Update
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DeleteIcon className="mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    [roleColors]
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
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-2 py-1">
              <ListFilterIcon className="mr-2 h-4 w-4" />
              <span>Account</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setRoleFilter("all")}>
                All Roles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRoleFilter("Admin")}>
                Admin
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRoleFilter("Sub Admin")}>
                Sub Admin
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setRoleFilter("Sales Personnel")}
              >
                Sales Personnel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRoleFilter("Store Manager")}>
                Store Manager
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary text-white"
          >
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
                <EmptyState type="employee" />
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
          <ChevronsLeft />
        </Button>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight />
        </Button>
      </div>

      {/* Add Employee Modal */}
       {/* Add Employee Modal */}
       <AddEmployeeModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      />
 
    </div>
  );
};

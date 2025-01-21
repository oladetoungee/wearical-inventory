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
import { Input, Button } from '@/components/ui';
import { EmptyState } from '../layout';
import { useUsers } from '@/lib/hooks/useEmployees';
import { Skeleton } from "@/components/ui/skeleton"
import {
  MoreVertical,
  EyeIcon,
  UserPenIcon,
  DeleteIcon,
  ChevronsLeft,
  ChevronsRight,
  ListFilterIcon,
} from 'lucide-react';
import { AddEmployeeModal } from './add-modal';
import { ViewEmployeeModal } from './view-modal';
import { UpdateEmployeeModal } from './update-modal';
import { ConfirmDeleteModal } from './delete-modal';
import { UserData, ROLE_COLORS } from '@/lib/utils';
import { formatDate } from '@/lib/utils/';



export const EmployeeTable = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

 
  
  const [selectedEmployee, setSelectedEmployee] = useState<UserData | null>(null);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const { users, loading, error } = useUsers();

  const filteredUsers = useMemo(() => {
    if (loading || error) return [];
    return users.filter((user) => {
      const matchesSearch = user?.fullName?.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter, loading, error]);


  const columns = useMemo<ColumnDef<typeof users[number]>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: 'fullName',
        header: 'Name',
        cell: ({ row }) => row.original.fullName || 'N/A',
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        cell: ({ row }) => row.original.phone || 'N/A',
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => row.original.email,
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => {
          const role = row.original.role;
          const roleClass = ROLE_COLORS[role] || 'bg-gray-100 text-gray-700';
          return (
            <span
              className={`px-2 py-1 rounded-md text-xs font-medium ${roleClass}`}
            >
              {role}
            </span>
          );
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Date Added',
        cell: ({ row }) => formatDate(row.original.createdAt || ''),
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
                    setSelectedEmployee(row.original);
                    setIsViewModalOpen(true);
                  }}
                >
                  <EyeIcon className="mr-2" /> View
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedEmployee(row.original);
                    setIsUpdateModalOpen(true);
                  }}
                >
                  <UserPenIcon className="mr-2" /> Update
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedEmployee(row.original);
                    setIsDeleteModalOpen(true);
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
    data: filteredUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6 p-4">
        <Input
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
        <div className="flex flex-wrap gap-2 items-center justify-end space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-2 py-1">
              <ListFilterIcon className="mr-2 h-4 w-4" />
              <span>Role</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {['all', 'Admin', 'Sub Admin', 'Sales Personnel', 'Store Manager'].map((role) => (
                <DropdownMenuItem
                  key={role}
                  onClick={() => setRoleFilter(role)}
                >
                  {role === 'all' ? 'All Roles' : role}
                </DropdownMenuItem>
              ))}
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
              {loading ? (
          <div className="flex justify-center">
            {[...Array(columns.length)].map((_, index) => (
              <Skeleton key={index} className="w-32 h-4 mx-2" />
            ))}
          </div>
        ) : (
          <EmptyState type="employee" />
        )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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

      {/* Modals */}
      <AddEmployeeModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      />
      <ViewEmployeeModal
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        employee={selectedEmployee}
      />
      <UpdateEmployeeModal
        open={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        employee={selectedEmployee}
      />
      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        employee={selectedEmployee}
      />
    </div>
  );
};

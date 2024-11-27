'use client';

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Input,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { addEmployee } from "@/lib/services/auth";
import { toast } from 'react-toastify';

type EmployeeFormInputs = {
  fullName: string;
  email: string;
  phone: string;
  role: string;
};

export const AddEmployeeModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormInputs>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: EmployeeFormInputs) => {
    setLoading(true);
    try {
      const { email, fullName, phone, role } = data;
      const result = await addEmployee(email, fullName, phone, role);
      reset();

      onOpenChange(false);
   toast.success(`Employee added successfully.`);
    } catch (error) {
      console.error('Error adding employee:', error);
     toast.error('Failed to add employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-medium">
              Name
            </label>
            <Input
              id="fullName"
              placeholder="Enter employee name"
              {...register("fullName", { required: "Name is required" })}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              placeholder="Enter employee email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone
            </label>
            <Input
              id="phone"
              placeholder="Enter phone number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Invalid phone number",
                },
              })}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-medium">
              Role
            </label>
            <Controller
              name="role"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Sub Admin">Sub Admin</SelectItem>
                    <SelectItem value="Sales Personnel">Sales Personnel</SelectItem>
                    <SelectItem value="Store Manager">Store Manager</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-white" disabled={loading}>
              {loading ? "Adding..." : "Add Employee"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

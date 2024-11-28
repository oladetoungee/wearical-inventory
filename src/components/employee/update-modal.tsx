'use client';

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input, Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
import { updateEmployee } from '@/lib/services/employee';
import { toast } from 'react-toastify';
import { UserData } from '@/lib/utils';

type EmployeeFormInputs = {
  fullName: string;
  email: string;
  phone: string;
  role: string;
};

type UpdateEmployeeModalProps = {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  employee: UserData | null;
};

export const UpdateEmployeeModal = ({ open, onOpenChange, employee }: UpdateEmployeeModalProps) => {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<EmployeeFormInputs>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (employee) {
      reset({
        fullName: employee.fullName || '',
        email: employee.email || '',
        phone: employee.phone || '',
        role: employee.role || '',
      });
    }
  }, [employee, reset]);

  const onSubmit = async (data: EmployeeFormInputs) => {
    if (!employee) return;
    setLoading(true);
    try {
      await updateEmployee(employee.uid, data);
      toast.success('Employee updated successfully.');
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating employee:', error);
      toast.error('Failed to update employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
        <DialogTitle className="text-center p-4">Update Employee</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-medium">
              Name
            </label>
            <Input
              id="fullName"
              {...register('fullName', { required: 'Name is required' })}
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
              {...register('email', { required: 'Email is required' })}
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
              {...register('phone', { required: 'Phone is required' })}
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
              rules={{ required: 'Role is required' }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value} 
                >
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
              {loading ? 'Updating...' : 'Update Employee'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

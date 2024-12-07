'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui';
import { UserData } from '@/lib/utils';
import { toast } from 'react-toastify';
import axios from "axios";

type DeleteEmployeeModalProps = {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  employee: UserData | null;
};

export const ConfirmDeleteModal = ({ open, onOpenChange, employee }: DeleteEmployeeModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
  try {
    setLoading(true);
    const response = await axios.post('/api/delete-employee', {
      uid: employee?.uid,
    });
   toast.success('Employee deleted successfully.');
    onOpenChange(false);
  }
  catch (error) {
    console.error('Error deleting employee:', error);
    toast.error('Failed to delete employee. Please try again.');
  }
  finally {
    setLoading(false);
    onOpenChange(false);
  }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent >
        <DialogHeader>
        <DialogTitle className="text-center p-4">Delete Employee</DialogTitle>
        </DialogHeader>
        <p className='text-xs text-center p-2'>Are you sure you want to delete this employee - {employee?.fullName}? </p>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button className="bg-[#CC4424] text-white" onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

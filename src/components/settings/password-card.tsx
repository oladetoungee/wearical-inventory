'use client';

import { useState } from 'react';
import { updateUserPassword } from '@/lib/services/auth';
import { Button, Input } from '@/components/ui';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react'; // You can use any eye icon library

export const UpdatePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // React Hook Form setup
  const { control, handleSubmit, formState: { errors }, getValues } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handlePasswordUpdate = async (data: any) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    try {
      await updateUserPassword(data.currentPassword, data.newPassword);
      toast.success('Password updated successfully!');
    } catch (error) {
      toast.error('Error updating password');
    }
  };

  return (
    <Card className="max-w-lg p-4 my-4">
      <CardHeader>
        <CardTitle>Update Password</CardTitle>
        <CardDescription>Enter your current password to make an update</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handlePasswordUpdate)} className="space-y-4">
          {/* Current Password */}
          <div className="relative">
            <Controller
              name="currentPassword"
              control={control}
              rules={{ required: 'Current password is required' }}
              render={({ field }) => (
                <div>
                    <label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">Current Password</label>
                  <Input
                    {...field}
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="Current Password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              )}
            />
            {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>}
          </div>

          {/* New Password */}
          <div className="relative">
            <Controller
              name="newPassword"
              control={control}
              rules={{ required: 'New password is required' }}
              render={({ field }) => (
                <div>
                    <label className="block text-sm font-medium">New Password</label>
                  <Input
                    {...field}
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="New Password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              )}
            />
            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
          </div>

          {/* Confirm New Password */}
          <div className="relative">
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: 'Please confirm your new password',
                validate: (value) => value === getValues('newPassword') || 'Passwords do not match',
              }}
              render={({ field }) => (
                <div>
                <label className="block text-sm font-medium">Confirm New Password</label>
                  <Input
                    {...field}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm New Password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              )}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          {/* Update Button */}
          <CardFooter className="flex justify-end">
            <Button type="submit">Update Password</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

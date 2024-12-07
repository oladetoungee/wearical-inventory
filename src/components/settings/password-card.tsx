'use client';

import { useState } from 'react';
import { updateUserPassword } from '@/lib/services/auth';
import { Button, Input } from '@/components/ui';
import { toast } from 'react-toastify';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordFieldProps {
  fieldName: keyof FormData;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  control: any;
  errors: any;
  getValues: any;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  fieldName,
  showPassword,
  setShowPassword,
  label,
  control,
  errors,
  getValues,
}) => (
  <div className="relative">
    <Controller
      name={fieldName}
      control={control}
      rules={{
        required: `${label} is required`,
        ...(fieldName === 'confirmPassword' && {
          validate: (value: string) =>
            value === getValues('newPassword') || 'Passwords do not match',
        }),
      }}
      render={({ field }) => (
        <div>
          <label htmlFor={fieldName} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <Input
            {...field}
            type={showPassword ? 'text' : 'password'}
            placeholder={label}
            className="pr-10"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 mt-4 flex items-center text-sm text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      )}
    />
    {errors[fieldName] && <p className="text-red-500 text-sm mt-1">{errors[fieldName]?.message as string}</p>}
  </div>
);

export const UpdatePassword: React.FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const { control, handleSubmit, formState: { errors }, getValues, reset } = useForm<FormData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handlePasswordUpdate: SubmitHandler<FormData> = async (data) => {
    try {
      await updateUserPassword(data.currentPassword, data.newPassword);
      toast.success('Password updated successfully!');
    } catch (error: any) {
      toast.error('Error updating password');
      console.error('Error updating password:', error.code, error.message);
    } finally {
      reset();
    }
  };

  return (
    <Card className="max-w-lg p-6 my-4">
      <CardHeader>
        <CardTitle>Update Password</CardTitle>
        <CardDescription>Enter your current password to make an update</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handlePasswordUpdate)} className="space-y-6">
          <PasswordField
            fieldName="currentPassword"
            showPassword={showCurrentPassword}
            setShowPassword={setShowCurrentPassword}
            label="Current Password"
            control={control}
            errors={errors}
            getValues={getValues}
          />
          <PasswordField
            fieldName="newPassword"
            showPassword={showNewPassword}
            setShowPassword={setShowNewPassword}
            label="New Password"
            control={control}
            errors={errors}
            getValues={getValues}
          />
          <PasswordField
            fieldName="confirmPassword"
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
            label="Confirm New Password"
            control={control}
            errors={errors}
            getValues={getValues}
          />
          <CardFooter className="flex justify-end">
            <Button type="submit">Update Password</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

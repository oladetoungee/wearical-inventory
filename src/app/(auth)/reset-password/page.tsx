"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Input } from '@/components/ui';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/utils/firebase'; // Import your Firebase auth instance

interface ResetPasswordFormValues {
  email: string;
}

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormValues>();

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (data) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      toast.success('Password reset email sent! Please check your inbox.');
    } catch (error) {
      toast.error('Failed to send reset email. Please check the email address and try again.');
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-primary100 mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <p className='text-black100 text-sm my-2'>Email</p>
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            className={`${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        
        <Button type="submit" className="w-full" >
          Send Reset Link
        </Button>
      </form>
      <ToastContainer />
    </>
  );
};

export default ResetPassword;

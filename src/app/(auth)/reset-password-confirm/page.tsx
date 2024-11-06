"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '@/lib/utils/firebase';
import { useRouter, useSearchParams } from 'next/navigation';

interface ResetPasswordFormValues {
  password: string;
}

const ResetPasswordConfirm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormValues>();
  const oobCode = searchParams.get("oobCode"); // Get the code from the URL

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (data) => {
    if (!oobCode) {
      toast.error("Invalid or expired link.");
      return;
    }

    setIsSubmitting(true);
    try {
      await confirmPasswordReset(auth, oobCode, data.password);
      toast.success("Password has been reset successfully!");
      router.push('/sign-in'); // Redirect to sign-in page
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Set New Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <p className='text-black100 text-sm my-2'>New Password</p>
          <input
            type="password"
            placeholder="Enter your new password"
            {...register("password", { required: "Password is required" })}
            className={`${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <button type="submit" className="w-full btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Reset Password"}
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default ResetPasswordConfirm;

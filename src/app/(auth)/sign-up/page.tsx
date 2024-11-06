"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Input } from '@/components/ui';
import Link from 'next/link';
import { signUp } from '@/lib/services/auth';

interface SignUpFormValues {
  fullName: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>();

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    try {
      await signUp(data.email, data.password);
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error('Failed to create an account. Please try again.');
    }
  };
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <p className='text-black100 text-sm my-2'>Full Name</p>
          <Input
            type="name"
            placeholder="Full Name"
            {...register("fullName", { required: "Full Name is required" })}
            className={`${errors.fullName ? 'border-red-500' : ''}`} 
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div>
        <p className='text-black100 text-sm my-2'>Email</p>
          <Input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className={`${errors.email ? 'border-red-500' : ''}`} 
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div>
        <p className='text-black100 text-sm my-2'>Password</p>
          <Input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className={`${errors.password ? 'border-red-500' : ''}`} 
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
        <p className='text-center text-black100 text-sm'>Have an Account? <Link className='font-semibold hover:underline' href={'/sign-in'}>Sign In</Link></p>
      </form>
      <ToastContainer />
    </>
  );
};

export default SignUp;

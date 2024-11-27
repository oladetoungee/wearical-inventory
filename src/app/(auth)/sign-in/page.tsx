"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button, Input } from '@/components/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/services/auth';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface SignInFormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const router = useRouter(); 
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SignInFormValues>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    try {
      await signIn(data.email, data.password);
      // toast.success('Signed in successfully!');
      reset();
      router.push('/');
    } catch (error) {
      // toast.error('Sign in failed. Please check your credentials.');
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-primary100 mb-4">Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

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
          <p className="text-black100 text-sm my-2">Password</p>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className={`${errors.password ? 'border-red-500' : ''}`} 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-sm"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <Link className='hover:underline text-green100 text-sm my-2' href={'/reset-password'}>
            Forget Password
          </Link>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Sign In
        </Button>
        <p className='text-center text-black100 text-sm'>
          Don't have an Account? 
          <Link className='font-semibold hover:underline' href={'/sign-up'}> Sign Up</Link>
        </p>
      </form>
    </>
  );
};

export default SignIn;

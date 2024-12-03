'use client';

import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Input,
  Button, Spinner
} from "@/components/ui";
import { toast } from 'react-toastify';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui"; 
import { useUser } from '@/lib/hooks';
import { storage, db } from '@/lib/utils/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, update } from 'firebase/database';
import { Camera } from 'lucide-react';
import { useEffect } from 'react';

export const InfoCard = () => {
  const { userData, loading } = useUser();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
    },
  });


useEffect(() => {
    if (!loading && userData) {
      reset({
        fullName: userData.fullName || '',
        email: userData.email || '',
      });
    }
  }, [loading, userData, reset]);

  const onSubmit = async (data: any) => {
    try {
      const userRef = dbRef(db, `users/${userData?.uid}`);
      await update(userRef, {
        fullName: data.fullName,
        email: data.email,
      });
      toast.success('Personal information updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Error updating information');
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const username = userData?.fullName || 'user';
      const storagePath = `user-images/${username}/${file.name}`;
      const avatarRef = storageRef(storage, storagePath);

      try {
        await uploadBytes(avatarRef, file);
        const downloadURL = await getDownloadURL(avatarRef);

        const userRef = dbRef(db, `users/${userData?.uid}`);
        await update(userRef, {
          avatarUrl: downloadURL,
        });

        toast.success('Avatar updated successfully!');
      } catch (error) {
        console.error(error);
        toast.error('Error uploading avatar');
      }
    }
  };

  // Show spinner until userData is loaded
  if (loading || !userData) return <Spinner />;

  return (
    <Card className="max-w-lg p-4 my-4">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal details here.</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col my-8">
        <div className="relative">
  <Avatar className="w-48 h-48">
    <AvatarImage
      src={userData?.avatarUrl || '/default-avatar.png'}
      alt="User Avatar"
    />
    <AvatarFallback>
      {userData?.fullName
        ? userData?.fullName
            .split(' ')
            .slice(0, 2)
            .map(word => word[0])
            .join('')
        : 'UA'}
    </AvatarFallback>
  </Avatar>
    <label htmlFor="avatar" className="absolute bottom-0 left-32 bg-black100 text-white p-2 rounded-full cursor-pointer">
    <Camera size={20} />
    <input
      id="avatar"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleAvatarChange}
    />
  </label>
</div>

        </div>

        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter your full name" />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter your email" />
                )}
              />
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button onClick={handleSubmit(onSubmit)}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};



import { ReactNode } from 'react';
import Image from 'next/image';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex h-screen p-0 m-0">
      <div className="w-full md:w-1/2 flex flex-col bg-white px-16">
        <div className="my-20">
          <h1 className="text-4xl font-bold text-primary100 leading-4 tracking-wide">Wearical</h1>
        </div>
        {children}
      </div>

      <div className="hidden md:block md:w-1/2 h-full m-0 p-0 relative">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/wearical.appspot.com/o/assets%2FauthImage.png?alt=media&token=56c6f9bb-4087-4248-9877-9231082dd0fe"
          alt="Authentication Image"
          layout="fill"
          objectFit="cover"
          objectPosition="top" 
          unoptimized
          priority 
        />
     
      </div>
    </div>
  );
};

export default AuthLayout;

import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex h-screen">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col bg-white px-24">
        <div className="my-32">
          <h1 className="text-4xl font-bold text-primary100 leading-4 tracking-wide">Wearical</h1>
       
        </div>
        {children} {/* This will render the form content */}
      </div>


      <div className="hidden md:block md:w-1/2 h-full">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/wearical.appspot.com/o/assets%2FauthImage.png?alt=media&token=56c6f9bb-4087-4248-9877-9231082dd0fe"
          alt="Authentication Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

"use client";

import { ToastContainer } from 'react-toastify';



export default function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastContainer
        position="top-center"      
        autoClose={5000}           
        hideProgressBar={false}    
        newestOnTop={true}         
        closeOnClick={true}       
        pauseOnHover={true}       
        draggable={true}               
      />
      {children}
    </>
  );
}

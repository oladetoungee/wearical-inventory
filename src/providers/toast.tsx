"use client";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

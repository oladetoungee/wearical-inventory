"use client";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toast.css'; // Add your custom styles here

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
        className="custom-toast-container" 
        toastClassName="custom-toast"     
      />
      {children}
    </>
  );
}

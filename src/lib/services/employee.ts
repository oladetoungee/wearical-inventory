import { ref, update } from 'firebase/database';
import { db } from '../utils/firebase';


export const updateEmployee = async (uid: string, data: any) => {
  try {
    await update(ref(db, `users/${uid}`), data); 
  } catch (error) {
    console.error('Error in updateEmployee function:', error);
    throw error;
  }
};


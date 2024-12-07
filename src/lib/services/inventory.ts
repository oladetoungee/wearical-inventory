import { ref, set, push } from 'firebase/database';
import { db } from '../utils/firebase';
import { InventoryData } from '../utils/definition';

export const addInventory = async (data: InventoryData) => {
  try {
    const newInventoryRef = push(ref(db, 'inventory/'));
    await set(newInventoryRef, {
      ...data,
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in addInventory function:', error);
    throw error;
  }
};

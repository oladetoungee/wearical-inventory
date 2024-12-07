import { ref, set, push } from 'firebase/database';
import { db } from '../utils/firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { InventoryData } from '../utils/definition';

const storage = getStorage();

export const addInventory = async (data: InventoryData, imageFile: File | null) => {
  try {
    let productImageUrl = '';

    if (imageFile) {
      const imageRef = storageRef(storage, `inventory/${data.name}/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      productImageUrl = await getDownloadURL(imageRef);
    }
    const newInventoryRef = push(ref(db, 'inventory/'));
    await set(newInventoryRef, {
      ...data,
      productImageUrl,  
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in addInventory function:', error);
    throw error;
  }
};

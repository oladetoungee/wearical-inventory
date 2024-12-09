import { ref, set, push, get } from 'firebase/database';
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

    const categoryItemCountRef = ref(db, `categories/${data.category}/itemCount`);
    const categorySnapshot = await get(categoryItemCountRef);
    const currentCount = categorySnapshot.exists() ? categorySnapshot.val() : 0; 
    const newCount = currentCount + data.quantity;
    await set(categoryItemCountRef, newCount);
    
  } catch (error) {
    console.error('Error in addInventory function:', error);
    throw error;
  }
};

export const addCategory = async (data: { name: string; description?: string }) => {
  try {
    await set(ref(db, `categories/${data.name}`), {...data, itemCount: 0});
  } catch (error) {
    console.error('Error in addCategory function:', error);
    throw error;
  }
}


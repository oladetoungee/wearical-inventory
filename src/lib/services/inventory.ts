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
      id: newInventoryRef.key,
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

export const deleteInventory = async (inventoryItem: InventoryData) => {
  try {
    await set(ref(db, `inventory/${inventoryItem.id}`), null);
    const categoryItemCountRef = ref(db, `categories/${inventoryItem.category}/itemCount`);
    const categorySnapshot = await get(categoryItemCountRef);
    const currentCount = categorySnapshot.exists() ? categorySnapshot.val() : 0;
    const newCount = currentCount - inventoryItem.quantity;
    await set(categoryItemCountRef, newCount);
  } catch (error) {
    console.error('Error in deleteInventory function:', error);
    throw error;
  }
}

export const updateInventory = async (data: InventoryData, imageFile: File | null) => {
  try {
    // Step 1: Get the current inventory item from the database
    const inventoryRef = ref(db, `inventory/${data.id}`);
    const inventorySnapshot = await get(inventoryRef);

    if (!inventorySnapshot.exists()) {
      throw new Error('Inventory item not found');
    }

    const currentInventory = inventorySnapshot.val();

    // Step 2: Handle image upload if a new image file is provided
    let productImageUrl = currentInventory.productImageUrl;
    if (imageFile) {
      const imageRef = storageRef(storage, `inventory/${data.name}/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      productImageUrl = await getDownloadURL(imageRef);
    }

    // Step 3: Update the inventory item
    const updatedData = {
      ...currentInventory,
      ...data,
      quantity: currentInventory.quantity + (data.restockQuantity || 0), // Update quantity with restock
      productImageUrl, // Use the new or existing image URL
      restockQuantity: data.restockQuantity, // Remove temporary fields
      restockReason: data.restockReason, // Remove temporary fields
      dateUpdated: new Date().toISOString(),
    };

    await set(inventoryRef, updatedData);

    // Step 4: Update the category item count if restock quantity is provided
    if (data.restockQuantity) {
      const categoryItemCountRef = ref(db, `categories/${data.category}/itemCount`);
      const categorySnapshot = await get(categoryItemCountRef);
      const currentCount = categorySnapshot.exists() ? categorySnapshot.val() : 0;
      const newCount = currentCount + data.restockQuantity;
      await set(categoryItemCountRef, newCount);
    }

    console.log('Inventory item updated successfully');
  } catch (error) {
    console.error('Error in updateInventory function:', error);
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


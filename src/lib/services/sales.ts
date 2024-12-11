import { ref, set, push, get } from 'firebase/database';
import { db } from '../utils/firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { InventoryData, UserData } from '../utils/definition';



const storage = getStorage();


export const addInventory = async (data: InventoryData, imageFile: File | null, user: UserData) => {
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
      createdBy: {
        uid: user?.uid || '',
        email: user?.email || '',
        fullName: user?.fullName || '',
      },
      status: data.quantity > data.thresholdValue ? 'In Stock' : data.quantity > 0 ? 'Low Stock' : 'Out of Stock',
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

export const updateInventory = async (data: InventoryData, imageFile: File | null, user: UserData) => {
  try {
    const inventoryRef = ref(db, `inventory/${data.id}`);
    const inventorySnapshot = await get(inventoryRef);

    if (!inventorySnapshot.exists()) {
      throw new Error('Inventory item not found');
    }

    const currentInventory = inventorySnapshot.val();
    let productImageUrl = currentInventory.productImageUrl;
    if (imageFile) {
      const imageRef = storageRef(storage, `inventory/${data.name}/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      productImageUrl = await getDownloadURL(imageRef);
    }
    const updatedData = {
      ...currentInventory,
      ...data,
      quantity: currentInventory.quantity + (data.restockQuantity || 0),
      productImageUrl, 
      restockQuantity: data.restockQuantity, 
      restockReason: data.restockReason, 
      dateUpdated: new Date().toISOString(),
      updatedBy: {
        uid: user?.uid || '',
        email: user?.email || '',
        fullName: user?.fullName || '',
      },
      status: currentInventory.quantity + (data.restockQuantity || 0) > currentInventory.thresholdValue ? 'In Stock' : currentInventory.quantity + (data.restockQuantity || 0) > 0 ? 'Low Stock' : 'Out of Stock',
    };

    await set(inventoryRef, updatedData);

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


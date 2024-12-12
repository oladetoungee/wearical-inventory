import { ref, set, push, get } from 'firebase/database';
import { db } from '../utils/firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { SalesData, UserData } from '../utils/definition';



const storage = getStorage();


export const addSales = async (data: SalesData, imageFile: File | null, user: UserData) => {
  console.log('data:', data);
  // try {
  //   let productImageUrl = '';

  //   if (imageFile) {
  //     const imageRef = storageRef(storage, `sales/${data.name}/${imageFile.name}`);
  //     await uploadBytes(imageRef, imageFile);
  //     productImageUrl = await getDownloadURL(imageRef);
  //   }
  //   const newSalesRef = push(ref(db, 'sales/'));
  //   await set(newSalesRef, {
  //     ...data,
  //     productImageUrl,  
  //     dateCreated: new Date().toISOString(),
  //     dateUpdated: new Date().toISOString(),
  //     id: newSalesRef.key,
  //     createdBy: {
  //       uid: user?.uid || '',
  //       email: user?.email || '',
  //       fullName: user?.fullName || '',
  //     },
  //     status: data.quantity > data.thresholdValue ? 'In Stock' : data.quantity > 0 ? 'Low Stock' : 'Out of Stock',
  //   });

  //   const categoryItemCountRef = ref(db, `categories/${data.category}/itemCount`);
  //   const categorySnapshot = await get(categoryItemCountRef);
  //   const currentCount = categorySnapshot.exists() ? categorySnapshot.val() : 0; 
  //   const newCount = currentCount + data.quantity;
  //   await set(categoryItemCountRef, newCount);

  // } catch (error) {
  //   console.error('Error in addSales function:', error);
  //   throw error;
  // }
};

export const deleteSales = async (salesItem: SalesData) => {
  console.log('salesItem:', salesItem);
  // try {
  //   await set(ref(db, `sales/${salesItem.id}`), null);
  //   const categoryItemCountRef = ref(db, `categories/${salesItem.category}/itemCount`);
  //   const categorySnapshot = await get(categoryItemCountRef);
  //   const currentCount = categorySnapshot.exists() ? categorySnapshot.val() : 0;
  //   const newCount = currentCount - salesItem.quantity;
  //   await set(categoryItemCountRef, newCount);
  // } catch (error) {
  //   console.error('Error in deleteSales function:', error);
  //   throw error;
  // }
}

export const updateSales = async (data: SalesData, imageFile: File | null, user: UserData) => {
  console.log('data:', data);
  // try {
  //   const salesRef = ref(db, `sales/${data.id}`);
  //   const salesSnapshot = await get(salesRef);

  //   if (!salesSnapshot.exists()) {
  //     throw new Error('Sales item not found');
  //   }

  //   const currentSales = salesSnapshot.val();
  //   let productImageUrl = currentSales.productImageUrl;
  //   if (imageFile) {
  //     const imageRef = storageRef(storage, `sales/${data.name}/${imageFile.name}`);
  //     await uploadBytes(imageRef, imageFile);
  //     productImageUrl = await getDownloadURL(imageRef);
  //   }
  //   const updatedData = {
  //     ...currentSales,
  //     ...data,
  //     quantity: currentSales.quantity + (data.restockQuantity || 0),
  //     productImageUrl, 
  //     restockQuantity: data.restockQuantity, 
  //     restockReason: data.restockReason, 
  //     dateUpdated: new Date().toISOString(),
  //     updatedBy: {
  //       uid: user?.uid || '',
  //       email: user?.email || '',
  //       fullName: user?.fullName || '',
  //     },
  //     status: currentSales.quantity + (data.restockQuantity || 0) > currentSales.thresholdValue ? 'In Stock' : currentSales.quantity + (data.restockQuantity || 0) > 0 ? 'Low Stock' : 'Out of Stock',
  //   };

  //   await set(salesRef, updatedData);

  //   if (data.restockQuantity) {
  //     const categoryItemCountRef = ref(db, `categories/${data.category}/itemCount`);
  //     const categorySnapshot = await get(categoryItemCountRef);
  //     const currentCount = categorySnapshot.exists() ? categorySnapshot.val() : 0;
  //     const newCount = currentCount + data.restockQuantity;
  //     await set(categoryItemCountRef, newCount);
  //   }

  //   console.log('Sales item updated successfully');
  // } catch (error) {
  //   console.error('Error in updateSales function:', error);
  //   throw error;
  // }
};




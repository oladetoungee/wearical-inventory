import { ref, set, push, get, remove } from 'firebase/database';
import { db } from '../utils/firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { SalesData, UserData } from '../utils/definition';



const storage = getStorage();

export const addSales = async (data: any) => {
  try {
    const productRef = ref(db, `inventory/${data.product.id}`);
    const productSnapshot = await get(productRef);
    const productData = productSnapshot.val();

    // Validate stock availability
    if (!productData || productData.quantity < data.quantity) {
      throw new Error(
        `Insufficient stock for ${data.product.name}. Only ${productData?.quantity || 0} item(s) available.`
      );
    }

    const newSaleRef = push(ref(db, 'sales/'));
    await set(newSaleRef, {
      ...data,
      id: newSaleRef.key,
    });

    // Update product quantity in inventory
    const updatedQuantity = productData.quantity - data.quantity;
    await set(productRef, { ...productData, quantity: updatedQuantity });

    // Also update the category item count (decrement by the quantity sold)
    const categoryRef = ref(db, `categories/${productData.category}/itemCount`);
    const categorySnapshot = await get(categoryRef);
    const categoryData = categorySnapshot.val();

    if (categoryData) {
      const updatedItemCount = categoryData - data.quantity;
      await set(categoryRef, updatedItemCount);
    }
  } catch (error) {
    console.error('Error in addSales function:', error);
    throw error;
  }
};




export const deleteSale = async (sale: SalesData) => {
  try {
    // Delete the sale entry from the database
    const saleRef = ref(db, `sales/${sale.id}`);
    await remove(saleRef);

    // Restore the product quantity in the inventory
    const productRef = ref(db, `inventory/${sale.product.id}`);
    const productSnapshot = await get(productRef);
    const productData = productSnapshot.val();

    if (productData) {
      const restoredQuantity = productData.quantity + sale.quantity;
      await set(productRef, { ...productData, quantity: restoredQuantity });

      // Also restore the category item count (increment by the quantity sold)
      const categoryRef = ref(db, `categories/${productData.category}/itemCount`);
      const categorySnapshot = await get(categoryRef);
      const categoryData = categorySnapshot.val();

      if (categoryData) {
        const restoredItemCount = categoryData + sale.quantity;
        await set(categoryRef, restoredItemCount);
      }
    }
  } catch (error) {
    console.error('Error in deleteSale function:', error);
    throw error;
  }
};

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




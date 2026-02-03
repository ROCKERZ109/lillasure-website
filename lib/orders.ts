import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Order, OrderStatus, Product } from "@/types";



const ORDERS_COLLECTION = process.env.NEXT_PUBLIC_ORDER_DATABASE as string;

export function addProductstoDb(products: Product[]) {
  
  
  products.map(async (product) => {
   
     const productRef = doc(db, "products", product.id);
     
     await setDoc(productRef, product);
  });
}

// Create a new order
export async function createOrder(
  order: Omit<Order, "id" | "createdAt">,
): Promise<string> {
  try {
    
    const orderData = {
      ...order,
      createdAt: Timestamp.now(),
    };
      
    const newDocRef = doc(collection(db, ORDERS_COLLECTION));

  // 2. Get the auto-generated ID from that reference
    const generatedId = newDocRef.id;
    

  // 3. Add the ID to your data object and save it using setDoc
      await setDoc(newDocRef, {
        ...orderData,
        productId: generatedId // Now the ID is a field inside the document!
      });

  

    return newDocRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
}

// Get all orders (for admin)
export async function getAllOrders(): Promise<Order[]> {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as Order);
    });

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}

// Get orders by email (for customers)
export async function getOrdersByEmail(email: string): Promise<Order[]> {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where("customer.email", "==", email),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as Order);
    });

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}

// Update order status
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
): Promise<void> {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(orderRef, { status });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status");
  }
}

// Get orders by date range
export async function getOrdersByDateRange(
  startDate: Date,
  endDate: Date,
): Promise<Order[]> {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where("pickupDate", ">=", startDate.toISOString().split("T")[0]),
      where("pickupDate", "<=", endDate.toISOString().split("T")[0]),
      orderBy("pickupDate", "asc"),
    );

    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as Order);
    });

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}

//lib/product.ts
import { Order, Product } from "@/types";
import { db } from "./firebase";
import { query, collection, orderBy, getDocs } from "firebase/firestore";




export async function getProducts(): Promise<Product[]> {
    try {
      const q = query(
        collection(db, "products")
      );
  
      const querySnapshot = await getDocs(q);
      const products: Product[] = [];
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        products.push({
          ...data,
          id: doc.id
        } as Product);
      });
      
      return products;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Failed to fetch orders");
    }
}

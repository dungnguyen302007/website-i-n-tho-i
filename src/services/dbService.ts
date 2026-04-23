import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  limit, 
  orderBy,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db, handleFirestoreError } from '../lib/firebase';
import { Product, PRODUCTS } from '../lib/constants';

const PRODUCTS_COLLECTION = 'products';

export async function getProducts(): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    
    // If no products in DB, seed with mock data (optional, but good for demo)
    if (products.length === 0) {
      console.log("No products found in Firestore, using fallback mock data.");
      return PRODUCTS;
    }
    
    return products;
  } catch (error) {
    return handleFirestoreError(error, 'list', PRODUCTS_COLLECTION);
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    
    // Fallback to mock data for demo
    return PRODUCTS.find(p => p.id === id) || null;
  } catch (error) {
    return handleFirestoreError(error, 'get', `${PRODUCTS_COLLECTION}/${id}`);
  }
}

export async function submitContactMessage(name: string, email: string, message: string) {
  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      name,
      email,
      message,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    return handleFirestoreError(error, 'create', 'messages');
  }
}

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
  updateDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db, handleFirestoreError } from '../lib/firebase';
import { Product, PRODUCTS } from '../lib/constants';

const PRODUCTS_COLLECTION = 'products';
const MESSAGES_COLLECTION = 'messages';

export async function getProducts(): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    
    if (products.length === 0) {
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
    
    return PRODUCTS.find(p => p.id === id) || null;
  } catch (error) {
    return handleFirestoreError(error, 'get', `${PRODUCTS_COLLECTION}/${id}`);
  }
}

export async function addProduct(product: Omit<Product, 'id'>) {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...product,
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    return handleFirestoreError(error, 'create', PRODUCTS_COLLECTION);
  }
}

export async function updateProduct(id: string, product: Partial<Product>) {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...product,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    return handleFirestoreError(error, 'update', `${PRODUCTS_COLLECTION}/${id}`);
  }
}

export async function deleteProduct(id: string) {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    return handleFirestoreError(error, 'delete', `${PRODUCTS_COLLECTION}/${id}`);
  }
}

export async function submitContactMessage(name: string, email: string, message: string) {
  try {
    const docRef = await addDoc(collection(db, MESSAGES_COLLECTION), {
      name,
      email,
      message,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    return handleFirestoreError(error, 'create', MESSAGES_COLLECTION);
  }
}

export async function getContactMessages() {
  try {
    const q = query(collection(db, MESSAGES_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    return handleFirestoreError(error, 'list', MESSAGES_COLLECTION);
  }
}

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase.js';

const PRODUCTS_COLLECTION = 'products';

export const getAllProducts = async () => {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const getProductById = async (id) => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  const snap = await getDoc(docRef);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

export const addProductToFirestore = async (productData) => {
  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
    ...productData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return { id: docRef.id, ...productData };
};

export const updateProductInFirestore = async (id, productData) => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, {
    ...productData,
    updatedAt: serverTimestamp(),
  });
  return { id, ...productData };
};

export const deleteProductFromFirestore = async (id) => {
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
  return true;
};
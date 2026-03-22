import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy
} from "firebase/firestore";
import { db } from "./config";

export const saveBooking = async (bookingData) => {
  const docRef = await addDoc(collection(db, "bookings"), {
    ...bookingData,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const saveReview = async (reviewData) => {
  const docRef = await addDoc(collection(db, "reviews"), {
    ...reviewData,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const savePayment = async (paymentData) => {
  const docRef = await addDoc(collection(db, "payments"), {
    ...paymentData,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getUserPayments = async (uid) => {
  if (!uid) return [];
  // Use simple query to avoid needing a Firestore composite index
  const q = query(
    collection(db, "payments"),
    where("uid", "==", uid)
  );
  
  try {
    const querySnapshot = await getDocs(q);
    const payments = [];
    querySnapshot.forEach((doc) => {
      payments.push({ id: doc.id, ...doc.data() });
    });
    
    // Sort locally in descending order
    return payments.sort((a, b) => {
      const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
      const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
      return timeB - timeA;
    });
  } catch (err) {
    console.error("Firestore getDocs Error:", err);
    return [];
  }
};

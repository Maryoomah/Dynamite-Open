import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const COLLECTION_NAME = 'participants';

export const participantService = {
  getFee: (category, subCategory) => {
    if (category === 'School Registration') return 0;

    // Ensure "Non-Student Male" doesn't falsely return true for includes('student')
    if (subCategory === 'Student' || subCategory === 'Non-Student Female') {
      return 10000;
    }
    return 15000;
  },

  getParticipants: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      const participants = [];
      querySnapshot.forEach((doc) => {
        participants.push({ id: doc.id, ...doc.data() });
      });
      return participants;
    } catch (error) {
      console.error('Error fetching participants:', error);
      return [];
    }
  },

  addParticipant: async (participant) => {
    try {
      const participantData = {
        ...participant,
        registrationDate: new Date().toISOString(),
      };
      const docRef = await addDoc(
        collection(db, COLLECTION_NAME),
        participantData,
      );
      return { id: docRef.id, ...participantData };
    } catch (error) {
      console.error('Error adding participant:', error);
      throw error;
    }
  },

  updateParticipant: async (id, updatedFields) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, updatedFields);
      return true;
    } catch (error) {
      console.error('Error updating participant:', error);
      throw error;
    }
  },

  deleteParticipant: async (id) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error('Error deleting participant:', error);
      throw error;
    }
  },

  verifyAdminCode: (code) => {
    const ADMIN_CODE = import.meta.env.VITE_ADMIN_CODE || 'J4YU-6AQ-K5L2';
    return code.toUpperCase() === ADMIN_CODE;
  },
};

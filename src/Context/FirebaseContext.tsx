import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore, getDocs } from "firebase/firestore";

// i hAVE MADE THE .ENV FILE IT IS NOT WORKING OUT 
const firebaseConfig = {
  apiKey: "AIzaSyCeeML7MvsNjDlmZ2LNUQM9Jgrx7dM2jE0",
  authDomain: "internship-b3968.firebaseapp.com",
  projectId: "internship-b3968",
  storageBucket: "internship-b3968.firebasestorage.app",
  messagingSenderId: "968642192957",
  appId: "1:968642192957:web:946af046d9ef9418bf6c54",
  measurementId: "G-9TJ242E02K"
};
console.log(import.meta.env.VITE_api_key,)
console.log(import.meta.env.VITE_authDomain,)

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

interface FirebaseContextValue {
  user: User | null;
  loading: boolean;
  signupWithEmail: (email: string, password: string) => Promise<User | null>;
  loginWithEmail: (email: string, password: string) => Promise<User | null>;
  loginWithGoogle: () => Promise<User | null>;
  logout: () => Promise<void>;
  addUser: (userData: Record<string, any>) => Promise<void>;
  getDataFromFirestore: (collectionName: string) => Promise<any[]>;
}

const FirebaseContext = createContext<FirebaseContextValue | null>(null);

interface FirebaseProviderProps {
  children: ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signupWithEmail = async (email: string, password: string): Promise<User | null> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };
  const loginWithEmail = async (email: string, password: string): Promise<User | null> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error logging in with email and password:", error);
      throw error;
    }
  };


  const addUser = async (userData: Record<string, any>): Promise<void> => {
    try {
      const userCollection = collection(db, "users");
      await addDoc(userCollection, userData); // 
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  };

  const getDataFromFirestore = async (collectionName: string): Promise<any[]> => {
    try {
      const snapshot = await getDocs(collection(db, collectionName));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return data;
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
      throw error;
    }
  };


  const loginWithGoogle = async (): Promise<User | null> => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error("Error logging in with Google:", error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };



  const value: FirebaseContextValue = useMemo(
    () => ({
      user,
      loading,
      signupWithEmail,
      loginWithEmail,
      loginWithGoogle,
      logout,
      getDataFromFirestore,
      addUser
    }),
    [user, loading]
  );

  return (
    <FirebaseContext.Provider value={value}>
      {loading ? <div>Loading...</div> : children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = (): FirebaseContextValue => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};

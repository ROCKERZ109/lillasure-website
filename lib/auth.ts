// lib/auth.ts

import { 
    browserLocalPersistence, 
    browserSessionPersistence, 
    createUserWithEmailAndPassword, 
    setPersistence, 
    signInWithEmailAndPassword, 
    signOut,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
    sendPasswordResetEmail
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { UserData } from "@/types";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

// ==================== SIGN UP ====================
export async function signUp(
    email: string, 
    name: string, 
    phone: string, 
    password: string,
    rememberMe: boolean = false
): Promise<UserData> {
    // Set persistence
    await setPersistence(
        auth, 
        rememberMe ? browserLocalPersistence : browserSessionPersistence
    );

    // Create auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create Firestore record
    await createUserRecord(user.uid, name, phone, email);
    const uid = user.uid
    // Return user data
    return {
        name,
        email,
        phone,
        uid
    };
}

// ==================== SIGN IN ====================
export async function signIn(
    email: string,  
    password: string, 
    rememberMe: boolean = true
): Promise<void> {
    await setPersistence(
        auth, 
        rememberMe ? browserLocalPersistence : browserSessionPersistence
    );
    
    const userCreds = await signInWithEmailAndPassword(auth, email, password);
    
}

// ==================== SIGN OUT ====================
export async function logOut(): Promise<void> {
    await signOut(auth);
}

// ==================== PASSWORD RESET (Email) ====================
export async function resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
}

// ==================== CHANGE PASSWORD (Logged in) ====================
export async function changePassword(
    currentPassword: string, 
    newPassword: string
): Promise<void> {
    const user = auth.currentUser;
    
    if (!user || !user.email) {
        throw new Error('No user logged in');
    }

    // Re-authenticate first
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    // Update password
    await updatePassword(user, newPassword);
}

// ==================== CREATE USER RECORD ====================
async function createUserRecord(
    uid: string,
    name: string,
    phone: string,
    email: string
): Promise<string> {
    const userRef = doc(db, process.env.NEXT_PUBLIC_USER_DATABASE as string, uid);  // ✅ Use uid as document ID

    await setDoc(userRef, {
        uid,
        name,
        phone,
        email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    });

    return uid;
}

import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
export const updateUserProfile = async (
    uid: string, 
    data: { name?: string; phone?: string }
) => {
    const userRef = doc(db, 'test-users', uid);
    await updateDoc(userRef, {
        ...data,
        updatedAt: serverTimestamp()
    });
};
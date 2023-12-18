import { CollectionReference, DocumentData, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const getCollection = (collectionName: string) => {
	return collection(db, collectionName);
};

export const addToDB = async (collectionRef: CollectionReference<DocumentData, DocumentData>, data: unknown) => {
	await addDoc(collectionRef, data);
};

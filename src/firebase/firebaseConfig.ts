import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDGboxjCphy2P576NfSf7n9bddxjcDSg3w',
	authDomain: 'cafe-in-service.firebaseapp.com',
	projectId: 'cafe-in-service',
	storageBucket: 'cafe-in-service.appspot.com',
	messagingSenderId: '229649891904',
	appId: '1:229649891904:web:3e5fb1a7324a60f84315a5',
	measurementId: 'G-E7FP3KMRBR',
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

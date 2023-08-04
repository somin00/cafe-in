import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
// const firebaseConfig = {
// 	apiKey: 'AIzaSyDGboxjCphy2P576NfSf7n9bddxjcDSg3w',
// 	authDomain: 'cafe-in-service.firebaseapp.com',
// 	projectId: 'cafe-in-service',
// 	storageBucket: 'cafe-in-service.appspot.com',
// 	messagingSenderId: '229649891904',
// 	appId: '1:229649891904:web:3e5fb1a7324a60f84315a5',
// 	measurementId: 'G-E7FP3KMRBR',
// };

const firebaseConfig = {
	apiKey: 'AIzaSyDCU8cUBolFus2QjDrsJ8Qy7R4UIV1I4gY',
	authDomain: 'test-cafe-in.firebaseapp.com',
	projectId: 'test-cafe-in',
	storageBucket: 'test-cafe-in.appspot.com',
	messagingSenderId: '265303953088',
	appId: '1:265303953088:web:fdae41c32b7340c6a72725',
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

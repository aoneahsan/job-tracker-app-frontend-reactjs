// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getStorage,
  ref,
  uploadBytes,
  getBlob,
  getDownloadURL
} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const _frbStorage = getStorage(app);

export const uploadFirebaseFile = async (file: File, path: string) => {
  const storageRef = ref(_frbStorage, path);
  return await uploadBytes(storageRef, file);
};

export const getFirebaseFileUrl = () => {
  // const _ref = ref(_frbStorage, 'uploaded-files/test-file-8544.png');
  const _ref = ref(_frbStorage, 'uploaded-files');
  return getDownloadURL(_ref);
};

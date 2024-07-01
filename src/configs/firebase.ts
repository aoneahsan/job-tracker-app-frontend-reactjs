import { getZUniqueKey } from './../utils/helpers/index';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  UploadResult
} from 'firebase/storage';
import ENVS from '@/utils/envKeys';
import { reportCustomError } from '@/utils/helpers';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: ENVS.fbConfig.apiKey,
  authDomain: ENVS.fbConfig.authDomain,
  projectId: ENVS.fbConfig.projectId,
  storageBucket: ENVS.fbConfig.storageBucket,
  messagingSenderId: ENVS.fbConfig.messagingSenderId,
  appId: ENVS.fbConfig.appId,
  measurementId: ENVS.fbConfig.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const _frbStorage = getStorage(app);

export const getFirebaseFileUrl = () => {
  // const _ref = ref(_frbStorage, 'uploaded-files/test-file-8544.png');
  const _ref = ref(_frbStorage, 'uploaded-files');
  return getDownloadURL(_ref);
};

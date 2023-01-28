import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
//   appId: process.env.REACT_APP_APP_ID,
// };
const firebaseConfig = {
  apiKey: 'AIzaSyAzPvVjcSm-Pq2jkHRv7Jh9UoK23P3J8lQ',
  authDomain: 'shamaliroshan-com.firebaseapp.com',
  projectId: 'shamaliroshan-com',
  storageBucket: 'shamaliroshan-com.appspot.com',
  messagingSenderId: '955758680872',
  appId: '1:955758680872:web:9c8e27187735cdb7f54e1d',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

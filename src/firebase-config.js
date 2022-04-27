import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { devToken } from "./dev";

const firebaseConfig = {
  apiKey: devToken.REACT_APP_APIKEY,
  authDomain: devToken.REACT_APP_AUTH_DOMAIN,
  databaseURL: devToken.REACT_APP_DATA_BASE_URL,
  projectId: devToken.REACT_APP_PROJECT_ID,
  storageBucket: devToken.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: devToken.REACT_APP_MESSAGING_SENDER_ID,
  appId: devToken.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

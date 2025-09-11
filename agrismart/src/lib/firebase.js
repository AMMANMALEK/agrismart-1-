import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app;
let authInstance;
let providerInstance;

try {
  if (firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.appId) {
    app = initializeApp(firebaseConfig);
    authInstance = getAuth(app);
    providerInstance = new GoogleAuthProvider();
  } else {
    console.warn("Firebase env vars missing. Skipping Firebase initialization in dev.");
  }
} catch (e) {
  console.error("Firebase initialization failed", e);
}

export const auth = authInstance;
export const googleProvider = providerInstance;
export { RecaptchaVerifier };



// Import Firebase core + authentication
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// ✅ Your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyARbAICaiFrh8XCOh4tntgem9LAK7r51Eg",
  authDomain: "recipenest-8eb40.firebaseapp.com",
  projectId: "recipenest-8eb40",
  storageBucket: "recipenest-8eb40.appspot.com", // fixed domain typo (.app → .appspot.com)
  messagingSenderId: "473460730339",
  appId: "1:473460730339:web:177fb213c51dd9f3ac98d6",
  measurementId: "G-60D8PTD4Q0"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ✅ Providers (Google / Phone)
export const googleProvider = new GoogleAuthProvider();
export { RecaptchaVerifier, signInWithPhoneNumber };

import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { registerUserInDB } from "./users";

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const register = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (result) {
      await updateProfile(result.user, { displayName: username });
      await registerUserInDB(username, email);
    }
    return result;
  } catch (error: any) {
    if (error.toString().includes("(auth/email-already-in-use)")) {
      return "email-already-in-use";
    }
  }
};

export const socialSignUp = async (socialNetwork: "facebook" | "google") => {
  try {
    const result = await signInWithPopup(
      auth,
      socialNetwork === "google"
        ? new GoogleAuthProvider()
        : new FacebookAuthProvider()
    );
    if (result.user.displayName === null || result.user.email === null) {
      throw new Error("User name or email is missing");
    }
    if (result) {
      await registerUserInDB(result.user.displayName, result.user.email);
    }
  } catch (error: any) {
    console.error(error);
  }
};

export const logout = () => {
  auth.signOut();
};

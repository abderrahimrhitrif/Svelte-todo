import { writable } from "svelte/store";
import { auth } from "../lib/firebase.client";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export const authStore = writable({
    isLoading: true,
    currentUser: null
})

export const authHandlers = {
    signInWithGoogle : async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    },
    logout : async () => {
        await signOut(auth)
    }
    
    
}
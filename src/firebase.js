import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDVVWOffDh2IIzWEmXiPLvaydTLGmWI1Xs",
    authDomain: "cvetalina-birthday.firebaseapp.com",
    projectId: "cvetalina-birthday",
    storageBucket: "cvetalina-birthday.firebasestorage.app",
    messagingSenderId: "101869059890",
    appId: "1:101869059890:web:44e0d0ae4b878ffd8c612b"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const guestsCollection = collection(db, "guests");

export async function addGuestToDB(guestData, attendance) {
    await addDoc(guestsCollection, {
        name: guestData.name,
        attendance,
        createdAt: new Date().toISOString()
    });
}

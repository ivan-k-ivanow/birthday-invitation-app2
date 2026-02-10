// Firebase init
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



// Взимаме данните от формата
function getGuestData() {
    const form = document.querySelector("#attendence-form");
    const name = form.querySelector("input[name='guestName']").value.trim();
    const guestData = {
        name: name,
    }
    return guestData;
}


// Добавяне на гост във Firestore
async function addGuestToDB(guestData, attendance) {
    try {
        const guestsCol = collection(db, "guests");
        await addDoc(guestsCol, {
            name: guestData.name,
            attendance,
            createdAt: new Date().toISOString(),
        });
    } catch (err) {
        console.error("Error adding guest:", err);
    }
}

// Submit на формата
function attendenceFormSubmit() {
    const form = document.querySelector("#attendence-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); s
        const guestData = getGuestData();
        if (!guestData.name) {
            showMessage("Моля, въведете името си.", "error");
            return;
        }

        const attendanceSelect = form.querySelector("select");
        const attendance = attendanceSelect.value;

        // записваме госта
        await addGuestToDB(guestData, attendance);
        showMessage("Благодарим за потвърждението! 🎉");
    });
}

function showMessage(text, type = "success") {
    const container = document.querySelector("#message-container");
    container.textContent = text;
    container.className = type; // може да имаш различни стилове за success / error

    // Изчезва след 3 секунди
    setTimeout(() => {
        container.textContent = "";
        container.className = "";
    }, 6000);
}



// Инициализация
attendenceFormSubmit();




import { addGuestToDB } from './firebase.js';
import { showMessage } from './utils.js';

export function getGuestData() {
    const form = document.querySelector("#attendence-form");
    const name = form.querySelector("input[name='guestName']").value.trim();
    return { name };
}

export function attendenceFormSubmit() {
    const form = document.querySelector("#attendence-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const guestData = getGuestData();
        if (!guestData.name) {
            showMessage("Моля, въведете името/имената си!", "error");
            return;
        }

        const attendance = form.querySelector("select").value;
        await addGuestToDB(guestData, attendance);

        showMessage("Благодаря за потвърждението и че ще споделиш/те този специален ден с мен! 🎉");
    });
}

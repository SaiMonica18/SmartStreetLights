import { auth, db, doc, updateDoc, onSnapshot } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// ================= Authentication =================
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "index.html";
    }
});

const streetRef = doc(db, "streetLights", "control");

// ================= BUTTONS =================
const autoBtn = document.getElementById("autoBtn");
const semiBtn = document.getElementById("semiBtn");
const manualBtn = document.getElementById("manualBtn");
const allOn = document.getElementById("allOn");
const allOff = document.getElementById("allOff");

// ================= SECTIONS & TEXT =================
const manualSection = document.getElementById("manualSection");
const status = document.getElementById("status");
const sensorStatus = document.getElementById("sensorStatus");

// Hide manual section initially
manualSection.style.display = "none";

// ================= MODE SELECTION =================
autoBtn.addEventListener("click", async () => {
    manualSection.style.display = "none";
    await updateDoc(streetRef, { mode: "Automatic" });
});

semiBtn.addEventListener("click", async () => {
    manualSection.style.display = "none";
    await updateDoc(streetRef, { mode: "Semi Automatic" });
});

manualBtn.addEventListener("click", async () => {
    manualSection.style.display = "block";
    await updateDoc(streetRef, { mode: "Manual" });
});

// ================= MANUAL CONTROLS =================
allOn.addEventListener("click", async () => {
    await updateDoc(streetRef, { allLights: true, light1: true });
});

allOff.addEventListener("click", async () => {
    await updateDoc(streetRef, { allLights: false, light1: false });
});

// ================= LIVE FIREBASE LISTENER =================
onSnapshot(streetRef, (snapshot) => {
    const data = snapshot.data();
    if (!data) return;

    // 1. Check for Emergency Override
    if (data.mode === "Emergency Override") {
        status.innerHTML = "🚨 EMERGENCY OVERRIDE! <br><span style='color:red; font-size:14px;'>Lights Forced ON. Buzzer Active.</span>";
        manualSection.style.display = "none";
    } else {
        // Show current mode
        status.innerHTML = `Mode: <b>${data.mode}</b>`;
        
        // Ensure manual buttons only show in Manual mode
        if (data.mode === "Manual") {
            manualSection.style.display = "block";
        } else {
            manualSection.style.display = "none";
        }
    }

    // 2. Display Clean Sensor Data
    let environment = data.ldr1 ? "🌙 Night" : "☀️ Day";
    let motion = data.motion ? "🚶 Detected" : "🚫 None";

    sensorStatus.innerHTML = `
        <b>LDR (Light):</b> ${environment}
        <br><br>
        <b>PIR (Motion):</b> ${motion}
    `;
});

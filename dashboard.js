import { auth, db, doc, updateDoc, onSnapshot } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// ================= Authentication =================
onAuthStateChanged(auth, (user) => {
    if (!user) {
        alert("Please Login First");
        window.location.href = "index.html";
    }
});

// Firebase Document Reference
const streetRef = doc(db, "streetLights", "control");

// ================= BUTTONS =================
const autoBtn = document.getElementById("autoBtn");
const semiBtn = document.getElementById("semiBtn");
const manualBtn = document.getElementById("manualBtn");

const allOn = document.getElementById("allOn");
const allOff = document.getElementById("allOff");

// ================= SECTIONS =================
const autoSection = document.getElementById("autoSection");
const semiSection = document.getElementById("semiSection");
const manualSection = document.getElementById("manualSection");
const status = document.getElementById("status");
const sensorStatus = document.getElementById("sensorStatus");

// Hide all sections initially
autoSection.style.display = "none";
semiSection.style.display = "none";
manualSection.style.display = "none";

// ================= MODE SELECTION =================
autoBtn.addEventListener("click", async () => {
    autoSection.style.display = "block";
    semiSection.style.display = "none";
    manualSection.style.display = "none";
    await updateDoc(streetRef, { mode: "Automatic" });
});

semiBtn.addEventListener("click", async () => {
    autoSection.style.display = "none";
    semiSection.style.display = "block";
    manualSection.style.display = "none";
    await updateDoc(streetRef, { mode: "Semi Automatic" });
});

manualBtn.addEventListener("click", async () => {
    autoSection.style.display = "none";
    semiSection.style.display = "none";
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

    // 1. Check for Emergency Override from Woman Safety App
    if (data.mode === "Emergency Override") {
        status.innerHTML = "🚨 EMERGENCY OVERRIDE ACTIVE! <br><span style='color:red; font-size:14px;'>All lights forced ON for safety. Buzzer sounding.</span>";
        autoSection.style.display = "none";
        semiSection.style.display = "none";
        manualSection.style.display = "none";
    } else {
        // Normal Status display
        status.innerHTML = `Current Mode: <b>${data.mode}</b>`;
    }

    // 2. Display Sensor Data
    let environment = data.ldr1 ? "🌙 Night Detected" : "☀️ Day Detected";
    let motion = data.motion ? "🚶 Motion Detected" : "🚫 No Motion";

    sensorStatus.innerHTML = `
        <b>☀️ LDR Sensor (Light)</b><br>${environment}
        <br><br>
        <b>🚶 PIR Sensor (Motion)</b><br>${motion}
    `;
});

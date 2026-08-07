import {
    auth,
    db,
    doc,
    updateDoc,
    onSnapshot
} from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// ================= Authentication =================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        alert("Please Login First");

        window.location.href = "index.html";

    }

});

// Firebase Document

const streetRef = doc(db, "streetLights", "control");



// ================= BUTTONS =================


const autoBtn = document.getElementById("autoBtn");

const semiBtn = document.getElementById("semiBtn");

const manualBtn = document.getElementById("manualBtn");


// Manual Buttons

const allOn = document.getElementById("allOn");

const allOff = document.getElementById("allOff");


const light1On = document.getElementById("light1On");

const light1Off = document.getElementById("light1Off");


const light2On = document.getElementById("light2On");

const light2Off = document.getElementById("light2Off");


// Semi Automatic Buttons

const semiOn = document.getElementById("semiOn");

const semiOff = document.getElementById("semiOff");



// ================= SECTIONS =================


const autoSection =
document.getElementById("autoSection");


const semiSection =
document.getElementById("semiSection");


const manualSection =
document.getElementById("manualSection");



// ================= STATUS =================


const status =
document.getElementById("status");


const sensorStatus =
document.getElementById("sensorStatus");


const pirBrightness =
document.getElementById("pirBrightness");



// Hide all sections initially

autoSection.style.display = "none";

semiSection.style.display = "none";

manualSection.style.display = "none";





// =================================================
// AUTOMATIC MODE
// =================================================


autoBtn.addEventListener("click", async()=>{


    autoSection.style.display = "block";

    semiSection.style.display = "none";

    manualSection.style.display = "none";


    status.innerHTML =
    "🌙 Automatic Mode Enabled";


    await updateDoc(streetRef,{

        mode:"Automatic"

    });


});







// =================================================
// SEMI AUTOMATIC MODE
// =================================================


semiBtn.addEventListener("click", async()=>{


    autoSection.style.display = "none";

    semiSection.style.display = "block";

    manualSection.style.display = "none";


    status.innerHTML =
    "⚡ Semi Automatic Mode Enabled";


    await updateDoc(streetRef,{

        mode:"Semi Automatic"

    });


});







// =================================================
// MANUAL MODE
// =================================================


manualBtn.addEventListener("click", async()=>{


    manualSection.style.display = "block";

    autoSection.style.display = "none";

    semiSection.style.display = "none";


    status.innerHTML =
    "👨‍💻 Manual Mode Enabled";


    await updateDoc(streetRef,{

        mode:"Manual"

    });


});







// =================================================
// SEMI AUTOMATIC LIGHT CONTROL
// =================================================


// Light ON

semiOn.addEventListener("click", async()=>{


    status.innerHTML =
    "💡 Semi Automatic Light ON";


    await updateDoc(streetRef,{

        light:true

    });


});




// Light OFF

semiOff.addEventListener("click", async()=>{


    status.innerHTML =
    "⚫ Semi Automatic Light OFF";


    await updateDoc(streetRef,{

        light:false

    });


});







// =================================================
// MANUAL ALL LIGHT CONTROL
// =================================================



allOn.addEventListener("click", async()=>{


    status.innerHTML =
    "💡 All Street Lights ON";


    await updateDoc(streetRef,{

        allLights:true,

        light1:true,

        light2:true

    });


});





allOff.addEventListener("click", async()=>{


    status.innerHTML =
    "⚫ All Street Lights OFF";


    await updateDoc(streetRef,{

        allLights:false,

        light1:false,

        light2:false

    });


});







// =================================================
// STREET LIGHT 1
// =================================================



light1On.addEventListener("click", async()=>{


    status.innerHTML =
    "💡 Street Light 1 ON";


    await updateDoc(streetRef,{

        light1:true

    });


});




light1Off.addEventListener("click", async()=>{


    status.innerHTML =
    "⚫ Street Light 1 OFF";


    await updateDoc(streetRef,{

        light1:false

    });


});







// =================================================
// STREET LIGHT 2
// =================================================



light2On.addEventListener("click", async()=>{


    status.innerHTML =
    "💡 Street Light 2 ON";


    await updateDoc(streetRef,{

        light2:true

    });


});





light2Off.addEventListener("click", async()=>{


    status.innerHTML =
    "⚫ Street Light 2 OFF";


    await updateDoc(streetRef,{

        light2:false

    });


});








// =================================================
// LIVE FIREBASE SENSOR DATA
// =================================================



onSnapshot(streetRef,(snapshot)=>{


    const data = snapshot.data();


    if(!data) return;





    // LDR STATUS (Only Automatic Mode)


    let environment =

    data.ldr1

    ? "🌙 Night Detected"

    : "☀️ Day Detected";





    // PIR STATUS


    let motion =

    data.motion

    ? "🚶 Motion Detected"

    : "🚫 No Motion";





    // PIR Brightness Control

    if(data.motion)

    {


        pirBrightness.innerHTML =

        "🚶 Motion Detected <br><br>" +

        "💡 Brightness : 100%";


    }

    else

    {


        pirBrightness.innerHTML =

        "🚫 No Motion <br><br>" +

        "💡 Brightness : 30%";


    }






    // Light Health


    let health;


    if(data.lightStatus === "Fault")

    {

        health =
        "⚠️ Fault Detected";

    }

    else

    {

        health =
        "💡 Working";

    }





    sensorStatus.innerHTML =


    "<b>☀️ LDR Sensor 1</b><br>" +

    environment +


    "<br><br>" +



    "<b>🚶 PIR Sensor</b><br>" +

    motion +


    "<br><br>" +



    "<b>💡 LDR Sensor 2</b><br>" +

    health;



});
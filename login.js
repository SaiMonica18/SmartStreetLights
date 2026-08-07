import { auth } from "./firebase.js";

import {

signInWithEmailAndPassword

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";



window.login = function(){


let email = document.getElementById("email").value;

let password = document.getElementById("password").value;



if(email==="" || password===""){

alert("Please enter Email and Password");

return;

}



signInWithEmailAndPassword(

auth,

email,

password

)

.then(()=>{

alert("Login Successful");

window.location.href="dashboard.html";

})

.catch((error)=>{

alert("Login Failed\n\n"+error.message);

});


}
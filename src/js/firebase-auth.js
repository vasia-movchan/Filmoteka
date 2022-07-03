import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5kyNHcD6sVFejBN9Z00vsOl4bmbW5BXk",
  authDomain: "filmoteka-teamprojectjs-team6.firebaseapp.com",
  projectId: "filmoteka-teamprojectjs-team6",
  storageBucket: "filmoteka-teamprojectjs-team6.appspot.com",
  messagingSenderId: "421066568411",
  appId: "1:421066568411:web:c3a2298e24d20ece64d2fe"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const form = document.querySelector('[name="modal-auth"]');
const btnLogout = document.querySelector('.modal-auth__btn--logout');
const title = document.querySelector('.modal-auth__title');
const btnOpenModal = document.querySelector('.modal-auth__btn-open');
let uid = null;

form.addEventListener('submit', onSubmitLogin);
btnLogout.addEventListener('click', onLogoutBtn);

function onSubmitLogin (event) {
  event.preventDefault();
  const email = event.target.elements.email.value;
  const password = event.target.elements.password.value;
  
  if(email.length < 5 || password.length < 6) {
    alert('Please, enter your email and password (at least 6 characters)')
    return
  }
  
  loginUserFirebase (auth, email, password);
  
}

function loginUserFirebase (auth, email, password) {createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    uid = user.uid;
    const userName = user.email.split('@')[0];
    alert(`Hello ${userName}, have a nice journy`)
    form.reset();   
})
  .catch((error) => {
    const errorMessage = error.message;
    const errorUserExist = "Firebase: Error (auth/email-already-in-use).";
    const errorShortPassword = "Firebase: Password should be at least 6 characters (auth/weak-password)."
    if (errorMessage === errorShortPassword) {
        alert("Password should be at least 6 characters")
    }
    
    if (errorUserExist === errorMessage) {
        singinUserFirebase (auth, email, password);
        }});
    } 

function singinUserFirebase (auth, email, password) { signInWithEmailAndPassword(auth, email, password)    
  .then((userCredential) => {
    const user = userCredential.user;
    uid = user.uid;
    const userName = user.email.split('@')[0];
    alert(`Welcome back ${userName}, have a nice journy`)
    form.reset();
      

  })
  .catch((error) => {
    const errorMessage = error.message;
    const invalidPassword = 'Firebase: Error (auth/wrong-password).'
    if (errorMessage === invalidPassword) {
        alert("Password wrong. Please enter valid password")
    }
  });
    }

function onLogoutBtn () {     
    const auth = getAuth();
    signOut(auth)
    };

onAuthStateChanged(auth, (user) => {
    console.log(user)
    if (user) {
      uid = user.uid;
      form.classList.add('is-hidden-auth');
      btnLogout.classList.remove('is-hidden-auth');
      title.textContent = `Hello, ${user.email.split('@')[0]}`;
      btnOpenModal.textContent = "LogOut"
      btnOpenModal.style.backgroundColor = "green";
      console.log('удачно вошли');
    } else {
      uid = null;
      form.classList.remove('is-hidden-auth');
      btnLogout.classList.add('is-hidden-auth');
      console.log('удачно вышли');
      title.textContent = "Login form";
      btnOpenModal.textContent = "Login"
      btnOpenModal.style.backgroundColor = "red";
    }
  });
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjzRxWxrxq8KUD9fStc8VvQqJ9eB8edWw",
  authDomain: "swimsafeinitiative-7809c.firebaseapp.com",
  projectId: "swimsafeinitiative-7809c",
  storageBucket: "swimsafeinitiative-7809c.firebasestorage.app",
  messagingSenderId: "1025750665332",
  appId: "1:1025750665332:web:25e91eb951afeb11f2e921",
  measurementId: "G-5W2JEV3VR3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Sign in with Google
const googleButton = document.getElementById("google-signin");
googleButton.addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            document.getElementById("user-name").textContent = `Hello, ${user.displayName}`;
            document.getElementById("user-photo").src = user.photoURL;
            document.getElementById("user-info").style.display = "block";
            googleButton.style.display = "none";
        })
        .catch((error) => {
            console.error(error);
        });
});

// Sign out
document.getElementById("signout").addEventListener("click", () => {
    auth.signOut().then(() => {
        document.getElementById("user-info").style.display = "none";
        googleButton.style.display = "inline-block";
    });
});

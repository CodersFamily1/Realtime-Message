import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAAygJNHfQvrWq8ZUNXiXlti0NX1a6x5Pw",
  authDomain: "massage-89703.firebaseapp.com",
  projectId: "massage-89703",
  storageBucket: "massage-89703.firebasestorage.app",
  messagingSenderId: "775614228520",
  appId: "1:775614228520:android:4a969fb17e60c1fa24ed1d"
};

// Firebase Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ইউজার নাম সেট করার ফাংশন
let username = "";
window.setUsername = function() {
  let usernameInput = document.getElementById("usernameInput");
  if (usernameInput.value.trim() !== "") {
    username = usernameInput.value;
    usernameInput.value = "";
    alert("Username set as: " + username);
  }
};

// মেসেজ পাঠানোর ফাংশন (ইউজার নামসহ)
window.sendMessage = async function() {
  let messageInput = document.getElementById("messageInput");
  if (messageInput.value.trim() !== "" && username !== "") {
    await addDoc(collection(db, "messages"), {
      text: messageInput.value,
      username: username,
      timestamp: serverTimestamp()
    });
    messageInput.value = "";
  } else {
    alert("Please set a username first!");
  }
};

// মেসেজ রিয়েল-টাইম দেখানো (ইউজার নামসহ)
const messagesDiv = document.getElementById("messages");
onSnapshot(collection(db, "messages"), (snapshot) => {
  messagesDiv.innerHTML = "";
  snapshot.docs.forEach((doc) => {
    let message = doc.data();
    messagesDiv.innerHTML += `<p><b>${message.username}:</b> ${message.text} - ${new Date(message.timestamp?.seconds * 1000).toLocaleTimeString()}</p>`;
  });
});
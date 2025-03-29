// Firebase Import & Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔹 তোমার Firebase কনফিগ বসাও (Firebase Console > Settings > Config থেকে)
const firebaseConfig = {
  apiKey: "AIzaSyAAygJNHfQvrWq8ZUNXiXlti0NX1a6x5Pw",
  authDomain: "massage-89703.firebaseapp.com",
  projectId: "massage-89703",
  storageBucket: "massage-89703.firebasestorage.app",
  messagingSenderId: "775614228520",
  appId: "1:775614228520:android:4a969fb17e60c1fa24ed1d"
};

// 🔹 Firebase Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 মেসেজ পাঠানোর ফাংশন
window.sendMessage = async function() {
  let messageInput = document.getElementById("messageInput");
  if (messageInput.value.trim() !== "") {
    await addDoc(collection(db, "messages"), {
      text: messageInput.value,
      timestamp: serverTimestamp() // 🔥 Firestore-এ Timestamp Auto-generate হবে
    });
    messageInput.value = ""; // ইনপুট ফাঁকা করে দেবে
  }
};

// 🔹 মেসেজ রিয়েল-টাইম দেখানোর ফাংশন
const messagesDiv = document.getElementById("messages");
onSnapshot(collection(db, "messages"), (snapshot) => {
  messagesDiv.innerHTML = "";
  snapshot.docs.forEach((doc) => {
    let message = doc.data();
    messagesDiv.innerHTML += `<p>${message.text} - ${new Date(message.timestamp?.seconds * 1000).toLocaleTimeString()}</p>`;
  });
});
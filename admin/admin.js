// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDE-ALjM_E3gCpyH3_rbMz2u-hEFJ8nO2c",
  authDomain: "bellis-menu.firebaseapp.com",
  projectId: "bellis-menu",
  storageBucket: "bellis-menu.firebasestorage.app",
  messagingSenderId: "1765826468",
  appId: "1:1765826468:web:73115f5b5f910d89c16b31"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Login system
function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if (u === "admin" && p === "admin") {
    document.getElementById("login").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadItems();
  } else {
    alert("Wrong credentials");
  }
}

window.login = login;

async function loadItems() {
  const querySnapshot = await getDocs(collection(db, "menuItems"));
  const container = document.getElementById("menu-items");
  container.innerHTML = "";
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <strong>${data.name}</strong><br/>
      ${data.desc}<br/>
      $${data.price} – <em>${data.category}</em><br/>
      <img src="${data.img}" width="100"/><br/>
      <button onclick="deleteItem('${docSnap.id}')">Delete</button>
    `;
    container.appendChild(div);
  });
}

window.deleteItem = async function(id) {
  await deleteDoc(doc(db, "menuItems", id));
  loadItems();
};

window.addItem = async function() {
  const name = document.getElementById("name").value;
  const desc = document.getElementById("desc").value;
  const price = document.getElementById("price").value;
  const category = document.getElementById("category").value;
  const img = document.getElementById("img").value;
  if (name && desc && price && category && img) {
    await addDoc(collection(db, "menuItems"), { name, desc, price, category, img });
    loadItems();
  } else {
    alert("Please fill all fields");
  }
};


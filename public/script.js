import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyD-fRDCqGnpsYtGQtQ68vkXzGvwOQ2fl4Q",
    authDomain: "collection-library-30ccc.firebaseapp.com",
    projectId: "collection-library-30ccc",
    storageBucket: "collection-library-30ccc.firebasestorage.app",
    messagingSenderId: "798446863970",
    appId: "1:798446863970:web:c294baff4146f6b998b33b",
    measurementId: "G-SP3HKSJPFX"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("titleInput").value;
  const author = document.getElementById("authorInput").value;
  const type = document.getElementById("typeSelect").value;
  const tag = document.getElementById("tagInput").value.trim();
  const file = document.getElementById("fileInput").files[0];

  const newItem = { title, author, type, tag, fileName: file.name };

  const storedItems = JSON.parse(localStorage.getItem("myLibrary") || "[]");
  storedItems.push(newItem);
  localStorage.setItem("myLibrary", JSON.stringify(storedItems));

  this.reset();
});

const userAvatar = document.getElementById("userAvatar");
const dropdown = document.getElementById("dropdown");

userAvatar.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});

// 點擊畫面其他區域時關閉下拉選單（可選）
document.addEventListener("click", (event) => {
  if (!userAvatar.contains(event.target) && !dropdown.contains(event.target)) {
    e.stopPropagation(); // 避免觸發全頁 click 收合
    dropdown.classList.toggle("hidden");
  }
});

document.getElementById("goLibraryBtn").addEventListener("click", function () {
  window.location.href = "library.html";
});

document.getElementById("goNoteBtn").addEventListener("click", function () {
  window.location.href = "note.html"; 
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth)
  .then(() => {
    console.log("已成功登出");
    window.location.href = "index.html";
  })
  .catch((error) => {
    console.error("登出失敗：", error);
  });
});

document.getElementById("profileBtn").addEventListener("click", function () {
  window.location.href = "profile.html";
});
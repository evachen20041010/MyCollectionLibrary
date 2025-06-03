// Firebase 初始化
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';
import {
  getDatabase,
  ref,
  set,
  remove
} from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js';

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
const database = getDatabase(app);

document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const file = document.getElementById("fileInput").files[0];

  // 嘗試抓取使用者輸入的欄位（可為空）
  let inputTitle = document.getElementById("titleInput").value.trim();
  let inputAuthor = document.getElementById("authorInput").value.trim();
  let inputType = document.getElementById("typeSelect").value;
  let inputTag = document.getElementById("tagInput").value.trim();

  // 根據使用者是否有上傳檔案，決定欄位內容
  let title = inputTitle || (file ? file.name : "");
  let author = inputAuthor || (file ? "未知" : "");
  let type = inputType || (file ? "file" : "");
  let tag = inputTag || (file ? "其他" : "");

  // 如果沒有檔案、也沒有輸入標題和作者，就警告
  if (!file && (!inputTitle || !inputAuthor)) {
    alert("請輸入書名和作者，或至少選擇一個檔案");
    return;
  }

  const newItem = {
    id: Date.now(),
    title,
    author,
    type,
    tag,
    fileName: file?.name || ""
  };

  const storedItems = JSON.parse(localStorage.getItem("myLibrary") || "[]");
  storedItems.push(newItem);
  localStorage.setItem("myLibrary", JSON.stringify(storedItems));

  const dbRef = ref(database, 'collections/' + newItem.id);
  set(dbRef, newItem)
    .then(() => {
      console.log("已寫入 Firebase Realtime Database");
    })
    .catch((error) => {
      console.error("寫入 Firebase 失敗：", error);
    });

  this.reset();
});

// 使用者頭像下拉選單切換
const userAvatar = document.getElementById("userAvatar");
const dropdown = document.getElementById("dropdown");

userAvatar.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});

// 點擊其他區域關閉下拉選單
document.addEventListener("click", (event) => {
  if (!userAvatar.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.classList.add("hidden");
  }
});

// 導頁按鈕事件
document.getElementById("goLibraryBtn").addEventListener("click", () => {
  window.location.href = "library.html";
});

document.getElementById("goNoteBtn").addEventListener("click", () => {
  window.location.href = "note.html";
});

document.getElementById("profileBtn").addEventListener("click", () => {
  window.location.href = "profile.html";
});

// 登出功能
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
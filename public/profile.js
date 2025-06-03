import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  deleteUser
} from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';

// Firebase 設定與初始化
const firebaseConfig = {
  apiKey: "AIzaSyD-fRDCqGnpsYtGQtQ68vkXzGvwOQ2fl4Q",
  authDomain: "collection-library-30ccc.firebaseapp.com",
  projectId: "collection-library-30ccc",
  storageBucket: "collection-library-30ccc.appspot.com",
  messagingSenderId: "798446863970",
  appId: "1:798446863970:web:c294baff4146f6b998b33b",
  measurementId: "G-SP3HKSJPFX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM 元素
const emailSpan = document.getElementById("user-email");
const nicknameInput = document.getElementById("nickname");
const newPasswordInput = document.getElementById("new-password");
const saveBtn = document.getElementById("saveBtn");
const deleteBtn = document.getElementById("deleteBtn");
const backBtn = document.getElementById("backBtn");
const status = document.getElementById("status");
const nicknameDisplay = document.getElementById("nicknameDisplay");

let currentUser = null;

// 顯示目前使用者資訊
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    emailSpan.textContent = user.email;
    nicknameInput.value = user.displayName || "";
    nicknameDisplay.textContent = user.displayName || "User";
  } else {
    window.location.href = "index.html"; // 未登入導回首頁
  }
});

// 儲存使用者變更
saveBtn.addEventListener("click", async () => {
  if (!currentUser) return;
  const newNickname = nicknameInput.value.trim();
  const newPassword = newPasswordInput.value.trim();

  try {
    await updateProfile(currentUser, { displayName: newNickname });

    if (newPassword) {
      await updatePassword(currentUser, newPassword);
    }

    status.textContent = "✅ 使用者資訊已更新！";
    status.style.color = "green";
    nicknameDisplay.textContent = newNickname || "User";
  } catch (err) {
    status.textContent = "❌ 更新失敗：" + err.message;
    status.style.color = "red";
  }
});

// 刪除帳戶
deleteBtn.addEventListener("click", () => {
  if (!currentUser) return;
  const confirmed = confirm("確定要刪除帳戶嗎？此動作無法復原！");
  if (!confirmed) return;

  deleteUser(currentUser)
    .then(() => {
      alert("帳戶已刪除");
      window.location.href = "index.html";
    })
    .catch((err) => {
      status.textContent = "❌ 刪除失敗：" + err.message;
      status.style.color = "red";
    });
});

// 返回首頁
backBtn.addEventListener("click", () => {
  window.location.href = "main.html";
});
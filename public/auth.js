import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';

// Firebase 初始化
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
const form = document.getElementById("auth-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const messageBox = document.getElementById("auth-message");
const formTitle = document.getElementById("form-title");
const toggleAuth = document.getElementById("toggle-auth");
const formBtn = form.querySelector("button");

let isLogin = true;

// 切換登入與註冊模式
toggleAuth.addEventListener("click", (e) => {
  e.preventDefault();
  isLogin = !isLogin;
  formTitle.innerText = isLogin ? "🔐 登入" : "📝 註冊";
  formBtn.innerText = isLogin ? "登入" : "註冊";
  toggleAuth.innerText = isLogin ? "註冊" : "返回登入";
});

// 表單提交事件
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  if (isLogin) {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        messageBox.innerText = "✅ 登入成功！返回首頁中...";
        setTimeout(() => window.location.href = "main.html", 1000);
      })
      .catch((err) => {
        messageBox.innerText = "❌ 登入失敗：" + err.message;
      });
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        messageBox.innerText = "✅ 註冊成功，請重新登入";
        isLogin = true;
        toggleAuth.click();
      })
      .catch((err) => {
        messageBox.innerText = "❌ 註冊失敗：" + err.message;
      });
  }
});
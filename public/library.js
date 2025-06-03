import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getDatabase, ref, remove } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyD-fRDCqGnpsYtGQtQ68vkXzGvwOQ2fl4Q",
  authDomain: "collection-library-30ccc.firebaseapp.com",
  projectId: "collection-library-30ccc",
  storageBucket: "collection-library-30ccc.appspot.com",
  messagingSenderId: "798446863970",
  appId: "1:798446863970:web:c294baff4146f6b998b33b",
  measurementId: "G-SP3HKSJPFX",
  databaseURL: "https://collection-library-30ccc-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const shelf = document.getElementById("bookshelf");
const backToTopBtn = document.getElementById("backToTopBtn");

// 預設書籍
const presetBooks = [
  { title: "人工智慧導論", author: "吳大明", tag: "AI", isUser: false },
  { title: "法學緒論", author: "林書豪", tag: "法律", isUser: false },
  { title: "學術寫作技巧", author: "李麗麗", tag: "寫作", isUser: false },
  { title: "原文書閱讀", author: "Tom Smith", tag: "英文", isUser: false }
];

// 使用者自訂書籍（含 id）
const userBooks = (JSON.parse(localStorage.getItem("myLibrary") || "[]")).map(book => ({
  ...book,
  isUser: true
}));

const allBooks = [...presetBooks, ...userBooks];

// 分類書籍
const groupedByTag = {};
allBooks.forEach(book => {
  const tag = book.tag || "未分類";
  if (!groupedByTag[tag]) groupedByTag[tag] = [];
  groupedByTag[tag].push(book);
});

// 清空書櫃再渲染
shelf.innerHTML = "";

Object.entries(groupedByTag).forEach(([tag, books]) => {
  const section = document.createElement("section");
  section.className = "tag-section";

  const tagTitle = document.createElement("h2");
  tagTitle.textContent = `🏷️ ${tag}`;
  section.appendChild(tagTitle);

  const tagShelf = document.createElement("div");
  tagShelf.className = "shelf";

  books.forEach(book => {
    const bookDiv = document.createElement("div");
    bookDiv.className = "book";

    bookDiv.innerHTML = `
      <div class="book-title">${book.title}</div>
      <div class="book-author">👤 ${book.author}</div>
      <div class="book-tag">🏷️ ${book.tag}</div>
      ${book.isUser ? `<button class="delete-btn" data-id="${book.id}">🗑️ 刪除</button>` : ""}
    `;

    tagShelf.appendChild(bookDiv);
  });

  section.appendChild(tagShelf);
  shelf.appendChild(section);
});

// 刪除功能（透過 id）
shelf.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.getAttribute("data-id");
    if (confirm("確定要刪除這筆收藏嗎？")) {
      const books = JSON.parse(localStorage.getItem("myLibrary") || "[]");
      const updated = books.filter(book => book.id != id);
      localStorage.setItem("myLibrary", JSON.stringify(updated));

      // 刪除 Firebase 中的資料
      const dbRef = ref(database, 'collections/' + id);
      remove(dbRef)
        .then(() => {
          console.log("已同步刪除 Firebase 資料");
          window.location.reload();
        })
        .catch((error) => {
          console.error("刪除 Firebase 資料失敗：", error);
          window.location.reload();
        });
    }
  }
});

// 回到上方按鈕
window.addEventListener("scroll", () => {
  backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
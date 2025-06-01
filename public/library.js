const shelf = document.getElementById("bookshelf");

// 預設範例資料（不允許刪除）
const presetBooks = [
  { title: "人工智慧導論", author: "吳大明", tag: "AI", isUser: false },
  { title: "法學緒論", author: "林書豪", tag: "法律", isUser: false },
  { title: "學術寫作技巧", author: "李麗麗", tag: "寫作", isUser: false },
  { title: "原文書閱讀", author: "Tom Smith", tag: "英文", isUser: false }
];

// 讀取使用者自訂書籍
const userBooks = JSON.parse(localStorage.getItem("myLibrary") || "[]").map(book => ({
  ...book,
  isUser: true
}));

const allBooks = [...presetBooks, ...userBooks];

allBooks.forEach((book, index) => {
  const bookDiv = document.createElement("div");
  bookDiv.className = "book";

  bookDiv.innerHTML = `
    <div class="book-title">${book.title}</div>
    <div class="book-author">👤 ${book.author}</div>
    <div class="book-tag">🏷️ ${book.tag}</div>
    ${
      book.isUser
        ? `<button class="delete-btn" data-index="${index - presetBooks.length}">🗑️ 刪除</button>`
        : ""
    }
  `;

  shelf.appendChild(bookDiv);
});

// 事件代理處理刪除按鈕
shelf.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = parseInt(e.target.getAttribute("data-index"), 10);
    const confirmDelete = confirm("確定要刪除這筆收藏嗎？");

    if (confirmDelete) {
      const books = JSON.parse(localStorage.getItem("myLibrary") || "[]");
      books.splice(index, 1);
      localStorage.setItem("myLibrary", JSON.stringify(books));
      window.location.reload(); // 刷新頁面更新書櫃
    }
  }
});
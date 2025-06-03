const noteTitleInput = document.getElementById("noteTitle");
const noteContentInput = document.getElementById("noteContent");
const addNoteBtn = document.getElementById("addNoteBtn");
const noteFileInput = document.getElementById("noteFile");
const uploadNoteBtn = document.getElementById("uploadNoteBtn");
const notesContainer = document.getElementById("notes");

// 初始資料（可改串接後端）
let notes = JSON.parse(localStorage.getItem("myLibrary") || "[]");

if (notes.length === 0) {
  notes = [
    { title: "閱讀筆記：AI導論", content: "人工智慧是一種模擬人類智能的技術..." },
    { title: "學習要點：法學緒論", content: "法律的基本精神是保障公平與正義..." }
  ];
  localStorage.setItem("myLibrary", JSON.stringify(notes)); // 初始化寫入
}

// 渲染筆記
function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note-card";

    noteDiv.innerHTML = `
      <div class="note-title">${note.title}</div>
      <div class="note-content">
        ${note.pdfUrl ? "" : note.content}
      </div>
    `;

    // 加上展開 PDF 按鈕（如果是 PDF 筆記）
    if (note.pdfUrl) {
      noteDiv.innerHTML += `
        <button onclick="window.location.href='pdf-view.html?index=${index}'">📖 展開 PDF</button>
      `;
    }

    // 僅限純文字筆記可開啟 Modal
    if (!note.pdfUrl) {
      noteDiv.addEventListener("click", () => openNoteModal(index));
    }

    notesContainer.appendChild(noteDiv);
  });
}

// 新增文字筆記
addNoteBtn.addEventListener("click", () => {
  const title = noteTitleInput.value.trim();
  const content = noteContentInput.value.trim();
  if (title && content) {
    notes.unshift({ title, content });
    noteTitleInput.value = "";
    noteContentInput.value = "";
    renderNotes();
  }
});

// 新增 PDF 筆記（含預覽）
uploadNoteBtn.addEventListener("click", () => {
  const file = noteFileInput.files[0];
  if (!file) return alert("請選擇一個 .pdf 檔案");
  if (!file.name.toLowerCase().endsWith(".pdf")) return alert("只支援 .pdf 檔案");

  const reader = new FileReader();
  reader.onload = () => {
    const title = file.name.replace(/\.pdf$/i, "");
    const pdfUrl = reader.result;

    notes.unshift({ title, content: "", pdfUrl });
    localStorage.setItem("myLibrary", JSON.stringify(notes)); 
    renderNotes();
    noteFileInput.value = "";
  };
  reader.readAsDataURL(file); // Base64
});

// Modal：檢視與編輯（僅限純文字筆記）
function openNoteModal(index) {
  const note = notes[index];
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal">
      <h3 contenteditable="true" class="modal-title">${note.title}</h3>
      <textarea class="modal-content">${note.content}</textarea>
      <div class="modal-actions">
        <button onclick="saveNote(${index})">💾 儲存</button>
        <button onclick="shareNote(${index})">🔗 分享</button>
        <button onclick="deleteNote(${index})">🗑️ 刪除</button>
        <button onclick="this.closest('.modal-overlay').remove()">✖ 關閉</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

// 儲存筆記
function saveNote(index) {
  const modal = document.querySelector(".modal");
  const newTitle = modal.querySelector(".modal-title").innerText.trim();
  const newContent = modal.querySelector(".modal-content").value.trim();
  if (newTitle && newContent) {
    notes[index] = { title: newTitle, content: newContent };
    renderNotes();
    modal.parentElement.remove();
  }
}

// 刪除筆記
function deleteNote(index) {
  if (confirm("確定要刪除這則筆記嗎？")) {
    notes.splice(index, 1);
    renderNotes();
    document.querySelector(".modal-overlay").remove();
  }
}

// 分享筆記（模擬）
function shareNote(index) {
  const note = notes[index];

  // 👉 檢查是否是 PDF 筆記
  if (!note.pdfUrl) {
    alert("只有 PDF 檔案可以分享連結");
    return;
  }
}

// 回到上方按鈕功能
const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
  backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 初始化
renderNotes();
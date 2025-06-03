const noteTitleInput = document.getElementById("noteTitle");
const noteContentInput = document.getElementById("noteContent");
const addNoteBtn = document.getElementById("addNoteBtn");
const noteFileInput = document.getElementById("noteFile");
const uploadNoteBtn = document.getElementById("uploadNoteBtn");
const notesContainer = document.getElementById("notes");

// 初始資料（可改串接後端）
let notes = [
  { title: "閱讀筆記：AI導論", content: "人工智慧是一種模擬人類智能的技術..." },
  { title: "學習要點：法學緒論", content: "法律的基本精神是保障公平與正義..." }
];

// 渲染筆記
function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note-card";
    noteDiv.innerHTML = `
      <div class="note-title">${note.title}</div>
      <div class="note-content">${note.content}</div>
    `;
    noteDiv.addEventListener("click", () => openNoteModal(index));
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

// 新增 PDF 筆記
uploadNoteBtn.addEventListener("click", () => {
  const file = noteFileInput.files[0];
  if (!file) return alert("請選擇一個 .pdf 檔案");
  if (!file.name.toLowerCase().endsWith(".pdf")) return alert("只支援 .pdf 檔案");

  const reader = new FileReader();
  reader.onload = () => {
    const content = "[PDF 檔案無法直接預覽，已成功上傳]";
    const title = file.name.replace(/\.pdf$/i, "");
    notes.unshift({ title, content });
    renderNotes();
    noteFileInput.value = "";
  };
  reader.readAsArrayBuffer(file);
});

// Modal：檢視與編輯
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
  alert("分享連結已複製（模擬）: " + encodeURIComponent(notes[index].title));
}

// 初始化
renderNotes();
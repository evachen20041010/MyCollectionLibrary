// 取得 index
const params = new URLSearchParams(window.location.search);
const index = parseInt(params.get("index"), 10);
const notes = JSON.parse(localStorage.getItem("myLibrary") || "[]");
const note = notes[index];

// 顯示 PDF
const container = document.getElementById("pdf-container");
container.innerHTML = `
  <h2 class="pdf-title">${note.title}</h2>
  <iframe src="${note.pdfUrl}" width="100%" height="100%" frameborder="0" style="flex: 1; border-radius: 8px;"></iframe>
`;

// 操作功能
function editPDFNote() {
  const newTitle = prompt("請輸入新標題", note.title);
  if (newTitle) {
    note.title = newTitle;
    notes[index] = note;
    localStorage.setItem("myLibrary", JSON.stringify(notes));
    alert("標題已更新！");
    location.reload();
  }
}

function deletePDFNote() {
  if (confirm("確定要刪除這個 PDF 筆記嗎？")) {
    notes.splice(index, 1);
    localStorage.setItem("myLibrary", JSON.stringify(notes));
    alert("已刪除！");
    window.location.href = "note.html";
  }
}

function sharePDFNote() {
  const url = `${window.location.origin}/pdf-view.html?index=${index}`;
  navigator.clipboard.writeText(url)
    .then(() => alert("已複製分享連結：\n" + url))
    .catch(() => alert("複製失敗，請手動複製：" + url));
}
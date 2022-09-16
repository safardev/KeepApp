// Some styles for dark mode
document.body.style.backgroundColor = "#212121";
let textArea = document.getElementById("textArea");
textArea.style.backgroundColor = "#666666";
textArea.style.color = "#ffffff";
textArea.style.border = "none";

let titleArea = document.getElementById("titleArea");
titleArea.style.backgroundColor = "#666666";
titleArea.style.border = "none";

// Saved notes function
showNotes();

// Notes parsing using JSON and localStorage
function parseNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
}

// Save button functionality && implementation of storing notes
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => {
  parseNotes();
  (titleArea.value.length && textArea.value.length) == 0
    ? alert("Enter some text first!")
    : notesObj.push({ title: titleArea.value, element: textArea.value });
  localStorage.setItem("notes", JSON.stringify(notesObj));
  textArea.value = "";
  titleArea.value = "";
  showNotes();
});

// Populate notes using showNotes function
function showNotes() {
  parseNotes();
  let html = "";
  Array.from(notesObj).forEach((arr, index) => {
    html += `<div class="card bg-dark text-white mx-3 my-2" style="width: 18rem">
    <div class="card-body">
        <h5 class="card-title">${arr.title} </h5>
        <p class="card-text">${arr.element}</p>
        <button id="${index}" class="btn btn-danger mt-2" onclick="removeNote(this.id)" >Remove</button>
    </div>
</div>`;
  });
  let noteElem = document.getElementById("notes");
  if (notesObj.length != 0) {
    noteElem.innerHTML = html;
  } else {
    noteElem.innerHTML = `<div class="display-5 text-white">Oops! No notes available</div>`;
  }
}

// Delete note button functionality
function removeNote(index) {
  parseNotes();
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// search input functionality
let search = document.getElementById("searchText");
search.addEventListener("input", () => {
  let inpVal = search.value.toLowerCase();
  let cardNotes = document.getElementsByClassName("card");
  Array.from(cardNotes).forEach((element) => {
    let textVal = element.getElementsByTagName("p")[0].innerText;
    if (textVal.toLowerCase().includes(inpVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

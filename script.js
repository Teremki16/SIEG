let noteName = "";
let noteInput = "";
let noteCounter = "";
let time = "";
let Notes = [];

// Function to save notes to local storage
function saveNotesToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(Notes));
}

// Function to load notes from local storage and display them
function loadNotesFromLocalStorage() {
  let storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  Notes = storedNotes;
  $(".Notes").empty();
  storedNotes.forEach((note, index) => {
    if (index % 4 === 0) {
      $(".Notes").append("<div class='row'>");
    }
    let noteHtml = `
      <div class="col-3">
        <div class="note">
          <h1 class="Name">${note.title}</h1>
          <p class="noteContext">${note.text}</p>
          <p class="date">${note.time}</p>
          <div class="NoteButtons">
            <button class="deleteButton">Delete<i class="fa-solid fa-trash"></i></button>
            <button class="correctButton">Change<i class="fa-solid fa-check"></i></button>
            <button class="editButton">Archive<i class="fa-regular fa-pen-to-square"></i></button>
          </div>
        </div>
      </div>
    `;
    $(".Notes").append(noteHtml);
    if ((index + 1) % 4 === 0 || storedNotes.length === index + 1) {
      $(".Notes").append("</div>");
    }
  });
}

$(document).ready(function () {
  // Load notes from local storage when page loads
  loadNotesFromLocalStorage();

  $(".addButton").on("click", function () {
    if ($(".inputName").val() === "" || $(".inputNote").val() === "") {
      alert("Fill in all fields");
      $(".inputName").val("");
      $(".inputNote").val("");
    } else {
      noteName = $(".inputName").val();
      noteInput = $(".inputNote").val();
      time = new Date().toLocaleString();

      let blackboxAi = {
        title: noteName,
        text: noteInput,
        time: time,
        isCompleted: false,
      };

      let noteHtml = `
        <div class="note">
          <h1 class="Name">${blackboxAi.title}</h1>
          <p class="noteContext">${blackboxAi.text}</p>
          <p class="date">${blackboxAi.time}</p>
          <div class="NoteButtons">
            <button class="deleteButton">Delete<i class="fa-solid fa-trash"></i></button>
            <button class="correctButton">Change<i class="fa-solid fa-check"></i></button>
            <button class="editButton">Arch<i class="fa-regular fa-pen-to-square"></i></button>
          </div>
        </div>
      `;
      $(".Notes").append(noteHtml);
      Notes.push(blackboxAi);
      saveNotesToLocalStorage();
      $(".inputName").val("");
      $(".inputNote").val("");
    }
  });

  $(document).on("click", ".correctButton", function () {
    let $parent = $(this).closest(".note");
    let $name = $parent.find(".Name");
    let $noteContext = $parent.find(".noteContext");


    $(".inputNoteRedacting").val($noteContext.text());
    $(".inputNameRedacting").val($name.text());
    saveNoteToLocalStorage(Notes);





    // Open the overlay for editing
    $(".overlay").css("display", "flex");
    $(".overlay").css("z-index", "1");

    // Handle the save button click for editing
    $(".saveButton").off("click").on("click", function () {

      let newName = $(".inputNameRedacting").val();

      let newContext = $(".inputNoteRedacting").val();


      // Update the note in the UI




      // Update the Notes array
      let noteIndex = Notes.findIndex(note => { 
        console.log(note.title, $name.text())
        return note.title == $name.text()
       });
      console.log(noteIndex)
      if (noteIndex !== -1) {
        console.log(Notes[noteIndex]);
        Notes[noteIndex].title = newName;
        Notes[noteIndex].text = newContext;
        Notes[noteIndex].time = new Date().toLocaleString();
        saveNotesToLocalStorage();
      }
      $name.text(newName);

      $noteContext.text(newContext);

      $parent.find(".date").text(new Date().toLocaleString());

      $(".overlay").hide().css("z-index", "-100");
    });
  });

  $(document).on("click", ".editButton", function () {
    $(this).parent().parent().toggleClass("archievedButton");
    let isCompleted = $(this).parent().parent().hasClass("archievedButton");

    $(this).parent().parent().find(".Name, .noteContext, .date").css({
      "text-decoration": isCompleted ? "line-through" : "none",
      "opacity": isCompleted ? "0.7" : "1"
    });

    $(this).parent().parent().find(".correctButton").css("z-index", isCompleted ? "-100" : "100");


  });

  $(document).on("click", ".deleteButton", function () {
    let noteTitle = $(this).parent().parent().find(".Name").text();
    $(this).parent().parent().remove();
    Notes = Notes.filter(note => note.title !== noteTitle);

    saveNotesToLocalStorage();
  });

  window.addEventListener("beforeunload", saveNotesToLocalStorage);
});

function loadNotes() {
  const notes = getNotesFromLocalStorage();
  notes.forEach(note => {
    addNoteToDOM(note);
  });
}

function addNoteToDOM(note) {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${note.title}</strong><br>${note.content} <button class="delete-note">Видалити</button>`;
  notesList.appendChild(li);

  li.querySelector(".delete-note").addEventListener("click", function () {
    notesList.removeChild(li);
    removeNoteFromLocalStorage(note);
  });
}

function saveNoteToLocalStorage(note) {
  const notes = getNotesFromLocalStorage();
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function getNotesFromLocalStorage() {
  const notes = localStorage.getItem("notes");
  return notes ? JSON.parse(notes) : [];
}

function removeNoteFromLocalStorage(noteToRemove) {
  const notes = getNotesFromLocalStorage();
  const updatedNotes = notes.filter(note => note.title !== noteToRemove.title || note.content !== noteToRemove.content);
  localStorage.setItem("notes", JSON.stringify(updatedNotes));
}



















































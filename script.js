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
  storedNotes.forEach((note) => {
    let noteHtml = `
      <div class="note">
        <h1 class="Name">${note.title}</h1>
        <p class="noteContext">${note.text}</p>
        <p class="date">${note.time}</p>
        <div class="NoteButtons">
          <button class="deleteButton">Delete<i class="fa-solid fa-trash"></i></button>
          <button class="correctButton">Change<i class="fa-solid fa-check"></i></button>
          <button class="editButton">Arch<i class="fa-regular fa-pen-to-square"></i></button>
        </div>
      </div>
    `;
    $(".Notes").append(noteHtml);
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

    $(".inputNameRedacting").val($name.text());
    $(".inputNoteRedacting").val($noteContext.text());

    // Open the overlay for editing
    $(".overlay").css("display", "flex");
    $(".overlay").css("z-index", "1");

    // Handle the save button click for editing
    $(".saveButton").off("click").on("click", function () {
      let newName = $(".inputNameRedacting").val();
      let newContext = $(".inputNoteRedacting").val();

      // Update the note in the UI
      $name.text(newName);
      $noteContext.text(newContext);
      $parent.find(".date").text(new Date().toLocaleString());

      // Update the Notes array
      let noteIndex = Notes.findIndex(note => note.title === $name.text());
      if (noteIndex !== -1) {
        Notes[noteIndex].title = newName;
        Notes[noteIndex].text = newContext;
        Notes[noteIndex].time = new Date().toLocaleString();
      }
      saveNotesToLocalStorage();
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















































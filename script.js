document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#note-form");
  const noteInput = document.querySelector("#note-input");
  const descriptionInput = document.querySelector("#note-description");
  const additionalInputs = document.querySelector("#additional-inputs");
  const cancelBtn = document.querySelector("#cancel-btn");
  const notesContainer = document.querySelector("#notes-container");
  const firstAddButton = form.querySelector(
    '.button-container button[type="submit"]'
  );

  noteInput.addEventListener("click", () => {
    additionalInputs.style.display = "block";
    firstAddButton.style.display = "none";
    noteInput.placeholder = "Title";
  });

  cancelBtn.addEventListener("click", () => {
    additionalInputs.style.display = "none";
    firstAddButton.style.display = "inline-block";
    noteInput.placeholder = "Title";
    noteInput.value = "";
    descriptionInput.value = "";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (noteInput.value.length > 50) {
      alert("Note title cannot exceed 50 characters.");
      return;
    }
    if (descriptionInput.value.length > 200) {
      alert("Note description cannot exceed 200 characters.");
      return;
    }
    addNote();
  });

  const loadNotes = () => {
    notesContainer.textContent = "";
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach((note, index) => renderNote(note, index));
  };

  const addNote = () => {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    const newNote = {
      title: noteInput.value,
      description: descriptionInput.value,
      completed: false,
    };
    notes = [newNote, ...notes];
    localStorage.setItem("notes", JSON.stringify(notes));
    noteInput.value = "";
    descriptionInput.value = "";
    additionalInputs.style.display = "none";
    firstAddButton.style.display = "inline-block";
    noteInput.placeholder = "Title";
    loadNotes();
  };

  const deleteNote = (index) => {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter((_, i) => i !== index);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
  };

  const toggleCompletion = (index) => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes[index].completed = !notes[index].completed;
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
  };

  const renderNote = (note, index) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    if (note.completed) {
      noteElement.classList.add("completed");
    }

    const pinElement = document.createElement("div");
    pinElement.classList.add("pin");

    const titleElement = document.createElement("h2");
    titleElement.textContent = note.title;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = note.description;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "🗑️";
    deleteButton.onclick = () => deleteNoteHandler(index);

    noteElement.appendChild(pinElement);
    noteElement.appendChild(titleElement);
    noteElement.appendChild(descriptionElement);
    noteElement.appendChild(deleteButton);

    noteElement.addEventListener("click", (event) => {
      if (!event.target.classList.contains("delete-btn")) {
        toggleCompletion(index);
      }
    });

    notesContainer.appendChild(noteElement);
  };

  window.deleteNoteHandler = deleteNote;

  loadNotes();
});

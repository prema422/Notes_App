let notes = JSON.parse(localStorage.getItem('notes')) || [];

function saveToLocalStorage(){
    localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes(filteredNotes = notes){
    const container = document.getElementById('notesContainer');
    container.innerHTML = '';

    filteredNotes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';

        noteDiv.innerHTML = `
            <textarea oninput="updateNote(${index}, this.value)">${note}</textarea>
            <div class="actions">
                <button class="save-btn" onclick="saveToLocalStorage()">Save</button>
                <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
            </div>
        `;

        container.appendChild(noteDiv);
    });
}

function addNote(){
    notes.push('');
    saveToLocalStorage();
    renderNotes();
}

function updateNote(index, value){
    notes[index] = value;
}

function deleteNote(index){
    notes.splice(index, 1);
    saveToLocalStorage();
    renderNotes();
}

function searchNotes(){
    const query = document.getElementById('search').value.toLowerCase();
    const filtered = notes.filter(note => note.toLowerCase().includes(query));
    renderNotes(filtered);
}

renderNotes();

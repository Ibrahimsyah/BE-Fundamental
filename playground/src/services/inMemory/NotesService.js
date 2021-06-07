const {v4} = require('uuid');

class NotesService {
  constructor() {
    this._notes = [];
  }

  addNote({title, body, tags}) {
    const id = v4();
    const newNote = {
      id,
      title,
      body,
      tags,
    };

    this._notes.push(newNote);
    return id;
  }

  getNotes() {
    return this._notes;
  }

  getNoteById(id) {
    const note = this._notes.find((note) => note.id === id);
    if (!note) {
      throw new Error(`Catatan tidak ditemukan`);
    }
    return note;
  }

  editNoteById(id, {title, body, tags}) {
    const noteIndex = this._notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      throw new Error(`Catatan tidak ditemukan`);
    }
    const note = this._notes[noteIndex];
    const updatedAt = new Date().toISOString();
    this._notes[noteIndex] = {
      ...note,
      title,
      body,
      tags,
      updatedAt,
    };
  }

  deleteNoteById(id) {
    const index = this._notes.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new Error(`Catatan tidak ditemukan`);
    }
    this._notes.splice(index, 1);
  }
}


module.exports = NotesService;

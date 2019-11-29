const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  debugger;

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.white.bgGreen('Note added'));
  } else {
    console.log(chalk.white.bgRed('Note title taken'));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const removeNote = notes.filter(note => note.title !== title);

  if (notes.length > removeNote.length) {
    console.log(chalk.white.bgGreen('Note Removed'));
    saveNotes(removeNote);
  } else {
    console.log(chalk.white.bgRed('No not found'));
  }
};

const listNote = () => {
  const notes = loadNotes();
  console.log(chalk.inverse('Your Notes'));

  notes.forEach(note => {
    console.log(note.title);
  });
};

const readNote = title => {
  const notes = loadNotes();
  const findNote = notes.find(note => note.title === title);
  if (findNote) {
    console.log(`${chalk.white.bgGreen(title)} and the ${findNote.body}`);
  } else {
    console.log(chalk.white.bgRed('No not found'));
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNote: listNote,
  readNote: readNote
};

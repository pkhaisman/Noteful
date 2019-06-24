import React from 'react';
import Note from '../Note/Note';
import NotefulContext from '../NotefulContext';

class SelectedNotes extends React.Component {
    static contextType = NotefulContext;
    render() {
        const selectedNote = this.context.data.notes.find(note => note.id === this.context.selectedNote)
        return (
            <ul className='NoteList'>
                <li key={selectedNote.id}>
                    <Note note={selectedNote} />
                </li>
            </ul>
        );
    }
}

export default SelectedNotes;
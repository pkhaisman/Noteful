import React from 'react';
import Note from '../Note/Note';
import NotefulContext from '../NotefulContext';

class SelectedNotes extends React.Component {
    static contextType = NotefulContext;
    render() {
        const note = this.context.data.notes.find(note => note.id === this.context.selectedNote)
        return (
            <ul className='NoteList'>
                <li key={note.id}>
                    <Note note={note} />
                </li>
            </ul>
        );
    }
}

export default SelectedNotes;
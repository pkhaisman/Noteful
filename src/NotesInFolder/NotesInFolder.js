import React from 'react';
import Note from '../Note/Note';
import NotefulContext from '../NotefulContext';

class NotesInFolder extends React.Component {
    static contextType = NotefulContext;
    render() {
        const filteredNotes = this.context.data.notes.filter(note => note.folderId === this.context.selectedFolder);
        const notes = filteredNotes.map(note => {
            return (
                <li key={note.id}>
                        <Note note={note} />
                </li>
            )
        });
        return (
            <ul className='NoteList'>
                {notes}
            </ul>
        );
    }
}

export default NotesInFolder;
import React from 'react';
import Note from '../Note/Note';
import NotefulContext from '../NotefulContext';
import {Link} from 'react-router-dom';

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
            <div className='NoteList'>
                <ul className='List'>
                    {notes}
                </ul>
                <Link to={'/newNote'}>
                    <button>Add Note</button>
                </Link>
            </div>
        );
    }
}

export default NotesInFolder;
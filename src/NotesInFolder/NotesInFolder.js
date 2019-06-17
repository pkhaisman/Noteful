import React from 'react';
import Note from '../Note/Note';
import {Link} from 'react-router-dom';

class NotesInFolder extends React.Component {
    render() {
        const filteredNotes = this.props.notes.filter(note => note.folderId === this.props.folderId);
        const notes = filteredNotes.map(note => {
            return (
                <li key={note.id}>
                    <Link to={`/note/${note.id}`}>
                        <Note note={note} />
                    </Link>
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
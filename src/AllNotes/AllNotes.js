
import React from 'react';
import Note from '../Note/Note';
import {Link} from 'react-router-dom';

class AllNotes extends React.Component {
    render() {
        const notes = this.props.notes.map(note => {
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

export default AllNotes;

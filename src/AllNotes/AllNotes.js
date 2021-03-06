
import React from 'react';
import Note from '../Note/Note';
import {Link} from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import './AllNotes.css';

class AllNotes extends React.Component {
    static contextType = NotefulContext;
    render() {
        const notes = this.context.data.notes.map(note => {
            return (
                <li key={note.id}>
                    {/* <Link 
                        onClick={() => {
                            this.context.setSelectedFolder(note.folderId)
                            this.context.setSelectedNote(note.id)
                        }}
                        to={`/note/${note.id}`}
                    > */}
                        <Note note={note} />
                    {/* </Link> */}
                </li>
            )
        });
        return (
            <div className='NoteList'>
                <ul className='List'>
                    {notes}
                </ul>
                <Link to={'/newNote'} className='AllNotes__add-note'>
                    <button className='AllNotes__add-note-btn'>Add Note</button>
                </Link>
            </div>
        );
    }
}

export default AllNotes;

import React from 'react';
import { Link } from 'react-router-dom';
import './NoteList.css';
import Note from '../Note/Note';

// Refactor needed
class NoteList extends React.Component {
    render() {
        // if a folder is clicked this shows the notes within
        if (this.props.folderId) {
            const filteredNotes = this.props.notes.filter(note => note.folderId === this.props.folderId);
            const notes = filteredNotes.map(note => {
                return (
                    <li key={note.id}>
                        <Link to={`note/${note.id}`}>
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
        // if a note is clicked this shows the singular note
        } else if (this.props.noteId) {
            const note = this.props.notes.find(note => note.id === this.props.noteId)
            return (
                <ul className='NoteList'>
                    <li key={note.id}>
                        <Note 
                            note={note}
                            noteId={this.props.noteId} />
                    </li>
                </ul>
            );
        // this runs when no folder or note is selected. shows all notes
        } else {
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
}

export default NoteList;
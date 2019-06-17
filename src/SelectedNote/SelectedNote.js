import React from 'react';
import Note from '../Note/Note';

class SelectedNotes extends React.Component {
    render() {
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
    }
}

export default SelectedNotes;
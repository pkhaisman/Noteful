import React from 'react';
import './NoteList.css';
import NotesInFolder from '../NotesInFolder/NotesInFolder';
import SelectedNote from '../SelectedNote/SelectedNote';
import AllNotes from '../AllNotes/AllNotes';

// Refactor needed
class NoteList extends React.Component {
    render() {
        // if a folder is clicked this shows the notes within
        if (this.props.folderId) {
            return <NotesInFolder notes={this.props.notes} folderId={this.props.folderId} />
        // if a note is clicked this shows the singular note
        } else if (this.props.noteId) {
            return <SelectedNote notes={this.props.notes} noteId={this.props.noteId} />
        // this runs when no folder or note is selected. shows all notes
        } 
        return <AllNotes notes={this.props.notes} />
    }
}

export default NoteList;
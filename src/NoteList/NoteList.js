import React from 'react';
import './NoteList.css';
import NotesInFolder from '../NotesInFolder/NotesInFolder';
import SelectedNote from '../SelectedNote/SelectedNote';
import AllNotes from '../AllNotes/AllNotes';
import NotefulContext from '../NotefulContext';

class NoteList extends React.Component {
    static contextType = NotefulContext;
    render() {
        // if a note is selected...
        if (this.context.selectedNote) {
            return <SelectedNote 
            />
        // else if folder is selected...
        } else if (this.context.selectedFolder) {
            return <NotesInFolder 
            />
        } 
        return <AllNotes />
    }
}

export default NoteList;
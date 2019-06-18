import React from 'react';
import './NoteList.css';
import NotesInFolder from '../NotesInFolder/NotesInFolder';
import SelectedNote from '../SelectedNote/SelectedNote';
import AllNotes from '../AllNotes/AllNotes';
import NotefulContext from '../NotefulContext';

// Refactor needed
class NoteList extends React.Component {
    static contextType = NotefulContext;
    render() {
        if (this.context.selectedNote) {
            return <SelectedNote 
            />
        } else if (this.context.selectedFolder) {
            return <NotesInFolder 
            />
        } 
        return <AllNotes />
    }
}

export default NoteList;
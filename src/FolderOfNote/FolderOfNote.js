import React from 'react';
import { Link } from 'react-router-dom';

class FolderOfNote extends React.Component {
    render() {
        const {noteId, notes, folders} = this.props.data
        const selectedNote = notes.find(note => note.id === noteId);
        const selectedFolder = folders.find(folder => selectedNote.folderId === folder.id);
        return (
            <ul className='FolderList'>
                <p>{selectedFolder.name}</p>
                <Link to='/'>
                    <button>Go Back</button>
                </Link>
            </ul>
        );
    }
}

export default FolderOfNote;
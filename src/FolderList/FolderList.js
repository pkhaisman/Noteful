import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './FolderList.css';
import Folder from '../Folder/Folder';

class FolderList extends React.Component {
    render() {    
        const {noteId, notes, folders, folderId} = this.props    
        if (this.props.noteId) {
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
        } else {
            const folderList = folders.map(folder => {
                return (
                    <li key={folder.id}>
                        <NavLink to={`/folder/${folder.id}`}>
                            <Folder
                                currentlySelectedFolder={folderId}
                                folder={folder} />
                        </NavLink>
                    </li>
                )
            });
            return (
                <ul className='FolderList'>
                    {folderList}
                </ul>
            );
        }

    }
}

export default FolderList;
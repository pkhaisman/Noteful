import React from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';

class FolderOfNote extends React.Component {
    static contextType = NotefulContext;
    render() {
        const {data: {folders}, selectedFolder} = this.context;
        const currentFolder = folders.find(folder => selectedFolder === folder.id);
        return (
            <ul className='FolderList'>
                <p>{currentFolder.name}</p>
                <Link 
                    to='/'
                    onClick={() => this.context.setSelectedNote(null)}
                >
                    <button>Go Back</button>
                </Link>
            </ul>
        );
    }
}

export default FolderOfNote;
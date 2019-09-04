import React from 'react';
import { withRouter } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import './FolderOfNote.css';

class FolderOfNote extends React.Component {
    static contextType = NotefulContext;
    render() {
        const {data: {folders}, selectedFolder} = this.context;
        const currentFolder = folders.find(folder => selectedFolder === folder.id);
        return (
            <ul className='FolderList'>
                <p className='FolderOfNote__title Folder'>{currentFolder.name}</p>
                    <button className='FolderOfNote__go-back-btn' onClick={() => {
                        this.context.setSelectedNote(null);
                        this.props.history.push(`/folder/${currentFolder.id}`)
                    }}>
                        Go Back
                    </button>
            </ul>
        );
    }
}

export default withRouter(FolderOfNote);
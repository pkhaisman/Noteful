import React from 'react';
import { withRouter } from 'react-router-dom';
import NotefulContext from '../NotefulContext';

class FolderOfNote extends React.Component {
    static contextType = NotefulContext;
    render() {
        console.log('folder of note rendered');
        const {data: {folders}, selectedFolder} = this.context;
        console.log('selected folder: ', selectedFolder);
        console.log('folders: ', folders)
        const currentFolder = folders.find(folder => selectedFolder === folder.id);
        return (
            <ul className='FolderList'>
                <p>{currentFolder.name}</p>
                {/* back button implementation */}
                {/* <Link 
                    to='/'
                    onClick={() => this.context.setSelectedNote(null)}
                > */}
                    <button onClick={() => {
                        this.context.setSelectedNote(null);
                        this.props.history.goBack()
                    }}>
                        Go Back
                    </button>
                {/* </Link> */}
            </ul>
        );
    }
}

export default withRouter(FolderOfNote);
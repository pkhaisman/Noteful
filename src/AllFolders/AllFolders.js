import React from 'react';
import Folder from '../Folder/Folder';
import {NavLink} from 'react-router-dom';

class AllFolders extends React.Component {
    render() {
        const {folders, folderId} = this.props.data  
        const folderList = folders.map(folder => {
            return (
                <li key={folder.id}>
                    <NavLink 
                        to={`/folder/${folder.id}`}
                        onClick={() => this.props.setSelectedFolder(folder.id)}
                    >
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

export default AllFolders;
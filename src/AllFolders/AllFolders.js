import React from 'react';
import Folder from '../Folder/Folder';
import {NavLink} from 'react-router-dom';
import NotefulContext from '../NotefulContext';

class AllFolders extends React.Component {
    static contextType = NotefulContext;
    render() {
        console.log(this.context)
        // const {folders, folderId} = this.props.data  
        const folderList = this.context.data.folders.map(folder => {
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

export default AllFolders;
import React from 'react';
import Folder from '../Folder/Folder';
import {NavLink} from 'react-router-dom';
import NotefulContext from '../NotefulContext';

class AllFolders extends React.Component {
    static contextType = NotefulContext;
    render() {
        const folderList = this.context.data.folders.map(folder => {
            return (
                <li key={folder.id}>
                    <NavLink 
                        to={`/folder/${folder.id}`}
                        onClick={() => this.context.setSelectedFolder(folder.id)}
                    >
                        <Folder
                            id={folder.id}
                            name={folder.name}
                        />
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
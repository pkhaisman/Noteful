import React from 'react';
import Folder from '../Folder/Folder';
import {NavLink, Link} from 'react-router-dom';
import NotefulContext from '../NotefulContext';

class AllFolders extends React.Component {
    static contextType = NotefulContext;

    

    render() {
        const allFolders = this.context.data.folders.map(folder => {
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
            <div className='FolderList'>
                <ul className='List'>
                    {allFolders}
                </ul>
                <Link
                    to={'/newFolder'}
                >
                    <button>Add Folder</button>
                </Link>
            </div>
        );
    }
}

export default AllFolders;
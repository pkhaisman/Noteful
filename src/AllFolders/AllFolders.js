import React from 'react';
import Folder from '../Folder/Folder';
import {NavLink, Link} from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import './AllFolders.css';

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
                            history={this.props.history}
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
                    className='AllFolders__add-folder'
                >
                    <button className='AllFolders__add-folder-btn'>Add Folder</button>
                </Link>
            </div>
        );
    }
}

export default AllFolders;
import React from 'react';
import './Folder.css';

class Folder extends React.Component {
    render() {
        const {id, name} = this.props.folder
        let className = 'Folder';
        if (this.props.currentlySelectedFolder === id) {
            className += ' selected';
        }
        return (
            <div className={className}>
                <p>{name}</p>
            </div>
        )
    }
}

export default Folder;
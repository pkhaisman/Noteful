import React from 'react';
import './Folder.css';
import NotefulContext from '../NotefulContext';

class Folder extends React.Component {
    static contextType = NotefulContext;
    render() {
        let className = 'Folder';
        if (this.context.selectedFolder === this.props.id) {
            className += ' selected';
        }
        return (
            <div className={className}>
                <p>{this.props.name}</p>
            </div>
        )
    }
}

export default Folder;
import React from 'react';
import './Folder.css';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';
import DeleteButton from '../DeleteButton/DeleteButton';
import EditFolderButton from '../EditFolderButton/EditFolderButton';

class Folder extends React.Component {
    static contextType = NotefulContext;
    render() {
        let className = 'Folder';
        // build className for selected style
        if (this.context.selectedFolder === this.props.id) {
            className += ' selected';
        }
        return (
            <div className={className}>
                <p>{this.props.name}</p>
                <div className='folder-buttons'>
                    <DeleteButton id={this.props.id} className={className} />
                    <EditFolderButton id={this.props.id} name={this.props.name} />
                </div>
            </div>
        )
    }
}

Folder.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string
}

export default Folder;
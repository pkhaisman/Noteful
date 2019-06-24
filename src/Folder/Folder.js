import React from 'react';
import './Folder.css';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';

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
            </div>
        )
    }
}

Folder.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string
}

export default Folder;
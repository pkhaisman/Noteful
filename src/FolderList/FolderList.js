import React from 'react';
import './FolderList.css';
import FolderOfNote from '../FolderOfNote/FolderOfNote';
import AllFolders from '../AllFolders/AllFolders';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';

class FolderList extends React.Component {
    static contextType = NotefulContext;

    componentDidMount() {
        if (this.props.match && this.props.match.params.folderId) {
            this.context.setSelectedNote(null);
            this.context.setSelectedFolder(parseInt(this.props.match.params.folderId));
        }
        if (this.props.match && this.props.match.params.noteId) {
            const note = this.context.data.notes.find(note => parseInt(note.id) === parseInt(this.props.match.params.noteId));
            this.context.setSelectedFolder(parseInt(note.folderId));
            this.context.setSelectedNote(parseInt(this.props.match.params.noteId))
        }
    }

    render() {
        if (this.context.selectedNote) {
            return <FolderOfNote />
        } 
        return <AllFolders history={this.props.history} />
    }
}

FolderList.propTypes = {
    match: PropTypes.object
}

export default FolderList;
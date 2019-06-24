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
            console.log('setting selected folder')
            this.context.setSelectedNote(null);
            this.context.setSelectedFolder(this.props.match.params.folderId);
        }
        if (this.props.match && this.props.match.params.noteId) {
            const note = this.context.data.notes.find(note => note.id === this.props.match.params.noteId);
            this.context.setSelectedFolder(note.folderId);
            this.context.setSelectedNote(this.props.match.params.noteId)
        }
    }

    render() {
        // if a note is clicked... 
        console.log(this.context.selectedFolder); 
        if (this.context.selectedNote) {
            return <FolderOfNote />
        } 
        return <AllFolders />
    }
}

FolderList.propTypes = {
    match: PropTypes.object
}

export default FolderList;
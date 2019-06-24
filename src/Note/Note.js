import React from 'react';
import './Note.css';
import NotefulContext from '../NotefulContext';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class Note extends React.Component {
    static contextType = NotefulContext;
    renderNotePage = (noteBox) => {
        const currentNote = this.context.data.notes.find(note => note.id === this.context.selectedNote)
        return (
            <div>    
                {noteBox}
                <div className='Note__content'>
                    {currentNote.content}
                </div>
            </div>
        );
    }

    renderNoteThumbnail = (noteBox) => {
        return noteBox;
    }

    render() {
        const {name, modified, id, folderId} = this.props.note
        const noteBox = (
            <div className='Note'>
                <Link 
                        to={`/note/${id}`}
                        onClick={() => {
                            this.context.setSelectedFolder(folderId)
                            this.context.setSelectedNote(id)
                        }}
                    >
                        <h3>{name}</h3>
                </Link>
                <div className='Note__date-delete'>
                    <p>{modified}</p>
                    <button onClick={() => {this.context.handleDelete(id)}}>Delete</button>
                </div>
            </div>
        );
        return this.context.selectedNote ? this.renderNotePage(noteBox) : this.renderNoteThumbnail(noteBox)
    }
}

Note.propTypes = {
    note: PropTypes.object
}

export default Note;
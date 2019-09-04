import React from 'react';
import './Note.css';
import NotefulContext from '../NotefulContext';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteButton from '../DeleteButton/DeleteButton';
import EditButton from '../EditButton/EditButton';

class Note extends React.Component {
    static contextType = NotefulContext;

    componentDidMount() {
        fetch('http://localhost:8000/api/notes/', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                const reformattedData = data.map(note => {
                    return {
                        name: note.note_name,
                        modified: note.date_modified,
                        id: note.id,
                        folderId: note.folder_id,
                        content: note.note_content
                    }
                })
                this.context.updateState(reformattedData)
            })
    }

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
        const date = new Date(modified)
        const formattedDate = date.toDateString();
        const noteBox = (
            <div className='Note-component'>
                <Link 
                        to={`/note/${id}`}
                        onClick={() => {
                            this.context.setSelectedFolder(folderId)
                            this.context.setSelectedNote(id)
                        }}
                    >
                        <h3 className='Note__title'>{name}</h3>
                </Link>
                <div className='Note__date-delete'>
                    <p className='Note__date'>{formattedDate}</p>
                    {/* <button className='Note__delete' onClick={() => {this.context.handleDelete(id)}}>Delete</button> */}
                </div>
                <div className='Note__buttons'>
                    <DeleteButton className='Note' id={id} />
                    <Link to={`/editNote/${id}`}>
                        <EditButton type='note' id={id} />
                    </Link>
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
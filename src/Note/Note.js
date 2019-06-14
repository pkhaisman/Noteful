import React from 'react';
import './Note.css';

class Note extends React.Component {
    renderNotePage = (noteBox) => {
        return (
            <div>    
                {noteBox}
                <div className='Note__content'>
                    {this.props.note.content}
                </div>
            </div>
        );
    }

    renderNoteThumbnail = (noteBox) => {
        return noteBox;
    }

    render() {
        const {name, modified} = this.props.note
        const noteBox = (
            <div className='Note'>
                <h3>{name}</h3>
                <div className='Note__date-delete'>
                    <p>{modified}</p>
                    <button>Delete</button>
                </div>
            </div>
        );
        return this.props.noteId ? this.renderNotePage(noteBox) : this.renderNoteThumbnail(noteBox)
    }
}

export default Note;
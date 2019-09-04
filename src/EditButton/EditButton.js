import React from 'react';
import NotefulContext from '../NotefulContext';
import './EditButton.css';

class EditNoteButton extends React.Component {
    static contextType = NotefulContext;

    render() {
        return (
            <div className='EditButton'>
                <button className='EditNoteButton' onClick={(e) => this.context.setSelectedNote(this.props.id)}>Edit</button>
            </div>
        )
    }
}

export default EditNoteButton;
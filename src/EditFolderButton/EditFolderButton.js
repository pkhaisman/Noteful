import React from 'react';
import { withRouter } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import './EditFolderButton.css'

class EditFolderButton extends React.Component {
    static contextType = NotefulContext;
    
    handleClick = (e) => {
        e.preventDefault()
        this.context.setSelectedFolder(this.props.id)
        this.props.history.push(`/editFolder/${this.props.id}`)
    }

    render() {
        return (
            <div>
                <button
                    className='EditFolderButton'
                    onClick={(e) => this.handleClick(e)}>Edit
                </button>
            </div>
        )
    }
}

export default withRouter(EditFolderButton);
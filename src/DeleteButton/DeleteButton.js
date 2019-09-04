import React from 'react';
import NotefulContext from '../NotefulContext';
import { withRouter } from 'react-router-dom';
import './DeleteButton.css'

class DeleteButton extends React.Component {
    static contextType = NotefulContext;
    
    render() {
        const className = `DeleteButton ${this.props.className}`
        return (
            <div>
                <button 
                    className={className}
                    id={this.props.id} 
                    onClick={(event) => {
                        event.preventDefault()
                        this.props.history.push(`/`)
                        this.context.handleDelete(event.target)}}>Delete
                </button>
            </div>
        )
    }
}

export default withRouter(DeleteButton);
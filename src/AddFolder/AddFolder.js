import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import ValidationError from '../ValidationError'

class AddFolder extends Component {
    static contextType = NotefulContext;

    constructor(props) {
        super(props);
        this.state = {
            newFolder: '',
            formValid: false,
            validationMessage: ''
        }
    }

    updateNewFolder = (newFolder) => {
        this.setState({newFolder}, this.validateForm(newFolder));
    }

    validateForm = (fieldValue) => {
        let errorMessage = this.state.validationMessage;
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
            errorMessage = 'Input is required';
            hasError = true;
        }
        this.setState({
            formValid: !hasError,
            validationMessage: errorMessage
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const folderName = this.state.newFolder;
        // make a POST request
        fetch('http://localhost:9090/folders', {
            method: 'POST',
            body: JSON.stringify({
                name: folderName

            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('An error ocurred in your post request');
                }
                return response.json()
            })
            .then(data => {
                this.setState({
                    newFolder: ''
                });
                if (this.state.formValid) {
                    this.context.handleAddFolder(folderName, data.id);
                    this.props.history.push('/');
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className='AddFolder'>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <h2>Add a Folder</h2>
                    <div className='input-field'>
                        <label htmlFor='new-folder'></label>
                        <input type='text' className='new-folder-input'
                            name='new-folder' id='new-folder' 
                            onChange={(e) => this.updateNewFolder(e.target.value)} />
                    </div>
                    <div className='buttons'>
                        <Link
                            to='/'
                        >
                            <button>Cancel</button>
                        </Link>
                        <button disabled={!this.state.formValid}>Submit</button>
                    </div>
                </form>
                <ValidationError hasError={!this.state.formValid} message={this.state.validationMessage} />
            </div>
        )
    }
}

export default withRouter(AddFolder);
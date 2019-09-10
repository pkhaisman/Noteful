import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import ValidationError from '../ValidationError'
import './AddFolder.css';
import config from '../config';

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
            errorMessage = '*Input is required';
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
        fetch(`${config.API_ENDPOINT}/api/folders`, {
            method: 'POST',
            body: JSON.stringify({
                folder_name: folderName

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
                <form className='AddFolder__form' onSubmit={e => this.handleSubmit(e)}>
                    <h2>Add a Folder</h2>
                    <div className='input-field'>
                        <label htmlFor='new-folder'></label>
                        <input type='text' className='AddFolder__new-folder-input'
                            name='new-folder' id='new-folder' 
                            onChange={(e) => this.updateNewFolder(e.target.value)} />
                    </div>
                    <ValidationError hasError={!this.state.formValid} message={this.state.validationMessage} />
                    <div className='AddFolder__buttons'>
                        <button className='AddFolder__cancel'>
                            <Link to='/' className='AddFolder__cancel--color'>Cancel</Link>
                        </button>
                        <button className='AddFolder__submit' disabled={!this.state.formValid}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(AddFolder);
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import ValidationError from '../ValidationError';

class AddNote extends Component {
    static contextType = NotefulContext;
    constructor(props) {
        super(props);
        this.state = {
            noteName: '',
            noteFolder: this.props.selectedFolder,
            noteContent: '',
            nameValid: false,
            folderValid: true,
            contentValid: false,
            validationMessages: {
                required: 'Input is required',
                folder: 'Select a folder'
            },
            formValid: false
        }
    }

    updateNoteName = (noteName) => {
        this.setState({noteName}, () => this.validateName(noteName));
    }

    updateNoteFolder = (noteFolder) => {
        this.setState({noteFolder}, () => this.validateFolder(noteFolder));
    }

    updateNoteContent = (noteContent) => {
        this.setState({noteContent}, () => this.validateContent(noteContent));
    }

    validateName = (fieldValue) => {
        let errorMessages = {...this.state.validationMessages};
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
            errorMessages.required = 'Input is required';
            hasError = true;
        }
        this.setState({
            nameValid: !hasError,
            validationMessages: errorMessages
        }, this.formValid)
    }

    validateFolder = (fieldValue) => {
        let errorMessages = {...this.state.validationMessages};
        let hasError = false;

        if (fieldValue === 'no-folder-selected') {
            errorMessages.folder = 'Select a folder';
            hasError = true;
        }
        this.setState({
            folderValid: !hasError,
            validationMessages: errorMessages
        }, this.formValid);
    }

    validateContent = (fieldValue) => {
        let errorMessages = {...this.state.validationMessages};
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
            errorMessages.required = 'Input is required';
            hasError = true;
        }
        this.setState({
            contentValid: !hasError,
            validationMessages: errorMessages
        }, this.formValid);
    }

    formValid = () => {
        const {nameValid, folderValid, contentValid} = this.state;
        this.setState({
            formValid: nameValid && folderValid && contentValid
        });
    }    

    handleSubmit = (e) => {
        e.preventDefault();
        const {noteName, noteFolder, noteContent, formValid} = this.state;

        fetch('http://localhost:9090/notes', {
            method: 'POST',
            body: JSON.stringify({
                name: noteName,
                folderId: noteFolder,
                content: noteContent,
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
                    noteName: '',
                    noteFolder: '',
                    noteContent: ''
                });
                if (formValid) {
                    this.context.handleAddNote(noteName, noteFolder, noteContent, data.id);
                    this.props.history.push('/');
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        const folders = this.context.data.folders.map(folder => {
            return <option value={folder.id}>{folder.name}</option>
        });
        return (
            <div className='AddNote'>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <h2>Add a Note</h2>
                    <div className='input-field'>
                        <label htmlFor='note-name'>Note Name</label>
                        <input type='text' className='new-note-input'
                            name='note-name' id='note-name'
                            onChange={e => this.updateNoteName(e.target.value)} />
                        <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.required} />
                        <label>
                            Note Folder
                            <select value={this.state.noteFolder} onChange={e => this.updateNoteFolder(e.target.value)}>
                                <option value='no-folder-selected'>Select a folder</option>
                                {folders}
                            </select>
                            <ValidationError hasError={!this.state.folderValid} message={this.state.validationMessages.folder} />
                        </label>

                        <label htmlFor='note-content'> Note Content</label>
                        <input type='text' className='new-note-input'
                            name='note-content' id='note-content'
                            onChange={e => this.updateNoteContent(e.target.value)} />
                        <ValidationError hasError={!this.state.contentValid} message={this.state.validationMessages.required} />
                    </div>
                    <div className='buttons'>
                        <Link to={'/'}>
                            <button>Cancel</button>
                        </Link>
                        <button disabled={!this.state.formValid}>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(AddNote);
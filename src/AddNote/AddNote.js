import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import ValidationError from '../ValidationError';
import './AddNote.css';
import config from '../config';

class AddNote extends Component {
    static contextType = NotefulContext;
    constructor(props) {
        super(props);
        this.state = {
            noteName: '',
            noteFolder: '',
            noteContent: '',
            modified: '',
            nameValid: false,
            folderValid: true,
            contentValid: false,
            validationMessages: {
                required: '',
                folder: ''
            },
            formValid: false
        }
    }

    componentDidMount() {
        if (this.context.selectedFolder) {
            this.setState({
                noteFolder: this.context.selectedFolder
            })
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

    setModified = (datePromise) => {
        let dateObj = new Date();
        let formattedDate = dateObj.toDateString()
        this.setState({modified: formattedDate}, () => {
            datePromise();
        });
    }

    validateName = (fieldValue) => {
        let errorMessages = {...this.state.validationMessages};
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
            errorMessages.required = '*Input is required';
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
            errorMessages.folder = '*Select a folder';
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

        var datePromise = new Promise((resolve, reject) => { 
            this.setModified(resolve)
        });

        datePromise.then(() => {
            const {noteName, noteFolder, noteContent, formValid, modified} = this.state;
            
            fetch(`${config.API_ENDPOINT}/api/notes/${noteFolder}/notes`, {
                method: 'POST',
                body: JSON.stringify({
                    note_name: noteName,
                    folder_id: noteFolder,
                    note_content: noteContent,
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
                        noteContent: '',
                        // modified: ''
                    });
                    if (formValid) {
                        this.context.handleAddNote(noteName, noteFolder, noteContent, data.id, modified);
                        this.props.history.push(`/folder/${noteFolder}`);
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        })
    }

    render() {
        const folders = this.context.data.folders.map((folder, id) => {
            return <option key={id} value={folder.id}>{folder.name}</option>
        });
        return (
            <div className='AddNote'>
                <form className='AddNote__form' onSubmit={e => {
                    this.handleSubmit(e);
                }}>
                    <h2 className='AddNote__title'>Add a Note</h2>
                    <div className='AddNote__input-field'>
                        <label className='AddNote--margin' htmlFor='note-name'>Note Name</label>
                        <input type='text' className='new-note-input'
                            name='note-name' id='note-name'
                            onChange={e => this.updateNoteName(e.target.value)} />
                        <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.required} />
                        <label className='AddNote__note-folder AddNote--margin'>
                            Note Folder
                            <select value={this.state.noteFolder} onChange={e => this.updateNoteFolder(e.target.value)}>
                                <option value='no-folder-selected'>Select a folder</option>
                                {folders}
                            </select>
                            <ValidationError hasError={!this.state.folderValid} message={this.state.validationMessages.folder} />
                        </label>

                        <label htmlFor='note-content' className='AddNote--margin'> Note Content</label>
                        <input type='text' className='new-note-input'
                            name='note-content' id='note-content'
                            onChange={e => this.updateNoteContent(e.target.value)} />
                        <ValidationError hasError={!this.state.contentValid} message={this.state.validationMessages.required} />
                    </div>
                    <div className='AddNote__buttons'>
                        <Link to={'/'}>
                            <button className='AddNote__cancel'>Cancel</button>
                        </Link>
                        <button className='AddNote__submit' disabled={!this.state.formValid}>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(AddNote);
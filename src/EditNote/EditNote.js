import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import { Link } from 'react-router-dom'
import ValidationError from '../ValidationError';
import './EditNote.css';

class EditNote extends Component {
    static contextType = NotefulContext
    constructor(props) {
        super(props);
        this.state = {
            noteId: '',
            noteName: '',
            noteContent: '',
            noteFolderId : '',
            modified: '',
            nameValid: true,
            folderValid: true,
            contentValid: true,
            validationMessages: {
                required: '',
                folder: '',
            },
            formValid: true,
        }
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params.noteId) {
            const note = this.context.data.notes.find(note => parseInt(note.id) === parseInt(this.props.match.params.noteId))
            this.setState({
                noteId: note.id,
                noteName: note.name,
                noteContent: note.content,
                noteFolderId : note.folderId,
            })
            this.context.setSelectedFolder(parseInt(note.folderId));
            this.context.setSelectedNote(parseInt(this.props.match.params.noteId))
        }
    }

    updateNoteName = (noteName) => {
        this.setState({ noteName }, () => this.validateName(noteName));
    }

    updateNoteFolder = (noteFolderId) => {
        this.setState({ noteFolderId }, () => this.validateFolder(noteFolderId));
    }

    updateNoteContent = (noteContent) => {
        this.setState({noteContent}, () => this.validateContent(noteContent))
    }

    setModified = (datePromise) => {
        let dateObj = new Date();
        let formatteDate = dateObj.toDateString();
        this.setState({
            modified: formatteDate
        }, () => {
            datePromise()
        });
    }

    validateName = (fieldValue) => {
        let errorMessages = {...this.state.validationMessages}
        let hasError = false

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

        let datePromise = new Promise((resolve, reject) => {
            this.setModified(resolve)
        });

        datePromise.then(() => {
            const { noteId, noteName, noteContent, noteFolderId, modified, formValid } = this.state;
            
            fetch(`http://localhost:8000/api/notes/${noteFolderId}/notes/${noteId}`, {
                method: `PATCH`,
                body: JSON.stringify({
                    note_name: noteName,
                    folder_id: noteFolderId,
                    note_content: noteContent,
                    date_modified: modified
                }),
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('An error ocurred in your patch request');
                    }
                    return response
                })
                .then(data => {
                    this.setState({
                        noteId: '',
                        noteName: '',
                        noteContent: '',
                        noteFolderId : '',
                    });
                    if (formValid) {
                        this.context.handleEditNote(noteName, noteFolderId, noteContent, noteId, modified)
                        this.props.history.push(`/note/${this.props.selectedNote.id}`);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
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
                    <h2 className='AddNote__title'>Edit Note</h2>
                    <div className='AddNote__input-field'>

                        <label className='AddNote--margin' htmlFor='note-name'>Note Name</label>
                        <input type='text' className='new-note-input'
                            name='note-name' id='note-name' value={this.state.noteName}
                            onChange={e => this.updateNoteName(e.target.value)} />
                        <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.required} />

                        <label className='AddNote__note-folder AddNote--margin'>
                            Note Folder
                            <select value={this.state.noteFolderId} onChange={e => this.updateNoteFolder(e.target.value)}>
                                <option>Select a folder</option>
                                {folders}
                            </select>
                            <ValidationError hasError={!this.state.folderValid} message={this.state.validationMessages.folder} />
                        </label> 

                        <label htmlFor='note-content' className='AddNote--margin'>Note Content</label>
                        <input type='text' className='edit-note-input'
                            name='note-content' id='note-content' value={this.state.noteContent}
                            onChange={e => this.updateNoteContent(e.target.value)} />
                        <ValidationError hasError={!this.state.contentValid} message={this.state.validationMessages.required} />
                    </div>
                    <div className='AddNote__buttons'>
                        <Link to={`/note/${this.props.selectedNote.id}`}>
                            <button className='AddNote__cancel'>Cancel</button>
                        </Link>
                        <button className='AddNote__submit' disabled={!this.state.formValid}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditNote;
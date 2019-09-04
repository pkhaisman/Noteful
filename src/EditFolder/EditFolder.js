import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import { Link } from 'react-router-dom';
import ValidationError from '../ValidationError';

class EditFolder extends Component {
    static contextType = NotefulContext
    constructor(props) {
        super(props);
        this.state = {
            folderId: '',
            folderName: '',
            nameValid: true,
            validationMessages: {
                required: '',
            },
            formValid: true,
        }
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params.folderId) {
            const folder = this.context.data.folders.find(folder => parseInt(folder.id) === parseInt(this.props.match.params.folderId));
            this.setState({
                folderId: folder.id,
                folderName: folder.name
            })
            this.context.setSelectedFolder(parseInt(folder.id));
        }
    }

    updateFolderName = (folderName) => {
        this.setState({
            folderName
        }, () => {
            this.validateName(folderName)
        })
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

    formValid = () => {
        const { nameValid } = this.state;
        this.setState({
            formValid: nameValid
        });
    }  

    handleSubmit = (e) => {
        e.preventDefault();

        const { folderId, folderName, formValid } = this.state;

        fetch(`http://localhost:8000/api/folders/${folderId}`, {
            method: `PATCH`,
            body: JSON.stringify({
                id: folderId,
                folder_name: folderName
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`An error ocurred in your patch request`)
                }
                return response
            })
            .then(data => {
                this.setState({
                    folderId: '',
                    folderName: '',
                })
                if (formValid) {
                    this.context.handleEditFolder(folderId, folderName)
                    this.props.history.push(`/folder/${folderId}`)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div className='AddNote'>
                <form className='AddNote__form' onSubmit={e => {
                    this.handleSubmit(e);
                }}>
                    <h2 className='AddNote__title'>Edit Folder</h2>
                    <div className='AddNote__input-field'>
                        <label className='AddNote--margin' htmlFor='folder-name'>Folder Name</label>
                        <input type='text' className='new-note-input'
                            name='folder-name' id='folder-name' value={this.state.folderName}
                            onChange={e => this.updateFolderName(e.target.value)} />
                        <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.required} />
                    </div>
                    <div className='AddNote__buttons'>
                        <Link to={`/folder/${this.props.selectedFolder}`}>
                            <button className='AddNote__cancel'>Cancel</button>
                        </Link>
                        <button className='AddNote__submit' disabled={!this.state.formValid}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditFolder;
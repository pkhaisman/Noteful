import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import FolderList from './FolderList/FolderList';
import NoteList from './NoteList/NoteList';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote'
import NotefulContext from './NotefulContext';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import './App.css';
import EditNote from './EditNote/EditNote';
import EditFolder from './EditFolder/EditFolder';
import config from './config';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFolder: null,
            selectedNote: null,
            folders: [],
            notes: []
        }
    }

    setSelectedFolder = (folderId) => {
        this.setState({
            selectedFolder: folderId
        })
    }

    setSelectedNote = (noteId) => {
        this.setState({
            selectedNote: noteId
        })
    }

    updateState = (data) => {
        this.setState({
            notes: data
        })
    }
    
    handleDelete = (eventObj) => {
        const eventObjId = parseInt(eventObj.id)
        // this deletes a folder
        if (eventObj.className.includes('Folder')) {
            fetch(`${config.API_ENDPOINT}/api/folders/${eventObjId}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(() => {
                    this.setState({
                        folders: this.state.folders.filter(folder => folder.id !== eventObjId),
                        selectedFolder: null
                    })
                })
        }
        // this deletes a note
        if (eventObj.className.includes('Note')) {
            const note = this.state.notes.find(note => note.id === eventObjId);
            const folderId = note.folderId;
            fetch(`${config.API_ENDPOINT}/api/notes/${folderId}/notes/${eventObj.id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(() => {
                    console.log('promise resolves')
                    this.setState({
                        notes: this.state.notes.filter(note => note.id !== eventObjId),
                        selectedNote: null
                    })
                })
                .catch(() => {
                    console.log('catch error')
                })
        }
    }

    handleAddFolder = (folderName, folderId) => {
        const newFolder = {
            name: folderName,
            id: folderId
        }
        this.setState({
            folders: [
                ...this.state.folders,
                newFolder
            ]
        });
    }

    handleAddNote = (noteName, noteFolder, noteContent, noteId, modified) => {
        const newNote = {
            name: noteName,
            folderId: noteFolder,
            content: noteContent,
            id: noteId,
            modified: modified
        }
        this.setState({
            notes: [
                ...this.state.notes,
                newNote
            ]
        });
    }

    handleEditFolder = (folderId, folderName) => {
        const updatedFolder = {
            id: folderId,
            name: folderName
        }
        const filteredFoldersArr = this.state.folders.filter(folder => folder.id !== folderId)
        this.setState({
            folders: [
                ...filteredFoldersArr,
                updatedFolder,
            ]
        })
    }

    handleEditNote = (noteName, noteFolder, noteContent, noteId, modified) => {
        const updatedNote = {
            name: noteName,
            folderId: noteFolder,
            content: noteContent,
            id: noteId,
            modified: modified
        }
        this.setState({
            notes: [
                ...this.state.notes,
                updatedNote,
            ]
        })
    }

    componentDidMount() {
        // fetch folders
        fetch(`${config.API_ENDPOINT}/api/folders`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                const reformattedData = data.map(folder => {
                    return {
                        id: folder.id,
                        name: folder.folder_name
                    }
                })
                this.setState({
                    folders: reformattedData
                })
            })
        // fetch notes
        fetch(`${config.API_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                const reformattedData = data.map(note => {
                    return {
                        name: note.note_name,
                        modified: note.date_modified,
                        id: note.id,
                        folderId: note.folder_id,
                        content: note.note_content
                    }
                })
                this.setState({
                    notes: reformattedData
                })
            })
    }

    render() {
        // wait until state is populated before running code
        if (this.state.folders.length === 0 || this.state.notes.length === 0) {
            return null
        }
        const contextValue = {
            data: {
                folders: this.state.folders,
                notes: this.state.notes
            },
            selectedFolder: this.state.selectedFolder,
            setSelectedFolder: this.setSelectedFolder,
            selectedNote: this.state.selectedNote,
            setSelectedNote: this.setSelectedNote,
            handleDelete: this.handleDelete,
            handleAddFolder: this.handleAddFolder,
            handleAddNote: this.handleAddNote,
            handleEditFolder: this.handleEditFolder,
            handleEditNote: this.handleEditNote,
            updateState: this.updateState,
        }
        return (
            <main className='App'>
                <header className='header'>
                    <Header />
                </header>
                <NotefulContext.Provider value={contextValue}>
                    {/* home route */}
                    <Route
                        exact path='/'
                        render={(props) => {
                            return <div className='main-content'>
                                <ErrorBoundary>
                                    <FolderList history={props.history} />
                                </ErrorBoundary>
                                <ErrorBoundary>
                                    <NoteList />
                                </ErrorBoundary>
                            </div>
                        }}
                    />
                    {/* folder route */}
                    <Route
                        path='/folder/:folderId/'
                        render={(props) => {
                            return <div className='main-content'>
                                <ErrorBoundary>
                                    <FolderList history={props.history} match={props.match} />
                                </ErrorBoundary>
                                <ErrorBoundary>
                                    <NoteList />
                                </ErrorBoundary>
                            </div>
                        }}
                    />
                    {/* note route */}
                    <Route
                        path='/note/:noteId/'
                        render={(props) => {
                            return <div className='main-content'>
                                <ErrorBoundary>
                                    <FolderList history={props.history} match={props.match} />
                                </ErrorBoundary>
                                <ErrorBoundary>
                                    <NoteList />
                                </ErrorBoundary>
                            </div>
                        }}
                    />
                    <Route
                        path='/newFolder/'
                        component={AddFolder}
                    />
                    <Route
                        path='/newNote/'
                        render={() => {
                            return <AddNote selectedFolder={this.state.selectedFolder ? this.state.selectedFolder : 'no-folder-selected'} />
                        }}
                    />
                    <Route 
                        path='/editNote/:noteId/'
                        render={(props) => {
                            return <EditNote 
                                match={props.match}
                                history={props.history}
                                selectedNote={this.state.selectedNote ? this.state.notes.find(note => note.id === this.state.selectedNote) : 'no-note-selected'}
                                selectedFolder={this.state.selectedFolder ? this.state.selectedFolder : 'no-folder-selected'} />
                        }}
                    />
                    <Route 
                        path='/editFolder/:folderId/'
                        render={(props) => {
                            return <EditFolder
                                history={props.history}
                                match={props.match} 
                                selectedFolder={this.state.selectedFolder ? this.state.selectedFolder : 'no-folder-selected'} />
                        }}
                    />
                </NotefulContext.Provider>
            </main>
        )
    }
}

export default App;
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

    handleDelete = (noteId) => {
        fetch(`http://localhost:9090/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(() => {
                console.log('delete route');
                this.setState({
                    notes: this.state.notes.filter(note => note.id !== noteId),
                    selectedNote: null
                })
            })
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

    handleAddNote = (noteName, noteFolder, noteContent, noteId) => {
        const newNote = {
            name: noteName,
            folderId: noteFolder,
            content: noteContent,
            id: noteId
        }
        this.setState({
            notes: [
                ...this.state.notes,
                newNote
            ]
        });
    }

    componentDidMount() {
        // fetch folders
        fetch('http://localhost:9090/folders', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    folders: data
                })
            })
        // fetch notes
        fetch('http://localhost:9090/notes', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    notes: data
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
            handleAddNote: this.handleAddNote
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
                                    <FolderList />
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
                                    <FolderList match={props.match} />
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
                                    <FolderList match={props.match} />
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
                </NotefulContext.Provider>
            </main>
        )
    }
}

export default App;
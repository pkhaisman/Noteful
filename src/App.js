import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import FolderList from './FolderList/FolderList';
import NoteList from './NoteList/NoteList';
import NotefulContext from './NotefulContext';
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
            .then(data => {
                console.log('delete route');
                this.setState({
                    notes: this.state.notes.filter(note => note.id !== noteId),
                    selectedNote: null
                })
            })
    }

    componentWillMount() {
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
        if (this.state.folders.length === 0 || this.state.notes.length === 0) {
            return false
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
            handleDelete: this.handleDelete
        }
        return (
            <main className='App'>
                <header className='header'>
                    <Header />
                </header>
                <NotefulContext.Provider value={contextValue}>
                    <Route
                        exact path='/'
                        render={(props) => {
                            return <div className='main-content'>
                                <FolderList />
                                <NoteList />
                            </div>
                        }}
                    />
                    <Route
                        path='/folder/:folderId/'
                        render={(props) => {
                            return <div className='main-content'>
                                <FolderList />
                                <NoteList />
                            </div>
                        }}
                    />
                    <Route
                        path='/note/:noteId/'
                        render={(props) => {
                            return <div className='main-content'>
                                <FolderList />
                                <NoteList />
                            </div>
                        }}
                    />
                </NotefulContext.Provider>
            </main>
        )
    }
}

export default App;
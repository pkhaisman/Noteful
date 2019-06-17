import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import FolderList from './FolderList/FolderList';
import NoteList from './NoteList/NoteList';
import NotefulContext from './NotefulContext'
import data from './data';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data,
            selectedFolder: null
        }
    }

    setSelectedFolder = (folderId) => {
        this.setState({
            selectedFolder: folderId
        })
    }

    render() {
        const {folders, notes} = this.state.data;
        return (
            <main className='App'>
                <header className='header'>
                    <Header />
                </header>
                    <Route
                        exact path='/'
                        render={(props) => {
                            return <div className='main-content'>
                                <FolderList 
                                    folders={folders}
                                    setSelectedFolder={(folderId) => this.setSelectedFolder(folderId)} />
                                <NoteList 
                                    notes={notes} />
                            </div>
                        }}
                    />
                    <Route
                        path='/folder/:folderId/'
                        render={(props) => {
                            return <div className='main-content'>
                                <FolderList
                                    folders={folders}
                                    folderId={props.match.params.folderId}
                                    setSelectedFolder={(folderId) => this.setSelectedFolder(folderId)} />
                                <NoteList 
                                    notes={notes}
                                    folderId={props.match.params.folderId} />
                            </div>
                        }}
                    />
                    <Route
                        path='/note/:noteId/'
                        render={(props) => {
                            return <div className='main-content'>
                                <FolderList
                                    folders={folders}
                                    notes={notes}
                                    noteId={props.match.params.noteId} />
                                <NoteList 
                                    notes={notes}
                                    noteId={props.match.params.noteId} />
                            </div>
                        }}
                    />
            </main>
        )
    }
}

export default App;
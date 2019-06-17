import React from 'react';

const NotefulContext = React.createContext({
    data: {},
    noteSelected: null,
    folderSelected: null,
    onNoteClick: () => {},
    onFolderClick: () => {}
});

export default NotefulContext;
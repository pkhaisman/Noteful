import React from 'react';

const NotefulContext = React.createContext({
    data: {},
    setSelectedFolder: () => {},
    setSelectedNote: () => {},
    handleDelete: () => {},
    handleAddFolder: () => {},
    handleAddNote: () => {},
    handleEditFolder: () => {},
    handleEditNote: () => {},
    updateState: () => {}
});

export default NotefulContext;
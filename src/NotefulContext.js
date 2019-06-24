import React from 'react';

const NotefulContext = React.createContext({
    data: {},
    setSelectedFolder: () => {},
    setSelectedNote: () => {},
    handleDelete: () => {},
    handleAddFolder: () => {},
    handleAddNote: () => {}
});

export default NotefulContext;
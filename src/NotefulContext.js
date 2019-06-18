import React from 'react';

const NotefulContext = React.createContext({
    data: {},
    setSelectedFolder: () => {},
    setSelectedNote: () => {},
    handleDelete: () => {}
});

export default NotefulContext;
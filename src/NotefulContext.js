import React from 'react';

const NotefulContext = React.createContext({
    data: {},
    setSelectedFolder: () => {}
});

export default NotefulContext;
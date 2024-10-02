import React, { createContext, useState } from 'react';

// Create the Context
export const GroupContext = createContext();

// Create a Provider component
export const GroupProvider = ({ children }) => {
    // State that will be shared across components
    const [group, setGroup] = useState("status");

    return (
        <GroupContext.Provider value={{ group, setGroup }}>
            {children}
        </GroupContext.Provider>
    );
};

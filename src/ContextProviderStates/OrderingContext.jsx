import React, { createContext, useState } from 'react';

// Create the Context
export const OrderContext = createContext();

// Create a Provider component
export const OrderProvider = ({ children }) => {
    // State that will be shared across components
    const [order, setOrder] = useState("priority");

    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

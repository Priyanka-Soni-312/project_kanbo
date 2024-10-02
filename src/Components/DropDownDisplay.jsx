import './DropDownDisplay.css'
import React, { useContext, useState } from 'react';
import { OrderContext } from '../ContextProviderStates/OrderingContext';
import { GroupContext } from '../ContextProviderStates/GroupContext';

const DisplayDropdown = () => {
    const { group, setGroup } = useContext(GroupContext);
    const { order, setOrder } = useContext(OrderContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleGroupChange = (event) => {
        setGroup(event.target.value);
        toggleDropdown();
    };

    const handleOrderChange = (event) => {
        setOrder(event.target.value);
        toggleDropdown();
    };

    return (
        <div className="dropdown-container">
            {/* Button to trigger the dropdown */}
            <button className="dropdown-button" onClick={toggleDropdown}>
                <span><img src={`Display.svg`} /> Display</span>
                <span className="arrow">&#9662;</span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="dropdown-menu">
                    <div className="dropdown-item">
                        <label htmlFor="grouping">Grouping</label>
                        <select id="grouping" value={group} onChange={handleGroupChange}>
                            <option value="status">Status</option>
                            <option value="userId">User</option>
                            <option value="priority">Priority</option>
                        </select>
                    </div>

                    <div className="dropdown-item">
                        <label htmlFor="ordering">Ordering</label>
                        <select id="ordering" value={order} onChange={handleOrderChange}>
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisplayDropdown;

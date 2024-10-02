import React from 'react';

const InitialsSVG = ({ userId, users }) => {
    // Find the user by userId
    const user = users.find(user => user.id == userId);
    let firstLetter;

    // Get the first letter of the user's name or default to 'A'
    if (user) {
        firstLetter = user.name.charAt(0).toUpperCase();
    } else {
        firstLetter = 'A';
    }

    // SVG styles
    const svgSize = '32px'; // Size of the SVG
    const svgStyle = {
        width: svgSize,
        height: svgSize,
        backgroundColor: "#80d2e0", // Background color
        borderRadius: '50%', // Makes it a circle
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'blue',
        fontSize: '48px', // Font size for initials
        fontWeight: 'bold',
    };

    // Determine dot color based on user availability
    const dotColor = user && user.available ? '#008230' : '#707070';

    return (
        <svg style={svgStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="#80d2e0" /> {/* Main circle */}
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">
                {firstLetter}
            </text>
            {/* Dot for availability status */}
            <circle cx="78" cy="78" r="13" fill={dotColor} /> {/* Shifted dot position */}
        </svg>
    );
};

export default InitialsSVG;

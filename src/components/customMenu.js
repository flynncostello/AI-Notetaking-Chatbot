import React from 'react';

const CustomMenu = ({ x, y, show }) => {
    const style = {
        position: 'absolute',
        top: y,
        left: x,
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        padding: '10px',
        zIndex: 1000,
        display: show ? 'block' : 'none'
    };

    return (
        <div style={style}>
            <a href="#">Custom Option 1</a>
            <a href="#">Custom Option 2</a>
            {/* Add more options as needed */}
        </div>
    );
};

export default CustomMenu;
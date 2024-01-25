// ContextMenu.js
import React from 'react';
import './ContextMenu.css';

const ContextMenu = ({ items, position, removeContextMenu }) => {

  const handleItemClick = (action, event) => {
    event.stopPropagation();
    action(); // Running action of clicked label
    removeContextMenu(); // Removing context menu
  };
  
  return (
    <div
      className={`context-menu`}
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
      }}
    >
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={(event) => handleItemClick(item.action, event)}>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
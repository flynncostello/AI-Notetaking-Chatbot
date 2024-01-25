// ContextMenu.js
import React, { useContext, useEffect } from 'react';
import './ContextMenu.css';
import { ContextMenuContext } from './ContextMenuProvider';

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
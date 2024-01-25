// ContextMenuProvider.js
import React, { createContext, useState } from 'react';

export const ContextMenuContext = createContext();

// Children is just all the routes within the ContextMenuProvider
export const ContextMenuProvider = ({ children }) => {
  const [contextMenu, setContextMenu] = useState({
    isVisible: false,
    position: { x: 0, y: 0 },
    items: [],
  });

  const showContextMenu = (position, items) => {
    setContextMenu({
      isVisible: true,
      position,
      items,
    });
  };

  const hideContextMenu = () => {
    setContextMenu({
      isVisible: false,
      position: { x: 0, y: 0 },
      items: [],
    });
  };

  return (
    <ContextMenuContext.Provider
      value={{ contextMenu, showContextMenu, hideContextMenu }}
    >
      {children}
    </ContextMenuContext.Provider>
  );
};

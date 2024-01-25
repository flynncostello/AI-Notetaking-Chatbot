import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteFolder as deleteFolderAction } from '../folders/foldersSlice';

const FolderContextMenu = ({ folderId }) => {
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: '0px', y: '0px' });

    const dispatch = useDispatch();

    const handleContextMenu = (event) => {
        event.preventDefault();
        setShowContextMenu(true);
        setCursorPos({ x: `${event.pageX}px`, y: `${event.pageY}px` });
    };

    const handleDeleteFolder = () => {
        dispatch(deleteFolderAction({ folderId }));
        setShowContextMenu(false); // Hide the context menu after deleting the folder
    };

    return (
        <div onContextMenu={handleContextMenu}>
            <div className={`context-menu ${showContextMenu ? 'active' : ''}`} style={{ left: cursorPos.x, top: cursorPos.y }}>
                <div onClick={handleDeleteFolder}>Delete</div>
            </div>
        </div>
    );
};

export default FolderContextMenu;
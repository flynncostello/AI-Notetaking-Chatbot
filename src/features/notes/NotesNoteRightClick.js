import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deteleteNoteFromFolder } from '../folders/foldersSlice';

const FolderContextMenu = ({ folderId, noteId }) => {
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: '0px', y: '0px' });

    const dispatch = useDispatch();

    const handleContextMenu = (event) => {
        event.preventDefault();
        setShowContextMenu(true);
        setCursorPos({ x: `${event.pageX}px`, y: `${event.pageY}px` });
    };

    const handleDeleteFile = () => {
        dispatch(deteleteNoteFromFolder({ folderId, noteId }));
        setShowContextMenu(false); // Hide the context menu after deleting the folder
    };

    return (
        <div onContextMenu={handleContextMenu}>
            <div className={`context-menu ${showContextMenu ? 'active' : ''}`} style={{ left: cursorPos.x, top: cursorPos.y }}>
                <div onClick={handleDeleteFile}>Delete</div>
            </div>
        </div>
    );
};

export default FolderContextMenu;
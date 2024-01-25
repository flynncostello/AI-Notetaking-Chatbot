// Notes.js
import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { selectFolders } from '../folders/foldersSlice';
import './Notes.css';
import arrowNav from '../../images/navArrow.png';
import ROUTES from '../../app/routes';
import { deleteFolder } from '../folders/foldersSlice';

import { ContextMenuContext } from '../../app/ContextMenuProvider';
import ContextMenu from '../../app/ContextMenu';

function Notes() {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const folders = useSelector(selectFolders);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFolderClick = (folderId) => {
        setSelectedFolder(folderId === selectedFolder ? null : folderId);
    };

    const handleFileClick = (file) => {
        if (selectedFile === file) {
            setSelectedFile(null);
            navigate(ROUTES.notesRoute());
        } else {
            setSelectedFile(file);
            navigate(ROUTES.noteRoute(file.id));
        }
    };

    // useContext(ContextMenuContext) is the same as using the ContextMenuProvider as its calling the ContextMenuContext.Provider
    const { contextMenu, showContextMenu, hideContextMenu } = useContext(ContextMenuContext);
    ////

    // Opening context menu - changing contextMenu state in provider and dispatching action to foldersSlice
    const handleContextMenuOpen = (folderId, event) => {
        event.preventDefault();
        const position = { x: event.clientX, y: event.clientY };
        const items = [
            { label: 'Rename', action: () => {
                console.log('Rename');
            }},
            { label: 'Delete', action: () => {
                dispatch(deleteFolder(folderId));
            }},
        ];
        showContextMenu(position, items);
    };

    // Closing context menu - changing contextMenu state in Provider
    const handleContextMenuClose = () => {
        hideContextMenu();
    }

    //// OUTSIDE CLICK /////
    // Checking if right click has occured outside of the context menu
    const handleOutsideClick = (event) => {
        const contextMenuElement = document.querySelector('.context-menu');
        if (contextMenuElement && !contextMenuElement.contains(event.target)) {
            handleContextMenuClose();
        }
    };

    // Setting up listener for right click
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [handleContextMenuClose, handleOutsideClick]);
    ///// OUTSIDE CLICK /////
    

    // List of folders instead of normal object stored by folders
    const foldersList = Object.values(folders);

    return (
        <div className='notes-page'>
            <div className='folders-container'>
                {foldersList.length === 0 ? <h1 className='empty-folder-text'>Nothing saved yet...</h1> : foldersList.map((folder) => (
                    <div key={folder.id}>
                        <div
                            className={folder.id === selectedFolder ? 'folder-current' : 'folder'}
                            onClick={() => handleFolderClick(folder.id)}
                            onContextMenu={(event) => {
                                handleContextMenuOpen(folder.id, event);
                                handleFolderClick(folder.id); // Handle folder click as well
                            }}
                        >
                            <h3>{folder.name}</h3>
                            <img className={folder.id === selectedFolder ? 'flipped' : ''} src={arrowNav} alt="arrow" />
                        </div>
                        <div className='files-dropdown'>
                            {folder.id === selectedFolder && Object.values(folder.notes).map((file) => (
                                <div
                                    key={file.id}
                                    className={`file ${selectedFile === file ? 'active' : ''}`}
                                    onClick={() => handleFileClick(file)}
                                >
                                    {file.name}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Outlet/>
            { contextMenu.isVisible && (
                <ContextMenu
                    items={contextMenu.items}
                    position={contextMenu.position}
                    removeContextMenu={handleContextMenuClose}
                />
            )}
        </div>
    );
}

export default Notes;
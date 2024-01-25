// Notes.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import './Notes.css';
import { selectFolders } from '../folders/foldersSlice';
import { deteleteNoteFromFolder } from '../folders/foldersSlice';
import ROUTES from '../../app/routes';

function Note() {
    const { noteId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const folders = useSelector(selectFolders);

    const { selectedFile, folderId } = Object.values(folders).reduce((acc, folder) => {
        const note = folder.notes[noteId];
        if (note) {
            return { selectedFile: note, folderId: folder.id };
        }
        return acc;
    }, { selectedFile: null, folderId: null });

    const handleDeleteFile = (e) => {
        e.preventDefault();
        dispatch(deteleteNoteFromFolder({ folderId, noteId: selectedFile.id }));
        navigate(ROUTES.notesRoute());
    }

    return (
        <div className='selected-file-container'>
            {selectedFile && (
                <div>
                    <div className='selected-file-top-bar'>
                        <h1>{selectedFile.name}</h1>
                        <i class="fa-solid fa-trash-can" onClick={handleDeleteFile}></i>
                    </div>
                    <hr />
                    <h3>{selectedFile.date}</h3>
                    <div className='file-content-container'>                    
                        <div className='description-container'>
                            <h2>- {selectedFile.description}</h2>
                        </div>
                        <p>{selectedFile.summary}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Note;
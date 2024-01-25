import { createSlice } from '@reduxjs/toolkit';

const foldersSlice = createSlice({
    name: 'folders',
    initialState: {
        '1': {id: '1', name: 'Math', notes: {'2': {id: '2', name: 'Algebra', date: '11/10/2004', description: 'This is a conversation about something', summary: 'Hello'}}},
    },
    reducers: {
        addFolder: (state, action) => {
            const newFolder = action.payload;
            state[newFolder.id] = newFolder;
        },
        deleteFolder: (state, action) => {
            const folderId = action.payload;
            delete state[folderId];
        },
        addNoteToFolder: (state, action) => {
            const { folderId, note } = action.payload;
            const folder = state[folderId];
            if (folder) {
                folder.notes[note.id] = note;
            }
        },
        deteleteNoteFromFolder: (state, action) => {
            const { folderId, noteId } = action.payload;
            const folder = state[folderId];
            if (folder) {
                delete folder.notes[noteId];
            }
        }
    },
});

export const { addFolder, deleteFolder, addNoteToFolder, deteleteNoteFromFolder } = foldersSlice.actions;
//export const selectFolders = (state) => state.folders; 
export const selectFolders = (state) => state.folders; 
export default foldersSlice.reducer;

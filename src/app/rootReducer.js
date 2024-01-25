import { combineReducers } from 'redux';
import conversationsReducer from '../features/conversations/conversationsSlice';
import foldersReducer from '../features/folders/foldersSlice';

const rootReducer = combineReducers({
    conversations: conversationsReducer,
    folders: foldersReducer,
});

export default rootReducer;
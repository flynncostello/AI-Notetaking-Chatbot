import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import AppLayout from "./AppLayout";
import Conversations from "../features/conversations/Conversations";
import Conversation from "../features/conversations/Conversation";
import NewConversationForm from "../forms/NewConversationForm";
import NotesLayout from '../features/notes/NotesLayout';
import Note from "../features/notes/Note";
import './App.css';
import { ContextMenuProvider } from './ContextMenuProvider';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ContextMenuProvider>
            <Routes>
              <Route path="/" element={<AppLayout/>}>
                <Route path="conversations" element={<Conversations/>}/>
                <Route path="conversations/:conversationId" element={<Conversation/>}/>
                <Route path="conversations/new" element={<NewConversationForm/>}/>
                <Route path="notes" element={<NotesLayout/>}>
                  <Route path=":noteId" element={<Note/>}/>
                </Route>
              </Route>
            </Routes>
          </ContextMenuProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
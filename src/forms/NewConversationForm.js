import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addConversation } from '../features/conversations/conversationsSlice';
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from 'react-router-dom';
import ROUTES from '../app/routes';

const NewConversationForm = () => {
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleStartConversation = (e) => {
        e.preventDefault();
        const newId = uuidv4();
        const newConversation = {
            id: newId,
            key: newId,
            name: name,
            description: description,
            date: new Date().toLocaleDateString(),
            aiTurn: false,
            userTurn: true,
            conversationRecord: [],
        }
        dispatch(addConversation(newConversation));
        navigate(ROUTES.conversationRoute(newId));
    };

    return (
        <div className='new-conversation-page'>
            <form onSubmit={handleStartConversation}>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Conversation Name' />
                <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Conversation Description' />
                <input type='submit' value='Start Conversation' />
            </form>
        </div>
    );
};

export default NewConversationForm;
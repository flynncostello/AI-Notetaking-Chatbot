import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectConversations } from './conversationsSlice';
import { deleteConversation } from './conversationsSlice';
import { Link } from 'react-router-dom';
import ROUTES from '../../app/routes';
import './Conversations.css';

const Conversations = () => {
    const conversations = useSelector(selectConversations);
    const dispatch = useDispatch();

    return (
        <section className="conversations">
          <h1>Conversations</h1>
          <ul className="conversations-list">
            {Object.values(conversations).map((conversation) => (
                <div className="conversation-container">
                    <Link to={ROUTES.conversationRoute(conversation.id)} className="conversation-link">
                        <li className="conversation" key={conversation.id}>
                            <div className="conversation-container">
                                <h2>{conversation.name}</h2>
                                <p>{conversation.date}</p>
                            </div>
                        </li>
                    </Link>
                    <button className="delete-conversation-button" onClick={() => dispatch(deleteConversation(conversation.id))}>X</button>
                </div>
            ))}
          </ul>
          <Link
            to={ROUTES.newConversationRoute()}
            className="start-new-conversation-button"
          >
            Start New Conversation
          </Link>
        </section>
      );
};

export default Conversations;

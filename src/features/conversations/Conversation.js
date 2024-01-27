import { React, useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { selectConversations, updateConversation } from './conversationsSlice';
import ROUTES from '../../app/routes';
import ConversationSaveForm from '../../forms/ConversationSaveForm';
import './Conversation.css';
import logoGray from '../../images/logoGray.png';
import { getConversationResponse } from '../../aiAPI/conversation_ai';

const Conversation = () => {
    const [ newMessage, setNewMessage ] = useState('');
    const [ savingMessage, setSavingMessage ] = useState(false);
    const [ loadingResponse, setLoadingResponse ] = useState(false);


    const endOfMessagesRef = useRef(null);

    const dispatch = useDispatch();

    const conversations = useSelector(selectConversations);
    const { conversationId } = useParams();
    const currentConversation = conversations[conversationId];
    const { id, name, date, aiTurn, userTurn, description, conversationRecord } = currentConversation;

    // Handles submitting a new message
    const handleSubmitNewMessage = (e) => {
        e.preventDefault();
        if (userTurn) {
            dispatch(updateConversation({ conversationId: id, newConversationElement: newMessage, aiTurn: !aiTurn, userTurn: !userTurn }));
        }
    };

    // Handles creating ai response based on user input using OpenAI API
    const createAiResponse = async (userMessage) => {
        setLoadingResponse(true);
        try {
            const aiResponse = await getConversationResponse(userMessage);
            setNewMessage('');
            dispatch(updateConversation({ conversationId: id, newConversationElement: aiResponse, aiTurn: !aiTurn, userTurn: !userTurn }));
            setLoadingResponse(false);
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        if (aiTurn && conversationRecord.length % 2 !== 0) {
            setTimeout(() => {
                createAiResponse(newMessage);
                endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 1000);
        }
    }, [aiTurn, conversationRecord.length, newMessage]);

    // Handles starting the saving process
    const handleStartSaveProcess = () => {
        setSavingMessage(!savingMessage);
    };

    return (
        <section className="conversation-page">
            <Link to={ROUTES.conversationsRoute()}>
                <button className='conversation-page-back-button'>&larr;</button>
            </Link>
          {currentConversation ? (
            <div className='conversation-page-container'>
                <div className='conversation-page-info'>
                    <div className='conversation-page-header'>
                        <h1>{name}</h1>
                        <h2>{date}</h2>
                        <p>{description}</p>
                    </div>
                    <div className='conversation-page-save'>
                        <button onClick={handleStartSaveProcess} className='start-save-button'>Save Conversation</button>
                        {savingMessage ? <ConversationSaveForm handleStartSaveProcess={handleStartSaveProcess} conversation={currentConversation} /> : null}
                    </div>
                </div>
                <div className='conversation-page-messanger-container'>
                    
                    <div className='conversation-page-messanger'>
                        { conversationRecord.length === 0 ?
                            <div className='conversation-empty-header'>
                                <img className="empty-conversation-logo" src={logoGray} alt="logo"/>
                                <h1 className='conversation-empty-header-h1'>How can I assist you today?</h1>
                            </div>
                            : 
                            <div className='conversation-page-previous-messages'>
                                {conversationRecord.map((conversationElement, index) => (
                                    index % 2 === 1 ? (
                                        <div className='chat-bubble'>
                                            <p key={index} className='ai-chat'>{conversationElement}</p>
                                        </div>
                                    ) : (
                                        <div className='chat-bubble'>
                                            <p key={index} className='user-chat'>{conversationElement}</p>
                                        </div>
                                    )
                                ))}
                                {aiTurn && loadingResponse ?
                                <div className="loading">
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                </div> : null}
                                <div ref={endOfMessagesRef} />
                            </div>
                        }
                    </div>
                    
                    <form onSubmit={handleSubmitNewMessage} className='converesation-page-message-form'>
                        <input 
                            type="text" 
                            value={newMessage} 
                            onChange={(e) => setNewMessage(e.target.value)} 
                            placeholder="Ask me something..."
                            disabled={!userTurn}
                            required
                        />
                        <button type="submit">
                            <i className="fa-solid fa-arrow-up"></i>
                        </button>
                    </form>
                </div>
            </div>
          ) : (
            <div>
              <p>Conversation not found</p>
              <Link to={ROUTES.conversationsRoute()}>
                <button>Return</button>
              </Link>
            </div>
          )}
        </section>
      );
};

export default Conversation;
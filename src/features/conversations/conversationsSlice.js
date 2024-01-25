import { createSlice } from '@reduxjs/toolkit';

const conversationsSlice = createSlice({
    name: 'conversations',
    initialState: {},
    /*
        '1': {
            id: '1',
            key: '1',
            name: "Conversation 1",
            date: "11/10/2004",
            aiTurn: false,
            userTurn: true,
            hasSaidInitialAiGreeting: false,
            description: "This is a conversation about something",
            conversationRecord: ['Hi HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello', 'Hello First, wrap your .ai-chat and .user-chat elements in a container and apply display: flex; and justify-content: space-between; to it. This will create space between the .ai-chat and HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello .user-chat elements.', 'a', 'b', 'c', 'd', 'e', 'f', 'adsg', 'sgdfg', 'dfgfh', 'dfghfgdh', 'fghfdgn', 'fghsg', 'dfhdfh']
        }
    },
    */
    reducers: {
        addConversation: (state, action) => {
            const newConversation = action.payload;
            state[newConversation.id] = newConversation;
        },
        deleteConversation: (state, action) => {
            delete state[action.payload];
        },
        updateConversation: (state, action) => {
            const { conversationId, newConversationElement, aiTurn, userTurn } = action.payload;
            // dispatch(updateConversation({ conversationId: '1', newConversationElement: 'New conversation element' }));
            const existingConversation = state[conversationId];
            if (existingConversation) {
                existingConversation.conversationRecord.push(newConversationElement);
                existingConversation.aiTurn = aiTurn;
                existingConversation.userTurn = userTurn;
            }
        },
    },
});

export const { addConversation, deleteConversation, updateConversation } = conversationsSlice.actions;
export const selectConversations = (state) => state.conversations;
export default conversationsSlice.reducer;


/*
    conversations = {
        '1': {
            id: 1,
            date: "",
            name: "Conversation 1",
            filepath: "path/to/conversation1",
            description: "This is a conversation about something"
            conversationRecord: []
        },
    }
    */
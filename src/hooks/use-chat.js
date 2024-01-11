import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { subDays, subHours, subMinutes } from 'date-fns';

const botName = 'cole'
const intro = 'Hi, I\'m Cole\'s assistant. How can I help you?'

const userID = '5e86809283e28b96d2d38537'
const coachID = '5e86805e2bafd54f66cc95c3'
// Custom Hook for Chat Functionality

const SentStatus = {
    SENT: 'sent', 
    PENDING: 'pending', 
    FAILED: 'failed'
};

function useChat() {
    const [isTyping, setIsTyping] = useState(false);
    const [threadId, setThreadId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isStoredMessages, setIsStoredMessages] = useState(false);


    const updateMessageStatus = (messageId, status) => {
        setMessages((prevMessages) => prevMessages.map(msg =>
            msg.id === messageId ? { ...msg, sentStatus: status } : msg
        ));
    };

    // Send the initial message to start the conversation with the chatbot
    const sendInitialMessage = () => {
        const incomingMessageTime = new Date();

        setIsTyping(true);
        setTimeout(() => {
        setIsTyping(false);
        setMessages((prevstate) => [
            ...prevstate,
            {
                id: uuidv4(),
                attachments: [],
                body: intro,
                contentType: "text",
                createdAt: incomingMessageTime.getTime(),
                authorId: coachID,
                sentStatus: SentStatus.SENT
            },
        ]);
        }, 1000);
    };

    // Handle sending a message and receiving a response
    const handleSend = async (message) => {
        const outgoingMessageTime = new Date();
        const messageId = uuidv4(); 

        setIsTyping(true);

        const tempMessage = {
            id: messageId,
            attachments: [],
            body: message,
            contentType: "text",
            createdAt: outgoingMessageTime.getTime(),
            authorId: userID,
            sentStatus: SentStatus.PENDING
        };

        setMessages(prevstate => [...prevstate, tempMessage]);

        const responseObject = await sendMessageToServer(messageId, message); // Send message to server

        if (responseObject) {
            processIncomingMessage(responseObject);
        }
    };

    const processIncomingMessage = (responseObject) => {
        if (!threadId) {
            setThreadId(responseObject.threadId);
            localStorage.setItem(botName + '_threadId', responseObject.threadId);
        }

        const incomingMessageTime = new Date();

        setIsTyping(false);
        setMessages(prevstate => [
            ...prevstate,
            {
                id: uuidv4(),
                attachments: [],
                body: responseObject.message,
                contentType: "text",
                createdAt: incomingMessageTime.getTime(),
                authorId: coachID,
                sentStatus: SentStatus.SENT
            },
        ]);
    };

    const sendMessageToServer = async (messageId, messageContent) => {
        let responseObject;

        try {
            responseObject = await fetch('/api/chat/ai/cole-response', {
                method: 'POST',
                body: JSON.stringify({ threadId, message: messageContent }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!responseObject.ok) {
                throw new Error('Network response was not ok');
            }

            updateMessageStatus(messageId, SentStatus.SENT); // Update status to SENT on successful response
        } catch (error) {
            console.error('Fetch error:', error);
            updateMessageStatus(messageId, SentStatus.FAILED); // Update status to FAILED in case of error
            setIsTyping(false);
            return;
        }
        
        responseObject = await responseObject.json();
        return responseObject;
    };

    const retrySend = async (messageId) => {
        const failedMessage = messages.find(m => m.id === messageId);
        
        if (!failedMessage || failedMessage.sentStatus !== SentStatus.FAILED) {
            console.error('Unable to retry: Message not found or not in FAILED status');
            return;
        }
        
        updateMessageStatus(messageId, SentStatus.PENDING); // Update status to PENDING before retrying
        
        const responseObject = await sendMessageToServer(messageId, failedMessage.body); // Retrying the send operation

        if (responseObject) {
            processIncomingMessage(responseObject);
        }
    };

    // Load stored messages from localStorage
    const grabStoredMessages = () => {
        const storedMessages = JSON.parse(localStorage.getItem(botName + '_messages'));
        setThreadId(localStorage.getItem(botName + '_threadId'));

        if (storedMessages && storedMessages.length !== 0) {
            setMessages(storedMessages || []);
        } else {
            sendInitialMessage();
        }
    };

    const deleteMessage = (messageId) => {
        setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId));
    };

    // Clear messages both from local state and localStorage
    const clearMessages = () => {
        setMessages([]);
       
        localStorage.removeItem(botName + '_messages');
        localStorage.removeItem(botName + '_threadId');
    
        sendInitialMessage();
        
    };

    // Effect to load stored messages if present when botName changes
    useEffect(() => {
        grabStoredMessages();
    }, []);

    // Effect for storing messages in localStorage when they change
    useEffect(() => {
        localStorage.setItem(botName + '_messages', JSON.stringify(messages));
    }, [messages]);

    return {
        isTyping,
        messages,
        handleSend,
        clearMessages,
        deleteMessage,
        retrySend,
    };
}

export default useChat;
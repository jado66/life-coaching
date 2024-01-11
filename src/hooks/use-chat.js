import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { subDays, subHours, subMinutes } from 'date-fns';

const botName = 'cole'
const intro = 'Hi, I\'m Cole\'s assistant. How can I help you?'

const userID = '5e86809283e28b96d2d38537'
const coachID = '5e86805e2bafd54f66cc95c3'
// Custom Hook for Chat Functionality

function useChat() {
    const [isTyping, setIsTyping] = useState(false);
    const [threadId, setThreadId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isStoredMessages, setIsStoredMessages] = useState(false);


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
                authorId: coachID
            },
        ]);
        }, 1000);
    };

    // Handle sending a message and receiving a response
    const handleSend = async (message) => {
        const outgoingMessageTime = new Date();

        setIsTyping(true);
        setMessages((prevstate) => [
            ...prevstate,
            {
                id: uuidv4(),
                attachments: [],
                body: message,
                contentType: "text",
                createdAt: outgoingMessageTime.getTime(),
                authorId: userID
            },
        ]);

        await fetch('/api/chat/ai/test', {
            method: 'GET'
        });

        let responseObject;
        try {
            responseObject = await fetch('/api/chat/ai/cole-response', {
                method: 'POST',
                body: JSON.stringify({ threadId, message }),
                headers: {
                'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Fetch error:', error);
        }
        
        responseObject = await responseObject.json();

        if (!threadId) {
            setThreadId(responseObject.threadId);
            localStorage.setItem(botName + '_threadId', responseObject.threadId);
        }

        const incomingMessageTime = new Date();

        setIsTyping(false);
        setMessages((prevstate) => [
            ...prevstate,
            {
                id: uuidv4(),
                attachments: [],
                body: responseObject.message,
                contentType: "text",
                createdAt: incomingMessageTime.getTime(),
                authorId: coachID
            },
        ]);
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
        isStoredMessages,
        sendInitialMessage,
        grabStoredMessages,
        handleSend,
        clearMessages,
    };
}

export default useChat;
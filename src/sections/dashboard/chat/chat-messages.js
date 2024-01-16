import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';

import { useUser } from 'src/hooks/use-user';

import { ChatMessage } from './chat-message';
import ChatTypingIndicator from './chat-typing-indicator';

const getAuthor = (message, participants, user) => {
  const participant = participants.find((participant) => participant.id === message.authorId);

  // This should never happen
  // if (!participant) {
  //   return {
  //     name: 'Unknown',
  //     avatar: '',
  //     isUser: false,
  //   };
  // }

  // Since chat mock db is not synced with external auth providers
  // we set the user details from user auth state instead of thread participants
  if (message.authorId === user?.email) {
    return {
      name: 'Me',
      avatar: user?.avatar,
      isUser: true,
    };
  }

  return {
    avatar: participant?.avatar,
    name: participant?.name,
    isUser: false,
  };
};

export const ChatMessages = (props) => {
  const { 
    messages = [], 
    participants = [], 
    deleteMessage,
    retrySend,
    isTyping,
    ...other 
  } = props;
  const {user} = useUser();

  console.log('messages', messages) 

  return (
    <Stack
      spacing={2}
      sx={{ p: 3 }}
      {...other}
    >

      {messages.map((message) => {
        const author = getAuthor(message, participants, user);

        return (
          <ChatMessage
            authorAvatar={author?.avatar}
            authorName={author.name}
            body={message.body}
            contentType={message.contentType}
            createdAt={message.createdAt}
            key={message.id}
            position={author.isUser ? 'right' : 'left'}
            sentStatus={message.sentStatus}
            deleteMessage={deleteMessage}
            retrySend={retrySend}
            id={message.id}
          />
        );
      })}
      
      {isTyping && (
        <ChatTypingIndicator
          chatUser = {'Cole\'s Assistant'}
        />
      )}
    </Stack>
  );
};

ChatMessages.propTypes = {
  messages: PropTypes.array,
  participants: PropTypes.array,
  deleteMessage: PropTypes.func,
  retrySend: PropTypes.func,
  isTyping: PropTypes.bool,
};

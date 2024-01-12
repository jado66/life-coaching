import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import { chatApi } from 'src/api/chat';
import { Scrollbar } from 'src/components/scrollbar';
import { useMockedUser } from 'src/hooks/use-mocked-user';
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';
import { useDispatch, useSelector } from 'src/store';
import { thunks } from 'src/thunks/chat';

import { ChatMessageAdd } from './chat-message-add';
import { ChatMessages } from './chat-messages';
import { ChatThreadToolbar } from './chat-thread-toolbar';
import useChat from 'src/hooks/use-chat';

const useParticipants = (threadKey) => {
  const router = useRouter();
  const [participants, setParticipants] = useState([]);

  const handleParticipantsGet = useCallback(async () => {
    try {
      const participants = await chatApi.getParticipants({ threadKey });
      setParticipants(participants);
    } catch (err) {
      console.error(err);
      router.push(paths.dashboard.chat);
    }
  }, [router, threadKey]);

  useEffect(
    () => {
      handleParticipantsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [threadKey]
  );

  return participants;
};

const useThread = (threadKey) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const thread = useSelector((state) => {
    const { threads, currentThreadId } = state.chat;

    return threads.byId[currentThreadId];
  });

  const handleThreadGet = useCallback(async () => {
    // If thread key is not a valid key (thread id or contact id)
    // the server throws an error, this means that the user tried a shady route
    // and we redirect them on the home view

    let threadId;

    try {
      threadId = await dispatch(
        thunks.getThread({
          threadKey,
        })
      );
    } catch (err) {
      console.error(err);
      router.push(paths.dashboard.chat);
      return;
    }

    // Set the active thread
    // If the thread exists, then is sets it as active, otherwise it sets is as undefined

    dispatch(
      thunks.setCurrentThread({
        threadId,
      })
    );

    // Mark the thread as seen only if it exists

    if (threadId) {
      dispatch(
        thunks.markThreadAsSeen({
          threadId,
        })
      );
    }
  }, [router, dispatch, threadKey]);

  useEffect(
    () => {
      handleThreadGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [threadKey]
  );

  return thread;
};

const useMessagesScroll = (thread) => {
  const messagesRef = useRef(null);

  const handleUpdate = useCallback(() => {
    // Thread does not exist
    if (!thread) {
      return;
    }

    // Ref is not used
    if (!messagesRef.current) {
      return;
    }

    const container = messagesRef.current;
    const scrollElement = container.getScrollElement();

    if (scrollElement) {
      scrollElement.scrollTop = container.el.scrollHeight;
    }
  }, [thread]);

  useEffect(
    () => {
      handleUpdate();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [thread]
  );

  return {
    messagesRef,
  };
};

export const ChatThread = (props) => {
  const {
    isTyping,
    messages,
    handleSend,
    clearMessages,
    deleteMessage,
    retrySend,
  } = useChat()


  const { threadKey, ...other } = props;
  const dispatch = useDispatch();
  const user = useMockedUser();
  const thread = useThread(threadKey);
  const participants = useParticipants(threadKey);
  const { messagesRef } = useMessagesScroll(thread);

  return (
    <Stack
      sx={{
        flexGrow: 1,
        overflow: 'hidden',
      }}
      {...other}
    >
      <ChatThreadToolbar participants={participants} clearMessages = {clearMessages} />
      <Divider />
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'hidden',
        }}
      >
        <Scrollbar
          ref={messagesRef}
          sx={{ maxHeight: '100%' }}
        >
          <ChatMessages
            messages={messages || []}
            participants={thread?.participants || []}
            deleteMessage={deleteMessage}
            retrySend={retrySend}
            isTyping={isTyping}
          />
        </Scrollbar>
      </Box>
      <Divider />
      <ChatMessageAdd onSend={handleSend} />
    </Stack>
  );
};

ChatThread.propTypes = {
  threadKey: PropTypes.string.isRequired,
};

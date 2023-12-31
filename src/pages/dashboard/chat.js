import { useCallback, useEffect, useRef, useState } from 'react';
import Menu01Icon from '@untitled-ui/icons-react/build/esm/Menu01';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSearchParams } from 'src/hooks/use-search-params';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { ChatBlank } from 'src/sections/dashboard/chat/chat-blank';
import { ChatComposer } from 'src/sections/dashboard/chat/chat-composer';
import { ChatContainer } from 'src/sections/dashboard/chat/chat-container';
import { ChatSidebar } from 'src/sections/dashboard/chat/chat-sidebar';
import { ChatThread } from 'src/sections/dashboard/chat/chat-thread';
import { useDispatch } from 'src/store';
import { thunks } from 'src/thunks/chat';
import { QuestionAnswerOutlined } from '@mui/icons-material';

/**
 * NOTE:
 * In our case there two possible routes
 * one that contains /chat and one with a chat?threadKey={{threadKey}}
 * if threadKey does not exist, it means that the chat is in compose mode
 */

const useThreads = () => {
  const dispatch = useDispatch();

  const handleThreadsGet = useCallback(() => {
    dispatch(thunks.getThreads());
  }, [dispatch]);

  useEffect(
    () => {
      handleThreadsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};

const useSidebar = () => {
  const searchParams = useSearchParams();
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const [open, setOpen] = useState(true);

  const handleScreenResize = useCallback(() => {
    if (!mdUp) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [mdUp]);

  // useEffect(
  //   () => {
  //     handleScreenResize();
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [mdUp]
  // );

  const handeParamsUpdate = useCallback(() => {
    if (!mdUp) {
      setOpen(false);
    }
  }, [mdUp]);

  // useEffect(
  //   () => {
  //     handeParamsUpdate();
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [searchParams]
  // );

  const handleToggle = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    handleToggle,
    handleClose,
    open,
  };
};

const Page = () => {
  const rootRef = useRef(null);
  const searchParams = useSearchParams();
  const compose = searchParams.get('compose') === 'true';
  const threadKey = '5e86805e2bafd54f66cc95c3'
  const sidebar = useSidebar();

  usePageView();

  useThreads();

  const view = 'thread' 

  return (
    <>
      <Seo title="Dashboard: Chat" />
      <Divider />
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: 'flex',
            left: 0,
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          {/* <ChatSidebar
            container={rootRef.current}
            onClose={sidebar.handleClose}
            open={sidebar.open}
          /> */}
          <ChatContainer open={sidebar.open}>
            {/* <Box sx={{ p: 2 }}>
              <IconButton onClick={sidebar.handleToggle}>
                <SvgIcon>
                  <QuestionAnswerOutlined />
                </SvgIcon>
              </IconButton>
            </Box> */}
            <Divider />
            {view === 'thread' && <ChatThread threadKey={threadKey} />}
            {view === 'compose' && <ChatComposer />}
            {view === 'blank' && <ChatBlank />}
          </ChatContainer>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

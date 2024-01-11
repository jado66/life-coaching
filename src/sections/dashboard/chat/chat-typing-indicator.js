import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const ChatTypingIndicator = ({chatUser}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
      }}
    >
      <CircularProgress
        size={15}
        sx={{
          color: 'primary.main',
          mr: 1,
        }}
      />
      <Typography
        variant="body2"
        color="text.secondary"
      >
        {chatUser} is typing...
      </Typography>
    </Box>
  );
};

export default ChatTypingIndicator;
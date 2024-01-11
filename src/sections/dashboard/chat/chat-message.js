import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const ChatMessage = (props) => {
  const { 
    authorAvatar, 
    authorName, 
    body, 
    contentType, 
    createdAt, 
    position, 
    sentStatus, 
    deleteMessage,
    retrySend,
    id,
    ...other 
  } = props;

  const ago = formatDistanceToNowStrict(createdAt);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: position === 'right' ? 'flex-end' : 'flex-start',
      }}
      {...other}
    >
      <Stack
        alignItems="flex-start"
        direction={position === 'right' ? 'row-reverse' : 'row'}
        spacing={2}
        sx={{
          maxWidth: 500,
          ml: position === 'right' ? 'auto' : 0,
          mr: position === 'left' ? 'auto' : 0,
        }}
      >
        <Avatar
          src={authorAvatar || undefined}
          sx={{
            height: 32,
            width: 32,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Card
            sx={{
              backgroundColor: position === 'left' ? 'primary.main' : 'background.paper',
              color: position === 'left' ? 'primary.contrastText' : 'text.primary',
              px: 2,
              py: 1,
            }}
          >
            <Box sx={{ mb: 1 }}>
              <Link
                color="inherit"
                sx={{ cursor: 'pointer' }}
                variant="subtitle2"
              >
                {authorName}
              </Link>
            </Box>
            {contentType === 'image' && (
              <CardMedia
                onClick={() => {}}
                image={body}
                sx={{
                  height: 200,
                  width: 200,
                }}
              />
            )}
            {contentType === 'text' && (
              <Typography
                color="inherit"
                variant="body1"
              >
                {body}
              </Typography>
            )}
          </Card>
          <Box
            sx={{
              display: 'flex',
              justifyContent: position === 'right' ? 'flex-end' : 'flex-start',
              mt: 1,
              px: 2,
            }}
          >
            {
              sentStatus === 'failed' && (
                <>
                <Stack  
                  direction="column"
                  spacing={0}
                >
                  <Typography
                    color="error.main"
                    noWrap
                    variant="caption"
                  >
                    This message failed.
                  </Typography>
                  
                  <Stack direction="row" spacing={1}>
                    <Button 
                      variant="text" color="primary" size="small"
                      onClick={() => retrySend(id)}
                    >
                      <Typography
                        color="primary"
                        noWrap
                        variant="caption"
                      > 
                        Send again
                      </Typography>
                    </Button>
                    <Button 
                      variant="text" color="secondary" size="small"
                      onClick={() => deleteMessage(id)}
                    >
                      <Typography
                        color="Secondary"
                        noWrap
                        variant="caption"
                      > 
                        Delete
                      </Typography>
                    </Button>
                  </Stack>
                </Stack>
                </>
              )
            }
            {
              sentStatus === 'pending' && (
                <Typography
                  color="text.secondary"
                  noWrap
                  variant="caption"
                >
                  Sending...
                </Typography>
              )
            }
            {
              sentStatus === 'sent' &&
              <Typography
                color="text.secondary"
                noWrap
                variant="caption"
              >
                Sent {ago} ago
              </Typography>
            }
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

ChatMessage.propTypes = {
  authorAvatar: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  contentType: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  position: PropTypes.oneOf(['left', 'right']),
  sentStatus: PropTypes.oneOf(['sent', 'pending', 'failed']),
  deleteMessage: PropTypes.func,
  retrySend: PropTypes.func,
};

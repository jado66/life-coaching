import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { chatApi } from 'src/api/chat';
import { Scrollbar } from 'src/components/scrollbar';

export const ChatComposerRecipients = (props) => {
  const { onRecipientAdd, onRecipientRemove, recipients = [], ...other } = props;
  const searchRef = useRef(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const showSearchResults = !!(searchFocused && searchQuery);
  const hasSearchResults = searchResults.length > 0;

  const handleSearchChange = useCallback(
    async (event) => {
      const query = event.target.value;

      setSearchQuery(query);

      if (!query) {
        setSearchResults([]);
        return;
      }

      try {
        const contacts = await chatApi.getContacts({ query });

        // Filter already picked recipients

        const recipientIds = recipients.map((recipient) => recipient.id);
        const filtered = contacts.filter((contact) => !recipientIds.includes(contact.id));

        setSearchResults(filtered);
      } catch (err) {
        console.error(err);
      }
    },
    [recipients]
  );

  const handleSearchClickAway = useCallback(() => {
    if (showSearchResults) {
      setSearchFocused(false);
    }
  }, [showSearchResults]);

  const handleSearchFocus = useCallback(() => {
    setSearchFocused(true);
  }, []);

  const handleSearchSelect = useCallback(
    (contact) => {
      setSearchQuery('');
      onRecipientAdd?.(contact);
    },
    [onRecipientAdd]
  );

  return (
    <>
      <Box {...other}>
        <Scrollbar>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              p: 2,
            }}
          >
            <ClickAwayListener onClickAway={handleSearchClickAway}>
              <Box sx={{ mr: 1 }}>
                <OutlinedInput
                  fullWidth
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  placeholder="Search contacts"
                  ref={searchRef}
                  startAdornment={
                    <InputAdornment position="start">
                      <SvgIcon>
                        <SearchMdIcon />
                      </SvgIcon>
                    </InputAdornment>
                  }
                  sx={{
                    '&.MuiInputBase-root': {
                      height: 40,
                      minWidth: 260,
                    },
                  }}
                  value={searchQuery}
                />
                {showSearchResults && (
                  <Popper
                    anchorEl={searchRef.current}
                    open={searchFocused}
                    placement="bottom-start"
                  >
                    <Paper
                      elevation={16}
                      sx={{
                        borderColor: 'divider',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        maxWidth: '100%',
                        mt: 1,
                        width: 320,
                      }}
                    >
                      {hasSearchResults ? (
                        <>
                          <Box
                            sx={{
                              px: 2,
                              pt: 2,
                            }}
                          >
                            <Typography
                              color="text.secondary"
                              variant="subtitle2"
                            >
                              Contacts
                            </Typography>
                          </Box>
                          <List>
                            {searchResults.map((contact) => (
                              <ListItemButton
                                key={contact.id}
                                onClick={() => handleSearchSelect(contact)}
                              >
                                <ListItemAvatar>
                                  <Avatar src={contact.avatar} />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={contact.name}
                                  primaryTypographyProps={{
                                    noWrap: true,
                                    variant: 'subtitle2',
                                  }}
                                />
                              </ListItemButton>
                            ))}
                          </List>
                        </>
                      ) : (
                        <Box
                          sx={{
                            p: 2,
                            textAlign: 'center',
                          }}
                        >
                          <Typography
                            gutterBottom
                            variant="h6"
                          >
                            Nothing Found
                          </Typography>
                          <Typography
                            color="text.secondary"
                            variant="body2"
                          >
                            We couldn&apos;t find any matches for &quot;{searchQuery}&quot;. Try
                            checking for typos or using complete words.
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  </Popper>
                )}
              </Box>
            </ClickAwayListener>
            <Typography
              color="text.secondary"
              sx={{ mr: 2 }}
              variant="body2"
            >
              To:
            </Typography>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              {recipients.map((recipient) => (
                <Chip
                  avatar={<Avatar src={recipient?.avatar} />}
                  key={recipient.id}
                  label={recipient.name}
                  onDelete={() => onRecipientRemove?.(recipient.id)}
                />
              ))}
            </Stack>
          </Box>
        </Scrollbar>
      </Box>
    </>
  );
};

ChatComposerRecipients.propTypes = {
  onRecipientAdd: PropTypes.func,
  onRecipientRemove: PropTypes.func,
  recipients: PropTypes.array,
};

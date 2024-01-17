import PropTypes from 'prop-types';
import Camera01Icon from '@untitled-ui/icons-react/build/esm/Camera01';
import User01Icon from '@untitled-ui/icons-react/build/esm/User01';
import { alpha } from '@mui/system/colorManipulator';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState, useRef } from 'react';

export const AccountGeneralSettings = (props) => {
  const { user, updateUserByKey, tryChangeUserEmail, deleteAccount, updateUserAvatar } = props;

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);

  const fileInputRef = useRef();

  const handleSaveFirstName = () => {
    updateUserByKey('firstName', firstName);
  }

  const handleSaveLastName = () => {
    updateUserByKey('lastName', lastName);
  }

  const handleSaveEmail = async() => {
    // validate email using regex
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
      alert('Please enter a valid email address.');
      return;
    }

    const successResponse = await tryChangeUserEmail(email);

    if (!successResponse) {
      setEmail(user.email);
    }
  }

  const handleDeleteAccount = () => {
    // confirm deletion
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This is irreversible.');

    if (confirmDelete) {
      // delete account
      deleteUser();
    }
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      updateUserAvatar(file);
    }
  };


  useEffect(() => {
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setEmail(user?.email);
  }
  , [user]);

  return (
    <Stack
      spacing={4}
      {...props}
    >
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleAvatarChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <Card>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              md={4}
            >
              <Typography variant="h6">Basic details</Typography>
              {/* {JSON.stringify(user)} */}
            </Grid>
            <Grid
              xs={12}
              md={8}
            >
              <Stack spacing={3}>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <Box
                    sx={{
                      borderColor: 'neutral.300',
                      borderRadius: '50%',
                      borderStyle: 'dashed',
                      borderWidth: 1,
                      p: '4px',
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: '50%',
                        height: '100%',
                        width: '100%',
                        position: 'relative',
                      }}
                    >
                      <Box
                        sx={{
                          alignItems: 'center',
                          backgroundColor: (theme) => alpha(theme.palette.neutral[700], 0.5),
                          borderRadius: '50%',
                          color: 'common.white',
                          cursor: 'pointer',
                          display: 'flex',
                          height: '100%',
                          justifyContent: 'center',
                          left: 0,
                          opacity: 0,
                          position: 'absolute',
                          top: 0,
                          width: '100%',
                          zIndex: 1,
                          '&:hover': {
                            opacity: 1,
                          },
                        }}
                      >
                        <Stack
                          alignItems="center"
                          direction="row"
                          spacing={1}
                          onClick={() => fileInputRef.current.click()}
                        >
                          <SvgIcon color="inherit">
                            <Camera01Icon />
                          </SvgIcon>
                          <Typography
                            color="inherit"
                            variant="subtitle2"
                            sx={{ fontWeight: 700 }}
                          >
                            Select
                          </Typography>
                        </Stack>
                      </Box>
                      <Avatar
                        src={user?.avatar}
                        sx={{
                          height: 100,
                          width: 100,
                        }}
                      >
                        <SvgIcon>
                          <User01Icon />
                        </SvgIcon>
                      </Avatar>
                    </Box>
                  </Box>
                  <Button
                    color="inherit"
                    size="small"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Change Picture
                  </Button>
                </Stack>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <TextField
                    value={firstName}
                    label="First Name"
                    sx={{ flexGrow: 1 }}
                    InputLabelProps={{ shrink: firstName }}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                  <Button
                    color="inherit"
                    size="small"
                    onClick={handleSaveFirstName}
                    disabled={firstName === user?.firstName}
                  >
                    Save
                  </Button>
                </Stack>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <TextField
                    value={lastName}
                    label="Last Name"
                    InputLabelProps={{ shrink: lastName }}
                    sx={{ flexGrow: 1 }}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                  <Button
                    color="inherit"
                    size="small"
                    onClick={handleSaveLastName}
                    disabled={lastName === user?.lastName}
                  >
                    Save
                  </Button>
                </Stack>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <TextField
                    value={email}
                    onChange = {(event) => setEmail(event.target.value)}
                    InputLabelProps={{ shrink: email }}
                    label="Email Address"
                    required
                    sx={{
                      flexGrow: 1,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderStyle: 'dashed',
                      },
                    }}
                  />
                  <Button
                    color="inherit"
                    size="small"
                    onClick={handleSaveEmail}
                    disabled={email}
                  >
                    Edit {'(Coming soon)'}
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
     
      <Card>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              md={4}
            >
              <Typography variant="h6">Delete Account</Typography>
            </Grid>
            <Grid
              xs={12}
              md={8}
            >
              <Stack
                alignItems="flex-start"
                spacing={3}
              >
                <Typography variant="subtitle1">
                  Delete your account and all of your source data. This is irreversible.
                </Typography>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={handleDeleteAccount}
                  disabled
                >
                  Delete account  {'(Coming Soon)'}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

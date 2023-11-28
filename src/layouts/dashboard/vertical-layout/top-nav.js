import PropTypes from 'prop-types';
import Menu01Icon from '@untitled-ui/icons-react/build/esm/Menu01';
import { alpha } from '@mui/system/colorManipulator';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import useMediaQuery from '@mui/material/useMediaQuery';

import { AccountButton } from '../account-button';
import { NotificationsButton } from '../notifications-button';
import { SearchButton } from '../search-button';
import { Tooltip, Typography } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { useSettings } from 'src/hooks/use-settings';
import { FlipBackward } from '@untitled-ui/icons-react';

const TOP_NAV_HEIGHT = 64;
const SIDE_NAV_WIDTH = 280;

export const TopNav = (props) => {
  const { onMobileNavOpen, ...other } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const { isImpersonating, resetAccountType, accountType } = useSettings();

  return (
    <Box
      component="header"
      sx={{
        backdropFilter: 'blur(6px)',
        backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
        position: 'sticky',
        left: {
          lg: `${SIDE_NAV_WIDTH}px`,
        },
        top: 0,
        width: {
          lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
        },
        zIndex: (theme) => theme.zIndex.appBar,
      }}
      {...other}
    >
      <Stack
        alignItems="center"
        direction="column"
        sx={{
          width: '100%',
        }}
      >
      
        <Stack
          direction="row"  
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{
            width: '100%',
          }}
        >
          <Stack
            direction="row"
          >
            {!lgUp && (
              <IconButton onClick={onMobileNavOpen}>
                <SvgIcon>
                  <Menu01Icon />
                </SvgIcon>
              </IconButton>
            )}
            {/* <SearchButton /> */}
          </Stack>

          { isImpersonating && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '48px',
                width: '100%',
              }}
            >
              <Tooltip title="Go back to Coach View">
                <IconButton onClick={resetAccountType}>
                  <FlipBackward />
                </IconButton>
              </Tooltip>
              <Typography 
                variant="h6" 
                sx={{marginBottom: '0px', textTransform: 'capitalize'}}
              >
                Impersonating {accountType} Account
              </Typography>
            </Box>)
          }
          
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{
              minHeight: TOP_NAV_HEIGHT,
              px: 2,
            }}
          >
            {/* <LanguageSwitch /> */}
            <NotificationsButton />
            {/* <ContactsButton /> */}
            <AccountButton />
          </Stack>
        </Stack>
        
      </Stack>
    </Box>
  );
};

TopNav.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

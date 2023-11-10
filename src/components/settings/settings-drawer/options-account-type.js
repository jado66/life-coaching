import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useUser } from 'src/hooks/use-user';

const options = [
    {
        label: 'Coach',
        value: 'coach',
    },
    {
        label: 'User',
        value: 'user',
    },
    {
        label: 'Dev',
        value: 'dev',
    }
];

export const OptionsAccountType = (props) => {
    const { onChange, value } = props;

    return (
      <Stack spacing={1}>
        
        <Typography
          color="text.secondary"
          variant="overline"
        >
          See what the app looks like for your users
        </Typography>
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          gap={2}
        >
          <Button
            color="primary"
            onClick={() => onChange?.('user')}
            variant={value === 'user' ? 'contained' : 'outlined'}
            sx={{
              borderRadius: 1.5,
              borderStyle: 'solid',
              borderWidth: 2,
            }}
          >
            Impersonate User Account
          </Button>

          <Button
            color="primary"
            onClick={() => onChange?.('dev')}
            variant={value === 'dev' ? 'contained' : 'outlined'}
            sx={{
              borderRadius: 1.5,
              borderStyle: 'solid',
              borderWidth: 2,
            }}
          >
            Impersonate Dev Account
          </Button>

          
        </Stack>
      </Stack>
    );
  };
  
  OptionsAccountType.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.oneOf(['coach', 'user', 'dev']),
  };
  
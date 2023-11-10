import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

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
          Site View
        </Typography>
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          gap={2}
        >
          {options.map((option) => (
            <Chip
              icon={option.icon}
              key={option.value}
              label={option.label}
              onClick={() => onChange?.(option.value)}
              sx={{
                borderColor: 'transparent',
                borderRadius: 1.5,
                borderStyle: 'solid',
                borderWidth: 2,
                ...(option.value === value && {
                  borderColor: 'primary.main',
                }),
              }}
            />
          ))}
        </Stack>
      </Stack>
    );
  };
  
  OptionsAccountType.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.oneOf(['coach', 'user']),
  };
  
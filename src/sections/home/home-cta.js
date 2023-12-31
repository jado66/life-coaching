import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const HomeCta = () => (
  <Box
    sx={{
      backgroundColor: 'neutral.800',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top center',
      backgroundImage: 'url("/assets/gradient-bg.svg")',
      color: 'neutral.100',
      py: '120px',
    }}
  >
    <Container maxWidth="lg">
      <Stack spacing={2}>
        <Typography
          align="center"
          color="inherit"
          variant="h3"
        >
          Start saving time today!
        </Typography>
        <Typography
          align="center"
          color="inherit"
          variant="subtitle2"
        >
          Not just a set of tools, the package includes ready-to-deploy conceptual applications
          written in JavaScript & TypeScript.
        </Typography>
      </Stack>
    </Container>
  </Box>
);

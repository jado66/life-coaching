import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import Lightning01 from '@untitled-ui/icons-react/build/esm/Lightning01';
import { Check } from '@untitled-ui/icons-react';

export const ChallengesQuickStats = () => (
  <Box>
    <Grid
      container
      spacing={3}
    >
      <Grid
        xs={12}
        md={6}
        lg={3}
      >
        <Card
            sx={{
                alignItems: 'center',
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                // display: 'flex',
                justifyContent: 'space-between',
              }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ p: 3 }}
          >
            <Stack
              spacing={1}
              sx={{ flexGrow: 1 }}
            >
              <Typography
                color="inherit"
                variant="overline"
              >
                Streak
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <Typography variant="h5">10 Days</Typography>
              </Stack>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: 'primary.contrastText',
                color: 'primary.main',
                height: 48,
                width: 48,
              }}
            >
              <SvgIcon>
                <Lightning01 />
              </SvgIcon>
            </Avatar>
          </Stack>
        </Card>
      </Grid>
      <Grid
        xs={12}
        md={6}
        lg={3}
      >
        <Card>
          <Stack
            spacing={1}
            sx={{ p: 3 }}
          >
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Challenges Completed
            </Typography>
            <Stack
              alignItems="center"
              direction="row"
              spacing={1}
            >
              <Typography variant="h5">74%</Typography>
              <LinearProgress
                color="primary"
                sx={{ flexGrow: 1 }}
                value={74}
                variant="determinate"
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
      <Grid
        xs={12}
        md={6}
        lg={3}
      >
        <Card>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ p: 3 }}
          >
            <Stack
              spacing={1}
              sx={{ flexGrow: 1 }}
            >
              <Typography
                color="text.secondary"
                variant="overline"
              >
                Total Completed
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <Typography variant="h5">12</Typography>
              </Stack>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                height: 48,
                width: 48,
              }}
            >
              <SvgIcon>
                <Check />
              </SvgIcon>
            </Avatar>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

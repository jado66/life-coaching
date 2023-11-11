import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { ChallengesListTable } from 'src/sections/dashboard/challenges/challenges-list-table';
import Link from '@mui/material/Link';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { SvgIcon } from '@mui/material';

const Page = () => {
  const settings = useSettings();

  usePageView();

  return (
    <>
      <Seo title="Dashboard: Your Challenges" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <div>
              <Link
                color="text.primary"
                component={RouterLink}
                href={paths.dashboard.challenges.index}
                sx={{
                  alignItems: 'center',
                  display: 'inline-flex',
                }}
                underline="hover"
              >
                <SvgIcon sx={{ mr: 1 }}>
                  <ArrowLeftIcon />
                </SvgIcon>
                <Typography variant="subtitle2">Results</Typography>
              </Link>
            </div>
            <Grid xs={12}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={4}
                >
                    <Stack spacing={1}>
                      <Typography variant="h4">Completed Challenges</Typography>
                      <Typography variant="subtitle1">You have completed 12 challenges</Typography>
                    </Stack>                  
                </Stack>
            </Grid>
            <Grid xs={12}>
                <ChallengesListTable />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

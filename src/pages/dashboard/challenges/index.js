import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { ChallengesListTable } from 'src/sections/dashboard/challenges/challenges-list-table';
import { ChallengesQuickStats } from 'src/sections/dashboard/challenges/challenges-quick-stats';

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
            <Grid xs={12}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={4}
                >
                    <Stack spacing={1}>
                        <Typography variant="h4">Challenges</Typography>
                    </Stack>                  
                </Stack>
            </Grid>
            <Grid xs={12}>
              <ChallengesQuickStats />
            </Grid>
            <Grid xs={12}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={4}
                >
                    <Stack spacing={1}>
                      <Typography variant="h4">To Do</Typography>
                      <Typography variant="subtitle1">You have 3 uncompleted challenges</Typography>
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

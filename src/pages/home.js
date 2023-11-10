import { addDays, subDays, subHours, subMinutes } from 'date-fns';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { OverviewBanner } from 'src/sections/dashboard/overview/overview-banner';
import { OverviewDoneTasks } from 'src/sections/dashboard/overview/overview-done-tasks';
import { OverviewEvents } from 'src/sections/dashboard/overview/overview-events';
import { OverviewInbox } from 'src/sections/dashboard/overview/overview-inbox';
import { OverviewTransactions } from 'src/sections/dashboard/overview/overview-transactions';
import { OverviewPendingIssues } from 'src/sections/dashboard/overview/overview-pending-issues';
import { OverviewSubscriptionUsage } from 'src/sections/dashboard/overview/overview-subscription-usage';
import { OverviewHelp } from 'src/sections/dashboard/overview/overview-help';
import { OverviewJobs } from 'src/sections/dashboard/overview/overview-jobs';
import { OverviewOpenTickets } from 'src/sections/dashboard/overview/overview-open-tickets';
import { OverviewTips } from 'src/sections/dashboard/overview/overview-tips';
import { OverviewChallenges } from 'src/sections/dashboard/overview/overview-challenges';

const now = new Date();

const Page = () => {
  const settings = useSettings();

  usePageView();

  return (
    <>
      <Seo title="Dashboard: Overview" />
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
            disableEqualOverflow
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
                <div>
                  <Typography variant="h4">Home</Typography>
                </div>
               
              </Stack>
            </Grid>
          
            
            
            
            <Grid
              xs={12}
              md={8}
            >
              <OverviewInbox
                messages={[
                  {
                    id: 'b91cbe81ee3efefba6b915a7',
                    content: 'Hello, we spoke earlier on the phone',
                    createdAt: subMinutes(now, 2),
                    senderAvatar: '/assets/avatars/avatar-alcides-antonio.png',
                    senderName: 'Alcides Antonio',
                    senderOnline: true,
                  },
                  {
                    id: 'de0eb1ac517aae1aa57c0b7e',
                    content: 'Is the job still available?',
                    createdAt: subMinutes(now, 56),
                    senderAvatar: '/assets/avatars/avatar-marcus-finn.png',
                    senderName: 'Marcus Finn',
                    senderOnline: false,
                  },
                  {
                    id: '38e2b0942c90d0ad724e6f40',
                    content: 'What is a screening task? I’d like to',
                    createdAt: subHours(subMinutes(now, 23), 3),
                    senderAvatar: '/assets/avatars/avatar-carson-darrin.png',
                    senderName: 'Carson Darrin',
                    senderOnline: true,
                  },
                  {
                    id: '467505f3356f25a69f4c4890',
                    content: 'Still waiting for feedback',
                    createdAt: subHours(subMinutes(now, 6), 8),
                    senderAvatar: '/assets/avatars/avatar-fran-perez.png',
                    senderName: 'Fran Perez',
                    senderOnline: true,
                  },
                  {
                    id: '7e6af808e801a8361ce4cf8b',
                    content: 'Need more information about campaigns',
                    createdAt: subHours(subMinutes(now, 18), 10),
                    senderAvatar: '/assets/avatars/avatar-jie-yan-song.png',
                    senderName: 'Jie Yan Song',
                    senderOnline: false,
                  },
                ]}
              />
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <OverviewChallenges
                challenges={[
                  {
                    id: '5f0366cd843161f193ebadd4',
                    name: 'Read a book',
                    comment: 'Pick a book from the library and read it for 30 minutes.',
                    createdAt: subHours(now, 2).getTime(),
                    dueDate: addDays(now, 1).getTime(),
                  },
                  {
                    id: 'to33twsyjphcfj55y3t07261',
                    name: 'Watch a movie',
                    comment:  'Watch a movie of your choice for 1 hour.',
                    createdAt: subHours(now, 2).getTime(),
                    dueDate: addDays(now, 2).getTime(),
                  },
                  {
                    id: '6z9dwxjzkqbmxuluxx2681jd',
                    name: 'Listen to music',
                    comment: 'Listen to your favorite music for 30 minutes.',
                    createdAt: subHours(now, 2).getTime(),
                    dueDate: addDays(now, 3).getTime(),
                  },
                ]}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

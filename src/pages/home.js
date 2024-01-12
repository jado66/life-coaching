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
import Link from 'next/link';
import { Avatar, Card, Divider } from '@mui/material';
import Star01 from '@untitled-ui/icons-react/build/esm/Star01';
import useStreak from 'src/hooks/use-streak';
import toast from 'react-hot-toast';
import { Loading, PageLoading } from 'src/utils/components/loading';
import { useUser } from 'src/hooks/use-user';

const Page = () => {
  const settings = useSettings();

  const {user} = useUser();

  const { streakCount, hasCheckedInToday, loading, checkUserInForDailyCheckin } = useStreak();
 


  usePageView();

  const handleCheckIn = () => {
    checkUserInForDailyCheckin();
    toast.success('Checked in for the day!');
  }

  const seoTitle = `Dashboard: Overview`;
 
  if (!user){
    return <PageLoading settings = {settings} seoTitle = {seoTitle}/>
  }

  return (
    <>
      <Seo title={seoTitle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            disableEqualOverflow
            spacing={{
              xs: 2,
              lg: 4,
            }}
          >
              <Grid xs={12}>
                <Box
                  sx={{
                    backgroundColor: 'grey',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '60px',
                    marginBottom: '20px',
                  }}
                >
                  <Avatar sx={{ width: 100, height: 100 }} src="/assets/avatars/avatar-cole.png"/>
                </Box>
              </Grid>
            
     
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <Button
                  component="a"
                  fullWidth
                  variant="contained"
                  href="https://www.calendly.com/colezesiger"
                  target="_blank" // Add target="_blank" to open the link in a new tab or window
                  sx={{
                    fontSize: '1.5rem',
                    padding: '1rem 2rem',
                  }}
                >
                  Book a Call
                </Button>
               
              </Stack>
            </Grid>

            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <Button
                   component={Link}
                   fullWidth
                   variant="contained"
                   href='/chat'
                   sx={{
                    fontSize: '1.5rem',
                    padding: '1rem 2rem',
                  }}
                >
                  Chat with Assistant
                </Button>
               
              </Stack>
            </Grid>

            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <Button
                   component="a"
                   fullWidth
                   variant="contained"
                   sx={{
                    fontSize: '1.5rem',
                    padding: '1rem 2rem',
                  }}
                >
                  Plan
                </Button>
               
              </Stack>
            </Grid>
            
            { loading ?
              <Grid xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 3,
                  }}
                >
                  <Loading />
                </Box>
              </Grid>
              :
              <>
                <Grid xs={12}>
                  <Card>
                        <Stack
                          alignItems="center"
                          direction="row"
                          spacing={2}
                          sx={{ p: 2 }}
                        >
                          <Stack
                            spacing={1}
                            sx={{ flexGrow: 1 }}
                          >
                          
                            <Stack
                              alignItems="center"
                              direction="row"
                              spacing={1}
                            >
                              <Typography variant="h5" sx={{ textAlign: 'center', flexGrow:1 }}>No Contact - {streakCount} Day Streak</Typography>
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
                              <Star01 />
                            </SvgIcon>
                          </Avatar>
                        </Stack>
                  </Card>
                </Grid> 

                <Grid xs={12} >
                
                  <Button
                      component="a"
                      fullWidth
                      variant="contained"
                      target="_blank" // Add target="_blank" to open the link in a new tab or window
                      sx={{
                        fontSize: '1.5rem',
                        padding: '1rem 2rem',
                      }}
                      onClick={handleCheckIn}
                      disabled={hasCheckedInToday}
                    >
                      {hasCheckedInToday ? 'Already Checked In' : 'Daily Check In'}
                    </Button>
                    
                </Grid>
              </>
            }
            {/* <Grid
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
            </Grid> */}
            {/* <Grid
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
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

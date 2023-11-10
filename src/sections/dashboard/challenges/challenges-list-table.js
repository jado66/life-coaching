import { formatDistanceToNowStrict, subHours } from 'date-fns';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';

const now = new Date();

const challenges = [
  {
    id: '5f0366cd843161f193ebadd4',
    name: 'Read a book',
    comment: 'Pick a book from the library and read it for 30 minutes.',
    createdAt: subHours(now, 2).getTime(),
  },
  {
    id: 'to33twsyjphcfj55y3t07261',
    name: 'Watch a movie',
    comment:  'Watch a movie of your choice for 1 hour.',
    createdAt: subHours(now, 2).getTime(),
  },
  {
    id: '6z9dwxjzkqbmxuluxx2681jd',
    name: 'Listen to music',
    comment: 'Listen to your favorite music for 30 minutes.',
    createdAt: subHours(now, 2).getTime(),
  },
];

export const ChallengesListTable = () => (
  <Box>
    <Stack spacing={2}>
      {challenges.map((review) => {
        const ago = formatDistanceToNowStrict(review.createdAt);

        return (
          <Card key={review.id}>

            <CardHeader
                avatar={
                  <img 
                    src="/assets/iconly/iconly-glass-star.svg" 
                    alt="GlassStar" 
                    style={{ width: 40, height: 40 }} 
                  />
                }
                disableTypography
              subheader={
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                    mt: 1,
                  }}
                >
                  
                  <Typography
                    color="text.secondary"
                    variant="h5"
                  >
                    {review.name}
                  </Typography>
                </Box>
              }
              action={
                <IconButton aria-label="check">
                  <CheckIcon />
                </IconButton>
              }
            />
            <Box
              sx={{
                pb: 2,
                px: 3,
              }}
            >
              <Typography
                color="text.secondary"
                variant="body1"
              >
                {review.comment}
              </Typography>
            </Box>
            
          </Card>
        );
      })}
    </Stack>
  </Box>
);
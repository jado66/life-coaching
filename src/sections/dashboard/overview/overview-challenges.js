import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { Scrollbar } from 'src/components/scrollbar';
import { IconButton, TableHead } from '@mui/material';
import { Check } from '@mui/icons-material';

const statusMap = {
  confirmed: 'success',
  on_hold: 'warning',
  failed: 'error',
};

export const OverviewChallenges = (props) => {
  const { challenges } = props;

  return (
    <Card>
      <CardHeader
        title="Latest Challenges"
        // subheader="Based on the selected period"
        sx={{ pb: 0 }}
      />
      <Tabs
        value="all"
        sx={{ px: 3 }}
      >
        <Tab
          label="All"
          value="all"
        />
        <Tab
          label="To Do"
          value="to-do"
        />
        <Tab
          label="Completed"
          value="completed"
        />
      </Tabs>
      <Divider />
      <Scrollbar>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>
                Due Date
              </TableCell>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Mark Complete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {challenges.map((challenge) => {
              const dueDateMonth = format(challenge.dueDate, 'LLL').toUpperCase();
              const dueDateDay = format(challenge.dueDate, 'd');

              return (
                <TableRow
                  key={challenge.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell width={100}>
                    <Box
                      sx={{
                        p: 1,
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100',
                        borderRadius: 2,
                        maxWidth: 'fit-content',
                      }}
                    >
                      <Typography
                        align="center"
                        color="text.primary"
                        variant="caption"
                      >
                        {dueDateMonth}
                      </Typography>
                      <Typography
                        align="center"
                        color="text.primary"
                        variant="h6"
                      >
                        {dueDateDay}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{challenge.name}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <Check />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  );
};

OverviewChallenges.propTypes = {
  transactions: PropTypes.array.isRequired,
};

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Chip from '@mui/material/Chip';
import SvgIcon from '@mui/material/SvgIcon';

import BarChartSquare02Icon from 'src/icons/untitled-ui/duocolor/bar-chart-square-02';
import GraduationHat01Icon from 'src/icons/untitled-ui/duocolor/graduation-hat-01';
import Users03Icon from 'src/icons/untitled-ui/duocolor/users-03';
import { tokens } from 'src/locales/tokens';
import { paths } from 'src/paths';
import { AccountCircle, BuildCircleOutlined, Dashboard, SmartToyOutlined } from '@mui/icons-material';
import { LineChartUp04, ReceiptCheck } from '@untitled-ui/icons-react';
import MessageChatSquare from '@untitled-ui/icons-react/build/esm/MessageChatSquare';
import Settings03Icon from '@untitled-ui/icons-react/build/esm/Settings03';

export const useCoachSections = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return [
      {
        items: [
          {
            title: t(tokens.nav.dashboard),
            path: paths.dashboard.index,
            icon: (
              <SvgIcon fontSize="small">
                <Dashboard />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.clients),
            path: paths.dashboard.customers.index,
            icon: (
              <SvgIcon fontSize="small">
                <Users03Icon />
              </SvgIcon>
            ),
            items: [
              {
                title: t(tokens.nav.list),
                path: paths.dashboard.customers.index,
              },
              {
                title: t(tokens.nav.details),
                path: paths.dashboard.customers.details,
              },
              {
                title: t(tokens.nav.edit),
                path: paths.dashboard.customers.edit,
              },
            ],
          },
          {
            title: t(tokens.nav.aiAssistant),
            path: paths.dashboard.aiAssistant.index,
            icon: (
              <SvgIcon fontSize="small">
                <SmartToyOutlined />
              </SvgIcon>
            ),
            items: [
              {
                title: t(tokens.nav.dashboard),
                path: paths.dashboard.aiAssistant.index,
              },
              {
                title: t(tokens.nav.edit),
                path: paths.dashboard.aiAssistant.edit,
              },
              {
                title: t(tokens.nav.test),
                path: paths.dashboard.aiAssistant.test,
              },
              {
                title: t(tokens.nav.logs),
                path: paths.dashboard.aiAssistant.logs,
              },
            ],
          },
          {
            title: t(tokens.nav.applications),
            path: paths.dashboard.applications,
            icon: (
              <SvgIcon fontSize="small">
                <BuildCircleOutlined />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.appSettings),
            path: paths.dashboard.appSettings,
            icon: (
              <SvgIcon fontSize="small">
                <Settings03Icon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.analytics),
            path: paths.dashboard.analytics,
            icon: (
              <SvgIcon fontSize="small">
                <BarChartSquare02Icon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.account),
            path: paths.dashboard.account,
            icon: (
              <SvgIcon fontSize="small">
                <AccountCircle />
              </SvgIcon>
            ),
          },
        ],
      },
      {
        subheader: 'Post MVP',
        items: [
          {
            title: t(tokens.nav.academy),
            path: paths.dashboard.academy.index,
            icon: (
              <SvgIcon fontSize="small">
                <GraduationHat01Icon />
              </SvgIcon>
            ),
            label: (
              <Chip
                color="primary"
                label="New"
                size="small"
              />
            ),
            items: [
              {
                title: t(tokens.nav.dashboard),
                path: paths.dashboard.academy.index,
              },
              {
                title: t(tokens.nav.course),
                path: paths.dashboard.academy.courseDetails,
              },
            ],
          },
          {
            title: t(tokens.nav.ecommerce),
            path: paths.dashboard.ecommerce,
            icon: (
              <SvgIcon fontSize="small">
                <LineChartUp04 />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.chat),
            path: paths.dashboard.chat,
            icon: (
              <SvgIcon fontSize="small">
                <MessageChatSquare />
              </SvgIcon>
            ),
          },
        ],
      }
    ];
  }, [t]);
};

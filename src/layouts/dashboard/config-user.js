import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Chip from '@mui/material/Chip';
import SvgIcon from '@mui/material/SvgIcon';

import AlignLeft02Icon from 'src/icons/untitled-ui/duocolor/align-left-02';
import BarChartSquare02Icon from 'src/icons/untitled-ui/duocolor/bar-chart-square-02';
import Building04Icon from 'src/icons/untitled-ui/duocolor/building-04';
import CalendarIcon from 'src/icons/untitled-ui/duocolor/calendar';
import CheckDone01Icon from 'src/icons/untitled-ui/duocolor/check-done-01';
import CreditCard01Icon from 'src/icons/untitled-ui/duocolor/credit-card-01';
import CurrencyBitcoinCircleIcon from 'src/icons/untitled-ui/duocolor/currency-bitcoin-circle';
import File01Icon from 'src/icons/untitled-ui/duocolor/file-01';
import GraduationHat01Icon from 'src/icons/untitled-ui/duocolor/graduation-hat-01';
import HomeSmileIcon from 'src/icons/untitled-ui/duocolor/home-smile';
import LayoutAlt02Icon from 'src/icons/untitled-ui/duocolor/layout-alt-02';
import LineChartUp04Icon from 'src/icons/untitled-ui/duocolor/line-chart-up-04';
import Lock01Icon from 'src/icons/untitled-ui/duocolor/lock-01';
import LogOut01Icon from 'src/icons/untitled-ui/duocolor/log-out-01';
import Mail03Icon from 'src/icons/untitled-ui/duocolor/mail-03';
import Mail04Icon from 'src/icons/untitled-ui/duocolor/mail-04';
import MessageChatSquareIcon from 'src/icons/untitled-ui/duocolor/message-chat-square';
import ReceiptCheckIcon from 'src/icons/untitled-ui/duocolor/receipt-check';
import Share07Icon from 'src/icons/untitled-ui/duocolor/share-07';
import ShoppingBag03Icon from 'src/icons/untitled-ui/duocolor/shopping-bag-03';
import ShoppingCart01Icon from 'src/icons/untitled-ui/duocolor/shopping-cart-01';
import Truck01Icon from 'src/icons/untitled-ui/duocolor/truck-01';
import Upload04Icon from 'src/icons/untitled-ui/duocolor/upload-04';
import Users03Icon from 'src/icons/untitled-ui/duocolor/users-03';
import XSquareIcon from 'src/icons/untitled-ui/duocolor/x-square';
import { tokens } from 'src/locales/tokens';
import { paths } from 'src/paths';
import { AccountCircle, Dashboard } from '@mui/icons-material';

export const useUserSections = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return [
      {
        items: [
          {
            title: t(tokens.nav.home),
            path: paths.home,
            icon: (
              <SvgIcon fontSize="small">
                <Dashboard />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.chat),
            path: paths.dashboard.chat,
            icon: (
              <SvgIcon fontSize="small">
                <BarChartSquare02Icon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.challenges),
            path: paths.dashboard.challenges,
            icon: (
              <SvgIcon fontSize="small">
                <GraduationHat01Icon />
              </SvgIcon>
            ),
            items: [
              {
                title: t(tokens.nav.list),
                path: paths.dashboard.challenges.index,
              },
              {
                title: t(tokens.nav.completed),
                path: paths.dashboard.challenges.completed,
              },
            ],
          },
          {
            title: t(tokens.nav.account),
            path: paths.dashboard.account,
            icon: (
              <SvgIcon fontSize="small">
                <AccountCircle />
              </SvgIcon>
            ),
          }
        ],
      },
    ];
  }, [t]);
};

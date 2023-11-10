import PropTypes from 'prop-types';

import { withAuthGuard } from 'src/hocs/with-auth-guard';
import { useSettings } from 'src/hooks/use-settings';

import { useCoachSections } from './config-coach';
import { useUserSections } from './config-user';
import { HorizontalLayout } from './horizontal-layout';
import { VerticalLayout } from './vertical-layout';
import { useDevSections } from './config-dev';

export const Layout = withAuthGuard((props) => {
  const settings = useSettings();
  const coachSections = useCoachSections();
  const usersSections = useUserSections();
  const devSections = useDevSections();

  let sections;
  if (settings.accountType === 'coach') {
    sections = coachSections;
  } else if (settings.accountType === 'user') {
    sections = usersSections;
  } else {
    sections = devSections;
  }

  if (settings.layout === 'horizontal') {
    return (
      <HorizontalLayout
        sections={sections}
        navColor={settings.navColor}
        {...props}
      />
    );
  }

  return (
    <VerticalLayout
      sections={sections}
      navColor={settings.navColor}
      {...props}
    />
  );
});

Layout.propTypes = {
  children: PropTypes.node,
};

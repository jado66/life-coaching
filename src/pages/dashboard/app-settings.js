import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';

import RefreshCcw01Icon from '@untitled-ui/icons-react/build/esm/RefreshCcw01';
import Badge, { badgeClasses } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';

import { OptionsContrast } from 'src/components/settings/settings-drawer/options-contrast';
import { OptionsDirection } from 'src/components/settings/settings-drawer/options-direction';
import { OptionsLayout } from 'src/components/settings/settings-drawer/options-layout';
import { OptionsNavColor } from 'src/components/settings/settings-drawer/options-nav-color';
import { OptionsColorScheme } from 'src/components/settings/settings-drawer/options-color-scheme';
import { OptionsStretch } from 'src/components/settings/settings-drawer/options-stretch';
import { OptionsAccountType } from 'src/components/settings/settings-drawer/options-account-type';
import { OptionsColorPreset } from 'src/components/settings/settings-drawer/options-color-preset';
import { useSettings } from 'src/hooks/use-settings';
import { useCallback } from 'react';
import { Divider } from '@mui/material';

const Page = () => {
  usePageView();
  const settings = useSettings();

  const handleFieldUpdate = useCallback(
    (field, value) => {
      settings.handleUpdate({
        [field]: value,
      });
    },
    [settings]
  );

  return (
    <>
      <Seo title="Dashboard: App Settings" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack
            spacing={3}
            sx={{ mb: 3 }}
          >
            <Typography variant="h4">App Settings</Typography>
            
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={3}
            sx={{
                px: 3,
                pt: 2,
            }}
            >
            <Typography variant="h6">Reset to Defaults</Typography>
            <Stack
                alignItems="center"
                direction="row"
                spacing={0.5}
            >
                <Badge
                    anchorOrigin={{
                        horizontal: 'right',
                        vertical: 'top',
                    }}
                    color="error"
                    sx={{
                        [`& .${badgeClasses.badge}`]: {
                        top: 6,
                        right: 6,
                        ...(!settings.isCustom && {
                            display: 'none',
                        }),
                        },
                    }}
                    variant="dot"
                    >
                    <IconButton
                        color="inherit"
                        onClick={settings.handleReset}
                    >
                        <SvgIcon fontSize="small">
                        <RefreshCcw01Icon />
                        </SvgIcon>
                    </IconButton>
                    </Badge>   
                    </Stack>
                </Stack>
            <Divider/>

            <Stack
                spacing={5}
                sx={{ p: 3 }}
                >
                <OptionsAccountType
                    onChange={(value) => handleFieldUpdate('accountType', value)}
                    value={settings.accountType}
                />
                <OptionsColorPreset
                    onChange={(value) => handleFieldUpdate('colorPreset', value)}
                    value={settings.colorPreset}
                />
                <OptionsColorScheme
                    onChange={(value) => handleFieldUpdate('paletteMode', value)}
                    value={settings.paletteMode}
                />
                <OptionsNavColor
                    onChange={(value) => handleFieldUpdate('navColor', value)}
                    value={settings.navColor}
                />
                <OptionsLayout
                    onChange={(value) => handleFieldUpdate('layout', value)}
                    value={settings.layout}
                />
                <OptionsStretch
                    onChange={(value) => handleFieldUpdate('stretch', value)}
                    value={settings.stretch}
                />
                <OptionsContrast
                    onChange={(value) => handleFieldUpdate('contrast', value)}
                    value={settings.contrast}
                />
                <OptionsDirection
                    onChange={(value) => handleFieldUpdate('direction', value)}
                    value={settings.direction}
                />
            </Stack>
            
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

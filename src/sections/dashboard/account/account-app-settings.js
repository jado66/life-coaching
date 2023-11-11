import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import RefreshCcw01Icon from '@untitled-ui/icons-react/build/esm/RefreshCcw01';
import Badge, { badgeClasses } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';

import { OptionsContrast } from 'src/components/settings/settings-drawer/options-contrast';
import { OptionsLayout } from 'src/components/settings/settings-drawer/options-layout';
import { OptionsNavColor } from 'src/components/settings/settings-drawer/options-nav-color';
import { OptionsColorScheme } from 'src/components/settings/settings-drawer/options-color-scheme';
import { OptionsStretch } from 'src/components/settings/settings-drawer/options-stretch';
import { OptionsAccountType } from 'src/components/settings/settings-drawer/options-account-type';
import { OptionsColorPreset } from 'src/components/settings/settings-drawer/options-color-preset';
import { useSettings } from 'src/hooks/use-settings';
import { useCallback } from 'react';
import { Card, CardHeader, Divider, CardContent } from '@mui/material';

export const AccountAppSettings = (props) => {
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
    
      
    <Stack
      spacing={4}
      {...props}
    >
      <Card>
        <CardHeader
          title="App Display Settings"
          subheader="Here you can change the look and feel of your app"
        />
        <CardContent sx={{ pt: 0 }}>

        <Divider />    

        <Stack
            spacing={5}
            sx={{ p: 3 }}
        >
            
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
            <OptionsAccountType
                onChange={(value) => handleFieldUpdate('accountType', value)}
                value={settings.accountType}
            />
            {/* <OptionsDirection
                onChange={(value) => handleFieldUpdate('direction', value)}
                value={settings.direction}
            /> */}
        </Stack>

        <Divider/>

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
        
    
        </CardContent>
        </Card>
    </Stack>
  );
};
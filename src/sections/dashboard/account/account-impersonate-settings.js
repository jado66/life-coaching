import Stack from '@mui/material/Stack';
import { OptionsAccountType } from 'src/components/settings/settings-drawer/options-account-type';
import { useSettings } from 'src/hooks/use-settings';
import { useCallback } from 'react';
import { Card, CardHeader, Divider, CardContent } from '@mui/material';

export const AccountImpersonateSettings = (props) => {
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
                <OptionsAccountType
                    onChange={(value) => handleFieldUpdate('accountType', value)}
                    value={settings.accountType}
                />
            </Stack>
        </CardContent>
        </Card>
    </Stack>
  );
};
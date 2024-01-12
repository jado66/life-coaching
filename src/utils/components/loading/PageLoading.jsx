import {Loading} from "./Loading"
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Seo } from 'src/components/seo';


export const PageLoading = ({
    settings,
    seoTitle
}) => {
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
                        justifyContent="center"
                    >
                        <Loading size={80}/>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}


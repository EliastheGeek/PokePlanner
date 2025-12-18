import { Box, TextField, Button, Typography} from '@mui/material';

export function LandingView(props){
    return (
        <Box className="landingPage">
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>Pokemon Team Builder app</Typography>
        </Box>
    );
}
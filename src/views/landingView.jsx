import { Box, TextField, Button, Typography} from '@mui/material';

export function LandingView(props){
    return (
        <Box className="landingPage">
            <Typography variant="h4">Welcome to Pokemon Team Builder</Typography>
            <Box className="landingPageText">
                <Typography variant="h5">Build Smarter Pokémon Teams</Typography>
                <Typography variant="body1">
                    Create and customize your perfect Pokémon team in one place. Choose items, moves, abilities, 
                    and more with an intuitive team builder designed for competitive and casual players alike. Once your 
                    team is complete, use the integrated AI analysis to evaluate team balance, type coverage, strengths, 
                    and weaknesses—helping you refine your strategy before battle.
                </Typography>

            </Box>
        </Box>
    );
}
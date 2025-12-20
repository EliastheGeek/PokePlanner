import { Box, TextField, Button, Typography} from '@mui/material';
import pokeBall2 from "/src/assets/pokeBall2.gif";

export function LandingView(props){
    return (
        <Box className="landingPage">
            
            <Box className="landingPageText">
                <Box>
                    <Typography variant="h4">Pokémon Team Builder</Typography>
                    <br />
                    <Typography variant="body1">
                        Built for experienced Pokémon players, our Team Builder helps you design 
                        competitive, well-balanced teams with precision. Customize every Pokémon in one place, 
                        edit everything from stats and moves to abilities and perks.
                    </Typography>
                    <br />
                    <Typography className='landingPageTextHead' variant="h5">PokéBOT</Typography>
                    <br />
                    <Typography variant="body1">
                        With the help of our AI-powered pokéBOT, you can analyze your team’s weaknesses, identify 
                        potential threats, and receive actionable recommendations to counter them. The result is a 
                        deeper, more informed team-building experience tailored for high-level play.
                    </Typography>

                </Box>
                <Box>
                    <img src={pokeBall2} width={400}/>
                </Box>
                <Box>
                    <Typography variant="h5">Advanced Team Customization</Typography>
                    <br />
                    <Typography variant="body1">
                        Select up to six Pokémon from the latest game version and fully customize their attributes 
                        to match your strategy. Whether you already have a clear vision or need expert guidance, 
                        pokéBOT is available to help you optimize every choice.
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h5">Damage & Battle Insights</Typography>
                    <br />
                    <Typography variant="body1">
                        Looking to predict battle outcomes? Use our damage calculator to 
                        simulate matchups and understand how your team performs in real combat scenarios.
                    </Typography>
                </Box>

            </Box>
        </Box>
    );
}
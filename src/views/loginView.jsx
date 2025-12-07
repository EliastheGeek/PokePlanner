import { Box, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export function LoginView(props){
    return (
        <form onSubmit={submitHandlerACB}>
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f5f5f5"
                }}>
                <Card sx={{ width: 400, padding: 2 }}>
                    <CardContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2
                        }}>
                        <Typography variant="h5" textAlign="center">
                            Login
                        </Typography>

                        <TextField 
                            onChange={ setEmailACB }
                            label="Email" 
                            type="email" 
                            variant="outlined"
                            fullWidth/>

                        <TextField 
                            onChange={ setPasswordACB }
                            label="Password" 
                            type="password"
                            variant="outlined" 
                            fullWidth/>
                        {props.loginError ?   <Typography variant="body2" color="error" align="center">Wrong email or password</Typography> : null }
                        <Button 
                            type="submit"
                            value="login"
                            variant="contained" 
                            fullWidth
                            sx={{ marginTop: 1 }}>
                            Login
                        </Button>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%"
                            }}>
                            <Typography variant="h5" fontSize={16}>
                                Not registered?
                            </Typography>

                            <Button
                                type="submit"
                                value="register"
                                variant="contained"
                                sx={{ height: 32, whiteSpace: "nowrap" }}>
                                Register
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                            >
                            <Button
                                variant="contained"
                                sx={{
                                height: 32,
                                backgroundColor: '#fff',
                                color: '#424242',
                                fontSize: '0.75rem',
                                textTransform: 'none',
                                boxShadow: 'none',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                    boxShadow: 'none',
                                },
                                }}
                                onClick={ goBackACB }>
                                Go back
                                <KeyboardReturnIcon sx={{ ml:1, fontSize: 16 }} />
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </form>
    );

    function setEmailACB(evt) {
        props.emailEvent(evt.target.value);
    }

    function setPasswordACB(evt) {
        props.passwordEvent(evt.target.value);
    }

    function submitHandlerACB(e) {
        e.preventDefault();   
        const action = e.nativeEvent.submitter.value;

        action === 'login' ?
        props.onLogin(props.email, props.password, true) :
        props.onLogin(props.email, props.password, false)
    }
    function goBackACB(){ window.location.hash = "#/"; }
}
import { Box, CircularProgress } from "@mui/material";

export function SuspenseView(props) {return conditionalSuspense(props);}

function conditionalSuspense(props) {
    if (!props.promise) return <span>no data</span>;
    if (props.error) return <span>{props.error.toString()}</span>
    return (
        <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",}}>
            <CircularProgress />
        </Box>
    );
}
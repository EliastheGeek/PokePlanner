import {
    Box,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";

export function DamageCalcView(props) {
    return (
        <form onSubmit={submitHandlerACB} style={{ height: "100%" }}>
            {/* Let the parent (.mainAreaTest) control size; we just fill it */}
            <Box
                sx={{
                    display: "flex",
                    height: "100%",
                }}
            >
                <Card
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <CardContent
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 3,
                            height: "100%",
                        }}
                    >
                        {/* Left: inputs */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                flex: 1,
                            }}
                        >
                            <Typography variant="h5" textAlign="center">
                                Damage Calculator
                            </Typography>

                            <TextField
                                label="Attacker (species)"
                                variant="outlined"
                                fullWidth
                                value={props.attackerName}
                                onChange={attackerChangeACB}
                            />

                            <TextField
                                label="Defender (species)"
                                variant="outlined"
                                fullWidth
                                value={props.defenderName}
                                onChange={defenderChangeACB}
                            />

                            <TextField
                                label="Move"
                                variant="outlined"
                                fullWidth
                                value={props.moveName}
                                onChange={moveChangeACB}
                            />

                            <Box sx={{ display: "flex", gap: 2 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="game-type-label">
                                        Game type
                                    </InputLabel>
                                    <Select
                                        labelId="game-type-label"
                                        label="Game type"
                                        value={props.gameType}
                                        onChange={gameTypeChangeACB}
                                    >
                                        <MenuItem value="Singles">Singles</MenuItem>
                                        <MenuItem value="Doubles">Doubles</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel id="weather-label">Weather</InputLabel>
                                    <Select
                                        labelId="weather-label"
                                        label="Weather"
                                        value={props.weather}
                                        onChange={weatherChangeACB}
                                    >
                                        <MenuItem value="">None</MenuItem>
                                        <MenuItem value="Sun">Sun</MenuItem>
                                        <MenuItem value="Rain">Rain</MenuItem>
                                        <MenuItem value="Sand">Sand</MenuItem>
                                        <MenuItem value="Snow">Snow</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={props.reflect}
                                            onChange={reflectChangeACB}
                                        />
                                    }
                                    label="Reflect on defender"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={props.lightScreen}
                                            onChange={lightScreenChangeACB}
                                        />
                                    }
                                    label="Light Screen on defender"
                                />
                            </FormGroup>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{ mt: 1 }}
                            >
                                Calculate
                            </Button>

                            {props.error && (
                                <Typography
                                    variant="body2"
                                    color="error"
                                    sx={{ mt: 1 }}
                                >
                                    {props.error}
                                </Typography>
                            )}
                        </Box>

                        {/* Right: result panel */}
                        <Box
                            sx={{
                                flex: 1,
                                borderLeft: "1px solid #e0e0e0",
                                pl: 2,
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            <Typography variant="subtitle1">
                                Result
                            </Typography>
                            {props.result ? (
                                <>
                                    <Typography
                                        variant="body2"
                                        sx={{ whiteSpace: "pre-line" }}
                                    >
                                        {props.result.description}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        Damage range:{" "}
                                        {props.result.range[0]} – {props.result.range[1]}
                                    </Typography>
                                </>
                            ) : (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    No calculation yet.
                                </Typography>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </form>
    );

    function submitHandlerACB(e) {
        e.preventDefault();
        props.onCalculate();
    }

    function attackerChangeACB(e) {
        props.onAttackerNameChange(e.target.value);
    }

    function defenderChangeACB(e) {
        props.onDefenderNameChange(e.target.value);
    }

    function moveChangeACB(e) {
        props.onMoveNameChange(e.target.value);
    }

    function weatherChangeACB(e) {
        props.onWeatherChange(e.target.value);
    }

    function gameTypeChangeACB(e) {
        props.onGameTypeChange(e.target.value);
    }

    function reflectChangeACB(e) {
        props.onReflectChange(e.target.checked);
    }

    function lightScreenChangeACB(e) {
        props.onLightScreenChange(e.target.checked);
    }

    function friendGuardChangeACB(e) {
        props.onFriendGuardChange(e.target.checked);
    }
}
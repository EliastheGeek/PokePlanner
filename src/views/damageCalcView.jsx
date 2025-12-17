import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  Switch,
} from "@mui/material";

import NumberField from '/src/components/ui/NumberField.tsx';

export function DamageCalcView(props) {
    const weatherValue = props.weather && props.weather !== "" ? props.weather : "None";
    const terrainValue = props.terrain && props.terrain !== "" ? props.terrain : "None";

    return (
        <form onSubmit={submitHandlerACB} style={{ height: "100%" }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    gap: 2,
                }}
            >
                <Typography variant="h5" textAlign="center">
                    Damage Calculator
                </Typography>

                <Box
                    sx={{
                        mt: 0,
                        borderTop: "1px solid #e0e0e0",
                        pt: 0,
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="subtitle1">Result</Typography>
                    {props.result ? (
                        <>
                            <Typography
                            variant="body2"
                            sx={{ whiteSpace: "pre-line", mt: 1 }}
                            >
                                {props.result.description}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Damage range: {props.result.range[0]} –{" "}
                                {props.result.range[1]}
                            </Typography>
                        </>
                    ) : (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                        >
                            No calculation yet.
                        </Typography>
                    )}
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        flex: 1,
                        alignItems: "stretch",
                    }}
                >   
                    <Card sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <CardContent
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            <Typography variant="subtitle1">Pokémon 1 (Attacker)</Typography>

                            <TextField
                                label="Species"
                                variant="outlined"
                                fullWidth
                                value={props.attackerName}
                                onChange={attackerChangeACB}
                            />

                            <TextField
                                label="Move"
                                variant="outlined"
                                fullWidth
                                value={props.moveName}
                                onChange={moveChangeACB}
                            />

                            <Box sx={{ display: "flex", }}>
                                <TextField
                                    select
                                    label="Type 1"
                                    variant="outlined"
                                    fullWidth
                                    value={props.attackerType1Override || ""}
                                    onChange={attackerType1OverrideChangeACB}
                                    
                                >
                                    <MenuItem value="Normal" sx={{ textTransform: "none" }}>Normal</MenuItem>
                                    <MenuItem value="Fire" sx={{ textTransform: "none" }}>Fire</MenuItem>
                                    <MenuItem value="Water" sx={{ textTransform: "none" }}>Water</MenuItem>
                                    <MenuItem value="Electric" sx={{ textTransform: "none" }}>Electric</MenuItem>
                                    <MenuItem value="Grass" sx={{ textTransform: "none" }}>Grass</MenuItem>
                                    <MenuItem value="Ice" sx={{ textTransform: "none" }}>Ice</MenuItem>
                                    <MenuItem value="Fighting" sx={{ textTransform: "none" }}>Fighting</MenuItem>
                                    <MenuItem value="Poison" sx={{ textTransform: "none" }}>Poison</MenuItem>
                                    <MenuItem value="Ground" sx={{ textTransform: "none" }}>Ground</MenuItem>
                                    <MenuItem value="Flying" sx={{ textTransform: "none" }}>Flying</MenuItem>
                                    <MenuItem value="Psychic" sx={{ textTransform: "none" }}>Psychic</MenuItem>
                                    <MenuItem value="Bug" sx={{ textTransform: "none" }}>Bug</MenuItem>
                                    <MenuItem value="Rock" sx={{ textTransform: "none" }}>Rock</MenuItem>
                                    <MenuItem value="Ghost" sx={{ textTransform: "none" }}>Ghost</MenuItem>
                                    <MenuItem value="Dragon" sx={{ textTransform: "none" }}>Dragon</MenuItem>
                                    <MenuItem value="Dark" sx={{ textTransform: "none" }}>Dark</MenuItem>
                                    <MenuItem value="Steel" sx={{ textTransform: "none" }}>Steel</MenuItem>
                                    <MenuItem value="Fairy" sx={{ textTransform: "none" }}>Fairy</MenuItem>
                                    <MenuItem value="Stellar" sx={{ textTransform: "none" }}>Stellar</MenuItem>
                                    <MenuItem value="???" sx={{ textTransform: "none" }}>???</MenuItem>
                                </TextField>

                                <TextField
                                    select
                                    label="Type 2"
                                    variant="outlined"
                                    fullWidth
                                    value={props.attackerType2Override || ""}
                                    onChange={attackerType2OverrideChangeACB}
                                >
                                    <MenuItem value="" sx={{ textTransform: "none" }}>None</MenuItem>
                                    <MenuItem value="Normal" sx={{ textTransform: "none" }}>Normal</MenuItem>
                                    <MenuItem value="Fire" sx={{ textTransform: "none" }}>Fire</MenuItem>
                                    <MenuItem value="Water" sx={{ textTransform: "none" }}>Water</MenuItem>
                                    <MenuItem value="Electric" sx={{ textTransform: "none" }}>Electric</MenuItem>
                                    <MenuItem value="Grass" sx={{ textTransform: "none" }}>Grass</MenuItem>
                                    <MenuItem value="Ice" sx={{ textTransform: "none" }}>Ice</MenuItem>
                                    <MenuItem value="Fighting" sx={{ textTransform: "none" }}>Fighting</MenuItem>
                                    <MenuItem value="Poison" sx={{ textTransform: "none" }}>Poison</MenuItem>
                                    <MenuItem value="Ground" sx={{ textTransform: "none" }}>Ground</MenuItem>
                                    <MenuItem value="Flying" sx={{ textTransform: "none" }}>Flying</MenuItem>
                                    <MenuItem value="Psychic" sx={{ textTransform: "none" }}>Psychic</MenuItem>
                                    <MenuItem value="Bug" sx={{ textTransform: "none" }}>Bug</MenuItem>
                                    <MenuItem value="Rock" sx={{ textTransform: "none" }}>Rock</MenuItem>
                                    <MenuItem value="Ghost" sx={{ textTransform: "none" }}>Ghost</MenuItem>
                                    <MenuItem value="Dragon" sx={{ textTransform: "none" }}>Dragon</MenuItem>
                                    <MenuItem value="Dark" sx={{ textTransform: "none" }}>Dark</MenuItem>
                                    <MenuItem value="Steel" sx={{ textTransform: "none" }}>Steel</MenuItem>
                                    <MenuItem value="Fairy" sx={{ textTransform: "none" }}>Fairy</MenuItem>
                                    <MenuItem value="Stellar" sx={{ textTransform: "none" }}>Stellar</MenuItem>
                                    <MenuItem value="???" sx={{ textTransform: "none" }}>???</MenuItem>
                                </TextField>
                            </Box>

                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0, lineHeight: 0 }}>
                                Leave empty to use the Pokémon’s default types.
                            </Typography>

                            <Box sx={{ display: "flex", alignItems: "center",}}>
                                <TextField
                                    select
                                    label="Tera type"
                                    variant="outlined"
                                    sx={{ width: 128 }}
                                    value={props.attackerTeraType}
                                    onChange={attackerTeraTypeChangeACB}
                                >
                                    <MenuItem value="Normal" sx={{ textTransform: "none" }}>Normal</MenuItem>
                                    <MenuItem value="Fire" sx={{ textTransform: "none" }}>Fire</MenuItem>
                                    <MenuItem value="Water" sx={{ textTransform: "none" }}>Water</MenuItem>
                                    <MenuItem value="Electric" sx={{ textTransform: "none" }}>Electric</MenuItem>
                                    <MenuItem value="Grass" sx={{ textTransform: "none" }}>Grass</MenuItem>
                                    <MenuItem value="Ice" sx={{ textTransform: "none" }}>Ice</MenuItem>
                                    <MenuItem value="Fighting" sx={{ textTransform: "none" }}>Fighting</MenuItem>
                                    <MenuItem value="Poison" sx={{ textTransform: "none" }}>Poison</MenuItem>
                                    <MenuItem value="Ground" sx={{ textTransform: "none" }}>Ground</MenuItem>
                                    <MenuItem value="Flying" sx={{ textTransform: "none" }}>Flying</MenuItem>
                                    <MenuItem value="Psychic" sx={{ textTransform: "none" }}>Psychic</MenuItem>
                                    <MenuItem value="Bug" sx={{ textTransform: "none" }}>Bug</MenuItem>
                                    <MenuItem value="Rock" sx={{ textTransform: "none" }}>Rock</MenuItem>
                                    <MenuItem value="Ghost" sx={{ textTransform: "none" }}>Ghost</MenuItem>
                                    <MenuItem value="Dragon" sx={{ textTransform: "none" }}>Dragon</MenuItem>
                                    <MenuItem value="Dark" sx={{ textTransform: "none" }}>Dark</MenuItem>
                                    <MenuItem value="Steel" sx={{ textTransform: "none" }}>Steel</MenuItem>
                                    <MenuItem value="Fairy" sx={{ textTransform: "none" }}>Fairy</MenuItem>
                                    <MenuItem value="Stellar" sx={{ textTransform: "none" }}>Stellar</MenuItem>
                                </TextField>
                                <Switch
                                    checked={props.attackerTerastallized}
                                    onChange={attackerTeraToggleACB}
                                    size="small"
                                />
                            </Box>
                            <TextField
                                label="Level"
                                type="number"
                                size="small"
                                sx={{ width: 100 }}
                                value={props.attackerLevel}
                                onChange={attackerLevelChangeACB}
                                inputProps={{ min: 1, max: 100 }}
                            />

                            <TextField
                                select
                                value={props.attackerGender}
                                label="Gender"
                                onChange={attackerGenderChangeACB}
                                size="small"
                            >
                                <MenuItem value="M">M</MenuItem>
                                <MenuItem value="F">F</MenuItem>
                                <MenuItem value="N">N</MenuItem>
                            </TextField>

                            <TextField label="Ability" fullWidth value={props.attackerAbility} onChange={attackerAbilityChangeACB} />
                            <TextField label="Item" fullWidth value={props.attackerItem} onChange={attackerItemChangeACB} />
                            <TextField label="Nature" fullWidth value={props.attackerNature} onChange={attackerNatureChangeACB} />

                            <TextField
                                select
                                value={props.attackerStatus}
                                label="Status"
                                onChange={attackerStatusChangeACB}
                                size="small"
                            >
                                <MenuItem value="" sx={{ textTransform: "none" }}>Healthy</MenuItem>
                                <MenuItem value="brn"sx={{ textTransform: "none" }}>Burned</MenuItem>
                                <MenuItem value="par" sx={{ textTransform: "none" }}>Paralysed</MenuItem>
                                <MenuItem value="slp" sx={{ textTransform: "none" }}>Asleep</MenuItem>
                                <MenuItem value="frz" sx={{ textTransform: "none" }}>Frozen</MenuItem>
                                <MenuItem value="psn" sx={{ textTransform: "none" }}>Poisoned</MenuItem>
                                <MenuItem value="tox" sx={{ textTransform: "none" }}>Badly Poisoned</MenuItem>
                            </TextField>
                            
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "90px 64px 72px 72px",
                                    alignItems: "center",
                                    columnGap: 1,
                                    rowGap: 1,
                                }}
                            >
                                <Box />
                                <Typography variant="caption" sx={{ fontWeight: 700, textAlign: "center" }}>
                                    IVs
                                </Typography>
                                <Typography variant="caption" sx={{ fontWeight: 700, textAlign: "center" }}>
                                    EVs
                                </Typography>
                                <Typography variant="caption" sx={{ fontWeight: 700, textAlign: "center" }}>
                                    Boost
                                </Typography>

                                {[
                                    { key: "hp", label: "HP", boost: false },
                                    { key: "atk", label: "Attack", boost: true },
                                    { key: "def", label: "Defense", boost: true },
                                    { key: "spa", label: "Sp. Atk", boost: true },
                                    { key: "spd", label: "Sp. Def", boost: true },
                                    { key: "spe", label: "Speed", boost: true },
                                ].map((row) => (
                                    <Box sx={{ display: "contents" }}>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {row.label}
                                        </Typography>

                                        <TextField
                                            type="number"
                                            size="small"
                                            value={props.attackerIVs?.[row.key] ?? 31}
                                            onChange={attackerIVChangeACB(row.key)}
                                            inputProps={{ min: 0, max: 31 }}
                                            sx={{width: 64,}}
                                        />

                                        <TextField
                                            type="number"
                                            size="small"
                                            value={props.attackerEVs?.[row.key] ?? 0}
                                            onChange={attackerEVChangeACB(row.key)}
                                            inputProps={{ min: 0, max: 252 }}
                                            sx={{width: 72,}}
                                        />

                                        {row.boost? (
                                            <TextField
                                                select
                                                size="small"
                                                value={props.attackerBoosts?.[row.key] ?? 0}
                                                onChange={attackerBoostChangeACB(row.key)}
                                                sx={{width: 72,}}
                                            >
                                                {[6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6].map((v) => (
                                                    <MenuItem value={v} sx={{ textTransform: "none" }}>
                                                        {v === 0? "--" : v > 0? `+${v}` : v}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        ) : (
                                            <Box />
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Field (middle box with buttons) */}
                    <Card sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <CardContent
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >

                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <div>
                                    <Typography variant="subtitle1" textAlign="center">
                                        Field
                                    </Typography>
                                    <Box sx={{ display: "flex", justifyContent: "center", mt: 1, }}>
                                        <ToggleButtonGroup
                                            value={props.gameType}
                                            exclusive
                                            onChange={gameTypeChangeACB}
                                            size="small"
                                        >
                                            <ToggleButton value="Singles" sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}>Singles</ToggleButton>
                                            <ToggleButton value="Doubles" sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}>Doubles</ToggleButton>
                                        </ToggleButtonGroup>
                                    </Box>

                                    <Box sx={{ display: "flex", justifyContent: "center", mt: 1, }}>
                                        <ToggleButtonGroup
                                            value={terrainValue}
                                            exclusive
                                            onChange={terrainChangeACB}
                                            size="small"
                                        >
                                            <ToggleButton value="None" sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}>None</ToggleButton>
                                            <ToggleButton value="Electric" sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}>Electric</ToggleButton>
                                            <ToggleButton value="Grassy" sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}>Grassy</ToggleButton>
                                            <ToggleButton value="Misty" sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}>Misty</ToggleButton>
                                            <ToggleButton value="Psychic" sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}>Psychic</ToggleButton>
                                        </ToggleButtonGroup>
                                    </Box>
                                    <ToggleButtonGroup
                                        value={weatherValue}
                                        exclusive
                                        onChange={weatherChangeACB}
                                        size="small"
                                        sx={{ display: "flex", justifyContent: "center", mt: 1, }}
                                    >
                                        <ToggleButton value="None" sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}>None</ToggleButton>
                                        <ToggleButton value="Sun" sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}>Sun</ToggleButton>
                                        <ToggleButton value="Rain" sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}>Rain</ToggleButton>
                                        <ToggleButton value="Sand" sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}>Sand</ToggleButton>
                                        <ToggleButton value="Snow" sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}>Snow</ToggleButton>
                                    </ToggleButtonGroup>

                                    <ToggleButtonGroup
                                        value={weatherValue}
                                        exclusive
                                        onChange={weatherChangeACB}
                                        size="small"
                                        sx={{ display: "flex", justifyContent: "center" }}
                                    >
                                        <ToggleButton 
                                            value="Harsh Sunshine" 
                                            sx={{ textTransform: "none",lineHeight: 1.2, paddingY: 0.5, }}>
                                            Harsh Sunshine
                                        </ToggleButton>
                                        <ToggleButton 
                                            value="Heavy Rain" 
                                            sx={{ textTransform: "none",lineHeight: 1.2, paddingY: 0.5, }}>
                                            Heavy Rain
                                        </ToggleButton>
                                        <ToggleButton 
                                            value="Strong Winds" 
                                            sx={{ textTransform: "none",lineHeight: 1.2, paddingY: 0.5, }}>
                                            Strong Winds
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                    {/* Side conditions as buttons */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 1,
                                            justifyContent: "center",
                                            mt: 1,
                                        }}
                                    >
                                        <ToggleButton
                                            value="magic room"
                                            selected={props.magicRoom}
                                            onChange={magicRoomToggleACB}
                                            size="small"
                                            sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                        >
                                            Magic Room
                                        </ToggleButton>
                                        <ToggleButton
                                            value="Wonder Room"
                                            selected={props.wonderRoom}
                                            onChange={wonderRoomToggleACB}
                                            size="small"
                                            sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                        >
                                            Wonder Room
                                        </ToggleButton>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 1,
                                            justifyContent: "center",
                                            mt: 1,
                                        }}
                                    >
                                        <ToggleButton
                                            value="gravity"
                                            selected={props.gravity}
                                            onChange={gravityToggleACB}
                                            size="small"
                                            sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                        >
                                            Gravity
                                        </ToggleButton>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 1,
                                            justifyContent: "center",
                                            mt: 1,
                                        }}
                                    >
                                        <ToggleButton
                                            value="Sword of Ruin"
                                            selected={props.SoR}
                                            onChange={soRToggleACB}
                                            size="small"
                                            sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                        >
                                            Sword of Ruin
                                        </ToggleButton>
                                        <ToggleButton
                                            value="Beads of Ruin"
                                            selected={props.BoR}
                                            onChange={boRToggleACB}
                                            size="small"
                                            sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                        >
                                            Beads of Ruin
                                        </ToggleButton>
                                        <ToggleButton
                                            value="Tablets of Ruin"
                                            selected={props.ToR}
                                            onChange={toRToggleACB}
                                            size="small"
                                            sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                        >
                                            Tablets of Ruin
                                        </ToggleButton>
                                        <ToggleButton
                                            value="Vessel of Ruin"
                                            selected={props.VoR}
                                            onChange={voRToggleACB}
                                            size="small"
                                            sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                        >
                                            Vessel of Ruin
                                        </ToggleButton>
                                    </Box>
                                </div>
                            </Box>

                            <Box
                                sx={{
                                    mt: 2,
                                    borderTop: "1px solid #e0e0e0",
                                    pt: 2,
                                }}
                            >
                                <Typography variant="subtitle2" textAlign="center">
                                    Side conditions
                                </Typography>

                                <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                                    {/* Attacker's side */}
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body2" gutterBottom>
                                            Attacker
                                        </Typography>
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                            <ToggleButton
                                                value="attackerHelpingHand"
                                                selected={props.aHelpingHand}
                                                onChange={aHelpingHandToggleACB}
                                                size="small"
                                                sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                            >
                                                Helping Hand
                                            </ToggleButton>
                                            <ToggleButton
                                                value="attackerTailwind"
                                                selected={props.aTailwind}
                                                onChange={aTailwindToggleACB}
                                                size="small"
                                                sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                            >
                                                Tailwind
                                            </ToggleButton>
                                            <ToggleButton
                                                value="attackerFlowerGift"
                                                selected={props.aFlowerGift}
                                                onChange={aFlowerGiftToggleACB}
                                                size="small"
                                                sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                            >
                                                Flower Gift
                                            </ToggleButton>
                                            <ToggleButton
                                                value="attackerPowerTrick"
                                                selected={props.aPowerTrick}
                                                onChange={aPowerTrickToggleACB}
                                                size="small"
                                                sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                            >
                                                Power Trick
                                            </ToggleButton>
                                            <ToggleButton
                                                value="powerSpot"
                                                selected={props.powerSpot}
                                                onChange={powerSpotToggleACB}
                                                size="small"
                                                sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                            >
                                                Power Spot
                                            </ToggleButton>
                                            <ToggleButton
                                                value="steelySpirit"
                                                selected={props.steelySpirit}
                                                onChange={steelySpiritToggleACB}
                                                size="small"
                                                sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                            >
                                                Steely Spirit
                                            </ToggleButton>
                                            <ToggleButton
                                                value="battery"
                                                selected={props.battery}
                                                onChange={batteryToggleACB}
                                                size="small"
                                                sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                            >
                                                Battery
                                            </ToggleButton>
                                        </Box>
                                    </Box>

                                    {/* Defender's side */}
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body2" gutterBottom textAlign={"right"}>
                                            Defender
                                        </Typography>
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "right" }}>
                                            <ToggleButton
                                                value="defenderHelpingHand"
                                                selected={props.dHelpingHand}
                                                onChange={dHelpingHandToggleACB}
                                                size="small"
                                                sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                            >
                                                Helping Hand
                                            </ToggleButton>
                                            <ToggleButton
                                                value="defenderTailwind"
                                                selected={props.dTailwind}
                                                onChange={dTailwindToggleACB}
                                                size="small"
                                                sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                            >
                                                Tailwind
                                            </ToggleButton>
                                            <ToggleButton
                                                value="defenderFlowerGift"
                                                selected={props.dFlowerGift}
                                                onChange={dFlowerGiftToggleACB}
                                                size="small"
                                                sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                            >
                                                Flower Gift
                                            </ToggleButton>
                                            <ToggleButton
                                                value="defenderPowerTrick"
                                                selected={props.dPowerTrick}
                                                onChange={dPowerTrickToggleACB}
                                                size="small"
                                                sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                            >
                                                Power Trick
                                            </ToggleButton>

                                            <ToggleButton
                                                value="reflect"
                                                selected={props.reflect}
                                                onChange={reflectToggleACB}
                                                size="small"
                                                sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                            >
                                                Reflect
                                            </ToggleButton>
                                            <ToggleButton
                                                value="lightscreen"
                                                selected={props.lightScreen}
                                                onChange={lightScreenToggleACB}
                                                size="small"
                                                sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                            >
                                                Light Screen
                                            </ToggleButton>
                                            <ToggleButton
                                                value="friendGuard"
                                                selected={props.friendGuard}
                                                onChange={friendGuardToggleACB}
                                                size="small"
                                                sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                            >
                                                Friend Guard
                                            </ToggleButton>

                                            <ToggleButton
                                                value="stealthRock"
                                                selected={props.SR}
                                                onChange={sRToggleACB}
                                                size="small"
                                                sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                            >
                                                Stealth Rock
                                            </ToggleButton>
                                            <ToggleButtonGroup
                                                value={props.spikes}
                                                exclusive
                                                onChange={spikesChangeACB}
                                                size="small"
                                            >
                                                <ToggleButton value={3} sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}>3 Spikes</ToggleButton>
                                                <ToggleButton value={2} sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}>2</ToggleButton>
                                                <ToggleButton value={1} sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}>1</ToggleButton>
                                                <ToggleButton value={0} sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}>0</ToggleButton>
                                            </ToggleButtonGroup>
                                            <ToggleButton
                                                value="protected"
                                                selected={props.protect}
                                                onChange={protectedToggleACB}
                                                size="small"
                                                sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                            >
                                                Protect
                                            </ToggleButton>
                                            <ToggleButton
                                                value="seeded"
                                                selected={props.leechSeed}
                                                onChange={seededToggleACB}
                                                size="small"
                                                sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                            >
                                                Leech Seed
                                            </ToggleButton>
                                            <ToggleButton
                                                value="saltCure"
                                                selected={props.saltCure}
                                                onChange={saltCurseToggleACB}
                                                size="small"
                                                sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                            >
                                                Salt Cure
                                            </ToggleButton>
                                            <ToggleButton
                                                value="foresight"
                                                selected={props.foresight}
                                                onChange={foresightToggleACB}
                                                size="small"
                                                sx={{ textTransform: "none", lineHeight: 1.2, paddingY: 0.5, }}
                                            >
                                                Foresight
                                            </ToggleButton>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Button type="submit" sx={{ textTransform: "none" }} variant="contained" fullWidth>
                                    Calculate
                                </Button>
                            </Box>

                            {props.error && (
                                <Typography
                                    variant="body2"
                                    color="error"
                                    sx={{ mt: 1, textAlign: "center" }}
                                >
                                    {props.error}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>

                    <Card sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <CardContent
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                height: "100%",
                            }}
                        >
                            <Typography variant="subtitle1">Pokémon 2 (Defender)</Typography>

                            <TextField
                                label="Species"
                                variant="outlined"
                                fullWidth
                                value={props.defenderName}
                                onChange={defenderChangeACB}
                            />

                            <Box sx={{ display: "flex", }}>
                                <TextField
                                    select
                                    label="Type 1"
                                    variant="outlined"
                                    fullWidth
                                    value={props.defenderType1Override || ""}
                                    onChange={defenderType1OverrideChangeACB}
                                    
                                >
                                    <MenuItem value="Normal" sx={{ textTransform: "none" }}>Normal</MenuItem>
                                    <MenuItem value="Fire" sx={{ textTransform: "none" }}>Fire</MenuItem>
                                    <MenuItem value="Water" sx={{ textTransform: "none" }}>Water</MenuItem>
                                    <MenuItem value="Electric" sx={{ textTransform: "none" }}>Electric</MenuItem>
                                    <MenuItem value="Grass" sx={{ textTransform: "none" }}>Grass</MenuItem>
                                    <MenuItem value="Ice" sx={{ textTransform: "none" }}>Ice</MenuItem>
                                    <MenuItem value="Fighting" sx={{ textTransform: "none" }}>Fighting</MenuItem>
                                    <MenuItem value="Poison" sx={{ textTransform: "none" }}>Poison</MenuItem>
                                    <MenuItem value="Ground" sx={{ textTransform: "none" }}>Ground</MenuItem>
                                    <MenuItem value="Flying" sx={{ textTransform: "none" }}>Flying</MenuItem>
                                    <MenuItem value="Psychic" sx={{ textTransform: "none" }}>Psychic</MenuItem>
                                    <MenuItem value="Bug" sx={{ textTransform: "none" }}>Bug</MenuItem>
                                    <MenuItem value="Rock" sx={{ textTransform: "none" }}>Rock</MenuItem>
                                    <MenuItem value="Ghost" sx={{ textTransform: "none" }}>Ghost</MenuItem>
                                    <MenuItem value="Dragon" sx={{ textTransform: "none" }}>Dragon</MenuItem>
                                    <MenuItem value="Dark" sx={{ textTransform: "none" }}>Dark</MenuItem>
                                    <MenuItem value="Steel" sx={{ textTransform: "none" }}>Steel</MenuItem>
                                    <MenuItem value="Fairy" sx={{ textTransform: "none" }}>Fairy</MenuItem>
                                    <MenuItem value="Stellar" sx={{ textTransform: "none" }}>Stellar</MenuItem>
                                    <MenuItem value="???" sx={{ textTransform: "none" }}>???</MenuItem>
                                </TextField>

                                <TextField
                                    select
                                    label="Type 2"
                                    variant="outlined"
                                    fullWidth
                                    value={props.defenderType2Override || ""}
                                    onChange={defenderType2OverrideChangeACB}
                                >
                                    <MenuItem value="" sx={{ textTransform: "none" }}>None</MenuItem>
                                    <MenuItem value="Normal" sx={{ textTransform: "none" }}>Normal</MenuItem>
                                    <MenuItem value="Fire" sx={{ textTransform: "none" }}>Fire</MenuItem>
                                    <MenuItem value="Water" sx={{ textTransform: "none" }}>Water</MenuItem>
                                    <MenuItem value="Electric" sx={{ textTransform: "none" }}>Electric</MenuItem>
                                    <MenuItem value="Grass" sx={{ textTransform: "none" }}>Grass</MenuItem>
                                    <MenuItem value="Ice" sx={{ textTransform: "none" }}>Ice</MenuItem>
                                    <MenuItem value="Fighting" sx={{ textTransform: "none" }}>Fighting</MenuItem>
                                    <MenuItem value="Poison" sx={{ textTransform: "none" }}>Poison</MenuItem>
                                    <MenuItem value="Ground" sx={{ textTransform: "none" }}>Ground</MenuItem>
                                    <MenuItem value="Flying" sx={{ textTransform: "none" }}>Flying</MenuItem>
                                    <MenuItem value="Psychic" sx={{ textTransform: "none" }}>Psychic</MenuItem>
                                    <MenuItem value="Bug" sx={{ textTransform: "none" }}>Bug</MenuItem>
                                    <MenuItem value="Rock" sx={{ textTransform: "none" }}>Rock</MenuItem>
                                    <MenuItem value="Ghost" sx={{ textTransform: "none" }}>Ghost</MenuItem>
                                    <MenuItem value="Dragon" sx={{ textTransform: "none" }}>Dragon</MenuItem>
                                    <MenuItem value="Dark" sx={{ textTransform: "none" }}>Dark</MenuItem>
                                    <MenuItem value="Steel" sx={{ textTransform: "none" }}>Steel</MenuItem>
                                    <MenuItem value="Fairy" sx={{ textTransform: "none" }}>Fairy</MenuItem>
                                    <MenuItem value="Stellar" sx={{ textTransform: "none" }}>Stellar</MenuItem>
                                    <MenuItem value="???" sx={{ textTransform: "none" }}>???</MenuItem>
                                </TextField>
                            </Box>

                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0, lineHeight: 0 }}>
                                Leave empty to use the Pokémon’s default types.
                            </Typography>

                            <Box sx={{ display: "flex", alignItems: "center",}}>
                                <TextField
                                    select
                                    label="Tera type"
                                    variant="outlined"
                                    sx={{ width: 128 }}
                                    value={props.defenderTeraType}
                                    onChange={defenderTeraTypeChangeACB}
                                >
                                    <MenuItem value="Normal" sx={{ textTransform: "none" }}>Normal</MenuItem>
                                    <MenuItem value="Fire" sx={{ textTransform: "none" }}>Fire</MenuItem>
                                    <MenuItem value="Water" sx={{ textTransform: "none" }}>Water</MenuItem>
                                    <MenuItem value="Electric" sx={{ textTransform: "none" }}>Electric</MenuItem>
                                    <MenuItem value="Grass" sx={{ textTransform: "none" }}>Grass</MenuItem>
                                    <MenuItem value="Ice" sx={{ textTransform: "none" }}>Ice</MenuItem>
                                    <MenuItem value="Fighting" sx={{ textTransform: "none" }}>Fighting</MenuItem>
                                    <MenuItem value="Poison" sx={{ textTransform: "none" }}>Poison</MenuItem>
                                    <MenuItem value="Ground" sx={{ textTransform: "none" }}>Ground</MenuItem>
                                    <MenuItem value="Flying" sx={{ textTransform: "none" }}>Flying</MenuItem>
                                    <MenuItem value="Psychic" sx={{ textTransform: "none" }}>Psychic</MenuItem>
                                    <MenuItem value="Bug" sx={{ textTransform: "none" }}>Bug</MenuItem>
                                    <MenuItem value="Rock" sx={{ textTransform: "none" }}>Rock</MenuItem>
                                    <MenuItem value="Ghost" sx={{ textTransform: "none" }}>Ghost</MenuItem>
                                    <MenuItem value="Dragon" sx={{ textTransform: "none" }}>Dragon</MenuItem>
                                    <MenuItem value="Dark" sx={{ textTransform: "none" }}>Dark</MenuItem>
                                    <MenuItem value="Steel" sx={{ textTransform: "none" }}>Steel</MenuItem>
                                    <MenuItem value="Fairy" sx={{ textTransform: "none" }}>Fairy</MenuItem>
                                    <MenuItem value="Stellar" sx={{ textTransform: "none" }}>Stellar</MenuItem>
                                </TextField>
                                <Switch
                                    checked={props.defenderTerastallized}
                                    onChange={defenderTeraToggleACB}
                                    size="small"
                                />
                            </Box>

                            <TextField
                                label="Level"
                                type="number"
                                size="small"
                                sx={{ width: 100 }}
                                value={props.defenderLevel}
                                onChange={defenderLevelChangeACB}
                                inputProps={{ min: 1, max: 100 }}
                            />

                            <TextField
                                select
                                value={props.defenderGender}
                                label="Gender"
                                onChange={defenderGenderChangeACB}
                                size="small"
                            >
                                <MenuItem value="M">M</MenuItem>
                                <MenuItem value="F">F</MenuItem>
                                <MenuItem value="N">N</MenuItem>
                            </TextField>

                            <TextField label="Ability" fullWidth value={props.defenderAbility} onChange={defenderAbilityChangeACB} />
                            <TextField label="Item" fullWidth value={props.defenderItem} onChange={defenderItemChangeACB} />
                            <TextField label="Nature" fullWidth value={props.defenderNature} onChange={defenderNatureChangeACB} />

                            <TextField
                                select
                                value={props.defenderStatus}
                                label="Status"
                                onChange={defenderStatusChangeACB}
                                size="small"
                            >
                                <MenuItem value="" sx={{ textTransform: "none" }}>Healthy</MenuItem>
                                <MenuItem value="brn"sx={{ textTransform: "none" }}>Burned</MenuItem>
                                <MenuItem value="par" sx={{ textTransform: "none" }}>Paralysed</MenuItem>
                                <MenuItem value="slp" sx={{ textTransform: "none" }}>Asleep</MenuItem>
                                <MenuItem value="frz" sx={{ textTransform: "none" }}>Frozen</MenuItem>
                                <MenuItem value="psn" sx={{ textTransform: "none" }}>Poisoned</MenuItem>
                                <MenuItem value="tox" sx={{ textTransform: "none" }}>Badly Poisoned</MenuItem>
                            </TextField>
                            
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "90px 64px 72px 72px",
                                    alignItems: "center",
                                    columnGap: 1,
                                    rowGap: 1,
                                }}
                            >
                                <Box />
                                <Typography variant="caption" sx={{ fontWeight: 700, textAlign: "center" }}>
                                    IVs
                                </Typography>
                                <Typography variant="caption" sx={{ fontWeight: 700, textAlign: "center" }}>
                                    EVs
                                </Typography>
                                <Typography variant="caption" sx={{ fontWeight: 700, textAlign: "center" }}>
                                    Boost
                                </Typography>

                                {[
                                    { key: "hp", label: "HP", boost: false },
                                    { key: "atk", label: "Attack", boost: true },
                                    { key: "def", label: "Defense", boost: true },
                                    { key: "spa", label: "Sp. Atk", boost: true },
                                    { key: "spd", label: "Sp. Def", boost: true },
                                    { key: "spe", label: "Speed", boost: true },
                                ].map((row) => (
                                    <Box sx={{ display: "contents" }}>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {row.label}
                                        </Typography>

                                        <TextField
                                            type="number"
                                            size="small"
                                            value={props.defenderIVs?.[row.key] ?? 31}
                                            onChange={defenderIVChangeACB(row.key)}
                                            inputProps={{ min: 0, max: 31 }}
                                            sx={{width: 64,}}
                                        />

                                        <TextField
                                            type="number"
                                            size="small"
                                            value={props.defenderEVs?.[row.key] ?? 0}
                                            onChange={defenderEVChangeACB(row.key)}
                                            inputProps={{ min: 0, max: 252 }}
                                            sx={{width: 72,}}
                                        />

                                        {row.boost? (
                                            <TextField
                                                select
                                                size="small"
                                                value={props.defenderBoosts?.[row.key] ?? 0}
                                                onChange={defenderBoostChangeACB(row.key)}
                                                sx={{width: 72,}}
                                            >
                                                {[6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6].map((v) => (
                                                    <MenuItem value={v} sx={{ textTransform: "none" }}>
                                                        {v === 0? "--" : v > 0? `+${v}` : v}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        ) : (
                                            <Box />
                                        )}
                                    </Box>
                                ))}
                            </Box>

                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </form>
    );

    function submitHandlerACB(e) {
        e.preventDefault();
        props.onCalculate();
    }

    //Attacker
    function attackerChangeACB(e) {props.onAttackerNameChange(e.target.value);}
    function moveChangeACB(e) {props.onMoveNameChange(e.target.value);}
    function attackerLevelChangeACB(e) { props.onAttackerLevelChange(Number(e.target.value)); }
    function attackerGenderChangeACB(e) { props.onAttackerGenderChange(e.target.value); }
    function attackerType1OverrideChangeACB(e) { props.onAttackerType1OverrideChange(e.target.value); }
    function attackerType2OverrideChangeACB(e) { props.onAttackerType2OverrideChange(e.target.value); }
    function attackerTeraTypeChangeACB(e) { props.onAttackerTeraTypeChange(e.target.value); }
    function attackerTeraToggleACB(e, checked) { props.onAttackerTerastallizedChange(checked); }
    function attackerAbilityChangeACB(e) { props.onAttackerAbilityChange(e.target.value); }
    function attackerItemChangeACB(e) { props.onAttackerItemChange(e.target.value); }
    function attackerNatureChangeACB(e) { props.onAttackerNatureChange(e.target.value); }
    function attackerStatusChangeACB(e) { props.onAttackerStatusChange(e.target.value); }

    function attackerEVChangeACB(stat) {
        return function (e) { props.onAttackerEVChange(stat, Number(e.target.value)); };
    }
    function attackerIVChangeACB(stat) {
        return function (e) { props.onAttackerIVChange(stat, Number(e.target.value)); };
    }
    function attackerBoostChangeACB(stat) {
        return function (e) { props.onAttackerBoostChange(stat, Number(e.target.value)); };
    }

    //Defender
    function defenderChangeACB(e) {props.onDefenderNameChange(e.target.value);}
    function defenderLevelChangeACB(e) { props.onDefenderLevelChange(Number(e.target.value)); }
    function defenderGenderChangeACB(e) { props.onDefenderGenderChange(e.target.value); }
    function defenderType1OverrideChangeACB(e) { props.onDefenderType1OverrideChange(e.target.value); }
    function defenderType2OverrideChangeACB(e) { props.onDefenderType2OverrideChange(e.target.value); }
    function defenderTeraTypeChangeACB(e) { props.onDefenderTeraTypeChange(e.target.value); }
    function defenderTeraToggleACB(e, checked) { props.onDefenderTerastallizedChange(checked); }
    function defenderAbilityChangeACB(e) { props.onDefenderAbilityChange(e.target.value); }
    function defenderItemChangeACB(e) { props.onDefenderItemChange(e.target.value); }
    function defenderNatureChangeACB(e) { props.onDefenderNatureChange(e.target.value); }
    function defenderStatusChangeACB(e) { props.onDefenderStatusChange(e.target.value); }

    function defenderEVChangeACB(stat) {
        return function (e) { props.onDefenderEVChange(stat, Number(e.target.value)); };
    }
    function defenderIVChangeACB(stat) {
        return function (e) { props.onDefenderIVChange(stat, Number(e.target.value)); };
    }
    function defenderBoostChangeACB(stat) {
        return function (e) { props.onDefenderBoostChange(stat, Number(e.target.value)); };
    }

    //Field
    function gameTypeChangeACB(e, newValue) {
        if (newValue !== null) {
            props.onGameTypeChange(newValue);
        }
    }

    function terrainChangeACB(e, newValue) {
        if (newValue === null) return;
        if (newValue === "None") {
            props.onTerrainChange("");
        } else {
            props.onTerrainChange(newValue);
        }
    }

    function weatherChangeACB(e, newValue) {
        if (newValue === null) return;
        if (newValue === "None") {
            props.onWeatherChange("");
        } else {
            props.onWeatherChange(newValue);
        }
    }
    
    function magicRoomToggleACB() {props.onMRChange(!props.magicRoom);}
    function wonderRoomToggleACB() {props.onWRChange(!props.wonderRoom);}
    function gravityToggleACB() {props.onGravityChange(!props.gravity);}
    function soRToggleACB() {props.onSoRChange(!props.SoR);}
    function boRToggleACB() {props.onBoRChange(!props.BoR);}
    function toRToggleACB() {props.onToRChange(!props.ToR);}
    function voRToggleACB() {props.onVoRChange(!props.VoR);}

    //Field-Attacker  
    function aHelpingHandToggleACB() {props.onAHHChange(!props.aHelpingHand);}   
    function aTailwindToggleACB() {props.onATailwindChange(!props.aTailwind);} 
    function aFlowerGiftToggleACB() {props.onAFGChange(!props.aFlowerGift);}
    function aPowerTrickToggleACB() {props.onAPTChange(!props.aPowerTrick);}
    function powerSpotToggleACB() {props.onPSChange(!props.powerSpot);} 
    function steelySpiritToggleACB() {props.onSSChange(!props.steelySpirit);}
    function batteryToggleACB() {props.onBatteryChange(!props.battery);} 

    //Field-Defender  
    function dHelpingHandToggleACB() {props.onDHHChange(!props.dHelpingHand);}
    function dTailwindToggleACB() {props.onDTailwindChange(!props.dTailwind);} 
    function dFlowerGiftToggleACB() {props.onDFGChange(!props.dFlowerGift);}
    function dPowerTrickToggleACB() {props.onDPTChange(!props.dPowerTrick);}
    function reflectToggleACB() {props.onReflectChange(!props.reflect);}
    function lightScreenToggleACB() {props.onLightScreenChange(!props.lightScreen);}
    function friendGuardToggleACB() {props.onFriendGuardChange(!props.friendGuard);}
    function sRToggleACB() {props.onSRChange(!props.SR);}

    function spikesChangeACB(e, newValue) {
        if (newValue === null) return;
        props.onSpikesChange(newValue);
    }

    function protectedToggleACB() {
        props.onProtectedChange(!props.protect);
    }

    function seededToggleACB() {
        props.onSeededChange(!props.leechSeed);
    }

    function saltCurseToggleACB() {
        props.onSaltCureChange(!props.saltCure);
    }

    function foresightToggleACB() {
        props.onForesightChange(!props.foresight);
    }
}
import { useDispatch, useSelector } from "react-redux";
import { DamageCalcView } from "/src/views/damageCalcView.jsx";
import {
    setDamageAttackerName,
    setDamageDefenderName,
    setDamageMoveName,
    setDamageWeather,
    setDamageGameType,
    setDamageReflect,
    setDamageLightScreen,
    setDamageResult,
    setDamageError,
} from "/src/reduxStore.js";

import { calculate, Pokemon, Move, Field } from "@smogon/calc";

export function DamageCalculator() {
    const dispatch = useDispatch();

    const {
        damageAttackerName,
        damageDefenderName,
        damageMoveName,
        damageWeather,
        damageGameType,
        damageReflect,
        damageLightScreen,
        damageResult,
        damageError,
    } = useSelector((state) => state.poke);

    return (
        <DamageCalcView
            attackerName={damageAttackerName}
            defenderName={damageDefenderName}
            moveName={damageMoveName}
            weather={damageWeather}
            gameType={damageGameType}
            reflect={damageReflect}
            lightScreen={damageLightScreen}
            result={damageResult}
            error={damageError}
            onAttackerNameChange={(param) => dispatch(setDamageAttackerName(param))}
            onDefenderNameChange={(param) => dispatch(setDamageDefenderName(param))}
            onMoveNameChange={(param) => dispatch(setDamageMoveName(param))}
            onWeatherChange={(param) => dispatch(setDamageWeather(param))}
            onGameTypeChange={(param) => dispatch(setDamageGameType(param))}
            onReflectChange={(param) => dispatch(setDamageReflect(param))}
            onLightScreenChange={(param) => dispatch(setDamageLightScreen(param))}
            onCalculate={calculateACB}
        />
    );

    function calculateACB() {
        dispatch(setDamageError(null));
        dispatch(setDamageResult(null));

        const gen = 9;

        try {
            if (!damageAttackerName || !damageDefenderName || !damageMoveName) {
                throw new Error("Please fill in attacker, defender and move.");
            }

            const attacker = new Pokemon(gen, damageAttackerName, {level: 50,});

            const defender = new Pokemon(gen, damageDefenderName, {level: 50,});

            const move = new Move(gen, damageMoveName);

            const field = new Field({
                gameType: damageGameType === "Doubles" ? "Doubles" : "Singles",
                weather: damageWeather || undefined,
                defenderSide: {
                    isReflect: damageReflect,
                    isLightScreen: damageLightScreen,
                },
            });

            const result = calculate(gen, attacker, defender, move, field);

            let range = result.range();
            if (!Array.isArray(range) || range.length === 0) {
                range = [0, 0];
            } else if (range.length === 1) {
                range = [range[0], range[0]];
            }

            const description = typeof result.fullDesc === "function"
                ? result.fullDesc()
                : typeof result.desc === "function"
                ? result.desc()
                : "";

            dispatch(setDamageResult({
                description,
                range,
            }));
        } catch (err) {
            console.error(err);
            dispatch(setDamageError(
                err && err.message
                    ? err.message
                    : "Something went wrong during calculation."
            ));
        }
    }
}
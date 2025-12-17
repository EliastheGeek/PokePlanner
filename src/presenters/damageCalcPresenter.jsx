import { useDispatch, useSelector } from "react-redux";
import { DamageCalcView } from "/src/views/damageCalcView.jsx";
import {
    setDamageAttackerName,
    setDamageDefenderName,
    setDamageMoveName,
    //Attacker
    setAttackerLevel,
    setAttackerGender,
    setAttackerGenderOptions,
    setAttackerFormOptions,
    setAttackerAbility,
    setAttackerItem,
    setAttackerNature,
    setAttackerStatus,
    setAttackerTeraType,
    setAttackerTerastallized,
    setAttackerType1Override,
    setAttackerType2Override,
    setAttackerEV,
    setAttackerIV,
    setAttackerBoost,
    //Defender
    setDefenderLevel,
    setDefenderGender,
    setDefenderGenderOptions,
    setDefenderFormOptions,
    setDefenderAbility,
    setDefenderItem,
    setDefenderNature,
    setDefenderStatus,
    setDefenderTeraType,
    setDefenderTerastallized,
    setDefenderType1Override,
    setDefenderType2Override,
    setDefenderEV,
    setDefenderIV,
    setDefenderBoost,
    
    //Field
    setDamageTerrain,
    setDamageWeather,
    setDamageGameType,
    setDamageMR,
    setDamageWR,
    setDamageGravity,
    setDamageSoR,
    setDamageBoR,
    setDamageToR,
    setDamageVoR,
    //Field-Attacker
    setAttackerHH,
    setAttackerTailwind,
    setAttackerFG,
    setAttackerPT,
    setAttackerSS,
    setAttackerPS,
    setAttackerBattery,
    //Field-Defender
    setDefenderHH,
    setDefenderTailwind,
    setDefenderFG,
    setDefenderPT,
    setDamageReflect,
    setDamageLightScreen,
    setDamageFriendGuard,
    setDamageSR,
    setDamageSpikes,
    setDamageProtected,
    setDamageSeeded,
    setDamageSaltCure,
    setDamageForesight,

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
        //Attacker details
        attackerLevel, attackerGender, attackerAbility, attackerItem, attackerNature, 
        attackerStatus, attackerTeraType, attackerIsTerastallized, attackerType1Override, 
        attackerType2Override, attackerEVs, attackerIVs, attackerBoosts,
        //Defender details
        defenderLevel, defenderGender, defenderAbility, defenderItem, defenderNature, 
        defenderStatus, defenderTeraType, defenderIsTerastallized, defenderType1Override, 
        defenderType2Override, defenderEVs, defenderIVs, defenderBoosts,
        //Field
        damageTerrain, damageWeather, damageGameType,damageMagicRoom,damageWonderRoom,
        damageGravity,damageSoR,damageBoR,damageToR,damageVoR,
        //Attacker
        attackerHelpingHand,attackerTailwind,attackerFlowerGift,attackerPowerTrick,
        damageSteelySpirit,damagePowerSpot,damageBattery,
        //Defender
        defenderHelpingHand,defenderTailwind,defenderFlowerGift,defenderPowerTrick,
        damageReflect,damageLightScreen,damageFriendGuard,damageSR,damageSpikes,
        damageProtected,damageSeeded,damageSaltCure,damageForesight,

        damageResult,
        damageError,
    } = useSelector((state) => state.poke);

    return (
        <DamageCalcView
            attackerName={damageAttackerName}
            defenderName={damageDefenderName}
            moveName={damageMoveName}
            //Attacker details
            attackerLevel={attackerLevel}
            attackerGender={attackerGender}
            attackerAbility={attackerAbility}
            attackerItem={attackerItem}
            attackerNature={attackerNature}
            attackerStatus={attackerStatus}
            attackerTeraType={attackerTeraType}
            attackerTerastallized={attackerIsTerastallized}
            attackerType1Override={attackerType1Override}
            attackerType2Override={attackerType2Override}
            attackerEVs={attackerEVs}
            attackerIVs={attackerIVs}
            attackerBoosts={attackerBoosts}
            //Defender details
            defenderLevel={defenderLevel}
            defenderGender={defenderGender}
            defenderAbility={defenderAbility}
            defenderItem={defenderItem}
            defenderNature={defenderNature}
            defenderStatus={defenderStatus}
            defenderTeraType={defenderTeraType}
            defenderTerastallized={defenderIsTerastallized}
            defenderType1Override={defenderType1Override}
            defenderType2Override={defenderType2Override}
            defenderEVs={defenderEVs}
            defenderIVs={defenderIVs}
            defenderBoosts={defenderBoosts}
            //Field
            terrain={damageTerrain}
            weather={damageWeather}
            gameType={damageGameType}
            magicRoom={damageMagicRoom}
            wonderRoom={damageWonderRoom}
            gravity={damageGravity}
            SoR={damageSoR}
            BoR={damageBoR}
            ToR={damageToR}
            VoR={damageVoR}
            //Attacker
            aHelpingHand={attackerHelpingHand}
            aTailwind={attackerTailwind}
            aFlowerGift={attackerFlowerGift}
            aPowerTrick={attackerPowerTrick}
            steelySpirit={damageSteelySpirit}
            powerSpot={damagePowerSpot}
            battery={damageBattery}
            //Defender
            dHelpingHand={defenderHelpingHand}
            dTailwind={defenderTailwind}
            dFlowerGift={defenderFlowerGift}
            dPowerTrick={defenderPowerTrick}
            reflect={damageReflect}
            lightScreen={damageLightScreen}
            friendGuard={damageFriendGuard}
            SR={damageSR}
            spikes={damageSpikes}
            protect={damageProtected}
            leechSeed={damageSeeded}
            saltCure={damageSaltCure}
            foresight={damageForesight}

            result={damageResult}
            error={damageError}

            onAttackerNameChange={(param) => dispatch(setDamageAttackerName(param))}
            onDefenderNameChange={(param) => dispatch(setDamageDefenderName(param))}
            onMoveNameChange={(param) => dispatch(setDamageMoveName(param))}
            //Attacker details
            onAttackerLevelChange={(param)=>dispatch(setAttackerLevel(param))}
            onAttackerGenderChange={(param)=>dispatch(setAttackerGender(param))}
            onAttackerAbilityChange={(param)=>dispatch(setAttackerAbility(param))}
            onAttackerItemChange={(param)=>dispatch(setAttackerItem(param))}
            onAttackerNatureChange={(param)=>dispatch(setAttackerNature(param))}
            onAttackerStatusChange={(param)=>dispatch(setAttackerStatus(param))}
            onAttackerTeraTypeChange={(param)=>dispatch(setAttackerTeraType(param))}
            onAttackerTerastallizedChange={(param)=>dispatch(setAttackerTerastallized(param))}
            onAttackerType1OverrideChange={(param)=>dispatch(setAttackerType1Override(param))}
            onAttackerType2OverrideChange={(param)=>dispatch(setAttackerType2Override(param))}
            onAttackerEVChange={(stat,value)=>dispatch(setAttackerEV({stat,value}))}
            onAttackerIVChange={(stat,value)=>dispatch(setAttackerIV({stat,value}))}
            onAttackerBoostChange={(stat,value)=>dispatch(setAttackerBoost({stat,value}))}
            //Defender details
            onDefenderLevelChange={(param)=>dispatch(setDefenderLevel(param))}
            onDefenderGenderChange={(param)=>dispatch(setDefenderGender(param))}
            onDefenderAbilityChange={(param)=>dispatch(setDefenderAbility(param))}
            onDefenderItemChange={(param)=>dispatch(setDefenderItem(param))}
            onDefenderNatureChange={(param)=>dispatch(setDefenderNature(param))}
            onDefenderStatusChange={(param)=>dispatch(setDefenderStatus(param))}
            onDefenderTeraTypeChange={(param)=>dispatch(setDefenderTeraType(param))}
            onDefenderTerastallizedChange={(param)=>dispatch(setDefenderTerastallized(param))}
            onDefenderType1OverrideChange={(param)=>dispatch(setDefenderType1Override(param))}
            onDefenderType2OverrideChange={(param)=>dispatch(setDefenderType2Override(param))}
            onDefenderEVChange={(stat,value)=>dispatch(setDefenderEV({stat,value}))}
            onDefenderIVChange={(stat,value)=>dispatch(setDefenderIV({stat,value}))}
            onDefenderBoostChange={(stat,value)=>dispatch(setDefenderBoost({stat,value}))}
            //Field
            onTerrainChange={(param) => dispatch(setDamageTerrain(param))}
            onWeatherChange={(param) => dispatch(setDamageWeather(param))}
            onGameTypeChange={(param) => dispatch(setDamageGameType(param))}
            onMRChange={(param) => dispatch(setDamageMR(param))}
            onWRChange={(param) => dispatch(setDamageWR(param))}
            onGravityChange={(param) => dispatch(setDamageGravity(param))}
            onSoRChange={(param) => dispatch(setDamageSoR(param))}
            onBoRChange={(param) => dispatch(setDamageBoR(param))}
            onToRChange={(param) => dispatch(setDamageToR(param))}
            onVoRChange={(param) => dispatch(setDamageVoR(param))}
            //Attacker
            onAHHChange={(param) => dispatch(setAttackerHH(param))}
            onATailwindChange={(param) => dispatch(setAttackerTailwind(param))}
            onAFGChange={(param) => dispatch(setAttackerFG(param))}
            onAPTChange={(param) => dispatch(setAttackerPT(param))}
            onPSChange={(param) => dispatch(setAttackerPS(param))}
            onSSChange={(param) => dispatch(setAttackerSS(param))}
            onBatteryChange={(param) => dispatch(setAttackerBattery(param))}
            //Defender
            onDHHChange={(param) => dispatch(setDefenderHH(param))}
            onDTailwindChange={(param) => dispatch(setDefenderTailwind(param))}
            onDFGChange={(param) => dispatch(setDefenderFG(param))}
            onDPTChange={(param) => dispatch(setDefenderPT(param))}
            onReflectChange={(param) => dispatch(setDamageReflect(param))}
            onLightScreenChange={(param) => dispatch(setDamageLightScreen(param))}
            onFriendGuardChange={(param) => dispatch(setDamageFriendGuard(param))}
            onSRChange={(param) => dispatch(setDamageSR(param))}
            onSpikesChange={(param) => dispatch(setDamageSpikes(param))}
            onProtectedChange={(param) => dispatch(setDamageProtected(param))}
            onSeededChange={(param) => dispatch(setDamageSeeded(param))}
            onSaltCureChange={(param) => dispatch(setDamageSaltCure(param))}
            onForesightChange={(param) => dispatch(setDamageForesight(param))}
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

            const attackerTypesOverride = [attackerType1Override, attackerType2Override].filter(Boolean);
            const defenderTypesOverride = [defenderType1Override, defenderType2Override].filter(Boolean);

            const attacker = new Pokemon(gen, damageAttackerName, {
                level: attackerLevel,
                gender: attackerGender === "N" ? undefined : attackerGender,
                ability: attackerAbility || undefined,
                item: attackerItem || undefined,
                nature: attackerNature || undefined,
                status: attackerStatus || undefined,
                evs: attackerEVs,
                ivs: attackerIVs,
                boosts: attackerBoosts,
                teraType: attackerIsTerastallized ? (attackerTeraType || undefined) : undefined,
                isTerastallized: attackerIsTerastallized,
                isTera: attackerIsTerastallized,
                ...(attackerTypesOverride.length ? { types: attackerTypesOverride } : {}),
            });

            const defender = new Pokemon(gen, damageDefenderName, {
                level: defenderLevel,
                gender: defenderGender === "N" ? undefined : defenderGender,
                ability: defenderAbility || undefined,
                item: defenderItem || undefined,
                nature: defenderNature || undefined,
                status: defenderStatus || undefined,
                evs: defenderEVs,
                ivs: defenderIVs,
                boosts: defenderBoosts,
                teraType: defenderIsTerastallized ? (defenderTeraType || undefined) : undefined,
                isTerastallized: defenderIsTerastallized,
                isTera: defenderIsTerastallized,
                ...(defenderTypesOverride.length ? { types: defenderTypesOverride } : {}),
            });

            const move = new Move(gen, damageMoveName);

            const field = new Field({
                gameType: damageGameType === "Doubles" ? "Doubles" : "Singles",
                terrain: damageTerrain || undefined,
                weather: damageWeather || undefined,
                isMagicRoom: damageMagicRoom,
                isWonderRoom: damageWonderRoom,
                isGravity: damageGravity,
                isSwordOfRuin: damageSoR,
                isBeadsOfRuin: damageBoR,
                isTabletsOfRuin: damageToR,
                isVesselOfRuin: damageVoR,
                attackerSide: {
                    isHelpingHand: attackerHelpingHand,
                    isTailwind: attackerTailwind,
                    isFlowerGift: attackerFlowerGift,
                    isPowerTrick: attackerPowerTrick,
                    isSteelySpirit: damageSteelySpirit,
                    isPowerSpot: damagePowerSpot,
                    isBattery: damageBattery,
                },
                defenderSide: {
                    isHelpingHand: defenderHelpingHand,
                    isTailwind: defenderTailwind,
                    isFlowerGift: defenderFlowerGift,
                    isPowerTrick: defenderPowerTrick,
                    isReflect: damageReflect,
                    isLightScreen: damageLightScreen,
                    isFriendGuard: damageFriendGuard,
                    isSR: damageSR,
                    spikes: damageSpikes,
                    isProtected: damageProtected,
                    isSeeded: damageSeeded,
                    isSaltCure: damageSaltCure,
                    isForesight: damageForesight,
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
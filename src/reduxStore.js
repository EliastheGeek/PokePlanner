import { configureStore, createSlice, createListenerMiddleware } from "@reduxjs/toolkit";
import { formatTimestamp } from "/src/utilities";
import { pokemonConst } from "./pokemonConst";
import { searchPokemon, showAllPokemon } from "./pokemonSource";
import { act } from "react";
const teamMaxSize = 6;

function clamp(n, lo, hi) {
    const x = Number(n);
    if (Number.isNaN(x)) return lo;
    return Math.max(lo, Math.min(hi, x));
}

const initialState = {
    team: [pokemonConst,],
    currentPokemonName: pokemonConst.name, //för att söka pokemon
    open: false,
    loading: false,
    //Promise-stuff
    searchParams: {},
    searchResultsPromiseState: { promise: null, data: null, error: null },
    showPokemonPromiseState: { promise: null, data: [], error: null },

    //Persistance
    hello: "hello",
    user: undefined,
    ready: false,

    //Authentication
    currentEmail: null,
    currentPassword: null,
    authError: null,

    // Damage calculator
    damageAttackerName: "",
    damageDefenderName: "",
    damageMoveName: "",

    // Attacker details
    attackerLevel: 50,
    attackerGender: "N",
    attackerAbility: "",
    attackerItem: "",
    attackerNature: "",
    attackerStatus: "",
    attackerTeraType: "",
    attackerIsTerastallized: false,
    attackerType1Override: "",
    attackerType2Override: "",
    attackerEVs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    attackerIVs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
    attackerBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },

    //Defender Details
    defenderLevel: 50,
    defenderGender: "N",
    defenderAbility: "",
    defenderItem: "",
    defenderNature: "",
    defenderStatus: "",
    defenderTeraType: "",
    defenderIsTerastallized: false,
    defenderType1Override: "",
    defenderType2Override: "",
    defenderEVs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    defenderIVs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
    defenderBoosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },

    //Field
    damageTerrain: "",
    damageWeather: "",
    damageGameType: "Singles", // 'Singles' | 'Doubles'
    damageMagicRoom: false,
    damageWonderRoom: false,
    damageGravity: false,
    damageSoR: false,
    damageBoR: false,
    damageToR: false,
    damageVoR: false,
    //Attacker
    attackerHelpingHand: false,
    attackerTailwind: false,
    attackerFlowerGift: false,
    attackerPowerTrick: false,
    damageSteelySpirit: false,
    damagePowerSpot: false,
    damageBattery: false,
    //Defender
    defenderHelpingHand: false,
    defenderTailwind: false,
    defenderFlowerGift: false,
    defenderPowerTrick: false,
    damageReflect: false,
    damageLightScreen: false,
    damageFriendGuard: false,
    damageSR: false,
    damageSpikes: 0,
    damageProtected: false,
    damageSeeded: false,
    damageSaltCure: false,
    damageForesight: false,
    
    damageResult: null,
    damageError: null,  
};

const pokeSlice = createSlice({
    name: "poke",
    initialState: initialState,
    reducers: {
        addToTeam(state, action){
            const pokemon = action.payload;
            if (!pokemon) return;
            // avoid duplicates
            if (state.team.some(p => p?.id === pokemon?.id)){ console.log("Blocked ", pokemon); return;}
            if (state.team.length < teamMaxSize) {
                /*Initialize actualMoves, moveInfo and bonusStats attributes */
                pokemon.actualMoves = [null, null, null, null];
                pokemon.moveInfo = [null, null, null, null];
                if (Array.isArray(pokemon.stats)) {
                    pokemon.stats = pokemon.stats.map(s => ({ ...s, bonusStats: 0 }));
                }
                state.team = [...state.team, pokemon];
            }
        },
        addActualMove(state, action){
            const moveName = action.payload.moveName;
            const pokemonIndex = action.payload.pokemonIndex;
            const slot =action.payload.slot
            if (pokemonIndex === -1) return;
            const moveIndex = state.team[pokemonIndex].moves.findIndex(function findCB(moves){ return moves.move.name === moveName; });
            state.team[pokemonIndex].actualMoves[slot] = state.team[pokemonIndex].moves[moveIndex];
        },
        addMoveInfo(state, action){
            const results = action.payload.results;
            const pokemonIndex = action.payload.index;
            const slot = action.payload.slot;
            if (pokemonIndex === -1) return;
            state.team[pokemonIndex].moveInfo[slot] = results;
        },
        removeFromTeam(state,action){
            function keepPokemonCB(pokemon){
                return pokemon?.id !== action.payload.id;
            }
            state.team = state.team.filter(keepPokemonCB);
        },
        setCurrentPokemon(state,action){state.currentPokemonName = action.payload;},

        setEVstat(state, action){ 
            const pokemonIndex = action.payload.pokemonIndex;
            const statName = action.payload.statName;
            const newValue = action.payload.newValue;
            if (pokemonIndex === -1) return;
                const statIndex = state.team[pokemonIndex].stats.findIndex(function findCB(stats){ return stats.stat.name === statName; });
            if (statIndex !== -1) {
                // store the whole number (rounded down) of newValue/4
                const value = Math.floor(Number(newValue) / 4);
                state.team[pokemonIndex].stats[statIndex].bonusStats = value;
            }
        },
        setAbility(state, action){
            console.log("setAbility called", action.payload);
            const pokemonIndex = action.payload.pokemonIndex;
            const abilityName = action.payload.abilityName;
            if (pokemonIndex === -1) return;
            state.team[pokemonIndex].abilities.forEach(function resetChosenCB(abilities){ abilities.chosen = false; });
            const abilityIndex = state.team[pokemonIndex].abilities.findIndex(function findCB(abilities){ return abilities.ability.name === abilityName; });
            state.team[pokemonIndex].abilities[abilityIndex].chosen = true;
        },
        setCurrentPokemonName(state,action){
            state.currentPokemonName = action.payload;
        },
        setSearchQuery(state, action) {
            state.searchParams.query = action.payload;
        },
        doSearch(state, action) {
            state.searchParams = action.payload;
            state.searchResultsPromiseState = { promise: null, data: null, error: null };
        },
        
        showPokemon(state, action) {state.showPokemonPromiseState = { promise: null, data: [], error: null };},
        setOpen(state, action) {state.open = action.payload;},
        setOptions(state, action) {state.showPokemonPromiseState.data = action.payload;},
        
        //Authentication
        setCurrentEmail(state, action){state.currentEmail = action.payload;},
        setCurrentPassword(state, action){state.currentPassword = action.payload;},
        setAuthError(state, action) {state.authError = action.payload;},

        // Damage calculator
        setDamageAttackerName(state, action) { state.damageAttackerName = action.payload; },
        setDamageDefenderName(state, action) { state.damageDefenderName = action.payload; },
        setDamageMoveName(state, action) { state.damageMoveName = action.payload; },
        setDamageGameType(state, action) { state.damageGameType = action.payload; },

        // Attacker details
        setAttackerLevel(state, action) { state.attackerLevel = clamp(action.payload, 1, 100); },
        setAttackerGender(state, action) { state.attackerGender = action.payload; },
        setAttackerAbility(state, action) { state.attackerAbility = action.payload; },
        setAttackerItem(state, action) { state.attackerItem = action.payload; },
        setAttackerNature(state, action) { state.attackerNature = action.payload; },
        setAttackerStatus(state, action) { state.attackerStatus = action.payload; },
        setAttackerTeraType(state, action) { state.attackerTeraType = action.payload; },
        setAttackerTerastallized(state, action) { state.attackerIsTerastallized = action.payload; },
        setAttackerType1Override(state, action) { state.attackerType1Override = action.payload; },
        setAttackerType2Override(state, action) { state.attackerType2Override = action.payload; },
        
        setAttackerEV(state, action) {
            const { stat, value } = action.payload;
            if (state.attackerEVs[stat] === undefined) return;
            state.attackerEVs[stat] = clamp(value, 0, 252);
        },
        
        setAttackerIV(state, action) {
            const { stat, value } = action.payload;
            if (state.attackerIVs[stat] === undefined) return;
            state.attackerIVs[stat] = clamp(value, 0, 31);
        },
        
        setAttackerBoost(state, action) {
            const { stat, value } = action.payload;
            if (state.attackerBoosts[stat] === undefined) return;
            state.attackerBoosts[stat] = clamp(value, -6, 6);
        },
        
        //Defender Details
        setDefenderLevel(state, action) { state.defenderLevel = clamp(action.payload, 1, 100); },
        setDefenderGender(state, action) { state.defenderGender = action.payload; },
        setDefenderAbility(state, action) { state.defenderAbility = action.payload; },
        setDefenderItem(state, action) { state.defenderItem = action.payload; },
        setDefenderNature(state, action) { state.defenderNature = action.payload; },
        setDefenderStatus(state, action) { state.defenderStatus = action.payload; },
        setDefenderTeraType(state, action) { state.defenderTeraType = action.payload; },
        setDefenderTerastallized(state, action) { state.defenderIsTerastallized = action.payload; },
        setDefenderType1Override(state, action) { state.defenderType1Override = action.payload; },
        setDefenderType2Override(state, action) { state.defenderType2Override = action.payload; },
        
        setDefenderEV(state, action) {
            const { stat, value } = action.payload;
            if (state.defenderEVs[stat] === undefined) return;
            state.defenderEVs[stat] = clamp(value, 0, 252);
        },
        
        setDefenderIV(state, action) {
            const { stat, value } = action.payload;
            if (state.defenderIVs[stat] === undefined) return;
            state.defenderIVs[stat] = clamp(value, 0, 31);
        },
        
        setDefenderBoost(state, action) {
            const { stat, value } = action.payload;
            if (state.defenderBoosts[stat] === undefined) return;
            state.defenderBoosts[stat] = clamp(value, -6, 6);
        },
        
        //Field
        setDamageTerrain(state, action) { state.damageTerrain = action.payload; },
        setDamageWeather(state, action) { state.damageWeather = action.payload; },
        setDamageMR(state, action) { state.damageMagicRoom = action.payload; }, 
        setDamageWR(state, action) { state.damageWonderRoom = action.payload; },
        setDamageGravity(state, action) { state.damageGravity = action.payload; },
        setDamageSoR(state, action) { state.damageSoR = action.payload; },
        setDamageBoR(state, action) { state.damageBoR = action.payload; },
        setDamageToR(state, action) { state.damageToR = action.payload; },
        setDamageVoR(state, action) { state.damageVoR = action.payload; },
        
        //Atacker
        setAttackerHH(state, action) { state.attackerHelpingHand = action.payload; },
        setAttackerTailwind(state, action) { state.attackerTailwind = action.payload; },
        setAttackerFG(state, action) { state.attackerFlowerGift = action.payload; },
        setAttackerPT(state, action) { state.attackerPowerTrick = action.payload; },
        setAttackerSS(state, action) { state.damageSteelySpirit = action.payload; },
        setAttackerPS(state, action) { state.damagePowerSpot = action.payload; },
        setAttackerBattery(state, action) { state.damageBattery = action.payload; },
        
        //Defender
        setDefenderHH(state, action) { state.defenderHelpingHand = action.payload; },
        setDefenderTailwind(state, action) { state.defenderTailwind = action.payload; },
        setDefenderFG(state, action) { state.defenderFlowerGift = action.payload; },
        setDefenderPT(state, action) { state.defenderPowerTrick = action.payload; },
        setDamageReflect(state, action) { state.damageReflect = action.payload; },
        setDamageLightScreen(state, action) { state.damageLightScreen = action.payload; },
        setDamageFriendGuard(state, action) { state.damageFriendGuard = action.payload; },
        setDamageSR(state, action) { state.damageSR = action.payload; },
        setDamageSpikes(state, action) { state.damageSpikes = action.payload; },
        setDamageProtected(state, action) { state.damageProtected = action.payload; },
        setDamageSeeded(state, action) { state.damageSeeded = action.payload; },
        setDamageSaltCure(state, action) { state.damageSaltCure = action.payload; },
        setDamageForesight(state, action) { state.damageForesight = action.payload; },
        setDamageResult(state, action) { state.damageResult = action.payload; },
        setDamageError(state, action) { state.damageError = action.payload; },

        //Just for persistence
        setUser(state, action) { state.user = action.payload; },
        setReady(state, action) { state.ready = action.payload; },
        
        fillFirestore(state, action) {
            //(devComment) Lägg till flera variabler ifall fler sakker ska pushas till FireStore
            const hello = action.payload;
            state.hello = hello;
        },

        //just for middleware
        searchStarted(state, action) {
            const promise = action.payload;
            state.searchResultsPromiseState.promise = promise;
            state.searchResultsPromiseState.data = null;
            state.searchResultsPromiseState.error = null;
        },

        searchResolved(state, action) {
            const {promise, data} = action.payload;
            if (state.searchResultsPromiseState.promise !== promise) return;
            state.searchResultsPromiseState.data = data;
        },

        searchRejected(state, action) {
            const {promise, error} = action.payload;
            if (state.searchResultsPromiseState.promise !== promise) return;
            state.searchResultsPromiseState.error = error;
        },

        showStarted(state, action) {
            const promise = action.payload;
            state.showPokemonPromiseState.promise = promise;
            state.showPokemonPromiseState.data = [];
            state.showPokemonPromiseState.error = null;
            state.loading = true;
        },

        showResolved(state, action) {
            const {promise, data} = action.payload;
            if (state.showPokemonPromiseState.promise !== promise) return;
            state.showPokemonPromiseState.data = data;
            state.loading = false;
        },

        showRejected(state, action) {
            const {promise, error} = action.payload;
            if (state.showPokemonPromiseState.promise !== promise) return;
            state.showPokemonPromiseState.error = error;
            state.loading = false;
        },
    }
});

export const {
    addToTeam,
    addActualMove,
    addMoveInfo,
    removeFromTeam,
    setCurrentPokemon,
    setAbility,
    setCurrentPokemonName,
    setEVstat,

    //Search
    setSearchQuery,
    doSearch,
    showPokemon,
    setOpen,

    setUser,
    setReady,
    fillFirestore,
    setCurrentEmail,
    setCurrentPassword,
    setAuthError,
    searchStarted,
    searchResolved,
    searchRejected,
    showStarted,
    showResolved,
    showRejected,

    // Damage calculator
    setDamageAttackerName,
    setDamageDefenderName,
    setDamageMoveName,
    setDamageGameType,
    
    //Attack details
    setAttackerLevel,
    setAttackerGender,
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

    //Defender details
    setDefenderLevel,
    setDefenderGender,
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
    setDamageMR,
    setDamageWR,
    setDamageGravity,
    setDamageReflect,
    setDamageSoR,
    setDamageBoR,
    setDamageToR,
    setDamageVoR,

    //Attacker
    setAttackerHH,
    setAttackerTailwind,
    setAttackerFG,
    setAttackerPT,
    setAttackerSS,
    setAttackerPS,
    setAttackerBattery,

    //Defender
    setDefenderHH,
    setDefenderTailwind,
    setDefenderFG,
    setDefenderPT,
    setDamageLightScreen,
    setDamageResult,
    setDamageFriendGuard,
    setDamageSR,
    setDamageSpikes,
    setDamageProtected,
    setDamageSeeded,
    setDamageSaltCure,
    setDamageForesight,

    setDamageError,
} = pokeSlice.actions;

// ---------- //
// Chat stuff //
// ---------- //

const chatInitialState = {
    sessionId: null,
    sessionName: "",
    timeStamp: null,
    includeTeam: true,
    messages: [],
    preparedPrompts: [
        {context: "teamView", 
         query: "What's the biggest weakness in my team?"},
        {context: "teamView", 
         query: "What's the best thing about my team?"},
        {context: "teamView", 
         query: "Something else"},
        {context: "detailsView", 
         query: "How do you like the attacks?"}
    ],
    context: null,
    loading: false,
    windowOpen: true,
    error: null
};

const chatSlice = createSlice({
    name: "chat",
    initialState: chatInitialState,
    reducers: {
        setIncludeTeam(state, action){
            state.includeTeam = action.payload;
        },
        setChatContext(state, action) {
            state.context = action.payload;
        },
        promptStart(state, action) {

            const query = action.payload;

            state.loading = true;
            state.error = null;
            
            state.messages.push({
                id: Date.now(),
                role: "user",
                content: query,
                timestamp: new Date().toISOString()
            });

            if (!state.timeStamp) {
                state.timeStamp = formatTimestamp(new Date());
                state.sessionId = 0; // TODO: Fix id generator
                state.sessionName = query;
            }
        },
        promptSuccess(state, action) {
            state.loading = false;
            
            const responseText = 
                action.payload?.choices?.[0]?.message?.content ?? "[Empty response]";

            state.messages.push({
                id: Date.now() + 1,
                role: "assistant",
                content: responseText,
                timestamp: new Date().toISOString()
            });
        },
        promptError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        toggleChatWindow(state) {
            state.windowOpen = !state.windowOpen;
        },
        resetChat(state) {
            state.messages = [];
            state.loading = false;
            state.error = null;
            state.includeTeam = true;
        }
    }
})

export const {
    setIncludeTeam,
    setChatContext,
    promptStart,
    promptSuccess,
    promptError,
    toggleChatWindow,
    resetChat
} = chatSlice.actions;

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
    reducer: {
        poke: pokeSlice.reducer,
        chat: chatSlice.reducer
    },
    // optional: add a middleware
    middleware(getDefaultMiddleware){
    return getDefaultMiddleware({serializableCheck: {
        ignoredActionPaths: ['payload'],
        ignoredPaths: ['poke']}}).prepend(listenerMiddleware.middleware)
    }, 
});

listenerMiddleware.startListening(
{
    type: 'poke/doSearch',
    effect(action, store){  
        const params = action.payload;
        if(!params) return;
        const promise = searchPokemon(params);
        store.dispatch(searchStarted(promise))
        if (!promise) return;
        promise
            .then((data) => {
                store.dispatch(searchResolved({promise,data}));
            })
            .catch((error) => {
                store.dispatch(searchRejected({promise,error}));
            })
    }
}
)

listenerMiddleware.startListening(
{
    type: 'poke/showPokemon',
    effect(action, store){
        const promise = showAllPokemon();
        store.dispatch(showStarted(promise))

        if (!promise) return;
        promise
            .then((data) => {
                store.dispatch(showResolved({promise,data}));
            })
            .catch((error) => {
                store.dispatch(showRejected({promise,error}));
            })
    }
})


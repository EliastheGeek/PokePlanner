import { configureStore, createSlice, createListenerMiddleware } from "@reduxjs/toolkit";
import { formatTimestamp } from "/src/utilities";
import { pokemonConst } from "./pokemonConst";
import { searchPokemon } from "./pokemonSource";
const teamMaxSize = 6;

function clamp(n, lo, hi) {
    const x = Number(n);
    if (Number.isNaN(x)) return lo;
    return Math.max(lo, Math.min(hi, x));
}

const initialState = {
    team: [pokemonConst,],
    currentPokemonName: null, //för att söka pokemon
    //Promise-stuff
    searchParams: {},
    searchResultsPromiseState: { promise: null, data: null, error: null },
    currentDishPromiseState: { promise: null, data: null, error: null },

    //Persistance
    hello: "hello",
    user: undefined,
    ready: false,

    //Authentication
    currentEmail: null,
    currentPassword: null,

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
            if(state.team.length()<teamMaxSize){state.team = [...state.team, action.payload];}
        },
        removeFromTeam(state,action){
            function keepPokemonCB(pokemon){
                return pokemon.id !== action.payload.id;
            }
            state.team = state.team.filter(keepPokemonCB);
        },
        currentPokemon(state,action){ state.currentPokemonName = action.payload.name; },
        //Search
        setSearchQuery(state, action) { state.searchParams.query = action.payload; },
        doSearch(state, action) {
            state.searchParams = action.payload;
            state.searchResultsPromiseState = { promise: null, data: null, error: null };
        },
        //Authentication
        setCurrentEmail(state, action){ state.currentEmail = action.payload; },
        setCurrentPassword(state, action){ state.currentPassword = action.payload; },

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
    }
});

export const {
    addToTeam,
    removeFromTeam,
    currentPokemon,
    setSearchQuery,
    setUser,
    doSearch,
    setReady,
    fillFirestore,
    setCurrentEmail,
    setCurrentPassword,
    searchStarted,
    searchResolved,
    searchRejected,

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
    messages: [],
    loading: false,
    error: null
};

const chatSlice = createSlice({
    name: "chat",
    initialState: chatInitialState,
    reducers: {
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
        addMessage(state, action){
            state.messages.push(action.payload);
        },
        resetChat(state) {
            state.sessionId = null;
            state.sessionName = "";
            state.timeStamp = null;
            state.messages = [];
            state.loading = false;
            state.error = null;
        }
    }
})

export const {
    promptStart,
    promptSuccess,
    promptError,
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
})

window.store = store;
window.promptStart = promptStart;
window.promptSuccess = promptSuccess;
window.promptError = promptError;
window.resetChat = resetChat;
export function formatTimestamp(date) {
    const pad = (n) => String(n).padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hour = pad(date.getHours());
    const minute = pad(date.getMinutes());
    const second = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function clamp(n, lo, hi) {
    return Math.max(lo, Math.min(hi, n));
}

export const formatPokeName = (name) => {
    if (!name) return "";
    return name
        .trim()
        .split("-")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

const NATURE_EFFECTS = {
    Hardy: null, Lonely: { plus: "atk", minus: "def" }, Brave: { plus: "atk", minus: "spe" },
    Adamant: { plus: "atk", minus: "spa" }, Naughty: { plus: "atk", minus: "spd" },

    Bold: { plus: "def", minus: "atk" }, Docile: null, Relaxed: { plus: "def", minus: "spe" },
    Impish: { plus: "def", minus: "spa" }, Lax: { plus: "def", minus: "spd" },

    Timid: { plus: "spe", minus: "atk" }, Hasty: { plus: "spe", minus: "def" }, Serious: null,
    Jolly: { plus: "spe", minus: "spa" }, Naive: { plus: "spe", minus: "spd" },

    Modest: { plus: "spa", minus: "atk" }, Mild: { plus: "spa", minus: "def" }, Quiet: { plus: "spa", minus: "spe" },
    Bashful: null, Rash: { plus: "spa", minus: "spd" },

    Calm: { plus: "spd", minus: "atk" }, Gentle: { plus: "spd", minus: "def" }, Sassy: { plus: "spd", minus: "spe" },
    Careful: { plus: "spd", minus: "spa" }, Quirky: null,
};

export function natureMultiplier(nature, stat) {
    if (stat === "hp") return 1;
    const effect = NATURE_EFFECTS[nature];
    if (!effect) return 1;
    if (effect.plus === stat) return 1.1;
    if (effect.minus === stat) return 0.9;
    return 1;
}

export function stageMultiplier(stage) {
    const s = Number(stage ?? 0);
    return s > 0 ? (2 + s) / 2 : 2 / (2 - s);
}

export function calcStatFromBase({ base, iv, ev, level, natureMult, isHP }) {
    const e = Math.floor(ev/4);
    if (isHP) {
        return Math.floor(((2 * base + iv + e) * level) / 100) + level + 10;
    }
    const preNature = Math.floor(((2 * base + iv + e) * level) / 100) + 5;
    return Math.floor(preNature *natureMult);
}

export function initializePokemon(pokemon){
    function stripMoves(pokemon){
        return (pokemon.moves ?? []).map(moves => {
        if (!moves) return null;
            return {
                move: moves.move ?? null,
            }
        })
    }
    function stripSprites(pokemon){
        if (!pokemon.sprites) return null;
            return {
                front_default: pokemon.sprites?.front_default ?? null,
                front_home: pokemon.sprites?.other?.home?.front_default ?? null,
            }
    }
    //Initialize actualMoves, moveInfo, natureInfo, level, IV, EV attributes 
    const initPokemon={
        name: pokemon.name,
        id: pokemon.id,
        abilities: pokemon.abilities,
        actualMoves: [null, null, null, null],
        moveInfo: [null, null, null, null],
        moves: stripMoves(pokemon),
        level: 1,
        held_item: null,
        natureInfo: null,
        sprites: stripSprites(pokemon),
        stats: pokemon.stats,
        types: pokemon.types
    }
    if (Array.isArray(initPokemon.stats)) {
        initPokemon.stats = initPokemon.stats.map(s => ({ ...s, EV_Value: 0 }));
        initPokemon.stats = initPokemon.stats.map(s => ({ ...s, IV_Value: 0 }));
        initPokemon.stats = initPokemon.stats.map(s => ({ ...s, natureModifier: 1 }));
    }
    return initPokemon;
}
export function filterItemOptions(itemResults){
        //Item only appears once in listing
        if (!itemResults || !Array.isArray(itemResults.results)) return itemResults;
        const seen = new Set();
        const uniqueResults = itemResults.results.filter(item => {
            const name = item && item.name ? String(item.name).toLowerCase().trim() : '';
            if (seen.has(name)) return false;
            seen.add(name);
            return true;
        });
        return { ...itemResults, results: uniqueResults };
    }

export function sortPokemon(pokeArray){//Sortera pokemon från sökresultat utifrån deras id
    function sortPokeIdCB(pokeA,pokeB){
        pokeA.id==pokeB.id?0 : pokeA.id<pokeB.id?-1:1;
    }
    const pokemon = [...pokeArray];
    return pokemon.sort(sortPokeIdCB);
}
export function sortMoves(moveArray){//Sortera moves i en pokemon efter namn
    function sortMoveNameCB(moveA,moveB){
        moveA.move.name==moveB.move.name?0 : moveA.move.name<moveB.move.name?-1:1;
    }
    const moves = [...moveArray];
    return moves.sort(sortMoveNameCB);
}

export function filterMoves(moves){//filtrerar alla moves en pokemon kan ha efter spelversion
    function moveFilterCB(move){//hittas spelversion, behåll, annars ta bort
        return findGameVersion(move)?1:0;
    }
    const result = moves.filter(moveFilterCB);
    return result;
}
const latestVersion = "scarlet-violet"
//hittar om spelversion finns för ett move
function findGameVersion(move){ //kanske ersätta med en variabel currentGameVersion, använder latestVersion
    function checkGameCB(details){
        return details.version_group.name === latestVersion
    }
    const result = move.version_group_details.find(checkGameCB);
    return result;
}

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

export const formatPokeName = (name) => { //Made with the help of AI
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
//avancerat, filterera alla pokemon som är tillgängliga för en version. TODO
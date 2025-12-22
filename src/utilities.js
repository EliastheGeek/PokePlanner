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

export function filterItemOptions(itemResults){
        // Ensure we have the expected shape and deduplicate by item.name (case-insensitive)
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
//avancerat, filterera alla pokemon som är tillgängliga för en version. TODO
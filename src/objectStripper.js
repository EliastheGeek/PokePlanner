export function stripTeam(team){
    const strippedTeam = team.map(pokemon => ({
        name: pokemon?.name ?? null,

        types: (pokemon?.types ?? []).map(t => t.type.name).filter(Boolean),
        abilities: (pokemon?.abilities ?? []).filter(function(abilities){return abilities.chosen;}),

        moveInfo: stripMoveInfo(pokemon?.moveInfo) ?? [],
        stats: pokemon?.stats ?? [],
        
    }));

    return strippedTeam;
}

export function stripPokemon(pokemon){
    const strippedPokemon = {
        name: pokemon?.name ?? null,

        types: (pokemon?.types ?? []).map(t => t.type.name).filter(Boolean),
        abilities: (pokemon?.abilities ?? []).filter(function(abilities){return abilities.chosen;}),

        held_item: pokemon?.held_item ?? null,

        moveInfo: stripMoveInfo(pokemon?.moveInfo) ?? [],
        stats: pokemon?.stats ?? [],
        
    };

    return strippedPokemon;
}

function stripMoveInfo(moveInfoArray) {
  return (moveInfoArray ?? []).map(move => {
    if (!move) return null;

    return {
      name: move.name ?? null,
      accuracy: move.accuracy ?? null,
      power: move.power ?? null,
      pp: move.pp ?? null,
      priority: move.priority ?? null,

      type: move.type?.name ?? null,
      damage_class: move.damage_class?.name ?? null,
      contest_type: move.contest_type?.name ?? null,

      contest_combos: {
        use_after: (move.contest_combos?.normal?.use_after ?? [])
          .map(m => m.name),
        use_before: (move.contest_combos?.normal?.use_before ?? [])
          .map(m => m.name)
      },

      effect_chance: move.effect_chance ?? null,

      effect_entries: (move.effect_entries ?? [])
        .filter(e => e.language?.name === "en")
        .map(e => ({
          effect: e.effect,
          short_effect: e.short_effect
        })),

      effect_changes: (move.effect_changes ?? []).map(ec => ({
        version_group: ec.version_group?.name ?? null,
        effects: (ec.effect_entries ?? [])
          .filter(e => e.language?.name === "en")
          .map(e => e.effect)
      }))
    };
  });
}


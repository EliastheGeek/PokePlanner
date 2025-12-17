import { act } from "react";

export const pokemonConst = {  
   abilities: [
    {
      ability: {
        name: "static",
        url: "https://pokeapi.co/api/v2/ability/9/" //mer information
      },
      is_hidden: false, //om false, är det förmågan som ska visas för användaren
      slot: 1
    },
    {
      ability: {
        name: "lightning-rod",
        url: "https://pokeapi.co/api/v2/ability/31/" 
      },
      is_hidden: true,
      slot: 3
    }
   ],
   held_item:null, //användare kan välja item själv
   id: 25, //pokedex id
   actualMoves: [null,null,null,null],//moves som användaren valt till sin pokemon
   moveInfo: [null, null, null, null], //detailed info about the actual moves
   moves: [
    {
    move: {
        name: "volt-tackle",
        url: "https://pokeapi.co/api/v2/move/344/"
      },
    version_group_details: [//array med olika spel, kan vara relevant att antingen välja ett spel i förhand eller låta användaren välja 
        {
          level_learned_at: 0,
          move_learn_method: { name: "tutor"},
          order: null,
          version_group: {
            name: "sun-moon",
            url: "https://pokeapi.co/api/v2/version-group/17/"
            }
        },
        ],
    },
    {
    move: {
        name: "shock-wave",
        url: "https://pokeapi.co/api/v2/move/351/"
      },
    version_group_details: [
        {
          level_learned_at: 0,
          move_learn_method: { name: "tutor"},
          order: null,
          version_group: {
            name: "platinum",
            url: "https://pokeapi.co/api/v2/version-group/9/"
            }
        },
        ],
    },
    {
    move: {
        name: "quick-attack",
        url: "https://pokeapi.co/api/v2/move/98/"
      },
    version_group_details: [ 
        {
          level_learned_at: 13,
          move_learn_method: { name: "level-up"},
          order: null,
          version_group: {
            name: "black-white",
            url: "https://pokeapi.co/api/v2/version-group/11/"
            }
        },
        ],
    },
    {
    move: {
        name: "thunder",
        url: "https://pokeapi.co/api/v2/move/87/"
      },
    version_group_details: [
        {
          level_learned_at: 58,
          move_learn_method: { name: "level-up"},
          order: null,
          version_group: {
            name: "sun-moon",
            url: "https://pokeapi.co/api/v2/version-group/17/"
            }
        },
        ],
    }
    ],
   name: 'pikachu',
   sprites: {front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"}, //bild fram
   stats: [
        {
            base_stat: 35,
            effort: 0,
            stat: {name:"hp"}
        },
        {
            base_stat: 55,
            effort: 0,
            stat: {name:"attack"}
        },
        {
            base_stat: 40,
            effort: 0,
            stat: {name:"defense"}
        },
        {
            base_stat: 50,
            effort: 0,
            stat: {name:"special-attack"}
        },
        {
            base_stat: 50,
            effort: 0,
            stat: {name:"special-defense"}
        },
        {
            base_stat: 90,
            effort: 2,
            stat: {name:"speed"}
        }
    ],
   types:[{type:{name:"electric"}}, ] //kan vara flera, samma format som första
}
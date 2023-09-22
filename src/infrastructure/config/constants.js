
module.exports = {

    SUPPORTED_PLAYERS: {
        DEFAULT: 'default',
        HARDCORE: 'hardcore',
        POKEMON: 'pokemon',
    },
    PLAYERS_CONFIG: {
        PLAYER1_NAME_DEFAULT: 'Tonyn Stallone',
        PLAYER2_NAME_DEFAULT: 'Arnaldor Shuatseneguer',
        PLAYER1_NAME_HARDCORE: 'Goku',
        PLAYER2_NAME_HARDCORE: 'Piccolo Daimaku',
        PLAYER1_NAME_POKEMON: 'Pikachu',
        PLAYER2_NAME_POKEMON: 'Chorizar',
        PLAYER1_COMBO_DEFAULT: [
            { name: 'Taladoken', combo: 'DSD + P', damage: 3 },
            { name: 'Remuyuken', combo: 'SD + K', damage: 2 },
            { name: 'Puño', combo: 'P', damage: 1 },
            { name: 'Patada', combo: 'K', damage: 1 },
        ],
        PLAYER2_COMBO_DEFAULT: [
            { name: 'Remuyuken', combo: 'SA + K', damage: 3 },
            { name: 'Taladoken', combo: 'ASA + P', damage: 2 },
            { name: 'Puño', combo: 'P', damage: 1 },
            { name: 'Patada', combo: 'K', damage: 1 },
        ],
        PLAYER1_COMBO_HARDCORE: [
            { name: 'Genki-dama', combo: 'DSD + P', damage: 15 },
            { name: 'KameHameHa', combo: 'SD + K', damage: 10 },
            { name: 'Puño', combo: 'P', damage: 5 },
            { name: 'Patada', combo: 'K', damage: 5 },
        ],
        PLAYER2_COMBO_HARDCORE: [
            { name: 'Makankosappo', combo: 'SA + K', damage: 15 },
            { name: 'Kaikosen', combo: 'ASA + P', damage: 10 },
            { name: 'Puño', combo: 'P', damage: 5 },
            { name: 'Patada', combo: 'K', damage: 5 },
        ],
        PLAYER1_COMBO_POKEMON: [
            { name: '[Impactrueno]', combo: 'DSD + P', damage: 15 },
            { name: '[Chispazo]', combo: 'SD + K', damage: 10 },
            { name: 'Puño', combo: 'P', damage: 5 },
            { name: 'Patada', combo: 'K', damage: 5 },
        ],
        PLAYER2_COMBO_POKEMON: [
            { name: '[Lanza llamas]', combo: 'SA + K', damage: 5 },
            { name: '[Garra Dragón]', combo: 'ASA + P', damage: 3 },
            { name: 'Puño', combo: 'P', damage: 2 },
            { name: 'Patada', combo: 'K', damage: 2 },
        ],
        PLAYER_MESSAGES_DEFAULT: {
            D: "se mueve a la derecha",
            W: "salta",
            A: "se mueve a la izquierda",
            S: "se agacha",
            DEFAULT: "se mueve",
            P: "le da un gran puñetazo",
            K: "acierta una mega patada",
            COMBO: "conecta un",
            LOW_ENERGY: " al pobre de",
            HIGHT_ENERGY: " al gran",
            NO_MOVEMENT: "se queda inmóvil"
        },
        PLAYER_MESSAGES_HARDCORE: {
            D: "se mueve a la derecha a gran velocidad",
            W: "vuela",
            A: "se mueve a la izquierda de forma instantanea",
            S: "aterriza y deja un crater",
            DEFAULT: "levita",
            P: "le da varios puñetazos consecutivos",
            K: "lanza varias patadas apenas visibles al ojo humano",
            COMBO: "lanza el ataque",
            LOW_ENERGY: " al malherido de",
            HIGHT_ENERGY: " al imponente",
            NO_MOVEMENT: "se queda paralizado"
        },
        PLAYER_MESSAGES_POKEMON: {
            D: "se mueve a la derecha",
            W: "salta",
            A: "se mueve a la izquierda",
            S: "se entierra",
            DEFAULT: "se mueve",
            P: "le da un golpe",
            K: "le da una embestida",
            COMBO: "lanza el ataque",
            LOW_ENERGY: " al pobre de",
            HIGHT_ENERGY: " al lindo",
            NO_MOVEMENT: "se queda confundido"
        }
    },
    FIGHT_CONFIG: {
        ENERGY_DEFAULT: 6,
        ENERGY_HARDCORE: 50,
        ENERGY_POKEMON: 15
    }


};

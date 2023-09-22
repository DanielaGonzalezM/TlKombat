const FightRepository = require("../../domain/FightRepository");
const constants = require("../config/constants");

module.exports = class extends FightRepository {
    constructor() {
        super();
    }

    getMovementMessage(move) {
        return move.length > 1
            ? constants.PLAYERS_CONFIG.PLAYER_MESSAGES_POKEMON.DEFAULT
            : !move
                ? ""
                : constants.PLAYERS_CONFIG.PLAYER_MESSAGES_POKEMON[move];
    }

    getNoMovementMessage() {
       
        return  constants.PLAYERS_CONFIG.PLAYER_MESSAGES_POKEMON.NO_MOVEMENT;
    }

    getHitMessage(usedCombo, energy, playerName) {
        const messages = constants.PLAYERS_CONFIG.PLAYER_MESSAGES_POKEMON;
        const { combo = "", name } = usedCombo;
        let hitMsg =
            combo.length > 1
                ? `${messages.COMBO} ${name}`
                : !combo
                    ? ""
                    : messages[combo];

        hitMsg += !combo
            ? ""
            : energy >= constants.FIGHT_CONFIG.ENERGY_POKEMON / 2
                ? `${messages.HIGHT_ENERGY} ${playerName}`
                : `${messages.LOW_ENERGY} ${playerName}`;

        return hitMsg;
    }

    getPlayerName(player) {
        return player === "player1"
            ? constants.PLAYERS_CONFIG.PLAYER1_NAME_POKEMON
            : constants.PLAYERS_CONFIG.PLAYER2_NAME_POKEMON;
    }

    getPlayerEnergy() {
        return constants.FIGHT_CONFIG.ENERGY_POKEMON;
    }

    getAlowedCombos(player) {
        return player === "player1"
            ? constants.PLAYERS_CONFIG.PLAYER1_COMBO_POKEMON
            : constants.PLAYERS_CONFIG.PLAYER2_COMBO_POKEMON;
    }
};

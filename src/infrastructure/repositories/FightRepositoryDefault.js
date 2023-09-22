const FightRepository = require("../../domain/FightRepository");
const constants = require("../config/constants");

module.exports = class extends FightRepository {
    constructor() {
        super();
    }

    getMovementMessage(move) {
        return move.length > 1
            ? constants.PLAYERS_CONFIG.PLAYER_MESSAGES_DEFAULT.DEFAULT
            : !move
                ? ""
                : constants.PLAYERS_CONFIG.PLAYER_MESSAGES_DEFAULT[move];
    }

    getNoMovementMessage() {
        return constants.PLAYERS_CONFIG.PLAYER_MESSAGES_DEFAULT.NO_MOVEMENT;
    }

    getHitMessage(usedCombo, energy, playerName) {
        const messages = constants.PLAYERS_CONFIG.PLAYER_MESSAGES_DEFAULT;
        const { combo = "", name } = usedCombo;

        let hitMsg =
            combo.length > 1
                ? `${messages.COMBO} ${name}`
                : !combo
                    ? ""
                    : messages[combo];

        hitMsg += !combo
            ? ""
            : energy >= constants.FIGHT_CONFIG.ENERGY_DEFAULT / 2
                ? `${messages.HIGHT_ENERGY} ${playerName}`
                : `${messages.LOW_ENERGY} ${playerName}`;

        return hitMsg;
    }

    getPlayerName(player) {
        return player === "player1"
            ? constants.PLAYERS_CONFIG.PLAYER1_NAME_DEFAULT
            : constants.PLAYERS_CONFIG.PLAYER2_NAME_DEFAULT;
    }

    getPlayerEnergy() {
        return constants.FIGHT_CONFIG.ENERGY_DEFAULT;
    }

    getAlowedCombos(player) {
        return player === "player1"
            ? constants.PLAYERS_CONFIG.PLAYER1_COMBO_DEFAULT
            : constants.PLAYERS_CONFIG.PLAYER2_COMBO_DEFAULT;
    }
};

const FightRepository = require("../../domain/FightRepository");
const constants = require("../config/constants");

module.exports = class extends FightRepository {
    constructor() {
        super();
    }

    getMovementMessage(move) {
        return move.length > 1
            ? constants.PLAYERS_CONFIG.PLAYER_MESSAGES_HARDCORE.DEFAULT
            : !move
                ? ""
                : constants.PLAYERS_CONFIG.PLAYER_MESSAGES_HARDCORE[move];
    }

    getNoMovementMessage() {
       
        return  constants.PLAYERS_CONFIG.PLAYER_MESSAGES_HARDCORE.NO_MOVEMENT;
    }

    getHitMessage(usedCombo, energy, playerName) {
        const messages = constants.PLAYERS_CONFIG.PLAYER_MESSAGES_HARDCORE;
        const { combo = "", name } = usedCombo;
        let hitMsg =
            combo.length > 1
                ? `${messages.COMBO} ${name}`
                : !combo
                    ? ""
                    : messages[combo];

        hitMsg += !combo
            ? ""
            : energy >= constants.FIGHT_CONFIG.ENERGY_HARDCORE / 2
                ? `${messages.HIGHT_ENERGY} ${playerName}`
                : `${messages.LOW_ENERGY} ${playerName}`;

        return hitMsg;
    }

    getPlayerName(player) {
        return player === "player1"
            ? constants.PLAYERS_CONFIG.PLAYER1_NAME_HARDCORE
            : constants.PLAYERS_CONFIG.PLAYER2_NAME_HARDCORE;
    }

    getPlayerEnergy() {
        return constants.FIGHT_CONFIG.ENERGY_HARDCORE;
    }

    getAlowedCombos(player) {
        return player === "player1"
            ? constants.PLAYERS_CONFIG.PLAYER1_COMBO_HARDCORE
            : constants.PLAYERS_CONFIG.PLAYER2_COMBO_HARDCORE;
    }
};

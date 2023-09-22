const constants = require("./constants");
const environment = require("./environment");

function build() {
    const beans = {};
    if (environment.gamemode.selected === constants.SUPPORTED_PLAYERS.DEFAULT) {
        const FightRepositoryDefault = require("../repositories/FightRepositoryDefault");
        beans.fightRepository = new FightRepositoryDefault();
    }
    if (environment.gamemode.selected === constants.SUPPORTED_PLAYERS.HARDCORE) {
        const FightRepositoryHardcore = require("../repositories/FightRepositoryHardcore");
        beans.fightRepository = new FightRepositoryHardcore();
    }
    if (environment.gamemode.selected === constants.SUPPORTED_PLAYERS.POKEMON) {
        const FightRepositoryPokemon = require("../repositories/FightRepositoryPokemon");
        beans.fightRepository = new FightRepositoryPokemon();
    }

    return beans;
}

module.exports = build();

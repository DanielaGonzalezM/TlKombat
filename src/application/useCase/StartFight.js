const Player = require("../../domain/Player");
const Combo = require("../../domain/Combo");
let repository;

module.exports = (player1, player2, { fightRepository }) => {
    repository = fightRepository;

    const { movimientos: mov1, golpes: hitPlayer1, namePlayer1 = "player1", } = player1;
    const { movimientos: mov2, golpes: hitPlayer2, namePlayer2 = "player2", } = player2;
    const initialEnergy = repository.getPlayerEnergy();

    const comboPlayer1 = getComboArray(namePlayer1, repository);
    const comboPlayer2 = getComboArray(namePlayer2, repository);

    const player1Obj = new Player(repository.getPlayerName(namePlayer1), mov1, hitPlayer1, initialEnergy, comboPlayer1);
    const player2Obj = new Player(repository.getPlayerName(namePlayer2), mov2, hitPlayer2, initialEnergy, comboPlayer2);

    const playersReady = getOrderedPlayers(player1Obj, player2Obj);

    return initFight(playersReady);
};

//Obtiene los golpes permitidos del jugador
const getComboArray = (player) => {
    return repository.getAlowedCombos(player).map((comb) => {
        return new Combo(comb);
    });
};

/*
Se dejan dos funciones dado que no me quedó claro la forma en que se debe decidir el jugador que dá el primer golpe.
En el documento se señala que "Parte atacando el jugador que envió una combinación menor de botones (movimiento +
golpes)", lo que no aclara si se refiere a quien envío en el primer turno o durante toda la partida (Json de entrada)
*/
const getOrderedPlayersFirstMove = (player1, player2) => {
    const { moves: mov1, hits: hit1 } = player1;
    const { moves: mov2, hits: hit2 } = player2;

    const contMoves1 = mov1[0].length;
    const contHit1 = hit1[0].length;
    const contMoves2 = mov2[0].length;
    const contHit2 = hit2[0].length;

    let comb1 = contMoves1 + contHit1;
    let comb2 = contMoves2 + contHit2;

    switch (true) {
        case comb1 > comb2:
            return { player2, player1 };
        case comb1 < comb2:
            return { player1, player2 };
    }

    comb1 = mov1[0].length;
    comb2 = mov2[0].length;

    switch (true) {
        case comb1 > comb2:
            return { player2, player1 };
        case comb1 < comb2:
            return { player1, player2 };
    }

    comb1 = hit1[0].length;
    comb2 = hit2[0].length;

    switch (true) {
        case comb1 > comb2:
            return { player2, player1 };
        case comb1 < comb2:
            return { player1, player2 };
    }
    return { player1, player2 };
};

//Obtiene los jugadores en el orden que van a pelear
const getOrderedPlayers = (player1, player2) => {
    const { moves: mov1, hits: hit1 } = player1;
    const { moves: mov2, hits: hit2 } = player2;

    const contMoves1 = mov1.join("").length;
    const contHit1 = hit1.join("").length;
    const contMoves2 = mov2.join("").length;
    const contHit2 = hit2.join("").length;

    let comb1 = contMoves1 + contHit1;
    let comb2 = contMoves2 + contHit2;

    switch (true) {
        case comb1 > comb2:
            return { player2, player1 };
        case comb1 < comb2:
            return { player1, player2 };
    }

    comb1 = contMoves1;
    comb2 = contMoves2;

    switch (true) {
        case comb1 > comb2:
            return { player2, player1 };
        case comb1 < comb2:
            return { player1, player2 };
    }

    comb1 = contHit1;
    comb2 = contHit2;

    switch (true) {
        case comb1 > comb2:
            return { player2, player1 };
        case comb1 < comb2:
            return { player1, player2 };
    }

    return { player1, player2 };
};

//Inicia el combate
const initFight = (players) => {
    let narrative = [];
    narrative.push("Comienza el combate");

    const playersKeys = Object.keys(players);
    narrative.push(`El primer turno es para ${players[playersKeys[0]].name}`);

    const maxMovements =
        players[playersKeys[0]].moves.length >
            players[playersKeys[1]].moves.length
            ? players[playersKeys[0]].moves.length
            : players[playersKeys[1]].moves.length;

    let cont = 0;
    while (players.player1.energy > 0 && players.player2.energy > 0 && cont < maxMovements) {
        let mov =
            typeof players[playersKeys[0]].moves[cont] !== "undefined"
                ? players[playersKeys[0]].moves[cont]
                : "";

        let hit =
            typeof players[playersKeys[0]].hits[cont] !== "undefined"
                ? players[playersKeys[0]].hits[cont]
                : ";";

        let target = players[playersKeys[1]];
        let attacker = players[playersKeys[0]];

        attackPlayer(mov, hit, target, attacker, narrative);

        if (players.player1.energy <= 0 || players.player2.energy <= 0) break;

        mov =
            typeof players[playersKeys[1]].moves[cont] !== "undefined"
                ? players[playersKeys[1]].moves[cont]
                : "";
        hit =
            typeof players[playersKeys[1]].hits[cont] !== "undefined"
                ? players[playersKeys[1]].hits[cont]
                : ";";
        target = players[playersKeys[0]];
        attacker = players[playersKeys[1]];

        attackPlayer(mov, hit, target, attacker, narrative);
        cont++;
    }

    checkWinner(players.player1, players.player2, narrative);
    narrative.push(`Game Over`);

    return narrative;
};

//Aplica los ataques realizados
const attackPlayer = (mov, hit, target, attacker, narrative) => {
    const movimientoData = checkCombo(
        mov.toUpperCase(),
        hit.toUpperCase(),
        attacker.allowedCombos
    );
    const damage =
        typeof movimientoData[1].damage !== "undefined"
            ? movimientoData[1].damage
            : 0;

    target.energy -= damage;
    narrateFight(
        movimientoData[0],
        movimientoData[1],
        target,
        attacker,
        narrative
    );
};

//Determina si fue utilizado un golpe especial
const checkCombo = (mov, hit, allowedCombos) => {
    let combinacion = mov + " + " + hit;
    let matchCombo = allowedCombos.filter((value) =>
        combinacion.includes(value.combo)
    );

    if (matchCombo.length) {
        let combo = matchCombo.reduce(function (value1, value2) {
            return value1.combo.length >= value2.combo.length ? value1 : value2;
        });

        const noComboSplit = combinacion
            .replace(combo.combo, "")
            .replace("+", "")
            .trim();

        return [noComboSplit, combo];
    }

    return [mov, ""];
};

//Relata los movimientos y golpes
const narrateFight = (move, usedCombo, target, attacker, narrative) => {
    const conector = move && usedCombo ? " y " : "";
    const movementMsg = repository.getMovementMessage(move);

    const hitMsg = repository.getHitMessage(
        usedCombo,
        target.energy,
        target.name
    );
    msg =
        movementMsg == "" && hitMsg == ""
            ? `${attacker.name} ${repository.getNoMovementMessage()}`
            : `${attacker.name} ${movementMsg}${conector}${hitMsg}`;
    narrative.push(msg);
};

//Determina el ganador del combate
const checkWinner = (player1, player2, narrative) => {
    const winner = player1.energy > player2.energy ? player1 : player2;
    const bothPlayersAlive = player1.energy > 0 && player2.energy > 0;
    const sameEnergy = player1.energy == player2.energy;

    const msg = sameEnergy
        ? `El combate ha terminado en empate, los jugadores se han quedado sin movimientos, con una energía total de ${player1.energy}`
        : bothPlayersAlive
            ? `Ambos jugadores se quedan sin movimientos. El ganador es ${winner.name}. Energía final ${player1.name}: ${player1.energy} - Energía final ${player2.name}: ${player2.energy}`
            : `El ganador es ${winner.name} y aún le queda ${winner.energy} de energía.`;

    narrative.push(msg);
};

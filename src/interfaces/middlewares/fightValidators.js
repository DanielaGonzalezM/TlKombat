const { validationResult, check } = require("express-validator");
const {
    checkNotStringArray,
    checkMoveMaxLength,
    checkValidMove,
    checkHitMaxLength,
    checkValidHit,
} = require("../helpers/fightHelpers");

const moveValidator = async (player = "") => {
    const { movimientos = 0 } = player;
    if (movimientos.length < 1) {
        throw new Error(`Los jugadores deben tener al menos un movimiento`);
    }

    if (checkNotStringArray(movimientos)) {
        throw new Error(`Los movimientos deben ser de tipo string`);
    }

    if (checkMoveMaxLength(movimientos)) {
        throw new Error(`Los jugadores no pueden hacer mas de 5 movimientos`);
    }

    if (checkValidMove(movimientos)) {
        throw new Error(
            `El jugador está realizando movimientos ilegales. Movimientos permitidos: W, A, S, D`
        );
    }
};

const hitValidator = async (player = "") => {
    const { golpes = 0 } = player;
    if (golpes.length < 1) {
        throw new Error(`Los jugadores deben tener al menos un golpe`);
    }

    if (checkHitMaxLength(golpes)) {
        throw new Error(`Los jugadores no pueden golpear más de una vez por turno`);
    }

    if (checkValidHit(golpes)) {
        throw new Error(
            `El jugador está realizando golpes ilegales. Golpes permitidos: P y K`
        );
    }
};

const moveAndHitCorrelationValidator = async (player = "") => {
    const { golpes, movimientos } = player;
    if (golpes.length !== movimientos.length) {
        throw new Error(`Los jugadores deben tener la misma cantidad tanto de golpes como de movimientos`);
    }
};

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};

const playerValidator = (player) => {
    return [
        check(player, `El ${player} es obligatorio`).not().isEmpty(),
        check(player + ".movimientos", `los movimientos del ${player} deben ser en formato array`).isArray(),
        check(player + ".golpes", `los golpes del ${player} deben ser en formato array`).isArray(),
        check(player).custom(moveValidator),
        check(player).custom(hitValidator),
        check(player).custom(moveAndHitCorrelationValidator),
    ];
};

const fightValidators = [];
fightValidators.push(playerValidator("player1"));
fightValidators.push(playerValidator("player2"));
fightValidators.push(validarCampos);

module.exports = { fightValidators };

const { response, request } = require("express");
const StartFight = require("../../application/useCase/StartFight");


const startFight = (req = request, res = response) => {

    // Context
    const serviceLocator = req.app.serviceLocator;
    const { player1, player2 } = req.body;
    const result = StartFight(player1, player2, serviceLocator)

    res.status(200).json({
        result
    });

}

module.exports = {
    startFight
}
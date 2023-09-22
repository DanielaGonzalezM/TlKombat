require("dotenv").config();
const request = require('supertest');
const Server = require("../../../src/infrastructure/webserver/server");
const server = new Server();

describe('GET /fight', function () {

    test('Debe responder error e indicar players obligatorios, movvimeintos y golpe', async () => {
        const expectedErrors = [
            { "type": "field", "msg": "El player1 es obligatorio", "path": "player1", "location": "body" },
            { "type": "field", "msg": "los movimientos del player1 deben ser en formato array", "path": "player1.movimientos", "location": "body" },
            { "type": "field", "msg": "los golpes del player1 deben ser en formato array", "path": "player1.golpes", "location": "body" },
            { "type": "field", "msg": "El player2 es obligatorio", "path": "player2", "location": "body" },
            { "type": "field", "msg": "los movimientos del player2 deben ser en formato array", "path": "player2.movimientos", "location": "body" },
            { "type": "field", "msg": "los golpes del player2 deben ser en formato array", "path": "player2.golpes", "location": "body" },
        ];


        return request(server.app)
            .get('/fight')
            .expect('Content-Type', /json/)
            .expect(400)
            .then((res) => {
                expect(res.statusCode).toBe(400);
                expect(res.body.errors).toEqual(expect.arrayContaining(expectedErrors));
            })
    });


    test('Debe responder error e indicar que se dene ingresar al menos un movimiento y un golpe', async () => {
        const expectedErrors = [
            { "type": "field", "value": { "movimientos": [], "golpes": [] }, "msg": "Los jugadores deben tener al menos un movimiento", "path": "player1", "location": "body" },
            { "type": "field", "value": { "movimientos": [], "golpes": [] }, "msg": "Los jugadores deben tener al menos un golpe", "path": "player1", "location": "body" },
            { "type": "field", "value": { "movimientos": [], "golpes": [] }, "msg": "Los jugadores deben tener al menos un movimiento", "path": "player2", "location": "body" },
            { "type": "field", "value": { "movimientos": [], "golpes": [] }, "msg": "Los jugadores deben tener al menos un golpe", "path": "player2", "location": "body" }
        ];
        const inputTestJson = { "player1": { "movimientos": [], "golpes": [] }, "player2": { "movimientos": [], "golpes": [] } };

        return request(server.app)
            .get('/fight')
            .send(inputTestJson)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then((res) => {
                expect(res.statusCode).toBe(400);
                expect(res.body.errors).toEqual(expect.arrayContaining(expectedErrors));
            })
    });

    test('Debe responder error e indicar que los movimientos y golpes no son válidos', async () => {
        const inputTestJson = { "player1": { "movimientos": ["PO"], "golpes": ["B"] }, "player2": { "movimientos": ["Y"], "golpes": ["G"] } };

        const expectedErrors = [
            { "type": "field", "value": { "movimientos": ["PO"], "golpes": ["B"] }, "msg": "El jugador está realizando movimientos ilegales. Movimientos permitidos: W, A, S, D", "path": "player1", "location": "body" },
            { "type": "field", "value": { "movimientos": ["PO"], "golpes": ["B"] }, "msg": "El jugador está realizando golpes ilegales. Golpes permitidos: P y K", "path": "player1", "location": "body" },
            { "type": "field", "value": { "movimientos": ["Y"], "golpes": ["G"] }, "msg": "El jugador está realizando movimientos ilegales. Movimientos permitidos: W, A, S, D", "path": "player2", "location": "body" },
            { "type": "field", "value": { "movimientos": ["Y"], "golpes": ["G"] }, "msg": "El jugador está realizando golpes ilegales. Golpes permitidos: P y K", "path": "player2", "location": "body" }
        ];

        return request(server.app)
            .get('/fight')
            .send(inputTestJson)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then((res) => {
                expect(res.statusCode).toBe(400);
                expect(res.body.errors).toEqual(expect.arrayContaining(expectedErrors));
            })
    });

    test('Debe responder error e indicar que los movimientos y golpes deben tener la misma cantidad', async () => {
        const inputTestJson = { "player1": { "movimientos": ["AW", "AW"], "golpes": ["P"] }, "player2": { "movimientos": ["DS"], "golpes": ["K", "K"] } };

        const expectedErrors = [
            { "type": "field", "value": { "movimientos": ["AW", "AW"], "golpes": ["P"] }, "msg": "Los jugadores deben tener la misma cantidad tanto de golpes como de movimientos", "path": "player1", "location": "body" },
            { "type": "field", "value": { "movimientos": ["DS"], "golpes": ["K", "K"] }, "msg": "Los jugadores deben tener la misma cantidad tanto de golpes como de movimientos", "path": "player2", "location": "body" }
        ];

        return request(server.app)
            .get('/fight')
            .send(inputTestJson)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then((res) => {
                expect(res.statusCode).toBe(400);
                expect(res.body.errors).toEqual(expect.arrayContaining(expectedErrors));
            })
    });

    test('Debe responder narrativa simple sin movimientos especiales - Empate', async () => {
        const inputTestJson = { "player1": { "movimientos": ["AW"], "golpes": ["P"] }, "player2": { "movimientos": ["DS"], "golpes": ["K"] } };

        const expectedResp = [
            "Comienza el combate",
            "El primer turno es para Tonyn Stallone",
            "Tonyn Stallone se mueve y le da un gran puñetazo al gran Arnaldor Shuatseneguer",
            "Arnaldor Shuatseneguer se mueve y acierta una mega patada al gran Tonyn Stallone",
            "El combate ha terminado en empate, los jugadores se han quedado sin movimientos, con una energía total de 5",
            "Game Over"
        ];

        return request(server.app)
            .get('/fight')
            .send(inputTestJson)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.result).toEqual(expect.arrayContaining(expectedResp));
            })
    });

    test('Debe responder narrativa simple, movimiento especial - ganador Tony', async () => {
        const inputTestJson = { "player1": { "movimientos": ["ADSD"], "golpes": ["P"] }, "player2": { "movimientos": ["DS"], "golpes": ["K"] } };

        const expectedResp = [
            "Comienza el combate",
            "El primer turno es para Arnaldor Shuatseneguer",
            "Arnaldor Shuatseneguer se mueve y acierta una mega patada al gran Tonyn Stallone",
            "Tonyn Stallone se mueve a la izquierda y conecta un Taladoken al gran Arnaldor Shuatseneguer",
            "Ambos jugadores se quedan sin movimientos. El ganador es Tonyn Stallone. Energía final Tonyn Stallone: 5 - Energía final Arnaldor Shuatseneguer: 3",
            "Game Over"
        ];

        return request(server.app)
            .get('/fight')
            .send(inputTestJson)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.result).toEqual(expect.arrayContaining(expectedResp));
            })
    });

});




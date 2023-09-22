const startFight = require('../../../src/application/useCase/StartFight');
const serviceLocator = require('../../../src/infrastructure/config/service-locator');

describe('Pruebas StartFight useCase', function () {

    test('Debe retornar array con resultado pelea Señalando que el ganador es Arnaldor', () => {

        const player1 = { "movimientos": ["D", "DSD", "A", "DSD", "SD"], "golpes": ["K", "P", "p", "K", "P"] };
        const player2 = { "movimientos": ["SA", "SA", "SA", "ASA", "SA"], "golpes": ["K", "", "K", "P", "P"] };
        const expected = [
            "Comienza el combate",
            "El primer turno es para Tonyn Stallone",
            "Tonyn Stallone se mueve a la derecha y acierta una mega patada al gran Arnaldor Shuatseneguer",
            "Arnaldor Shuatseneguer conecta un Remuyuken al gran Tonyn Stallone",
            "Tonyn Stallone conecta un Taladoken al pobre de Arnaldor Shuatseneguer",
            "Arnaldor Shuatseneguer se mueve",
            "Tonyn Stallone se mueve a la izquierda y le da un gran puñetazo al pobre de Arnaldor Shuatseneguer",
            "Arnaldor Shuatseneguer conecta un Remuyuken al pobre de Tonyn Stallone",
            "El ganador es Arnaldor Shuatseneguer y aún le queda 1 de energía.", "Game Over"
        ];
        expect(startFight(player1, player2, serviceLocator)).toEqual(
            expect.arrayContaining(expected)
        );

    });

    test('Debe retornar array con resultado pelea Señalando que el ganador es tony', () => {

        const player1 = { "movimientos": ["D", "DSD", "DSD", "DSD", "SD"], "golpes": ["K", "P", "p", "K", "P"] };
        const player2 = { "movimientos": ["SA", "SA"], "golpes": ["K", ""] };
        const expected = [
            "Comienza el combate",
            "El primer turno es para Arnaldor Shuatseneguer",
            "Arnaldor Shuatseneguer conecta un Remuyuken al gran Tonyn Stallone",
            "Tonyn Stallone se mueve a la derecha y acierta una mega patada al gran Arnaldor Shuatseneguer",
            "Arnaldor Shuatseneguer se mueve",
            "Tonyn Stallone conecta un Taladoken al pobre de Arnaldor Shuatseneguer",
            "Arnaldor Shuatseneguer se queda inmóvil",
            "Tonyn Stallone conecta un Taladoken al pobre de Arnaldor Shuatseneguer",
            "El ganador es Tonyn Stallone y aún le queda 3 de energía.", "Game Over"
        ];
        expect(startFight(player1, player2, serviceLocator)).toEqual(
            expect.arrayContaining(expected)
        );

    });

    test('Debe retornar array con resultado pelea Señalando que el ganador es Arnaldor', () => {

        const player1 = { "movimientos": ["D"], "golpes": ["K"] };
        const player2 = { "movimientos": ["SA"], "golpes": ["K"] };
        const expected = [
            "Comienza el combate",
            "El primer turno es para Tonyn Stallone",
            "Tonyn Stallone se mueve a la derecha y acierta una mega patada al gran Arnaldor Shuatseneguer",
            "Arnaldor Shuatseneguer conecta un Remuyuken al gran Tonyn Stallone",
            "Ambos jugadores se quedan sin movimientos. El ganador es Arnaldor Shuatseneguer. Energía final Tonyn Stallone: 3 - Energía final Arnaldor Shuatseneguer: 5",
            "Game Over"
        ];
        expect(startFight(player1, player2, serviceLocator)).toEqual(
            expect.arrayContaining(expected)
        );

    });

    test('Debe retornar array con resultado pelea Señalando un empate y que los jugadores se quedan sin movimientos', () => {

        const player1 = { "movimientos": ["D"], "golpes": ["K"] };
        const player2 = { "movimientos": ["S"], "golpes": ["K"] };
        const expected = [
            "Comienza el combate",
            "El primer turno es para Tonyn Stallone",
            "Tonyn Stallone se mueve a la derecha y acierta una mega patada al gran Arnaldor Shuatseneguer",
            "Arnaldor Shuatseneguer se agacha y acierta una mega patada al gran Tonyn Stallone",
            "El combate ha terminado en empate, los jugadores se han quedado sin movimientos, con una energía total de 5",
            "Game Over"
        ];
        expect(startFight(player1, player2, serviceLocator)).toEqual(
            expect.arrayContaining(expected)
        );

    });

    test('Primer turno para Tonyn menos mov + hit', () => {

        const player1 = { "movimientos": ["D"], "golpes": ["K"] };
        const player2 = { "movimientos": ["SD"], "golpes": ["K"] };
        const expected = [
            "El primer turno es para Tonyn Stallone",
        ];
        expect(startFight(player1, player2, serviceLocator)).toEqual(
            expect.arrayContaining(expected)
        );

    });

    test('Primer turno para Arnaldor menos mov + hit', () => {

        const player1 = { "movimientos": ["DS"], "golpes": [""] };
        const player2 = { "movimientos": ["S"], "golpes": ["P"] };
        const expected = [
            "El primer turno es para Arnaldor Shuatseneguer",
        ];
        expect(startFight(player1, player2, serviceLocator)).toEqual(
            expect.arrayContaining(expected)
        );
    });

    test('Primer turno para Tony menos mov + hit', () => {

        const player1 = { "movimientos": ["D"], "golpes": ["K"] };
        const player2 = { "movimientos": ["S"], "golpes": ["P"] };
        const expected = [
            "El primer turno es para Tonyn Stallone",
        ];
        expect(startFight(player1, player2, serviceLocator)).toEqual(
            expect.arrayContaining(expected)
        );
    });
});

/**
 * Este modulo centraliza las variables de ambiente de la aplicación. De esta forma no se ultiza el
 * `process.env` en otros archivos.
 */
module.exports = (() => {

  const environment = {
    gamemode: {
      selected: process.env.GAMEMODE || 'default'
    }
  };


  return environment;
})();

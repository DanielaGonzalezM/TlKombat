module.exports = class {

    constructor( nombre, movimientos, golpes, energia, allowedCombos = []) {
      this.name = nombre;
      this.moves = movimientos;
      this.hits = golpes;
      this.energy = energia;
      this.allowedCombos = allowedCombos;
    }
  
  };
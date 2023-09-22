//TODO: validar parametrización de valores

//*Valida que los valores dentro del array correspondan a un string
const checkNotStringArray = (array = [])=>{
    return array.some((value) => {
        return typeof value !== "string";
    });
}

//*Valida que los movimientos no tengan más de 5 caracteres
const checkMoveMaxLength = (array = [])=>{
    return array.some((value) => {
        return value.length > 5;
    });
}

//*Valida que los caracteres correspondan a movimientos válidos
const checkValidMove = (array = [])=>{
  const re = /[^WASDwasd]/;
    return array.some((value) => {
        return value.match(re)
    });
}

//*Valida que los movimientos no tengan más de 1 caracter
const checkHitMaxLength = (array = [])=>{
    return array.some((value) => {
        return value.length > 1;
    });
}

//*Valida que los caracteres correspondan a golpes válidos
const checkValidHit = (array = [])=>{
  const re = /[^PKpk]/;
    return array.some((value) => {
        return value.match(re)
    });
}

module.exports = {
    checkNotStringArray,
    checkMoveMaxLength,
    checkValidMove,
    checkHitMaxLength,
    checkValidHit
}
# Proyecto en NodeJs - TalanaKombat - Clean Architecture

## Para clonar y configurar el proyecto

```
git clone git@github.com:DanielaGonzalezM/TlKombat.git
cd TlKombat
```
Preferentemente se debe configurar el archivo **.env**, para ello, solo se debe copiar del archivo **example.env** que se encuentra en la raíz.

En el archivo .env se puede configurar el puerto y el modo de juego.
El modo de juego cambia los personajes y sus caracteristicas que aparecen en la pelea.

Ej.
```
PORT=3000
GAMEMODE=default
```
```
PORT=3000
GAMEMODE=hardcore
```
## Levantar proyecto

Una vez configuradas las variables de ambiente, podemos levantar el proyecto.

### Localmente

```
npm install
npm test
npm start
```

### Docker

```
Docker compose up -d
```
Abrir [http://localhost:3000/](http://localhost:3000/) para validar que el servicio está arriba.

## Acerca del juego

### Talana Kombat JRPG
Talana Kombat es un juego donde 2 personajes se enfrentan hasta la muerte. Cada personaje
tiene 2 golpes especiales que se ejecutan con una combinación de movimientos + 1 botón de
golpe.


### Combinación de teclas

![Movimientos](/doc/Talanakombat_Movimientos.jpg)

### Flujo del combate

![Flujo](/doc/talanakombat_flujo.jpg)

### Cosas Extras

En el archivo **src\infrastructure\config\constants.js**

Se puede realizar lo siguiente:

* Editar poderes de los jugadores.
* Agregar nuevos poderes
* Editar información de los jugadores( nombre, energía)
* Modificar parte de los textos de la narración
* Configurar nuevos modos de juego

En el archivo **.env**

Se puede modificar el modo de juego.

Modos de juego disponibles:

* **default**  - Corresponde a los personajes solicitados en la prueba
* **hardcore** - Corresponde a un modo agregado con temática de Dragon Ball
* **pokemon**  - Corresponde a un modo agregado con temática de Pokémon

Si se quiere agregar un nuevo modo de juego, bastaría con crear su fightRepository correspondiente, sus variables en constants.js. y finalmente agregar el nuevo modo en el siguiente archivo
src\infrastructure\config\service-locator.js

Json de entrada de ejemplo

```
{
"player1":{"movimientos":["AAAA","DSD","S","DSD","SD"],"golpes":["K","P","","K","P"]},
"player2":{"movimientos":["SA","","SA","ASA","SA"],"golpes":["K","","K","P","P"]}
}
```
#### Ej. Resultado Default

```
{
    "result": [
        "Comienza el combate",
        "El primer turno es para Arnaldor Shuatseneguer",
        "Arnaldor Shuatseneguer conecta un Remuyuken al gran Tonyn Stallone",
        "Tonyn Stallone se mueve y acierta una mega patada al gran Arnaldor Shuatseneguer",
        "Arnaldor Shuatseneguer se queda inmóvil",
        "Tonyn Stallone conecta un Taladoken al pobre de Arnaldor Shuatseneguer",
        "Arnaldor Shuatseneguer conecta un Remuyuken al pobre de Tonyn Stallone",
        "El ganador es Arnaldor Shuatseneguer y aún le queda 2 de energía.",
        "Game Over"
    ]
}
```

#### Ej. Resultado Hardcore

```
{
    "result": [
        "Comienza el combate",
        "El primer turno es para Piccolo Daimaku",
        "Piccolo Daimaku lanza el ataque Makankosappo al imponente Goku",
        "Goku levita y lanza varias patadas apenas visibles al ojo humano al imponente Piccolo Daimaku",
        "Piccolo Daimaku se queda paralizado",
        "Goku lanza el ataque Genki-dama al imponente Piccolo Daimaku",
        "Piccolo Daimaku lanza el ataque Makankosappo al malherido de Goku",
        "Goku aterriza y deja un crater",
        "Piccolo Daimaku lanza el ataque Kaikosen al malherido de Goku",
        "Goku se mueve a la derecha a gran velocidad y lanza el ataque KameHameHa al malherido de Piccolo Daimaku",
        "Piccolo Daimaku levita y le da varios puñetazos consecutivos al malherido de Goku",
        "Goku levita y le da varios puñetazos consecutivos al malherido de Piccolo Daimaku",
        "Ambos jugadores se quedan sin movimientos. El ganador es Piccolo Daimaku. Energía final Goku: 5 - Energía final Piccolo Daimaku: 15",
        "Game Over"
    ]
}
```
#### Ej. Resultado Pokemon

```
{
    "result": [
        "Comienza el combate",
        "El primer turno es para Chorizar",
        "Chorizar lanza el ataque [Lanza llamas] al lindo Pikachu",
        "Pikachu se mueve y le da una embestida al lindo Chorizar",
        "Chorizar se queda confundido",
        "Pikachu lanza el ataque [Impactrueno] al pobre de Chorizar",
        "El ganador es Pikachu y aún le queda 10 de energía.",
        "Game Over"
    ]
}
```

## Domain Driven Architectures

El diseño de software es algo muy difícil. Desde hace años, ha aparecido una tendencia a poner la lógica empresarial, también conocida como el dominio (comercial), y con ella al usuario, en el corazón de todo el sistema. A partir de este concepto se imaginaron diferentes patrones arquitectónicos.

Uno de los primeros y principales fue introducido por [Domain Driven Design approach](http://dddsample.sourceforge.net/architecture.html).

![DDD Architecture](/doc/DDD_architecture.jpg)

A partir de ella o en la misma época, aparecieron otras arquitecturas aplicativas como [Onion Architecture](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/) (por. J. Palermo), [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/) (por A. Cockburn) o [Clean Architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html) (por. R. Martin).

Este repositorio es una exploración de este tipo de arquitectura, basada principalmente en DDD y Clean Architecture, sobre una aplicación JavaScript.

## DDD y Clean Architecture

La aplicación sigue al Uncle Bob "[Clean Architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)" principios y estructura del proyecto:

### Clean Architecture capas

![Schema of flow of Clean Architecture](/doc/Uncle_Bob_Clean_Architecture.jpg)

### Estructura del Projecto

```
app 
 └ src                              → Recursos de la aplicación 
    └ application                   → Application services layer
       └ useCases                   → Casos de uso, reglas del negocio 
    └ domain                        → Bloques de construcción centrales como entidades e interfaces de repositorios
    └ infrastructure                → Frameworks, drivers y herramientas como Database.
       └ config                     → Archivos de configuración, modulos y servicios
          └ service-locator.js      → Modulo que maneja el servicio de implementación por variables de ambiente.
       └ repositories               → Implementación del los repocitorios e interfaces del dominio
       └ webserver                  → Express Web server configuraciones
          └ server.js               → Express server definición
    └ interfaces                    → Adaptadores y formateadores para los utilización de los casos de uso.
       └ controllers                → Controladores de las rutas      
       └ helpers                    → Funciones de ayuda
       └ middlewares                → Validaciones previas al controlador
       └ routes                     → Definiciones de rutas
 └ node_modules (generated)         → NPM dependencias
 └ test                             → Source folder for unit or functional tests
 └ index.js                         → Main application entry point
```
const { colorOfText } = require("./paths");
const { log } = console;
const chalk = require('chalk');

const printGettingStarted = ()=> {
    log(chalk.green.bold('Inicia tu busqueda\n'));
    log(chalk.bgBlackBright('Aquí encontrarás instrucciones para usar md-Links: \n'));
    log(colorOfText('1. Ingresa el comando md-links seguido de la ruta al archivo o directorio que deseas (puede ser una ruta relativa como: directorio/ejemplo.md). Aparecerá una lista con cada enlace encontrado.\n', 'blue'));
    log(colorOfText('2. Para saber cuántos enlaces hay y cuántos son únicos, agrega la opción --stats después de la ruta al archivo o directorio.\n', 'green'));
    log(colorOfText('3. Para saber cuántos enlaces válidos existen, ingresa después de la ruta al archivo o directorio la opción: --validate.\n', 'blue'));
    log(colorOfText('4. Si deseas conocer las estadísticas de los enlaces y cuántos están rotos, agrega después de la ruta al archivo o directorio las dos opciones, una seguida de la otra "--stats y --validate".\n', 'green'));
    log(colorOfText('5. Si tienes alguna pregunta y necesitas conocer los comandos nuevamente, escribe "md-Links --help".', 'blue'));
};

module.exports={printGettingStarted}
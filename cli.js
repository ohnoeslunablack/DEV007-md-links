const { mdLinks } = require("./mdlinks");
const { calculateLinksStats, calculateAndValidateLinksStats } = require("./libreria/stats");
const { printGettingStarted } = require("./libreria/start");
const { log } = console;

const options = process.argv;
const route = process.argv[2];
const validate = options.includes('--validate');
const stats = options.includes('--stats');
const help = options.includes('--help');

const userCli = (route) => {
  if (!route) {
    return printGettingStarted();
  }
  if (help) {
    return printGettingStarted();
  }
      if (!route) {
        throw new Error(log('RUTA FALTANTE, INGRESA LA RUTA'));
      } else if (stats && validate) {
        return mdLinks(route, { validate: true })
          .then((arrayOfLinks) => {
            if (arrayOfLinks.length <= 0) {
              throw new Error(log('ESTE ARCHIVO NO CONTIENE ENLACES, PRUEBA CON OTRA RUTA'));
            }
            const statsValidate = calculateAndValidateLinksStats(arrayOfLinks);
            log(` LINKS:\n  Total: ${statsValidate.Total}\n  Unique: ${statsValidate.Unique}\n  Broken: ${statsValidate.Broken}`);
          })
          .catch((err) => log(err));
  } else if (validate) {
    return mdLinks(route, { validate: true })
      .then((arrayOfLinks) => {
        if (arrayOfLinks.length <= 0) {
          new Error(log('ESTE ARCHIVO NO CONTIENE ENLACES, PRUEBA CON OTRA RUTA'));
        }
        arrayOfLinks.forEach((link) => {
          log(`Route: ${link.file}\nLink: ${link.href}\nText: ${link.text}\nStatus: ${link.status}\nIsOk? ${link.isOk}`);
        });
      })
      .catch((err) => log(err));
  } else if (stats) {
    return mdLinks(route, { validate: false })
      .then((arrayOfLinks) => {
        if (arrayOfLinks.length <= 0) {
          new Error(log('ESTE ARCHIVO NO CONTIENE ENLACES, PRUEBA CON OTRA RUTA'));
        }
        const stats = calculateLinksStats(arrayOfLinks);
        log(` LINKS:\n  Total: ${stats.Total}\n  Unique: ${stats.Unique}`);
      })
      .catch((err) => log(err));
  }
  if (!validate) {
    return mdLinks(route, { validate: false })
      .then((arrayOfLinks) => {
        if (arrayOfLinks.length <= 0) {
          new Error(log('ESTE ARCHIVO NO CONTIENE ENLACES, PRUEBA CON OTRA RUTA'));
        }
        arrayOfLinks.forEach((link) => {
          log(`Route: ${link.file}\nLink: ${link.href}\nText: ${link.text}`);
        });
      })
      .catch((err) => log(err));
  }
}

userCli(route);

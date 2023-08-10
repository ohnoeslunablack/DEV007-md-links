#!/usr/bin/env node //shebang ejecucion desde la cli

const { mdLinks } = require("./mdlinks");
const { calculateLinksStats, calculateAndValidateLinksStats } = require("./libreria/stats");
const { printGettingStarted } = require("./libreria/start");
const { colorizeText } = require("./libreria/paths");
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
    new Error(log(colorizeText('RUTA FALTANTE, INGRESA LA RUTA', 'red')));
  } else if (stats && validate) {
    return mdLinks(route, { validate: true })
      .then((arrayOfLinks) => {
        if (arrayOfLinks.length <= 0) {
          new Error(log(colorizeText('ESTE ARCHIVO NO CONTIENE ENLACES, PRUEBA CON OTRA RUTA', 'red')));
        }
        const statsValidate = calculateAndValidateLinksStats(arrayOfLinks);
        log(colorizeText(` LINKS:\n  Total: ${calculateAndValidateLinksStats.Total}\n  Unique: ${calculateAndValidateLinksStats.Unique}\n  Broken: ${calculateAndValidateLinksStats.Broken}`, 'magenta'));
      })
      .catch((err) => log(err));
  } else if (validate) {
    return mdLinks(route, { validate: true })
      .then((arrayOfLinks) => {
        if (arrayOfLinks.length <= 0) {
          new Error(log(colorizeText('ESTE ARCHIVO NO CONTIENE ENLACES, PRUEBA CON OTRA RUTA', 'red')));
        }
        arrayOfLinks.forEach((link) => {
          log(colorizeText(`Route: ${link.file}\nLink: ${link.href}\nText: ${link.text}\nStatus: ${link.status}\nIsOk? ${link.isOk}`, 'blue'));
        });
      })
      .catch((err) => log(err));
  } else if (stats) {
    return mdLinks(route, { validate: false })
      .then((arrayOfLinks) => {
        if (arrayOfLinks.length <= 0) {
          new Error(log(colorizeText('ESTE ARCHIVO NO CONTIENE ENLACES, PRUEBA CON OTRA RUTA', 'red')));
        }
        const stats = calculateLinksStats(arrayOfLinks);
        log(colorizeText(` LINKS:\n  Total: ${stats.Total}\n  Unique: ${stats.Unique}`, 'magenta'));
      })
      .catch((err) => log(err));
  }
  if (!validate) {
    return mdLinks(route, { validate: false })
      .then((arrayOfLinks) => {
        if (arrayOfLinks.length <= 0) {
          new Error(log(colorizeText('ESTE ARCHIVO NO CONTIENE ENLACES, PRUEBA CON OTRA RUTA', 'red')));
        }
        arrayOfLinks.forEach((link) => {
          log(colorizeText(`Route: ${link.file}\nLink: ${link.href}\nText: ${link.text}`, 'blue'));
        });
      })
      .catch((err) => log(err));
  }
}

userCli(route);
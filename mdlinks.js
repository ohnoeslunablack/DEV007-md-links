const paths = require("path");
const fs = require("fs");

const {
  convertToAbsolutePath,
  filterMarkdownFiles,
} = require("./libreria/paths");

const { readMarkdownFilesAndSearchLinks } = require("./libreria/links");

const { validateAndFetchLinks } = require("./libreria/validate");

let examplePath = `${process.cwd()}\\test\\prueba`;

const mdLinks = (path, option) =>
  new Promise((resolve, reject) => {
    const absolutePath = paths.isAbsolute(path) ? path : convertToAbsolutePath(path);
    if (fs.existsSync(path)) {
      const filteredLinksArray = filterMarkdownFiles(absolutePath);
      if (filteredLinksArray.length === 0) {
        reject('NO HAY ARCHIVOS ".MD", INTENTA CON OTRA RUTA DE MARKDOWN');
      }
      readMarkdownFilesAndSearchLinks(filteredLinksArray).then((response) => {
        if (option.validate === true) {
          validateAndFetchLinks(response).then((arrOfLinks) => {
            resolve(arrOfLinks);
          });
        }
        if (option.validate === false) {
          resolve(response);
        }
      });
    } else {
      reject('LA RUTA NO EXISTE, INTENTA CON OTRA RUTA');
    }
  });

module.exports = { mdLinks };
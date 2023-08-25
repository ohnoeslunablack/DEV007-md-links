const fs = require("fs");
const path = require("path");
const chalk = require('chalk');

/* Color de texto */
const colorizeText = (message, color) => chalk.keyword(color)(message);

/* Ruta relativa a absoluta */
const convertToAbsolutePath = (route) => {
    const absolutePath = path.resolve(route);
    return absolutePath;
};

/* Comprueba si una ruta apunta a un archivo */
const isFile = (routeAbsolute) => fs.statSync(routeAbsolute).isFile();

/**
  * @function getFilesArray
  * @param routeAbsolute Ruta absoluta a un directorio o archivo
  * @returns Array de rutas de todos los archivos que se encuentran en la ruta especificada
  */
const getFilesArray = (routeAbsolute) => {
  let filesArray = [];
  if (isFile(routeAbsolute)) {
    filesArray.push(routeAbsolute);
  } else {
    const files = fs.readdirSync(routeAbsolute);
    files.forEach((file) => {
      const childDirectory = path.join(routeAbsolute, file);
      filesArray = [...filesArray, ...(getFilesArray(childDirectory))];
    });
  }
  return filesArray;
};

/**
  * @function filterMarkdownFiles
  * @param routeAbsolute Ruta absoluta a un directorio o archivo
  * @returns Filtra los archivos que son archivos Markdown (".md") y devuelve un array de sus rutas
  */
const filterMarkdownFiles = (routeAbsolute) => {
  return getFilesArray(routeAbsolute).filter((file) => path.extname(file) === '.md');
};

module.exports = { colorizeText, convertToAbsolutePath, getFilesArray, filterMarkdownFiles, isFile };


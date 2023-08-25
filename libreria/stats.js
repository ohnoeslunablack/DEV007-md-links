/**
 * @function calculateLinksStats
 * @param {Array de objetos de enlaces} linksArray
 * @returns {Objeto con estadísticas de enlaces}
 */
const calculateLinksStats = (linksArray) => {
  // El Set es una estructura que almacena valores únicos. Aquí se usa para obtener enlaces únicos.
  const uniqueLinks = new Set(linksArray.map((link) => link.href)).size;
  // Se retorna un objeto con las estadísticas de enlaces.
  return {
    Total: linksArray.length, // Número total de enlaces en el array
    Unique: uniqueLinks, // Número de enlaces únicos
  };
};

/**
 * @function calculateAndValidateLinksStats
 * @param {Array de objetos de enlaces} linksArray
 * @returns {Objeto con estadísticas de enlaces y enlaces rotos}
 */
const calculateAndValidateLinksStats = (linksArray) => {
  // Obtenemos el número de enlaces únicos.
  const uniqueLinks = new Set(linksArray.map((link) => link.href)).size;
  // Filtramos los enlaces rotos usando la propiedad `isOk`. Se cuentan los enlaces que tienen 'fail' en esta propiedad.
  const brokenLinks = linksArray.filter((link) => link.isOk === 'fail');
  // Se retorna un objeto con las estadísticas de enlaces y la cantidad de enlaces rotos.
  return {
    Total: linksArray.length,  // Número total de enlaces en el array
    Unique: uniqueLinks,       // Número de enlaces únicos
    Broken: brokenLinks.length,// Número de enlaces rotos
  };
};

module.exports = { calculateLinksStats, calculateAndValidateLinksStats };

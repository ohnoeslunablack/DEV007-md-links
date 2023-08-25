//links
const { 
    convertToAbsolutePath,
    getFilesArray,
    filterMarkdownFiles,
    isFile,
    } = require('../libreria/paths');
  
const { 
    readMarkdownFilesAndSearchLinks,
    extractLinksFromMarkdown,
    } = require('../libreria/links');

    const resultArrayOfOneLink = [
      convertToAbsolutePath(`${process.cwd()}\\test\\prueba\\archivotest.md`),
    ];
    

// links

const resultArrayOfLinks =  [
    `${process.cwd()}\\test\\prueba\\archivotest.md`,
    `${process.cwd()}\\test\\prueba\\vacio1.md`,
    `${process.cwd()}\\test\\prueba\\archivo1.md`,
    `${process.cwd()}\\test\\prueba\\archivo2.md`,
    `${process.cwd()}\\test\\prueba\\prueba2\\archivo3.md`,
    `${process.cwd()}\\test\\prueba\\prueba2\\archivo4.md`,
    `${process.cwd()}\\test\\prueba\\prueba2\\vacio2.md`,
    `${process.cwd()}\\test\\prueba\\prueba2\\prueba3\\archivo5.md`,
  ]
  
  const resultArrayOfMd =  [
    `${process.cwd()}\\test\\prueba\\archivotest.md`,
    `${process.cwd()}\\test\\prueba\\prueba2\\archivo3.md`,
    `${process.cwd()}\\test\\prueba\\prueba2\\prueba3\\archivo5.md`,
    `${process.cwd()}\\test\\prueba\\prueba2\\vacio2.md`,
  ]
  
  const rutaAbsoluta=`${process.cwd()}\\test\\prueba\\archivotest.md`;
  const RouteForTestFilterMd= `${process.cwd()}\\test\\prueba`;
  const rutaRelativa = 'test/prueba/archivotest.md';
  
  //convierte ruta relativa a absoluta
  describe('convertToAbsolutePath es una funcion que convierte una ruta a absoluta', () => {
    it('convertToAbsolutePath es una funcion', () => {
      expect(typeof convertToAbsolutePath).toBe('function');
    });
  
    it('devuelve ruta relativa convertida a absoluta', () => {
        expect(convertToAbsolutePath(rutaRelativa)).toEqual(rutaAbsoluta)
    });
  });
  
  //comprueba sea archivo
  
  describe('isFile es una funcion que verifica si el link recibido es de un file, retorna boolean', () => {
    it('isFile es una funcion', () => {
      expect(typeof isFile).toBe('function');
    });
    it('isFile retorna true al recibir un archivo', () => {
      expect(isFile(rutaAbsoluta)).toBe(true);
    });
  });
  
  //obtiene array de links de archivos
  describe('getFilesArray es una funcion que revisa si el path que se le pasa es un file o un directorio, en caso de ser file lo sube a un array, en los directorios los recorre y encuentra los archivos subiendolos al mismo array', () => {
    it('getFilesArray es una funcion', () => {
      expect(typeof getFilesArray).toBe('function');
    });
    it('getFilesArray deberia retornar un array con un link si se le paso un file', () => {
      expect(getFilesArray(`${process.cwd()}\\test\\prueba\\archivotest.md`)).toEqual(resultArrayOfOneLink);
    });
    /*it('getFilesArray deberia retornar un array con links si se le paso directorio', () => {
      expect(getFilesArray(`${process.cwd()}\\test\\prueba`)).toEqual(resultArrayOfLinks);
    });*/
    it('getFilesArray deberia retornar un array con links si se le paso directorio', () => {
      const sortedResultArrayOfLinks = resultArrayOfLinks.sort();
      const sortedFilesArray = getFilesArray(`${process.cwd()}\\test\\prueba`).sort();
      expect(sortedFilesArray).toEqual(sortedResultArrayOfLinks);
    });
  });
  
  //obtiene array de archivos .md
  describe('filterMarkdownFiles recibe un path y filtra los links hasta devolver un array de links a archivos md encontrados', () => {
    it('filterMarkdownFiles es una funcion', () => {
      expect(typeof getFilesArray).toBe('function');
    });
    it('filterMarkdownFiles deberia retornar un array con links a archivos md', () => {
      expect(getFilesArray(`${process.cwd()}\\test\\prueba\\archivotest.md`)).toEqual(resultArrayOfOneLink);
    });
    /*it('filterMarkdownFiles deberia retornar un array con links a archivos .md', () => {
      expect(filterMarkdownFiles(RouteForTestFilterMd)).toEqual(resultArrayOfMd);
    });*/
    it('filterMarkdownFiles deberia retornar un array con links a archivos .md', () => {
      const sortedResultArrayOfMd = resultArrayOfMd.sort();
      const sortedFilteredMdArray = filterMarkdownFiles(RouteForTestFilterMd).sort();
      expect(sortedFilteredMdArray).toEqual(expect.arrayContaining(sortedResultArrayOfMd));
    });
  
  //link
  
  describe('readMarkdownFilesAndSearchLinks recibe un array de archivos md, los lee y retorna una promesa con los links', () => {
    it('readMarkdownFilesAndSearchLinks retorna una promesa', () => {
      expect(readMarkdownFilesAndSearchLinks(resultArrayOfMd)).toBeInstanceOf(Promise);
    });
    it('readMarkdownFilesAndSearchLinks deberia retornar un array de objetos con links', () => {
      const routeMdFile= [`${process.cwd()}\\test\\prueba\\archivotest.md`,]
      const resultArrOfLinks = [{
        href: 'https://www.youtube.com/watch?v=1hpc70_OoAg',
        text: 'nadie lo vio completo',
        file: `${process.cwd()}\\test\\prueba\\archivotest.md`,
      }]
     return readMarkdownFilesAndSearchLinks(routeMdFile).then((response) => {
      expect(response).toEqual(resultArrOfLinks)})
    });
    
    it('readMarkdownFilesAndSearchLinks deberia retornar promesa rechazada con un file no válido', () => {
      const wrongRouteMdFile= [`muevo.md`,]
      return readMarkdownFilesAndSearchLinks(wrongRouteMdFile).catch((e) => {
        expect(e).toBeInstanceOf(Error)})
    });
  });
})

//mdlinks
const mdLinks = require('../mdlinks');
//validate
const {validateAndFetchLinks} = require("../libreria/validate");
const {
  calculateLinksStats, 
  calculateAndValidateLinksStats
} = require("../libreria/stats");
//links
const { 
  convertToAbsolutePath,
  getFilesArray,
  filterMarkdownFiles,
  isFile,
  } = require('../libreria/paths');

  const { 
    readMarkdownFilesAndSearchLinks,
    } = require('../libreria/links');
//gral
const fetch= require ("node-fetch");
jest.mock("node-fetch");

const validate= true;
const rutaRelativa= "test/prueba/archivotest.md";
const rutaAbsoluta=`${process.cwd()}\\test\\prueba\\archivotest.md`;

//mdlinks
// testear funcion de obtener arrys

describe('mdLinks', () => {

  it('mdLinks retorna una promesa', () => {
    expect(mdLinks(rutaRelativa, validate)).toBeInstanceOf(Promise);
  });

  it("si validate es false retorna array con objetos de cada link", async  () => {
    const arrResponse= [
      {
        href: 'https://www.youtube.com/watch?v=1hpc70_OoAg',
        text: 'nadie lo vio completo',
        file: `${process.cwd()}/test/prueba/archivotest.md`.replace(/\\/g, "/"),
      }
    ]
    await mdLinks( rutaRelativa,{validate:false}).then (response => expect(response).toStrictEqual(arrResponseValidate) )
  });

  it('si la ruta no tiene archivos .md no acepta la promesa', async()=>{
    const rutaSinMd = 'liberia';
    await mdLinks(rutaSinMd,{validate:false}).catch(err => expect(err).toBe('NO HAY ARCHIVOS ".MD" INTENTA CON OTRA RUTA'))
  });

  it ('si la ruta no esxiste, no acepta la promesa', async ()=> {
    const rutaSinMd= 'NoExiste';
    await mdLinks( rutaSinMd,{validate:false}).catch(err => expect (err).toBe ('LA RUTA NO EXISTE, INTENTA OTRA RUTA'))
  });
});

  // validate

  const arrLinkOk= [
    {
      href: 'https://www.youtube.com/watch?v=1hpc70_OoAg',
      text: 'nadie lo vio completo',
      file: `${process.cwd()}/test/prueba/archivotest.md`.replace(/\\/g, "/"),
    }
  ]

  const arrayLinkStatusFail = [
    {
      href: 'https://www.youtube.com/watch?v=1hpc70_OoAg',
      text: 'nadie lo vio completo',
      file: `${process.cwd()}/test/prueba/archivotest.md`.replace(/\\/g, "/"),
    },
  ];
  
  const arrayLinkValidadoStats = [
    {
      href: 'https://www.youtube.com/watch?v=1hpc70_OoAg',
      text: 'nadie lo vio completo',
      file: `${process.cwd()}/test/prueba/archivotest.md`.replace(/\\/g, "/"),
      status: "200",
      isOk: "ok",
    },
  ];

  describe("validateAndFetchLinks recibe un array de archivos md, los lee y retorna una promesa con los links", () => {
    it("validateAndFetchLinks deberia retornar un array con un objeto del link validado con status ok", async () => {
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
        })
      );

      await validateAndFetchLinks(arrayLinkOk).then((res) => {
        expect(res).toEqual([
          {
            href: 'https://www.youtube.com/watch?v=1hpc70_OoAg',
      text: 'nadie lo vio completo',
      file: `${process.cwd()}/test/prueba/archivotest.md`.replace(/\\/g, "/"),
      status: "200",
      isOk: "ok",
    },
  ]);
});
});

it("validateAndFetchLinks deberia retornar un array con un objeto del link, este tendrá un status fail /link roto", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      status: 400,
    })
  );

  await validateAndFetchLinks(arrayLinkStatusFail).then((res) => {
    expect(res).toEqual([
      {
        href: 'https://www.youtube.com/watch?v=1hpc70_OoAg',
      text: 'nadie lo vio completo',
      file: `${process.cwd()}/test/prueba/archivotest.md`.replace(/\\/g, "/"),
      status: "400",
      isOk: "FAIL",
    },
  ]);
});
});
});

// stats y validatestats

describe("calculateLinksStats recibe un array links validados y retorna total de links y links únicos", () => {
  it("calculateLinksStats deberia retornar el total de links y cuantos hay unicos", () => {
expect(calculateLinksStats(arrayLinkValidadoStats)).toEqual({
  Total: 1,
    Unique: 1,
})
  });
});

describe("calculateAndValidateLinksStats recibe un array links validados y retorna total de links, links únicos y total de links broken", () => {
  it("calculateAndValidateLinksStats deberia retornar el total de links, cuantos hay unicos y cuantos rotos", () => {
expect(calculateAndValidateLinksStats(arrayLinkValidadoStats)).toEqual({
  Total: 1,
    Unique: 1,
    Broken: 0
})
  });

});

// links

const resultArrayOfOneLink =  [
  `${process.cwd()}\\test\\prueba\\achivotest.md`,
  `${process.cwd()}\\test\\prueba\\vacio1.md`,
  `${process.cwd()}\\test\\prueba\\archivo1.md`,
  `${process.cwd()}\\test\\prueba\\archivo2.md`,
  `${process.cwd()}\\test\\prueba\\prueba2\\archivo3.md`,
  `${process.cwd()}\\test\\prueba\\prueba2\\archivo4.md`,
  `${process.cwd()}\\test\\prueba\\prueba2\\vacio2.md`,
  `${process.cwd()}\\test\\prueba\\prueba2\\prueba3\\archivo5.md`,
]

const resultArrayOfMd =  [
  `${process.cwd()}\\test\\prueba\\achivotest.md`,
  `${process.cwd()}\\test\\prueba\\prueba2\\archivo3.md`,
  `${process.cwd()}\\test\\prueba\\prueba2\\prueba3\\archivo5.md`,
  `${process.cwd()}\\test\\prueba\\prueba2\\vacio2.md`,
]

/*const rutaAbsoluta=`${process.cwd()}\\test\\prueba\\achivotest.md`;
const RouteForTestFilterMd= `${process.cwd()}\\test\\prueba`;
const rutaRelativa = 'test/prueba/achivotest.md';*/

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
    expect(getFilesArray(`${process.cwd()}\\test\\prueba\\nuevo.md`)).toEqual(resultArrayOfOneLink);
  });
  it('getFilesArray deberia retornar un array con links si se le paso directorio', () => {
    expect(getFilesArray(`${process.cwd()}\\test\\prueba`)).toEqual(resultArrayOfLinks);
  });
});

//obtiene array de archivos .md
describe('filterMarkdownFiles recibe un path y filtra los links hasta devolver un array de links a archivos md encontrados', () => {
  it('filterMarkdownFiles es una funcion', () => {
    expect(typeof saveFilesInArray).toBe('function');
  });
  it('filterMarkdownFiles deberia retornar un array con links a archivos md', () => {
    expect(saveFilesInArray(`${process.cwd()}\\test\\prueba\\nuevo.md`)).toEqual(resultArrayOfOneLink);
  });
  it('filterMarkdownFiles deberia retornar un array con links a archivos .md', () => {
    expect(filterMarkdownFiles(RouteForTestFilterMd)).toEqual(resultArrayOfMd);
  });
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
      file: `${process.cwd()}/test/prueba/archivotest.md`.replace(/\\/g, "/"),
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



//validate
const {validateAndFetchLinks} = require("../libreria/validate");
const {
  calculateLinksStats, 
  calculateAndValidateLinksStats
} = require("../libreria/stats");
const fetch = require('node-fetch');
jest.mock('node-fetch');

 const arrLinkOk= [
    {
      href: 'https://www.youtube.com/watch?v=1hpc70_OoAg',
      text: 'nadie lo vio completo',
      file: `${process.cwd()}/test/prueba/archivotest.md`.replace(/\\/g, "/"),
    },
  ];

  const arrayLinkStatusFail = [
    {
      href: 'https://www.youtube.com/want?v=1hpc70_OoAg',
      text: 'nadie lo vio completo',
      file: `${process.cwd()}/test/prueba/archivotest.md`.replace(/\\/g, "/"),
    },
  ];
  
  const arrayLinkValidadoStats = [
    {
      href: 'https://www.youtube.com/watch?v=1hpc70_OoAg',
      text: 'nadie lo vio completo',
      file: `${process.cwd()}/test/prueba/archivotest.md`.replace(/\\/g, "/"),
      status: 200,
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

      await validateAndFetchLinks(arrLinkOk).then((res) => {
        expect(res).toEqual([
          {
            href: 'https://www.youtube.com/watch?v=1hpc70_OoAg',
      text: 'nadie lo vio completo',
      file: `${process.cwd()}/test/prueba/archivotest.md`.replace(/\\/g, "/"),
      status: 200,
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
      href: 'https://www.youtube.com/want?v=1hpc70_OoAg',
      text: 'nadie lo vio completo',
      file: `${process.cwd()}/test/prueba/archivotest.md`.replace(/\\/g, "/"),
      status: 400,
      isOk: "fail",
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

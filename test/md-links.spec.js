//mdlinks
const {mdLinks} = require('../mdlinks');
//gral
const fetch= require ("node-fetch");
jest.mock("node-fetch");

const validate= true;
const rutaRelativa= "test/prueba/archivotest.md";
const rutaAbsoluta=`${process.cwd()}\\test\\prueba\\archivotest.md`;

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
    await mdLinks( rutaRelativa,{validate:false}).then (response => expect(response).toStrictEqual(arrResponse) )
  });
 
  it("si validate es true debe retornar un array con objetos de cada link con links validados mediante fetch", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
      }));

  const arrResponseValidate = [
    {
      href: 'https://www.youtube.com/watch?v=1hpc70_OoAg',
      text: 'nadie lo vio completo',
      file: `${process.cwd()}/test/prueba/archivotest.md`.replace(/\\/g, "/"),
      status: 200,
      isOk:'ok'
    }
  ]
  await mdLinks (rutaAbsoluta, {validate:true}).then (response=> expect(response).toStrictEqual (arrResponseValidate))
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




const { marked } = require("marked");
const fs = require('node:fs/promises');
const { log } = console;

const readMarkdownFilesAndSearchLinks = (arrOfMd) => {
  const promesas = arrOfMd.map(file => fs.readFile(file, { encoding: 'utf8' })
    .then((data) =>{
      return extractLinksFromMarkdown(data, file);
    })
    .catch((e) =>{
      log(e);
      return e;
    }));

    return Promise.all(promesas)
    .then((links) =>{
      return links.flat();
    })
}

const extractLinksFromMarkdown = (data, file) => {
  let arrLinks = [];
  const route = file.replace(/\\/g, "/");

  const renderer = new marked.Renderer();
  renderer.link = (href, _, text) => {
    const obj = {
        href,
        text: text.slice(0,50),
        file: route,
    }
      arrLinks.push(obj);
  };
  marked(data, {renderer})
 return arrLinks
}

module.exports = { readMarkdownFilesAndSearchLinks, extractLinksFromMarkdown };

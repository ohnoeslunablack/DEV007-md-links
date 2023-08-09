const fetch = require('node-fetch');

/**
 * @function validateAndFetchLinks
 * @param {Array de objetos de enlaces} arrOfLinks
 * @returns {Array de objetos de enlaces validados con fetch}
 */
const validateAndFetchLinks = (arrOfLinks) => {
    const arrOfValidateLinks = arrOfLinks.map((link) => {
        return fetch(link.href).then((response) => {
            return {
                href: link.href,
                text: link.text,
                file: link.file,
                status: response.status,
                isOk: response.status < 400 ? 'ok' : 'fail',
            };
        });
    });

    return Promise.all(arrOfValidateLinks);
};

module.exports = { validateAndFetchLinks };
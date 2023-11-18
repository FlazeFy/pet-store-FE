// routes.js
const routes = require('next-routes')();

routes.add(
    'appRoute', 
    '/app/catalog',
    '/app/profil'
);

module.exports = routes;

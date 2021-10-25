/* eslint-disable comma-dangle */
/* eslint-disable indent */
const createProxyMiddleware = require('http-proxy-middleware');

// eslint-disable-next-line space-before-function-paren
module.exports = function (app) {
  app.use(
    '/accounts',
    createProxyMiddleware({
      target: 'http://localhost:8081',
    })
  );
  app.use(
    '/order',
    createProxyMiddleware({
      target: 'http://localhost:8080',
    })
  );
};

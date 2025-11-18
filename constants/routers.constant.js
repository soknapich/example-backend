//App api version
const appApi = process.env.APP_API || '/api/v1';
// Middlewares
const authMiddleware = require("@middleware/auth.middleware");
const baseMiddleware = require("@middleware/base.middleware");

// Routers
const indexRoute = require('@routes/index.route');
const userRoute = require("@routes/user.route");
const productRoute = require("@routes/product.route");


const routers = [
  {
    uri: `/`,
    middleware: baseMiddleware,
    route: indexRoute
  },
  {
    uri: `${appApi}/users`,
    middleware: authMiddleware,
    route: userRoute
  },
  {
    uri: `${appApi}/products`,
    middleware: authMiddleware,
    route: productRoute
  }

];

module.exports = routers;
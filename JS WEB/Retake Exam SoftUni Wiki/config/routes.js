
const homeController = require('../controllers/homeController');
const userController = require("../controllers/userController");
const articleController = require('../controllers/articleController')
const auth = require('../utils/auth');
const validator = require('../utils/validator');

module.exports = (app) => {
  app.get('/', auth(false), homeController.getHome);


  //Users
  app.get('/auth/register', userController.getRegister);
  app.get('/auth/login', userController.getLogin);
  app.post('/auth/register', userController.postRegister);
  app.post('/auth/login/', userController.postLogin);

  //Articles
  app.get('/articles/create', auth(), articleController.getCreate);
  app.post('/articles/create', auth(), articleController.postCreate);
  app.get('/articles/all', articleController.getAll);
  app.get('/articles/details/:id', auth(false), articleController.getDetails);
  app.get('/articles/edit/:id', auth(), articleController.getEdit);
  app.post('/articles/edit/:id', auth(), articleController.postEdit);
  app.get('/articles/delete/:id', auth(), articleController.deleteArticle);

  app.get('/logout', auth(), userController.logout);
  //  app.get('*', homeController.notFound);
}
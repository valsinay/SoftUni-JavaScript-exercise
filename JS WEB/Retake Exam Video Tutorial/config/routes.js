
const homeController = require('../controllers/homeController');
const userController = require("../controllers/userController");
const courseController = require('../controllers/courseController');
const auth = require('../utils/auth');
const validator = require('../utils/validator');

module.exports = (app) => {
  app.get('/', auth(false),homeController.getHome);


  //Users
  app.get('/auth/register', userController.getRegister);
  app.get('/auth/login', userController.getLogin);
  app.post('/auth/register', validator,userController.postRegister);
  app.post('/auth/login/', validator,userController.postLogin);

  app.get('/courses/create', auth(), courseController.getCreate);
  app.post('/courses/create', auth(), validator, courseController.postCreate);
  app.get('/courses/details/:id', auth(), courseController.getDetails);
  app.get('/courses/enroll/:id', auth(), courseController.enrollUser);
  app.get('/courses/edit/:id', auth(), courseController.getEdit);
  app.post('/courses/edit/:id', auth(),validator, courseController.postEdit);
  app.get('/courses/delete/:id', auth(), courseController.deleteCourse);


  app.get('/logout',auth(), userController.logout);
  //  app.get('*', homeController.notFound);
}
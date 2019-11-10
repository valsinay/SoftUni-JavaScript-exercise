
const homeController = require('../controllers/homeController');
const userController = require("../controllers/userController");
const expenseController = require('../controllers/expenseController');
const auth = require('../utils/auth');
const validator = require('../utils/validator');

module.exports = (app) => {
  app.get('/', auth(false), homeController.getHome);


  //Users
  app.get('/auth/register', userController.getRegister);
  app.get('/auth/login', userController.getLogin);
  app.post('/auth/register', validator, userController.postRegister);
  app.post('/auth/login/', validator, userController.postLogin);

  app.get('/expenses/create', auth(), expenseController.getCreate);
  app.post('/expenses/create', auth(), expenseController.postCreate);
   app.get('/expenses/report/:id', auth(), expenseController.getReport);
 
  app.get('/expenses/delete/:id', auth(), expenseController.deleteExpense);
  app.post("/refill", auth(),expenseController.postRefill);

  app.get('/expenses/account-info', auth(), userController.getAccount);
  app.get('/logout', auth(), userController.logout);
  app.get('*', homeController.notFound);
}
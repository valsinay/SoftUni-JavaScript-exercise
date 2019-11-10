
const cubicController = require('../controllers/cubicController');
const homeController = require('../controllers/homeController');
const accessoriesController = require('../controllers/accessoriesController');
const userController = require("../controllers/userController");


module.exports = (app) => {
    app.get('/', homeController.getHome);
    app.get('/about', homeController.getAbout);
    app.get('/cubes/create',cubicController.getCreate);
    app.post('/cubes/create', cubicController.postCreate);
    app.get('/cubes/details/:id', cubicController.getDetails);

    //accessories
    app.get('/accessories/create',accessoriesController.getCreateAccessory);
    app.post('/accessories/create',accessoriesController.postCreateAccessory);
    app.get("/accessories/attach/:id",accessoriesController.getAttachAccessory);
    app.post('/accessories/attach',accessoriesController.postAttachAccessory);

    //Users
    app.get('/auth/register',userController.getRegister);
    app.get('/auth/login',userController.getLogin);
    app.post('/auth/register',userController.postRegister);
    app.post('/auth/login/',userController.postLogin);

    
    app.get('*', homeController.notFound);
}
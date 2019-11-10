const Cube = require('../models/modelCube.js');


function getCreate(req, res) {
    res.render('cubes/create.hbs'), { layout: "main" };
}
function postCreate(req, res) {

    let name = req.body.name;
    let description = req.body.description;
    let imageUrl = req.body.imageUrl;
    let difficultyLevel = req.body.difficultyLevel;

    let createdCube = new Cube({
        name: name,
        description: description,
        imageUrl: imageUrl,
        difficultyLevel: difficultyLevel,
        creatorId : req.params.creatorId
    });

    createdCube.save(function (err) {
        if (err) throw err;
    });

    res.redirect('/');

}

function getDetails(req, res) {
    req.app.locals.title = 'Cube Details';
    let id = req.params.id;

    Cube.findById(id, function (err, cube) {
        if (err) throw err;

        res.render("cubes/details.hbs", {
            id: cube._id,
            name: cube.name,
            description: cube.description,
            imageUrl: cube.imageUrl,
            difficulty: cube.difficultyLevel,
            accessories: cube.accessories
        });
     
    });
}

module.exports = {
    getCreate,
    postCreate,
    getDetails
}
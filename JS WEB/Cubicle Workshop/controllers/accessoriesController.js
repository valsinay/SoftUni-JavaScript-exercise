const Accessory = require('../models/accessory');
const Cube = require('../models/modelCube');

function getCreateAccessory(req, res) {

    res.render("accessories/create.hbs", { layout: 'main' });
};

function postCreateAccessory(req, res) {

    let name = req.body.name;
    let description = req.body.description;
    let imageUrl = req.body.imageUrl;


    let createdAccessory = new Accessory({
        name: name,
        description: description,
        imageUrl: imageUrl,
    });

    createdAccessory.save(function (err) {
        if (err) throw err;
    });

    res.redirect('/');
};

function getAttachAccessory(req, res) {
    req.app.locals.title = 'Attach Accessory';

    let id = req.params.id;
    Cube.findById(id, function (err, cube) {
        if (err) throw err;

        Accessory.find(function (err, accessoriesData) {
            if (err) throw err;

            let cubeAccessories = cube.accessories.map(c => c._id);
            let accessories = accessoriesData.filter(function (item) {
                return !cubeAccessories.includes(item._id);
            }).map(item => item.name);

            res.render('accessories/attach.hbs', { name: cube.name, imageUrl: cube.imageUrl, accessories: accessories });
        });
    })
}

function postAttachAccessory(req, res) {

    let id = req.headers.referer.split('/')[5];
    let accessoryName = req.body.accessory;

    Cube.findById(id, function (err, cube) {
        if (err) throw err;
        Accessory.find(function (err, accessories) {
            if (err) throw err;

            let accessory = accessories.find(a => a.name == accessoryName);
            cube.accessories.push(accessory);

            cube.save();
            res.redirect('/');
        });
    });
}


module.exports = {
    getCreateAccessory,
    postCreateAccessory,
    getAttachAccessory,
    postAttachAccessory
}
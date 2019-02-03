const express = require('express');
const router = express.Router();
const Joi = require('joi');
//data
const data = [
    {
        "id": 1,
        "title": "First post",
        "description": "Lorem Ipsum",
        "price": 12.00,
        "stock": 1111,
        "location" : [{
            country: "Lithuania",
            city: "Vilnius",
            street: "Ozo",
            latitude: "54.710780",
            longitude: "25.255470"
        }]
    },
    {
        "id": 2,
        "title": "Second post",
        "description": "Lorem Ipsum again",
        "price": 12.22,
        "stock": 22222,
        "location" : [{
            country: "Latvia",
            city: "Ryga",
            street: "Merkela",
            latitude: "56.949650",
            longitude: "24.105186"
        }]
    },
    {
        "id": 3,
        "title": "3 post",
        "description": "Lorem Ipsum again",
        "price": 152.00,
        "stock": 1111,
        "location" : [{
            country: "Latvia",
            city: "Jurmala",
            street: "Lauku",
            latitude: "56.972310",
            longitude: "23.797650"
        }]
    },
    {
        "id": 4,
        "title": "4 post",
        "description": "Lorem Ipsum again again",
        "price": 11.99,
        "stock": 444,
        "location" : [{
            country: "Lithuania",
            city: "Palanga",
            street: "Basanaviciaus",
            latitude: "55.920197",
            longitude: "21.067760"
        }]
    }
];


//get all items with GET method
router.get('/', (req, res, next) => {
        res.json(data);
});

//SEARCH query with GET method
router.get('/search?', (req, res, next) => {
    let response = [];
    const q = req.query; 
    var priceMIN = req.query.priceMIN;
    var priceMAX = req.query.priceMAX;

    if (Object.keys(q).length === 0) {
            // NO query parameters
            return res.status(404).json({
                message: 'Empty search query parameters.'
            });
    }
         
    // Search query for a unique match data
    if (!priceMIN && !priceMAX) {
        response = data.filter(function (item) {
            return Object.keys(this).every((key) => item[key].toString() === this[key]);
        }, q);
        res.json(response);
    }else{
        //TODO Search in price range
        /*
        priceMIN = parseFloat(priceMIN);
        priceMAX = parseFloat(priceMAX);r
        var obj = data;
        var keys = Object.keys(obj);
        var x, y;
        for (var i = 0; i < keys.length; i++) {
            var x, y = obj[i].price;
            x = parseFloat(x);
            x = y;   
        }
        if ((x >= priceMIN && y <= priceMAX)) {

            }
        else {
            return res.status(404).json({
                message: 'The item with the given range was not found.'
            });
        }
        function inRange(x,y) {
            if(!(x >= priceMIN && x <= priceMIN &&  y >= priceMIN && y <= priceMIN)) {
             res.status(400).json({ 
                 message: 'Missing item in given price range.'
                });
            } else { }  
        }*/
    }
});

//get single item by ID with GET method
router.get('/:itemId', (req, res, next) => {
    const id = data.find(i => i.id === parseInt(req.params.itemId,10));
    if (!Number.isInteger(parseInt(req.params.itemId,10))) {
        return res.status(400).json({ 
            message: 'ID must be an integer.'
        });
    }
    if (!id) {
        return res.status(404).json({
            message: 'The item with the given ID was not found.'
        });
    } else {
        res.json(id);
    }
});

//CREATE an item with POST method
router.post('/', (req, res, next) => {
    const item = {
        id: data.length + 1,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        location: [{
            country: req.body.country,
            city: req.body.city,
            street: req.body.street,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        }]
    }
    data.push(item);
    res.json(item);
});

// UPDATE/MODIFY item values by ID using PUT method
router.put('/:itemId', (req, res, next) => {
    const item = data.find((item) => item.id === parseInt(req.params.itemId));
    if (!item) {
        return res.status(404).json({
            message: 'The item with the given ID was not found.'
        });
    }
    for( let p in req.body ){
        item[p] = req.body[p];
    }
    res.json(item);
});

// DELETE item by id
router.delete('/:itemId', (req, res, next) => {
    const item = data.find((item) => item.id === parseInt(req.params.itemId));
    if (!item) {
        return res.status(404).json({
            message: 'The item with the given ID was not found.'
        });
    }

    const index = data.indexOf(item);
    data.splice(index, 1);

    return res.status(200).json({
        message: 'Deleted product with given ID.'
    });
});

    // Set user input validation rules
    const schema = Joi.object.keys({ 
        title: Joi.string().min(3).required(),
        description: Joi.string().min(5),
        price: Joi.number().precision(2).strict().positive(),
        stock: Joi.number().integer().positive(),
        location: Joi.object.keys({
            country: Joi.string().min(3),
            city: Joi.string().min(3),
            street: Joi.string().min(3),
            latitude: Joi.number().precision(8),
            longitude: Joi.number().precision(8)
        })
    });
    var skeleton = { location: {} };
    var options = { abortEarly: false };
    var validate = data => {
        var newData = Object.assign({}, skeleton, data);
        return Joi.validate( newData, schema, options);
      }

module.exports = router;
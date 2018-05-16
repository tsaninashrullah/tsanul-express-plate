var express = require('express');
var controller = require('../controllers/UserController');
var router = express.Router();

/* POST users listing. */
router.post('/', function(req, res, next) {
  controller.storeData(req.body ,function(result){
    res.json(result);
  })
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  controller.listUser(function(result) {
    res.json(result)
  })
});

/* PUT users listing. */
router.put('/:id', function(req, res, next) {
  controller.updateUser(req.params.id, req.body, function(result) {
    res.status(result.code).json(result)
  })
});

/* DELETE users listing. */
router.delete('/:id', function(req, res, next) {
  controller.deleteUser(req.params.id, function(result) {
    res.status(result.code).json(result)
  })
});

module.exports = router;

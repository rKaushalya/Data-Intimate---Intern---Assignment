var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController');

/* GET users listing. */
router.post("/save",UserController.saveUser);
router.post("/token",UserController.getToken);
router.get("/check",UserController.checkUser);
router.delete("/delete",UserController.logOut);

module.exports = router;

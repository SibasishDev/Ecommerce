const router = require('express').Router();
const userController = require('../controller/userController');


router.post('/register',userController.createUser);
// router.get('/ad-idle-hour',userController.addIdleHour);

module.exports = router;
const router = require('express').Router();
const { createUser, editUser, getUsers } = require('../controllers/userController');

router.post('/users', createUser);
router.patch('/users/:userId', editUser);
router.get('/users', getUsers);

module.exports = router;

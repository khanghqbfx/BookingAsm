const express = require('express');

const userController = require('../controller/user');

const router = express.Router();

router.post('/login', userController.login);

router.get('/users', userController.getUsers);

router.get('/admin/users', userController.getAdminUsers);

router.post('/admin/login', userController.adminLogin);

router.post('/logout', userController.logout);

router.post('/sign-up', userController.signUp);

module.exports = router;
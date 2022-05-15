const express = require('express');
const router = express.Router();
const {
    controllerGetAll,
    controllerGetAdmin,
    controllerGetKasir,
    controllerGetCustomer,
    controllerAdd,
    controllerEdit,
    controllerDelete,
    controllerAuth,
    } = require('./user.controller');
const authorize = require('../auth/authorize');
const {IsCustomer, IsAdmin, IsOwner, IsKasir, IsAdminorIsOwner} = require('../auth/role');

// routes
router.get('/', authorize, controllerGetAll);
router.get('/admin', authorize, IsAdminorIsOwner, controllerGetAdmin)
router.get('/kasir', authorize, IsAdmin,  controllerGetKasir)
router.get('/customer', authorize, IsAdmin, controllerGetCustomer)
router.post('/', authorize, controllerAdd); // all authenticated users
router.put('/:id', authorize, controllerEdit); 
router.delete('/:id', authorize, IsAdminorIsOwner, controllerDelete);
router.post('/auth', controllerAuth); //public route
module.exports = router;
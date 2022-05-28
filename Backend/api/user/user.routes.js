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
    controllerFindCustomer,
    controllerSearch,
    controllerGetbyRoleandOutlet,
    } = require('./user.controller');
const authorize = require('../auth/authorize');
const {IsCustomer, IsAdmin, IsAdminorIsOwner, IsAdminorIskasir} = require('../auth/role');

// routes
router.get('/', authorize, controllerGetAll);
router.post('/by', authorize, controllerGetbyRoleandOutlet);
router.post('/cari', authorize, controllerSearch)

//
router.get('/admin', authorize, IsAdminorIsOwner, controllerGetAdmin)
router.get('/kasir', authorize, controllerGetKasir)
router.get('/customer', authorize, IsAdminorIskasir, controllerGetCustomer)


router.post('/', authorize, controllerAdd); // all authenticated users
router.put('/:id', authorize, controllerEdit); 
router.delete('/:id', authorize, IsAdminorIsOwner, controllerDelete);
router.post('/auth', controllerAuth); //public route
router.post('/find', authorize, controllerFindCustomer); //public route
module.exports = router;
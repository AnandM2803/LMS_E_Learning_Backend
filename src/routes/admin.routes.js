const express = require('express');
const AdminController = require('../controllers/admin.controller');

const router = express.Router();

router.get('/getall', AdminController.getAll);
router.get('/getbyid/:id', AdminController.getById);
router.post('/add', AdminController.add);
router.get('/getbyemail/:email', AdminController.getByEmail);
router.get('/getbyusername/:userName',AdminController.getByUserName)
router.put('/update/:id', AdminController.update);
router.delete('/deletebyid/:id', AdminController.deleteById);

module.exports = router;

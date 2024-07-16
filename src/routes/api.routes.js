const express = require('express');
const router = express.Router();

router.use('/admin', require('./admin.routes'));
router.use('/course',require('./course.routes'));
router.use('/student',require('./student.routes'));


module.exports = router;

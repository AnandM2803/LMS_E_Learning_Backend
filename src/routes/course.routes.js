const express=require('express')
const CourseController=require('../controllers/course.controller')

const router=express.Router();

router.get('/getall',CourseController.getAll);
router.get('/getbyid/:id',CourseController.getById);
router.get('/getbycoursename/:courseName',CourseController.getByCourseName);
router.get('/getbyauthor/:author',CourseController.getByAuthor);
router.post('/add',CourseController.add);
router.put('/update/:id',CourseController.update);
router.delete('/deletebyid/:id',CourseController.deleteById);

module.exports=router;

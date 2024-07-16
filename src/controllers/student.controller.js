const BaseController=require('./base.controller')
const StudentRepository=require('../repositories/student.repository');

class StudentController extends BaseController{
    constructor()
    {
        super(StudentRepository)
    }
};

module.exports=new StudentController;
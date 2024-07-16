const BaseController=require('./base.controller')
const CourseRepository=require('../repositories/course.repository')

class CourseController extends BaseController
{
    constructor()
    {
        super(CourseRepository)
    }
}

module.exports=new CourseController;
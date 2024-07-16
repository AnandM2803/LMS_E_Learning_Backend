const BaseRepository=require('./base.repository')
const course=require('../model/course.model')

class courseRepository extends BaseRepository
{
    constructor()
    {
        super(course)
    }
}

module.exports=courseRepository;
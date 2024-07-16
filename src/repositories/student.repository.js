const BaseRepository=require('./base.repository');
const student=require('../model/student.model');

class StudentRepository extends BaseRepository{
    constructor()
    {
        super(student)
    }
};

module.exports=StudentRepository;
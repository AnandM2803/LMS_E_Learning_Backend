const BaseRepository=require('./base.repository')
const InstructorProfile=require('../model/instructorProfile.model')

class instructorProfileRepository extends BaseRepository
{
    constructor()
    {
        super(InstructorProfile)
    }
}

module.exports=instructorProfileRepository;
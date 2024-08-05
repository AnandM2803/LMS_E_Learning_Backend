const BaseRepository=require('./base.repository')
const instructor=require('../model/instructore.model');

class instructorRepository extends BaseRepository
{
    constructor()
    {
        super(instructor)
    }
}
module.exports=instructorRepository;
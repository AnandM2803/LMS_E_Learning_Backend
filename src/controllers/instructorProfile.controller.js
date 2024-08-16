const BaseController=require('./base.controller')
const instructorProfileRepository=require('../repositories/instructorProfile.repository')

class InstrcutorProfileController extends BaseController
{
    constructor()
    {
        super(instructorProfileRepository)
    }
}

module.exports=new InstrcutorProfileController();
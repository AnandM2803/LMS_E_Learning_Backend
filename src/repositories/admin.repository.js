const BaseRepository=require('./base.repository');
const admin=require('../model/admin.model');

class adminRepository extends BaseRepository{
    constructor()
    {
        super(admin);
    }
}

module.exports=adminRepository;
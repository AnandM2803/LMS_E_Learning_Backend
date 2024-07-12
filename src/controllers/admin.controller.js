const AdminRepository = require('../repositories/admin.repository');
const BaseController = require('./base.controller');

class AdminController extends BaseController {
    constructor() {
        super(AdminRepository);
    }
}

module.exports = new AdminController();

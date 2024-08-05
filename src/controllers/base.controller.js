const { StatusCodes } = require('http-status-codes');

class BaseController {
    constructor(repoClass) {
        this.repo = new repoClass();
    }

    ok(res, data) {
        if (!!data) {
            res.status(StatusCodes.OK).send(data);
        } else {
            res.status(StatusCodes.OK).send({ message: 'OK' });
        }
    }

    created(res, data) {
        return res.status(StatusCodes.CREATED).send({ message: 'Created', data: data });
    }

    notFound(res, message) {
        return res.status(StatusCodes.NOT_FOUND).send({ message: 'Data not found' });
    }

    internalServerError(res, message) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }

    getAll = (req, res) => {
        this.repo.findAll().then(data => {
            return this.ok(res, data);
        }).catch(err => {
            console.error(err);
            return this.internalServerError(res, err);
        });
    };

    add = (req, res) => {
        const body = req.body;
        this.repo.create(body).then(data => {
            return this.created(res, data);
        }).catch(err => {
            console.error(err);
            return this.internalServerError(res, err);
        });
    }

    getByEmail = (req, res) => {
        const { email } = req.params;
        console.log(`Received request to find by email: ${email}`);
        this.repo.findByEmail(email).then(data => {
            if (data) {
                return this.ok(res, data);
            } else {
                return this.notFound(res, 'No data found for the provided email');
            }
        }).catch(err => {
            console.error(err);
            return this.internalServerError(res, err);
        });
    }

    update = (req, res) => {
        let id = req.params.id;
        const body = req.body;
        console.log('Update Request ID:', id);
        console.log('Update Request Body:', body);
    
        this.repo.update(id, body).then(data => {
            if (data) {
                console.log('Updated Data:', data);
                return this.ok(res, data);
            } else {
                console.log('No Data Found for ID:', id);
                return this.notFound(res, 'Data not found for the provided ID');
            }
        }).catch(err => {
            console.error('Update Error:', err);
            return this.internalServerError(res, err);
        });
    }

    
    
    

    deleteById = (req, res) => {
        let id = req.params.id;
        this.repo.deleteById(id).then(data => {
            return this.ok(res, data);
        }).catch(err => {
            console.error(err);
            return this.internalServerError(res, err);
        });
    }

    getById = (req, res) => {
        let id = req.params.id;
        this.repo.findById(id).then(data => {
            return this.ok(res, data);
        }).catch(err => {
            console.error(err);
            return this.internalServerError(res, err);
        });
    }

    getByCourseName = (req, res) => {
        const { courseName } = req.params;
        this.repo.getByCourseName(courseName).then(data => {
            return this.ok(res, data);
        }).catch(err => {
            console.error(err);
            return this.internalServerError(res, err);
        });
    }

    getByUserName = (req, res) => {
        const { userName } = req.params;
        this.repo.getByUserName(userName).then(data => {
            return this.ok(res, data);
        }).catch(err => {
            console.error(err);
            return this.internalServerError(res, err);
        });
    }

    getByAuthor = (req, res) => {
        const { author } = req.params;
        this.repo.getByAuthor(author).then(data => {
            return this.ok(res, data);
        }).catch(err => {
            console.error(err);
            return this.internalServerError(res, err);
        });
    }
}

module.exports = BaseController;

const { StatusCodes } = require('http-status-codes');

class BaseController {
    constructor(repoClass) {
        this.repo = new repoClass();
    }

    ok(res, data) {
        if (!!data) {
            res.status(StatusCodes.OK).send(data);
        } else {
            res.status(StatusCodes.OK).send({ message: 'ok' });
        }
    }

    created(res, data) {
        return res.status(StatusCodes.CREATED).send({ message: 'Created', data: data });
    }

    notFound(res, message) {
        return res.status(StatusCodes.NOT_FOUND).send({ message: 'data not found' });
    }

    internalServerError(res, message) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    }

    getAll = (req, res) => {
        this.repo.findAll().then(data => {
            return this.ok(res, data);
        }).catch(err => {
            return this.internalServerError(res, err);
        });
    };

    add = (req, res) => {
        const body = req.body;
        this.repo.create(body).then(data => {
            return this.created(res, data);
        }).catch(err => {
            return this.internalServerError(res, err);
        });
    }

    getByEmail = (req, res) => {
        const { email } = req.params;
        this.repo.findByEmail(email).then(data => {
            return this.ok(res, data);
        }).catch(err => {
            return this.internalServerError(res, err);
        });
    }

    update = (req, res) => {
        let id = req.params.id;
        const body = req.body;
        this.repo.update(body).then(data => {
            return this.ok(res, data);
        }).catch(err => {
            return this.internalServerError(res, err);
        });
    }

    deleteById = (req, res) => {
        let id = req.params.id;
        this.repo.deleteById(id).then(data => {
            return this.ok(res, data);
        }).catch(err => {
            return this.internalServerError(res, err);
        });
    }

    getById = (req, res) => {
        let id = req.params.id;
        this.repo.findById(id).then(data => {
            return this.ok(res, data);
        }).catch(err => {
            return this.internalServerError(res, err);
        });
    }
}

module.exports = BaseController;

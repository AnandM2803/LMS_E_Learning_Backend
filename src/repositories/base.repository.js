class BaseRepository {
    constructor(_collection) {
        this.collection = _collection;
    }

    async findAll() {
        var data = await this.collection.find().lean().exec();
        return data;
    }

    async findById(id) {
        var data = await this.collection.findById(id);
        return data;
    }

    async create(model) {
        var data = await this.collection.create(model);
        return data;
    }

    async update(model) {
        var options = { new: true };
        var data = await this.collection.findByIdAndUpdate(model._id, model, options);
        return data;
    }

    async deleteById(id) {
        var data = await this.collection.findByIdAndDelete(id);
        return data;
    }

    async findByEmail(email) {
        console.log(`Finding by email: ${email}`);
        var data = await this.collection.findOne({ email: email }).lean().exec();
        return data;
    }

    async getByCourseName(courseName) {
        var data = await this.collection.find({ courseName: courseName }).lean().exec();
        return data;
    }

    async getByUserName(userName) {
        var data = await this.collection.find({ userName: userName }).lean().exec();
        return data;
    }

    async getByAuthor(author) {
        var data = await this.collection.find({ author: author }).lean().exec();
        return data;
    }
}

module.exports = BaseRepository;

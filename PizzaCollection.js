class PizzaCollection {

    constructor(databaseConnection) {
        this.db = databaseConnection;
    }

    addOne(pizza) {
        let db = this.db;
        return new Promise((resolve, reject) => {
            db.collection('pizzas').insertOne(pizza, (err, res) => {
                if (err) return reject(err);
                return resolve(res.ops[0]);
            });
        });
    }

    getAll() {
        let db = this.db;
        return new Promise((resolve, reject) => {
            db.collection('pizzas').find().toArray((err, res) => {
                if (err) return reject(err);
                return resolve(res);
            });
        });
    }

    getOne(id) {
        let db = this.db;
        return new Promise((resolve, reject) => {
            db.collection('pizzas').find({ id: id }).toArray((err, res) => {
                if (err) return reject(err);
                return resolve(res);
            })
        });
    }

    removeOne(id) {
        let db = this.db;
        return new Promise((resolve, reject) => {
            db.collection('pizzas').remove({ id: id }, (err, res) => {
                if (err) return reject(err);
                return resolve();
            })
        });
    }

}

module.exports = PizzaCollection;







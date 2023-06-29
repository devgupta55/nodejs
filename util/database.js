const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let db;
const mongoConnect = (callback) => {
    //making a connection
    MongoClient.connect("mongodb+srv://devgupta200204:devgupta55@cluster0.q3eygnj.mongodb.net/shop?retryWrites=true&w=majority")
    .then(client => {
        console.log("Connected");
        db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
}

const getDb = () => {
    if(db) {
        return db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect')
    }

    const db = client.db(databaseName)

    db.collection('tasks').deleteOne({
        _id: new ObjectID("5d303492fba918422c67bbac")
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

})
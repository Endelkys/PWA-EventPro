const mongoose = require('mongoose')
const { MONGODB_USERNAME, MONGODB_PASS, MONGODB_CLUSTER,MONGODB_DBNAME } = process.env;

const URI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASS}@${MONGODB_CLUSTER}.mongodb.net/${MONGODB_DBNAME}`

//Mongo DB
mongoose
.connect(URI)
.then(() => console.log('Conectado a la BD'))
.catch((error) => console.log('Fallo al conectar con MongoDb: ', error));

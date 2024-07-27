const mongoose = require('mongoose')
const { MONGODB_NAME, MONGODB_PASS } = process.env;

const URI = `mongodb+srv://${MONGODB_NAME}:${MONGODB_PASS}@eventpro.j9agcmc.mongodb.net/${MONGODB_NAME}`

//Mongo DB
mongoose
.connect(URI)
.then(() => console.log('Conectado a la BD'))
.catch((error) => console.log('Fallo al conectar con MongoDb: ', error));
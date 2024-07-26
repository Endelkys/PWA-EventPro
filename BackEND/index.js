const app = require('./src/server');

const PORT = app.get('port');

app.listen(PORT, () => {
  console.log("Server listen on port: ", PORT)
})
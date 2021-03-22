const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', middlewares.getAllTalkers);
app.get('/talker/search', middlewares.auth, middlewares.searchTalker);
app.get('/talker/:id', middlewares.getTalkerById);
app.post('/login', middlewares.login);
app.post('/talker', middlewares.auth, middlewares.createTalker);
app.put('/talker/:id', middlewares.auth, middlewares.editTalker);
app.delete('/talker/:talkerId', middlewares.auth, middlewares.deleteTalker);

app.use(middlewares.error);

app.listen(PORT, () => {
  console.log('Online');
});

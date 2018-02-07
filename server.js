const express = require('express');

const bodyParser = require('body-parser');
const Person = require('./models/Person');
const config = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = config.port;

app.get('/', (req, res) => Person.find({})
  .then(persons => res.send(persons))
  .catch(err => {
    console.error(err);
    return res.status(500).send('There was a problem finding the notes');
  })
);

app.get('/person/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      if (!person) {
        return res.status(404).send('Person was not found');
      }
      return res.send(person);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).send('There was a problem finding the note');
    });
});

app.post('/person', (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  if (title && content) {
    return Person.create(req.body)
      .then(person => res.status(200).send(person))
      .catch(console.error);
  }
  return res.status(400).send('Bad request');
});

app.patch('/person/:id', (req, res) => {
  const id = req.params.id;
  if (req.body.title || req.body.content) {
    return Person.findByIdAndUpdate(id, { $set: req.body }, { new: true })
      .then(updatedPerson => res.status(200).send(updatedPerson))
      .catch(console.error);
  }
  return res.status(400).send('Bad request');
});

app.delete('/person/:id', (req, res) => Person.findByIdAndRemove(req.params.id)
  .then(res.status(200).send('Person removed'))
  .catch(console.error)
);


app.listen(port,
  () => console.log(`Listening on port ${port}`)
);

module.exports = app;


const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

var repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title = '', url = '', techs = [] } = request.body;
  const newRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(newRepository);
  return response.status(201).json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title = '', url = '', techs = [] } = request.body;
  const repository = repositories.find(repository => repository.id === id);
  if (!repository)
    return response.status(400).json({
      message: 'repository not found'
    });
  const updatedRepository = {
    ...repository,
    title,
    url,
    techs
  };
  repositories = repositories.map(repository => {
    if (repository.id === id)
      return updatedRepository;
    else
      return repository;
  });
  return response.status(200).json(updatedRepository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;

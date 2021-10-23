const db = require("../models");
const Crud = db.crud;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  const create = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  Crud.create(create)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while create data",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Crud.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while find Crud",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Crud.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrive crud with id = " + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Crud.update(req.body, {
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Crud was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update crud with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating crud with id=" + id,
      });
    });
};

exports.delete = (req, res) => {};

exports.deleteAll = (req, res) => {};

exports.findAllPublished = (req, res) => {};

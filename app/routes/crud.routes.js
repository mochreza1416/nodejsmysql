module.exports = (app) => {
  const cruds = require("../controllers/crud.controller");
  let router = require("express").Router();

  router.post("/", cruds.create);
  router.get("/", cruds.findAll);
  router.get("/published", cruds.findAllPublished);
  router.get("/:id", cruds.findOne);
  router.put("/:id", cruds.update);
  router.delete("/:id", cruds.delete);
  router.delete("/", cruds.deleteAll);
  app.use("/api/posts", router);
};

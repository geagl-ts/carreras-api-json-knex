const { Router } = require("express");
const router = Router();

const queries = require("../db/queries");

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error("Invalid Id"));
}

function validCarrera(carrera) {
  const hasName =
    typeof carrera.nombre === "string" && carrera.nombre.trim() != "";
  return hasName;
}

router.get("/", async (req, res) => {
  const carreras = await queries.getAll();
  res.json(carreras);
});

router.get("/:id", isValidId, async (req, res, next) => {
  const carrera = await queries.getOne(req.params.id);
  if (carrera) {
    res.json(carrera);
  } else {
    next();
  }
});

router.post("/", async (req, res, next) => {
  if (validCarrera(req.body)) {
    //meter a la bd
    const carreras = await queries.create(req.body);
    res.json(carreras[0]);
  } else {
    next(new Error("Invalid Carrera"));
  }
});

router.put("/:id", isValidId, async (req, res, next) => {
  if (validCarrera(req.body)) {
    //actualiza la carrera
    const carrera = await queries.update(req.params.id, req.body);
    res.json(carrera[0]);
  } else {
    next(new Error("Invalid Carrera"));
  }
});

router.delete("/:id", isValidId, async (req, res, next) => {
  //eliminar la carrera
  await queries.delete(req.params.id);
  res.json({ deleted: true });
});

module.exports = router;

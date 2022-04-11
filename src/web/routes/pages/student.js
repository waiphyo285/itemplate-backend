const express = require("express");
const router = express.Router();
const checkAuth = require("../check_auth");
const utils = require("../../../../helpers/common");
const studentsDb = require("../../../../controllers/students");
const { handleRenderer, handleDatabase } = require("../../../../helpers/handle_response");

router
  .get("/students", checkAuth, (req, res, next) => {
    const pages = {
      runPage: "pages/student-list",
      runProgram: "courseMenu.studentSubMenu.list",
    };
    handleRenderer(req.user.role, pages, res);
  })
  .get("/student/:id?", checkAuth, async (req, res, next) => {
    const id = req.params.id;
    const data = id ? await studentsDb.findData("id", id) : {};
    const pages = {
      data: data,
      runPage: "pages/student-entry",
      runProgram: "courseMenu.studentSubMenu.entry",
    };
    handleRenderer(req.user.role, pages, res);
  })
  .post("/student", (req, res, next) => {
    let remove_images = req.body.remove_images || [];
    req.body.profile_images = req.body.profile_images || [];
    utils.removeImages(remove_images).then((result) => {
      // insert data
      const insertDb = studentsDb.addData(req.body);
      handleDatabase(insertDb, utils.isEmptyObject, res);
    });
  })
  .put("/student/:id?", (req, res, next) => {
    let remove_images = req.body.remove_images || [];
    req.body.profile_images = req.body.profile_images || [];
    utils.removeImages(remove_images).then((result) => {
      // update data
      const { ["id"]: rmId, ...data } = req.body;
      const updateDb = studentsDb.updateData(rmId, data);
      handleDatabase(updateDb, utils.isEmptyObject, res);
    });
  });

module.exports = router;

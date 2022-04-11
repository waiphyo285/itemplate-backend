const express = require("express");
const router = express.Router();
const async = require("async");
const checkAuth = require("../check_auth");
const config = require("../../../../config/index");
const { getProgram } = require("../../../../helpers/menu_access");

// Import Models
const User = require("../../../../databases/mongodb/models/user");
const City = require("../../../../databases/mongodb/models/city");
const Township = require("../../../../databases/mongodb/models/township");
const Register = require("../../../../databases/mongodb/models/register");

const dashbordCard = async () => {
  const countUser = function (callback) {
    User.countDocuments().exec((error, count) => {
      if (error) {
        callback(error, undefined);
      } else {
        callback(undefined, count);
      }
    });
  };

  const countRegister = function (callback) {
    Register.countDocuments().exec((error, count) => {
      if (error) {
        callback(error, undefined);
      } else {
        callback(undefined, count);
      }
    });
  };

  const countCity = function (callback) {
    City.countDocuments({}).exec((error, count) => {
      if (error) {
        callback(error, undefined);
      } else {
        callback(undefined, count);
      }
    });
  };

  const countTownship = function (callback) {
    Township.countDocuments({}).exec((error, count) => {
      if (error) {
        callback(error, undefined);
      } else {
        callback(undefined, count);
      }
    });
  };

  return [countUser, countRegister, countCity, countTownship];
};

router.get("/", checkAuth, async (req, res, next) => {
  async.parallel(await dashbordCard(), function (error, results) {
    res.render("pages/dashboard", {
      ...getProgram(req.user.role, "dashMenu.null.null"),
      app: config.APP,
      data: results,
    });
  });
});

module.exports = router;

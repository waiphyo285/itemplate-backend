const Township = require("../../../models/mongodb/models/township");
const serialize = require("../../serializer"); // switch custom

const listData = () => {
  return Township
    .find({})
    .populate({
      path: "cityid",
      model: "city",
      select: "city_mm city_en",
    })
    .then(serialize);
};

const findData = async (prop, val) => {
  return Township
    .find({ _id: val })
    .populate({
      path: "cityid",
      model: "city",
      select: "city_mm city_en",
    })
    .then((resp) => {
      return serialize(resp[0]);
    });
};

const findDataBy = (params) => {
  return Township
    .find(params)
    .populate({
      path: "cityid",
      model: "city",
      select: "city_mm city_en",
    })
    .then(serialize);
};

const addData = (dataObj) => {
  return Township
    .create(dataObj)
    .then(serialize);
};

const updateData = (id, dataObj) => {
  return Township
    .findByIdAndUpdate(id, dataObj)
    .then(serialize);
};

const deleteData = (id) => {
  return Township
    .findByIdAndDelete(id)
    .then(serialize);
};

const dropAll = () => {
  return Township.remove();
};

module.exports = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll,
};

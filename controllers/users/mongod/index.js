const { clearKey } = require("../../../models/cache/services/index");
const User = require("../../../models/mongodb/models/user");
const serialize = require("../../serializer"); // switch custom

const listUsers = () => {
  return User.find({}).cache().then(serialize);
};

const findUser = (prop, val) => {
  return User.find({ _id: val }).then((resp) => {
    return serialize(resp[0]);
  });
};

const addUser = (dataObj) => {
  const user = new User(dataObj);
  return user.save().then((resp) => {
    // set data in redis memocache
    clearKey(User.collection.collectionName);
    return resp;
  })
    .then(serialize);
};

const updateWithPass = (id, dataObj) => {
  return User.findOneAndUpdate({ _id: id }, dataObj, { new: true }).then(
    serialize
  );
};

const updateWithoutPass = async (id, dataObj) => {
  return User.findByIdAndUpdate(id, dataObj, { new: true }).then(serialize);
};

const deleteUser = (id) => {
  return User.findByIdAndDelete(id).then(serialize);
};

module.exports = {
  listUsers,
  findUser,
  addUser,
  updateWithPass,
  updateWithoutPass,
  deleteUser,
};

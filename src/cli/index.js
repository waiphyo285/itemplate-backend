const args = require("yargs-parser")(process.argv.slice(2));
const studentsDb = require("../../controllers/students/index");

const printHelp = function () {
  console.log(`
    Help usage:
    --index  list students
    --show   find student by {ID}
    --help   print help
  `);
};

const valid = args.index || args.show;

if (args.help || !valid) {
  printHelp();
  process.exit(1);
}

if (args.index) {
  studentsDb
    .listData()
    .then((data) => {
      console.log(`Data ${data}`);
    })
    .catch((err) => {
      console.log(`Error ${err}`);
    })
    .finally(() => {
      process.exit(1);
    });
}

if (args.show) {
  studentsDb
    .findData("id", args.show)
    .then((data) => {
      console.log(`Data ${data}`);
    })
    .catch((err) => {
      console.log(`Error ${err}`);
    })
    .finally(() => {
      process.exit(1);
    });
}

/**
 * cd here and type the following commands
 *
 * 1. node index
 * 2. node index --index
 * 3. node index --show=623210497fc2cb28840d1448
 *
 */

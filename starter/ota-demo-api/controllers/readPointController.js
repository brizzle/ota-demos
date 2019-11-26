const path = require("path");
const fs = require("fs");
const factory = require("./handlerFactory");

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../dev-data/readPoints.json"))
);

exports.getAll = factory.getAll(data);

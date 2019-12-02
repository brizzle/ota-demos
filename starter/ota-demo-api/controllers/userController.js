const path = require('path');
const fs = require('fs');
const factory = require('./handlerFactory');

const dataPath = path.join(__dirname, '../dev-data/users.json');

function readData() {
  return JSON.parse(fs.readFileSync(dataPath));
}

exports.getAll = factory.getAll(readData());
exports.get = factory.get(readData());

exports.create = (req, res, next) => {
  const data = readData();

  // Create new id
  const newId = data[data.length - 1].id + 1;

  // Allows a new object to be created by merging to the existing object
  const newUser = Object.assign({ id: newId }, req.body);

  // Write object to json file
  data.push(newUser);

  // Need to use writeFile and not writeFileSync since this
  // is inside of a callback function that is running in the event loop.
  // Cannot block the event loop.
  fs.writeFile(dataPath, JSON.stringify(data), err => {
    res.status(201).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        data: newUser
      }
    });
  });
};

exports.update = (req, res, next) => {
  // console.log(req.params);
  // console.log(req.body);

  const data = readData();
  const id = req.params.id * 1;
  const foundUser = data.find(x => x.id === id);

  if (!foundUser) {
    res.status(401).json({
      status: 'error',
      requestedAt: req.requestTime,
      message: 'The user could not be found!'
    });
  }

  update(data, id, req.body);

  const updatedData = data.find(x => x.id === id);

  fs.writeFile(dataPath, JSON.stringify(data), err => {
    console.log('Saved success!');
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        data: updatedData
      }
    });
  });
};

exports.delete = (req, res, next) => {
  const data = readData();
  const id = req.params.id * 1;
  const foundUser = data.find(x => x.id === id);

  if (!foundUser) {
    res.status(401).json({
      status: 'error',
      requestedAt: req.requestTime,
      message: 'The user could not be found!'
    });
  }

  const filteredData = data.filter(x => x.id !== id);

  fs.writeFile(dataPath, JSON.stringify(filteredData), err => {
    res.status(204).json({
      status: 'success',
      requestedAt: req.requestTime
    });
  });
};

function update(source, id, updatedObj) {
  for (var i = 0; i < source.length; i++) {
    if (source[i].id === id) {
      source[i].name = updatedObj.name;
      source[i].role = updatedObj.role;
      return;
    }
  }
}

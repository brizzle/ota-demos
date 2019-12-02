exports.getAll = data => (req, res, next) => {
  // console.log(req.body);
  // console.log(data);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      data
    }
  });
};

exports.get = data => (req, res, next) => {
  const foundData = data.find(x => x.id === +req.params.id);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      data: foundData
    }
  });
};

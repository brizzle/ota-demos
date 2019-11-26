exports.getAll = data => (req, res, next) => {
  // console.log(req.body);

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      data
    }
  });
};

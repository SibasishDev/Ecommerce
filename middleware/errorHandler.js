// not found

const notFound = (req, res, next) => {
  // const error = new Error(`Not Found : ${req.originalUrl}`);
  res.status(404).json({
    "code" : 404,
    "message" : "Not found",
  });
};

//Error Handler

const errorHandler = (err,req, res, next) => {
  console.log("here");
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statusCode);
  return  res.json({
    message: err?.message,
    stack: err?.stack,
  });
};

module.exports = { errorHandler, notFound };

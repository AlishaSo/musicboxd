//will overwrite the express error handler default function
const errorHandler = (e, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: e.message,
    stack: process.env.NODE_ENV == 'production' ? null : e.stack
  })
}

module.exports = { errorHandler }
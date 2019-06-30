module.exports = (req, res, next) => {
  if (req.decode.obj.role == 'Admin') {
    next()
  } else {
    next({code: 401});
  }
}
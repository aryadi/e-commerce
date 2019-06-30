module.exports = (req, res, next) => {
  if (req.decode.obj.role == 'Buyer') {
    next()
  } else {
    next({code: 401});
  }
}
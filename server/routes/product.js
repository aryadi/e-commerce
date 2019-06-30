const route = require('express').Router();
const productController = require('../controllers').product;
const authentication = require('../middlewares/authentication');
const authorizationAdmin = require('../middlewares/authorizationAdmin');
const Multer = require('multer');
const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});
const gcsMiddleware = require('../middlewares/google-cloud-storage');

route.get('/', productController.readAll)
route.post('/', authentication, authorizationAdmin, multer.single('image'), gcsMiddleware.sendUploadToGCS, productController.create);
route.patch('/:productId', authentication, authorizationAdmin, multer.single('image'), gcsMiddleware.sendUploadToGCS, productController.update);
route.delete('/:productId', authentication, authorizationAdmin, productController.delete)

module.exports = route;
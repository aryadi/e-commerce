
const {Storage} = require('@google-cloud/storage');

const GOOGLE_CLOUD_PROJECT_ID = `citric-abbey-244208`;
const GOOGLE_CLOUD_KEYFILE = `keyfile.json`;

const storage = new Storage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: GOOGLE_CLOUD_KEYFILE,
});

const getPublicUrl = (bucketName, fileName) => {
  return `https://storage.googleapis.com/${bucketName}/${fileName}`;
}

// console.log(storage);

const DEFAULT_BUCKET_NAME = `made-bucket`;

exports.sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    console.log('gagal');
    return next();
  }

  const bucketName = req.body.bucketName || DEFAULT_BUCKET_NAME;
  const bucket = storage.bucket(bucketName);
  const gcsFileName = `${Date.now()}-${req.file.originalname}`;
  const file = bucket.file(gcsFileName);
  
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    }
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsFileName;
    
    return file.makePublic()
    .then(() => {
      req.file.gcsUrl = getPublicUrl(bucketName, gcsFileName);
      next();
    });
  });

  stream.end(req.file.buffer);
};
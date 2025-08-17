const CsvFile = require('../../model/CsvFile');
const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/csv/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (path.extname(file.originalname) !== '.csv') {
      return cb(new Error('Only .csv files are allowed!'));
    }
    cb(null, true);
  }
});

// Controller to handle CSV upload
const uploadCsvFile = [
  upload.single('csv_file'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: true, mess: 'No file uploaded' });
      }
      const csvFile = new CsvFile({
        filename: req.file.filename,
        path: req.file.path,
        originalname: req.file.originalname,
        uploadedBy: req.user._id // Assumes user is authenticated and req.user is set
      });
      await csvFile.save();
      res.status(201).json({ success: true, mess: 'CSV file uploaded successfully', file: csvFile });
    } catch (err) {
      res.status(500).json({ error: true, mess: err.message });
    }
  }
];

module.exports = { uploadCsvFile };

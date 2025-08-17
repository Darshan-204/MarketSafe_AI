const CsvFile = require('../../model/CsvFile');

// Controller to get all CSV files uploaded by the user
const getUserCsvFiles = async (req, res) => {
  try {
    const files = await CsvFile.find({ uploadedBy: req.user._id }).sort({ uploadedAt: -1 });
    res.status(200).json({ success: true, files });
  } catch (err) {
    res.status(500).json({ error: true, mess: err.message });
  }
};

module.exports = { getUserCsvFiles };

const express = require('express');
const authtoken = require('../middleware/auth');
const UserSignin = require('../controllers/User/UserSignin');
const ForgotPassword = require('../controllers/User/ForgotPassword');
const UserLogout = require('../controllers/User/UserLogout');
const getUserDetails = require('../controllers/User/GetUserDetails');
const UserRegister = require('../controllers/User/UserRegister');
const EmailService = require('../controllers/User/EmailService');
const { getUserCsvFiles } = require('../controllers/csv_file/GetUserCsvFilesController');
const { uploadCsvFile } = require('../controllers/csv_file/UploadCsvFileController');
const router = express.Router();

router.post("/register",UserRegister);
router.post("/signin",UserSignin);
router.put("/update-password",ForgotPassword);
router.post("/logout",UserLogout);
router.post("/user-details",authtoken,getUserDetails);



router.post("/email",EmailService);

router.post('/upload-csv', authtoken, ...uploadCsvFile);
router.get('/my-csv-files', authtoken, getUserCsvFiles);


module.exports = router;
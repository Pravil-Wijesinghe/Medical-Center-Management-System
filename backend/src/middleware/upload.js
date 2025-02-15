const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

const PROFILE_PICTURE_DIR = path.join(__dirname, '../assets/profilePicture');
fs.ensureDirSync(PROFILE_PICTURE_DIR);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PROFILE_PICTURE_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = upload;
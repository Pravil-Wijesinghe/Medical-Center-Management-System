const path = require('path');
const fs = require('fs-extra');

const uploadProfilePicture = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileName = req.file.filename;
    return res.status(200).json({ message: 'File uploaded successfully', fileName });
};

module.exports = { uploadProfilePicture };
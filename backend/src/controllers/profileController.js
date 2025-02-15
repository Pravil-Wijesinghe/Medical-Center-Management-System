const path = require('path');
const fs = require('fs');

const getProfilePicture = (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '../assets/profilePicture', fileName);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'Profile picture not found' });
    }

    // Send the image file
    res.sendFile(filePath);
};

module.exports = { getProfilePicture };
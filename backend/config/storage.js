const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.cloudinary,
  params: {
    folder: 'resumes',
    resource_type: 'raw',
    public_id: (req, file) => {
      // Extract the base name without extension
      const originalName = file.originalname.replace(/\.[^/.]+$/, "");
      // Add a timestamp for uniqueness
      return `${originalName}-${Date.now()}.pdf`;
    },
    allowed_formats: ['pdf'],
    access_mode: 'public',
  }
});

module.exports = storage;

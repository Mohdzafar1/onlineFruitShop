const multer = require('multer');
const path = require('path');

const MIME_TYPE_IMAGE = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const MIME_TYPE_AUDIO = {
    'audio/wav': 'wav',
    'audio/wave': 'wav',
    'audio/mpeg': 'mp3'
};

const MIME_TYPE_VIDEO = {
    'video/mp4': 'mp4',
    'video/x-msvideo': 'avi',
    'video/3gpp': '3gp'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        const destinationPath1 = path.join(__dirname, '..', 'public', 'documents');
        const destinationPath2 = path.join(__dirname, '..', 'public', 'images');
        const destinationPath3 = path.join(__dirname, '..', 'public', 'videos');
        const destinationPath4 = path.join(__dirname, '..', 'public', 'audios');
       

        // cb(null, file.fieldname == 'docUrl' ? destinationPath1 : file.fieldname == ("introductionVideo" || "videoUrl") ? destinationPath3 : destinationPath2);
        let finalDestinationPath = path.join(__dirname, '..', 'public', 'others');

        if (file.fieldname === 'docUrl' || file.fieldname.toLowerCase().includes('document')) {
            finalDestinationPath = destinationPath1;
        } else if (file.fieldname.toLowerCase().includes('image')) {
            finalDestinationPath = destinationPath2;
        } else if (file.fieldname.toLowerCase().includes('video')) {
            finalDestinationPath = destinationPath3;
        } else if (file.fieldname.toLowerCase().includes('audio')) {
            finalDestinationPath = destinationPath4;
        } else {
            finalDestinationPath = path.join(__dirname, '..', 'public', 'others');
        }

        cb(null, finalDestinationPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
         
        let mimeTypeMap = null;
// console.log("filess",file);
        if (file.fieldname.toLowerCase().includes('image')) {
            mimeTypeMap = MIME_TYPE_IMAGE;
        } else if (file.fieldname.toLowerCase().includes('video')) {
            mimeTypeMap = MIME_TYPE_VIDEO;
        } else if (file.fieldname.toLowerCase().includes('audio')) {
            mimeTypeMap = MIME_TYPE_AUDIO;
        }

        const isValid = mimeTypeMap == null || !!mimeTypeMap[file.mimetype];
        let error = isValid ? null : new Error(`Invalid mime type for field '${file.fieldname}!'`);
        cb(error, isValid);
    },
});

module.exports = upload;

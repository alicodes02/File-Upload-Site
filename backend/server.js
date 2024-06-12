const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Image = require('./models/Image');
const Document = require('./models/Document');
const Pdf = require('./models/Pdf');
const Other = require('./models/Other');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Task0')
.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        let folder = getFolder(ext);

        const uploadPath = path.join(__dirname, 'uploads', folder);
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const originalName = path.basename(file.originalname, path.extname(file.originalname));
        const ext = path.extname(file.originalname);
        const uploadPath = path.join(__dirname, 'uploads', getFolder(ext));
        let uniqueName = file.originalname;

        let counter = 1;
        while (fs.existsSync(path.join(uploadPath, uniqueName))) {
            uniqueName = `${originalName}-${counter}${ext}`;
            counter++;
        }

        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

// Helper function to get the folder based on file extension
function getFolder(ext) {
    if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
        return 'images';
    } else if (ext === '.pdf') {
        return 'pdfs';
    } else if (['.doc', '.docx'].includes(ext)) {
        return 'documents';
    }
    return 'other';
}

function getModel(ext) {
    if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
        return Image;
    } else if (ext === '.pdf') {
        return Pdf;
    } else if (['.doc', '.docx'].includes(ext)) {
        return Document;
    }
    return Other;
}

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { originalname, filename, destination } = req.file;

        const folder = destination.split(path.sep).pop();
        const ext = path.extname(originalname).toLowerCase();
        const Model = getModel(ext);

        const newFile = new Model({
            originalName: originalname,
            uniqueName: filename,
            folder: folder
        });

        await newFile.save();

        res.send({ message: 'File uploaded successfully', file: req.file });
    } catch (error) {
        res.status(500).send({ message: 'Error uploading file', error });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

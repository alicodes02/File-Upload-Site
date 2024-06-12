const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 5000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        let folder = 'other';

        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif') {
            folder = 'images';
        } else if (ext === '.pdf') {
            folder = 'pdfs';
        } else if (ext === '.doc' || ext === '.docx') {
            folder = 'documents';
        }

        const uploadPath = path.join(__dirname, 'uploads', folder);
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});

const upload = multer({ storage });

app.use(cors());

app.post('/upload', upload.single('file'), (req, res) => {
    res.send({ message: 'File uploaded successfully', file: req.file });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

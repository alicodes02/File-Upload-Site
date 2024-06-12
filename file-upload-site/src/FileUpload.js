import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        axios.post('http://localhost:5000/upload', formData)
            .then((response) => {
                alert("File uploaded successfully:")
                console.log('File uploaded successfully:', response.data);
            })
            .catch((error) => {
                alert("There was an error uploading the file!")
                console.error('There was an error uploading the file!', error);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <input 
                type="file" 
                onChange={onFileChange} 
                className="hidden" 
                id="upload-input" 
            />
            <label 
                htmlFor="upload-input" 
                className="cursor-pointer text-black py-2 px-4 rounded-lg hover:bg-gray-300"
            >
                <img src = "upload.png" className="w-20 h-20 ml-1"/>
                <div className="mt-3 text-center">Upload Image</div>
            </label>
            {selectedFile && (
                <div className="mt-4 text-gray-700">{selectedFile.name}</div>
            )}
            <button 
                onClick={onFileUpload} 
                disabled={!selectedFile} 
                className={`mt-5 py-2 px-4 rounded-lg ${selectedFile ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
            >
                Upload
            </button>
        </div>
    );
};

export default FileUpload;

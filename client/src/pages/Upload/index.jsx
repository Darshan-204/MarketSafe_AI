import React, { useRef, useState } from 'react';
import './Upload.css';

const Upload = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setSuccess(false);
    setError('');
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        setError('Please upload a valid CSV file.');
        setFileName('');
        return;
      }
      setFileName(file.name);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!fileInputRef.current.files[0]) {
      setError('Please select a CSV file to upload.');
      return;
    }
    setSuccess(true);
    setError('');
    // Here you would handle the actual upload logic (API call, etc.)
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2 className="upload-title">Upload CSV File</h2>
        <form className="upload-form" onSubmit={handleUpload}>
          <input
            type="file"
            accept=".csv,text/csv"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="upload-input"
          />
          {fileName && <div className="file-name">Selected: {fileName}</div>}
          {error && <div className="upload-error">{error}</div>}
          {success && <div className="upload-success">File uploaded successfully!</div>}
          <button type="submit" className="upload-btn">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default Upload;

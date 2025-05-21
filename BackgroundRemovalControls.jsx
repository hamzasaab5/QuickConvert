
import React, { useState } from "react";
import { removeBackgroundFromImage } from "./backgroundRemovalUtils";

const BackgroundRemovalControls = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [outputUrl, setOutputUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setOutputUrl("");
    setError("");
  };

  const handleRemoveBackground = async () => {
    if (!selectedFile) {
      setError("Please select an image.");
      return;
    }

    setLoading(true);
    setError("");
    setOutputUrl("");

    try {
      const resultUrl = await removeBackgroundFromImage(selectedFile);
      setOutputUrl(resultUrl);
    } catch (err) {
      setError("Background removal failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="text-center mt-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded"
      />
      <br />
      <button
        onClick={handleRemoveBackground}
        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
      >
        Remove Background
      </button>
      {loading && <p className="mt-4 text-yellow-600">⏳ Processing... please wait</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {outputUrl && (
        <>
          <img
            src={outputUrl}
            alt="Result"
            className="mt-6 mx-auto rounded shadow-lg max-w-full"
          />
          <a
            href={outputUrl}
            download="no-bg.png"
            className="mt-4 inline-block bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
          >
            ⬇️ Download Image
          </a>
        </>
      )}
    </div>
  );
};

export default BackgroundRemovalControls;

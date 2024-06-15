import React, { useState } from "react";
import AlertMsg from "./AlertMsg";
import FilePreview from "./FilePreview";
import ProgressBar from "./ProgressBar";

function UploadForm({ uploadBtnCLick, progress }) {
  const [file, setFile] = useState();
  const [error, setError] = useState();

  const onFileSelect = (file) => {
    console.log(file);
    if (file && file.size > 2000000) {
      setError("Maximum file upload size is 2MB");
      return;
    }
    setError(null);
    setFile(file);
  };
  return (
    <div className="text-center">
      <div class="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-80 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50  hover:bg-blue-100 hover:border-blue-600"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-12 h-12 mb-4 text-primary"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 md:text-2xl text-lg text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or{" "}
              <strong className="text-primary">drag</strong> and{" "}
              <strong className="text-primary">drop</strong>
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (Max Size: 2MB)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            onChange={(e) => {
              onFileSelect(e.target.files[0]);
            }}
          />
        </label>
      </div>
      {error ? <AlertMsg msg={error} /> : null}
      {file ? (
        <FilePreview file={file} removeFile={() => setFile(null)} />
      ) : null}
      {progress > 0 && progress < 100 ? (
        <ProgressBar progress={progress} />
      ) : (
        <button
          disabled={!file}
          className="p-2 bg-primary text-white w-[25%] rounded-full mt-5 disabled:bg-gray-400"
          onClick={() => uploadBtnCLick(file)}
        >
          Upload
        </button>
      )}
    </div>
  );
}

export default UploadForm;

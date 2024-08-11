"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function FileInfo({ file }) {
  const [fileType, setFileType] = useState();
  useEffect(() => {
    file && setFileType(file?.fileType.split("/")[0]);
    console.log(fileType);
  }, [file]);

  return (
    file && (
      <div className="text-center border flex justify-center m-4 flex-col items-center p-2 rounded-md border-blue-200">
        <Image
          src={fileType == "image" ? file?.fileUrl : "/file.png"}
          width={200}
          height={200}
          className="h-[200px] rounded-md object-contain"
        />
        <div className="pt-3">
          <div className="text-[20px]">{file.fileName}</div>
          <div className="text-gray-400 text-[13px]">
            {file.fileType} ({(file.fileSize / 1024 / 1024).toFixed(2)}MB)
          </div>
        </div>
      </div>
    )
  );
}

export default FileInfo;

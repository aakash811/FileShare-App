"use client";
import React, { useState } from "react";
import { Download, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

function fileItems({ file }) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const passProtection = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    file && (
      <div>
        <div className="p-5 rounded-md bg-[#fff] flex flex-col items-center">
          <div className="text-center flex-col gap-3 items-center flex">
            <h2 className="text-[20px] text-gray-600">
              <strong className="text-primary">{file.username} </strong>
              shared a file with you
            </h2>
            <h2 className="text-[10px] text-gray-400">
              Find file details below
            </h2>
            <Image
              src="/download-file.gif"
              width={150}
              height={150}
              className="w-[150px] h-[150px] p-5"
            />
            <h2 className="text-gray--500 text-[15px]">
              File Name: {file.fileName}{" "}
              <div>
                File Size: {(file.fileSize / 1024 / 1024).toFixed(2)} MB
              </div>
            </h2>
          </div>
          {file.password.length > 3 ? (
            <div className="flex gap-2 justify-center align-middle">
              <input
                type={showPassword ? "text" : "password"}
                className="p-2 border rounded-md text-[14px] mt-5 text-center outline-blue-400"
                placeholder="Enter password to access"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={passProtection}
                className="cursor-pointer bg-transparent mt-4"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          ) : null}
          <button
            className="flex gap-2 p-2 bg-primary text-white rounded-full w-full items-center hover:bg-blue-600 text-[14px] mt-5 text-center justify-center disabled:bg-gray-300"
            disabled={file.password !== password}
            onClick={() => window.open(file.fileUrl)}
          >
            <Download className="h-4 w-4" />
            Download
          </button>
          <h2 className="text-gray-400 text-[12px] mt-3">
            *Terms & Conditions Applied*
          </h2>
        </div>
      </div>
    )
  );
}

export default fileItems;

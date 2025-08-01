import { Copy, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalApi from "../../../../../_utils/GlobalApi";
import { useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";

function FileShareForm({ file, onPasswordSave }) {
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [Toast, setToast] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const { user } = useUser();

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const passProtection = () => {
    setShowPassword((prevState) => !prevState);
  };

  const sendEmail = () => {
    setIsClicked(true);
    const data = {
      to: email,
      userName: user?.fullName,
      fileName: file.fileName,
      fileSize: file.fileSize,
      fileType: file.fileType,
      shortUrl: file.shortUrl,
    };
    GlobalApi.SendEmail(data).then((resp) => {
      console.log(resp);
    });
    toast.success("Email Sent");
    setTimeout(() => {
      window.location.href = "/files"; // Programmatically navigate to /files
    }, 2000);
  };

  const onCopyClick = () => {
    navigator.clipboard.writeText(file.shortUrl);
    toast.success("URL Copied");
  };

  return (
    file && (
      <div className=" border flex justify-center m-4 flex-col p-4 rounded-md border-blue-200">
        <div>
          <label className="text-[14px] text-gray-500">Short Url</label>
          <div className="flex gap-5 p-2 border rounded-md">
            <input
              type="text"
              value={file.shortUrl}
              disabled={true}
              className="disabled:text-gray-500 bg-transparent outline-none w-full"
            />
            <Copy
              className="text-gray-400 hover:text-gray-500"
              onClick={() => onCopyClick()}
            />
          </div>
        </div>
        <div className="gap-3 flex mt-5">
          <input
            type="checkbox"
            onChange={(e) => {
              setIsPasswordEnabled(e.target.checked);
            }}
          />
          <label>Enable Password</label>
        </div>

        {isPasswordEnabled ? (
          <div className="flex gap-3 items-center">
            <div className="border flex relative rounded-md w-full p-2">
              <input
                type={showPassword ? "text" : "password"}
                className="disabled:text-gray-500 bg-transparent outline-none w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={passProtection}
                className="absolute right-[10px] cursor-pointer bg-transparent"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <button
              className="p-2 bg-primary text-white rounded-md disabled:bg-gray-300 hover:bg-blue-400"
              disabled={password?.length < 3}
              onClick={() => onPasswordSave(password)}
            >
              Save
            </button>
          </div>
        ) : null}

        <div className="mt-5">
          <label className="text-[14px] text-gray-500">
            Send File to Email
          </label>
          <div className="flex flex-col gap-4">
            <div className="flex gap-5 p-2 border rounded-md text-[18px]">
              <input
                type="text"
                className="disabled:text-gray-500 bg-transparent outline-none"
                placeholder="example@gmail.com"
                onChange={handleInputChange}
              />
            </div>
            <Link href="/files">
              <button
                className="p-2 bg-primary text-white rounded-md disabled:bg-gray-300 hover:bg-blue-600"
                onClick={() => sendEmail()}
                disabled={isClicked}
              >
                Send Email
              </button>
            </Link>
          </div>
        </div>
        <ToastContainer autoClose={1600} />
      </div>
    )
  );
}

export default FileShareForm;

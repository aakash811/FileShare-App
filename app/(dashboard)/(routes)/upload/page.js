"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadForm from "./_components/UploadForm";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { app } from "../../../../firebaseConfig";
import { generateRandString } from "../../../_utils/GenerateRandString";

function Upload() {
  const { user } = useUser();
  const [progress, setProgress] = useState(0);
  const [fileDocId, setFileDocId] = useState("");
  const router = useRouter();

  const storage = getStorage(app);
  const db = getFirestore(app);

  const uploadFile = (file) => {
    const metadata = {
      contentType: file.type,
    };

    const storageRef = ref(storage, "file-upload/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress);

      if (progress === 100) {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          saveInfo(file, downloadURL);
        });
      }
    });
  };

  const saveInfo = async (file, fileUrl) => {
    const docId = generateRandString().toString();
    setFileDocId(docId);

    await setDoc(doc(db, "uploadedFile", docId), {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl: fileUrl,
      userEmail: user?.primaryEmailAddress.emailAddress,
      username: user?.fullName,
      password: "",
      id: docId,
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + docId,
    });

    // Display toast when upload is completed
    toast.success("Upload completed");

    // Redirect after 2 seconds
    setTimeout(() => {
      router.push("/file-preview/" + docId);
    }, 2000);
  };

  return (
    <div className="p-5 px-8 md:px-28">
      <div className="font-medium text-[20px] text-center m-5">
        Start <strong className="text-primary">Uploading</strong> File and{" "}
        <strong className="text-primary">Share</strong> it
      </div>
      <UploadForm
        uploadBtnCLick={(file) => uploadFile(file)}
        progress={progress}
      />
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default Upload;

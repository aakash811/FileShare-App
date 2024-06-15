"use client";
import { getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import FileItems from "../[fileId]/_components/FileItems";
import Link from "next/link";
import Image from "next/image";

function FileView({ params }) {
  const db = getFirestore(app);
  const [fileInfo, setFileInfo] = useState();
  useEffect(() => {
    console.log(params.fileId);
    params.fileId && getFileInfo();
  }, []);

  const getFileInfo = async () => {
    const docRef = doc(db, "uploadedFile", params?.fileId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setFileInfo(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  return (
    <div className="bg-gray-100 h-screen items-center flex flex-col w-full justify-center gap-4 ">
      <Link href="">
        <Image src="/logo.svg" width={150} height={100} />
      </Link>
      <FileItems file={fileInfo} />
    </div>
  );
}

export default FileView;

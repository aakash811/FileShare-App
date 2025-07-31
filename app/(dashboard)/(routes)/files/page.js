"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebaseConfig"; // Adjust the path to your Firebase configuration
import { useUser } from "@clerk/nextjs";

function Files() {
  const { user, isLoaded } = useUser();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        if (!user || !user.primaryEmailAddress) return;

        const userEmail = user.primaryEmailAddress.emailAddress;
        const fileRef = collection(db, "uploadedFile");
        const q = query(fileRef, where("userEmail", "==", userEmail))
        // const filesCollection = collection(db, "uploadedFile");
        const querySnapshot = await getDocs(q);
        const fileList = querySnapshot.docs.map((doc) => doc.data());
        setFiles(fileList);
      } catch (error) {
        console.error("Error fetching files: ", error);
      }
    };

    if(isLoaded){ 
      fetchFiles();
    }
  }, [user, isLoaded]);

  return (
    <div className="mt-24">
      <div className="overflow-x-auto shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preview
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {files.length > 0 ? (
              files.map((file, index) => {
                // Check if shortUrl exists and is a string
                const fileUrl = file.shortUrl || "";
                const parts = fileUrl ? fileUrl.split("/") : [];
                const fileId = parts[parts.length - 1];

                return (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {file.fileName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {file.fileType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {file.fileSize
                        ? `${(file.fileSize / 1024 / 1024).toFixed(2)} MB`
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      {file.shortUrl ? (
                        <Link href={`/file-preview/${fileId}`}>View</Link>
                      ) : (
                        "No URL available"
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-sm text-gray-500 text-center"
                >
                  No file data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Files;

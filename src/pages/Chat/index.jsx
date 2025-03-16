import React, { useState, useEffect } from "react";
import ChatInterface from "../../components/ChatInterface";
import PdfViewer from "../../components/PdfViewer";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const [fileUrl, setFileUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFileUrl = localStorage.getItem("fileUrl");
    if (storedFileUrl) {
      console.log("Stored File URL:", storedFileUrl); // 🔍 Debugging

      setFileUrl(storedFileUrl);
    } else {
      navigate("/"); // ✅ Redirect to home if no file is uploaded
    }
  }, [navigate]);
  if (!fileUrl) return <p className="text-gray-500">Loading PDF...</p>;

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 p-4 bg-gray-100">
        <ChatInterface />
      </div>
      <div className="w-1/2 p-4">
        <PdfViewer fileUrl={fileUrl} />
      </div>
    </div>
  );
}

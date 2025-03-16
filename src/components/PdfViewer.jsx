import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// //  Set the correct worker path (from public folder)
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";



// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

// pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";


export default function PDFViewer({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(null);

    const handleLoadError = (error) => {
    console.error("Error loading PDF:", error);
    setError("Failed to load PDF file.");
  };
  useEffect(() => {
    setNumPages(null); // Reset pages
    setPageNumber(1); // Reset to first page on new PDF
    console.log("Received fileUrl in PdfViewer:", fileUrl); // 🔍 Debugging
  }, [fileUrl]);
 

 if (!fileUrl) return <p className="text-gray-500">No PDF uploaded</p>;
  return (
    <div className="flex flex-col w-full h-full rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-1 bg-white shadow-md">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber <= 1}
        >
          Previous
        </button>
        <p className="text-lg ">
          Page {pageNumber} of {numPages || "?"}
        </p>
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
          disabled={pageNumber >= numPages}
        >
          Next
        </button>
      </div>

      <div className="flex justify-center items-center h-full border border-gray-300 rounded">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : fileUrl ? (
          <Document
            file={fileUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={handleLoadError}
            className="w-full flex justify-center"
            crossOrigin="anonymous"
            >
          {/* // <Document
          //   file="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          //   onLoadError={handleLoadError}
          // > */}
            <Page
              pageNumber={pageNumber}
              width={500} // ✅ Fixed width (adjustable)
              height={700} // ✅ Fixed height (adjustable)
              renderMode="canvas"
            />
          </Document>
        ) : (
          <p className="text-gray-500">No PDF uploaded</p>
        )}
      </div>
    </div>
  );
}

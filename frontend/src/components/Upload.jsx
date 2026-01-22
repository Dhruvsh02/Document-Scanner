import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { useDropzone } from "react-dropzone";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function UploadComponent({ onUpload, onProcessed }) {
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
    multiple: false,
    disabled: loading,
    onDrop: (files) => files[0] && handleFile(files[0]),
  });

  const handleFile = async (file) => {
    if (!file) return;

    const meta = {
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2),
    };

    // ================= PDF (FIRST PAGE ONLY – PREVIEW MODE) =================
    if (file.type === "application/pdf") {
      const reader = new FileReader();

      reader.onload = async () => {
        const typedArray = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport }).promise;

        const previewImage = canvas.toDataURL("image/png");


        onUpload(previewImage, meta);


        onProcessed(previewImage);
      };

      reader.readAsArrayBuffer(file);
      return;
    }

    // ================= IMAGE (SEND TO BACKEND) =================
    setLoading(true);

    const previewUrl = URL.createObjectURL(file);
    onUpload(previewUrl, meta);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("https://document-scanner-backend-yul7.onrender.com", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Backend failed");
      }

      const blob = await res.blob();
      const processedUrl = URL.createObjectURL(blob);

      onProcessed(processedUrl);
    } catch (err) {
      console.error(err);
      alert("Failed to process image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-slate-300"}
          ${loading ? "opacity-50 pointer-events-none" : ""}
        `}
      >
        <input {...getInputProps()} />
        <p className="font-medium">
          Drag & drop a file here, or click to select
        </p>
        <p className="text-xs text-slate-500">
          PNG, JPG or PDF (first page only)
        </p>
      </div>

      {loading && (
        <p className="text-blue-600 font-medium">
          Processing document…
        </p>
      )}
    </div>
  );
}

export default UploadComponent;

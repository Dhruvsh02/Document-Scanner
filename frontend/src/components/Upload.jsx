import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function UploadComponent({ onUpload }) {
  const [before, setBefore] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

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
        const image = canvas.toDataURL();

        setBefore(image);
        onUpload(image); // send to dashboard
      };
      reader.readAsArrayBuffer(file);
    } else {
      const image = URL.createObjectURL(file);
      setBefore(image);
      onUpload(image);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={handleFileChange}
      />

      {before && (
        <div>
          <h4 className="font-medium mb-2">Before</h4>
          <img src={before} className="max-w-md border rounded" />
        </div>
      )}
    </div>
  );
}

export default UploadComponent;

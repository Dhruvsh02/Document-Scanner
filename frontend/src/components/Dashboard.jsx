import { useEffect, useState } from "react";
import UploadComponent from "./Upload";
import ImageViewer from "./ImageViewer";
import Gallery from "./Gallery";
import ClientCropper from "./ClientCropper";
import { getCroppedImage } from "./cropImage";

import { FileText, User } from "lucide-react";
import { useAuth } from "../AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";


function Dashboard() {
  const [activeTab, setActiveTab] = useState("upload");
  const [documents, setDocuments] = useState([]);
  const [current, setCurrent] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const { user } = useAuth();


  /* ===================== STATS ===================== */
  const totalDocuments = documents.length;
  const processedToday = documents.length;
  const storageUsedMB = (documents.length * 2.5).toFixed(1);

  /* ===================== LOAD ===================== */
  useEffect(() => {
    const saved = localStorage.getItem("documents");
    if (saved) {
      const parsed = JSON.parse(saved);
      setDocuments(parsed);
      if (parsed.length > 0) setCurrent(parsed[0]);
    }
  }, []);

  /* ===================== SAVE ===================== */
  useEffect(() => {
    localStorage.setItem("documents", JSON.stringify(documents));
  }, [documents]);

  /* ===================== UPLOAD ===================== */
  const handleUpload = (before, meta) => {
    const isPdf = meta.name.toLowerCase().endsWith(".pdf");

    const doc = {
      id: Date.now(),
      before,
      after: isPdf ? before : null,
      name: meta.name,
      size: meta.size,
      createdAt: new Date().toISOString(),
      isPdf,
    };

    setDocuments((prev) => [doc, ...prev]);
    setCurrent(doc);

    if (!isPdf) {
      setShowCropper(true); // image only
    }
  };

  /* ===================== CROP CONFIRM ===================== */
  const handleCropConfirm = async (cropArea) => {
    if (!current) return;

    const croppedBlob = await getCroppedImage(current.before, cropArea);
    const croppedUrl = URL.createObjectURL(croppedBlob);

    setDocuments((prev) =>
      prev.map((d) =>
        d.id === current.id ? { ...d, before: croppedUrl } : d
      )
    );

    setCurrent((prev) =>
      prev ? { ...prev, before: croppedUrl } : prev
    );

    setShowCropper(false);

    await sendToBackend(croppedBlob);
  };

  /* ===================== BACKEND ===================== */
  const sendToBackend = async (fileBlob) => {
    const formData = new FormData();
    formData.append("file", fileBlob);

    const res = await fetch("https://document-scanner-backend-yul7.onrender.com", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    const processedUrl = URL.createObjectURL(blob);

    handleProcessed(processedUrl);
  };

  /* ===================== AFTER ===================== */
  const handleProcessed = (after) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === current?.id ? { ...d, after } : d
      )
    );

    setCurrent((prev) =>
      prev ? { ...prev, after } : prev
    );
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* ================= HEADER ================= */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold">DocScanner Pro</h1>
              <p className="text-xs text-slate-500">
                Document Processing Platform
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div className="text-sm">
              <p className="font-medium">{user?.email}</p>
              <button onClick={() => signOut(auth)}
               className="text-xs text-red-500 hover:underline">
                Logout </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* ================= STATS ================= */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard title="Total Documents" value={totalDocuments} />
          <StatCard title="Processed Today" value={processedToday} />
          <StatCard title="Storage Used" value={`${storageUsedMB} MB`} />
        </div>

        {/* ================= TABS ================= */}
        <div className="bg-white rounded-xl border">
          <div className="border-b px-6 flex space-x-6">
            <TabButton
              active={activeTab === "upload"}
              onClick={() => setActiveTab("upload")}
            >
              Upload Document
            </TabButton>

            <TabButton
              active={activeTab === "gallery"}
              onClick={() => setActiveTab("gallery")}
            >
              My Documents
            </TabButton>
          </div>

          <div className="p-6 space-y-6">
            {/* ================= UPLOAD ================= */}
            {activeTab === "upload" && (
              <>
                <UploadComponent
                  onUpload={handleUpload}
                  onProcessed={() => {}}
                />

                {showCropper && current && (
                  <ClientCropper
                    image={current.before}
                    onConfirm={handleCropConfirm}
                    onCancel={() => setShowCropper(false)}
                  />
                )}

                {current && !showCropper && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Before</h4>
                      <ImageViewer src={current.before} />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">After</h4>

                      {current.after ? (
                        <div className="space-y-3">
                          <ImageViewer src={current.after} />
                          <a
                            href={current.after}
                            download={`scanned_${current.name}`}
                            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                          >
                            Download Processed Image
                          </a>
                        </div>
                      ) : current.isPdf ? (
                        <div className="border rounded h-64 flex items-center justify-center text-slate-400">
                          PDF preview only (first page)
                        </div>
                      ) : (
                        <div className="border rounded h-64 flex items-center justify-center text-slate-400">
                          Waiting for backend…
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ================= GALLERY ================= */}
            {activeTab === "gallery" && (
              <Gallery
                items={documents}
                onSelect={(doc) => {
                  setCurrent(doc);
                  setActiveTab("upload");
                }}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ================= HELPERS ================= */

function StatCard({ title, value }) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`py-4 border-b-2 text-sm ${
        active
          ? "border-blue-600 text-blue-600"
          : "border-transparent text-slate-500"
      }`}
    >
      {children}
    </button>
  );
}

export default Dashboard;


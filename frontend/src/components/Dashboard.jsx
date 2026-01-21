import { useState } from "react";
import UploadComponent from "./Upload";

import {
  Upload as UploadIcon,
  FileText,
  Grid,
  LogOut,
  User,
  Search,
  Bell,
  Settings,
} from "lucide-react";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("upload");
  const [documents, setDocuments] = useState([]); // all uploads
  const [current, setCurrent] = useState(null);   // selected upload

  // derived stats (frontend-only, realistic)
  const totalDocuments = documents.length;
  const processedToday = documents.length;
  const storageUsedMB = (documents.length * 2.5).toFixed(1);

  const logout = () => {
    console.log("Logout clicked");
  };

  const handleUpload = (image) => {
    const doc = {
      id: Date.now(),
      before: image,
      createdAt: new Date(),
    };

    setDocuments((prev) => [doc, ...prev]);
    setCurrent(doc);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  DocScanner Pro
                </h1>
                <p className="text-xs text-slate-500">
                  Document Processing Platform
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* <Search className="w-5 h-5 text-slate-600" />
              <Bell className="w-5 h-5 text-slate-600" />
              <Settings className="w-5 h-5 text-slate-600" /> */}

              <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
                <div className="w-9 h-9 bg-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">Guest User</p>
                  <p className="text-xs text-slate-500">Local Session</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Documents"
            value={totalDocuments}
            subtitle="Based on uploads"
            icon={<FileText className="w-6 h-6 text-blue-600" />}
            iconBg="bg-blue-100"
          />

          <StatCard
            title="Processed Today"
            value={processedToday}
            subtitle="Today"
            icon={<UploadIcon className="w-6 h-6 text-green-600" />}
            iconBg="bg-green-100"
          />

          <StatCard
            title="Storage Used"
            value={`${storageUsedMB} MB`}
            subtitle="Estimated"
            icon={<Grid className="w-6 h-6 text-purple-600" />}
            iconBg="bg-purple-100"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-6">
              <TabButton
                active={activeTab === "upload"}
                onClick={() => setActiveTab("upload")}
                icon={<UploadIcon className="w-4 h-4" />}
                label="Upload Document"
              />

              <TabButton
                active={activeTab === "gallery"}
                onClick={() => setActiveTab("gallery")}
                icon={<Grid className="w-4 h-4" />}
                label="My Documents"
              />
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === "upload" && (
              <div className="space-y-6">
                <UploadComponent onUpload={handleUpload} />

                {current && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Before</h4>
                      <img
                        src={current.before}
                        className="border rounded max-w-full"
                      />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">After</h4>
                      <div className="border rounded h-full flex items-center justify-center text-slate-400">
                        Processed result will appear here
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "gallery" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.length === 0 && (
                  <p className="text-slate-500">No uploads yet</p>
                )}

                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setCurrent(doc)}
                    className="border rounded-lg overflow-hidden cursor-pointer hover:shadow"
                  >
                    <img
                      src={doc.before}
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-3 text-sm text-slate-600">
                      Uploaded just now
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Logout */}
        <div className="flex justify-end mt-6">
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-6 py-2.5 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </main>
    </div>
  );
}

/* ---------- Helpers ---------- */

function StatCard({ title, value, subtitle, icon, iconBg }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 flex justify-between">
      <div>
        <p className="text-sm text-slate-600">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
        <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
      </div>
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBg}`}
      >
        {icon}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`py-4 px-1 border-b-2 text-sm flex items-center space-x-2 ${
        active
          ? "border-blue-500 text-blue-600"
          : "border-transparent text-slate-500 hover:text-slate-700"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default Dashboard;

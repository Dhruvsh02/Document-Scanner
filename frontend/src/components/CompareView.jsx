import ImageViewer from "./ImageViewer";

function CompareView({ before, after }) {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* BEFORE */}
        <div>
          <h4 className="font-medium mb-2">Before</h4>

          {before ? (
            <ImageViewer src={before} />
          ) : (
            <div className="border rounded h-64 flex items-center justify-center text-slate-400">
              No file selected
            </div>
          )}
        </div>

        {/* AFTER */}
        <div>
          <h4 className="font-medium mb-2">After</h4>

          {after ? (
            <div className="space-y-3">
              <ImageViewer src={after} />

              <a
                href={after}
                download="scanned_document.png"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Download Processed Image
              </a>
            </div>
          ) : (
            <div className="border rounded h-64 flex items-center justify-center text-slate-400">
              Processed result will appear here
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default CompareView;

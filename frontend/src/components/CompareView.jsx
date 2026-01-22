// function CompareView({ before, after }) {
//  return (
//    <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
//      <div style={{ flex: 1 }}>
//        <h4>Before</h4>
//        {before ? (
//          <img
//            src={before}
//            alt="before"
//            style={{ width: "100%", border: "1px solid #ccc" }}
//          />
//        ) : (
//          <p>No file selected</p>
//        )}
//      </div>


//      <div style={{ flex: 1 }}>
//        <h4>After</h4>
//        {after ? (
//          <img
//            src={after}
//            alt="after"
//            style={{ width: "100%", border: "1px solid #ccc" }}
//          />
//        ) : (
//          <p>Processed result will appear here</p>
//        )}
//      </div>
//    </div>
//  );
// }


// export default CompareView;

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

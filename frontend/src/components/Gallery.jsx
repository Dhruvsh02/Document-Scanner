function Gallery({ items, onSelect }) {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4">Previous Uploads</h3>

      {items.length === 0 && (
        <p className="text-slate-500">No uploads yet</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => onSelect(item)}
            className="cursor-pointer border rounded-lg overflow-hidden hover:shadow-md transition"
          >
            <div className="h-32 bg-slate-100 flex items-center justify-center">
              <img
                src={item.before}
                alt="thumbnail"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="p-2">
              <p className="text-xs font-medium truncate">
                {item.name || "Document"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;


// import Cropper from "react-easy-crop";
// import { useState } from "react";

// function ClientCropper({ image, onConfirm }) {
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [area, setArea] = useState(null);

//   return (
//     <div className="space-y-4">
//       <div className="relative h-[400px] bg-black rounded">
//         <Cropper
//           image={image}
//           crop={crop}
//           zoom={zoom}
//           aspect={1 / 1.414} // A4 ratio
//           onCropChange={setCrop}
//           onZoomChange={setZoom}
//           onCropComplete={(_, croppedAreaPixels) =>
//             setArea(croppedAreaPixels)
//           }
//         />
//       </div>

//       <button
//         onClick={() => onConfirm(area)}
//         className="px-4 py-2 bg-blue-600 text-white rounded"
//       >
//         Confirm Crop
//       </button>
//     </div>
//   );
// }

// export default ClientCropper;


import Cropper from "react-easy-crop";
import { useState } from "react";

function ClientCropper({ image, onConfirm, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  return (
    <div className="space-y-4">
      <div className="relative h-[400px] bg-black rounded">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1.414} // A4 ratio
          restrictPosition
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(_, areaPixels) =>
            setCroppedAreaPixels(areaPixels)
          }
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onConfirm(croppedAreaPixels)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Confirm Crop
        </button>

        <button
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ClientCropper;

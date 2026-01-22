import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function ImageViewer({ src }) {
  if (!src) return null;

  return (
    <div className="border rounded overflow-hidden bg-slate-50">
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        wheel={{ step: 0.1 }}
        doubleClick={{ disabled: true }}
      >
        <TransformComponent>
          <img
            src={src}
            alt="preview"
            className="w-full object-contain"
          />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

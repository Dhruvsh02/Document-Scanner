from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import cv2
import numpy as np
import io

from utils import four_point_transform

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/scan")
async def scan(file: UploadFile = File(...)):
    contents = await file.read()

    image = cv2.imdecode(np.frombuffer(contents, np.uint8), cv2.IMREAD_COLOR)
    if image is None:
        return {"error": "Invalid image"}

    orig = image.copy()
    is_pdf = file.content_type == "application/pdf"

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(blur, 75, 200)

    contours, _ = cv2.findContours(
        edges, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE
    )
    contours = sorted(contours, key=cv2.contourArea, reverse=True)

    doc_cnt = None
    for c in contours:
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.02 * peri, True)
        if len(approx) == 4:
            doc_cnt = approx
            break

    if doc_cnt is not None:
        scanned = four_point_transform(orig, doc_cnt.reshape(4, 2))
    else:
        scanned = orig

    if is_pdf:
        final = cv2.cvtColor(scanned, cv2.COLOR_BGR2GRAY)
    else:
        gray = cv2.cvtColor(scanned, cv2.COLOR_BGR2GRAY)
        gray = cv2.fastNlMeansDenoising(gray, h=10)

        clahe = cv2.createCLAHE(clipLimit=1.8, tileGridSize=(8, 8))
        enhanced = clahe.apply(gray)

        enhanced = cv2.normalize(
            enhanced, None, alpha=30, beta=240, norm_type=cv2.NORM_MINMAX
        )

        kernel = np.array([
            [0, -0.3, 0],
            [-0.3, 2.2, -0.3],
            [0, -0.3, 0]
        ])
        final = cv2.filter2D(enhanced, -1, kernel)

    ok, encoded = cv2.imencode(".png", final)
    if not ok:
        return {"error": "Encoding failed"}

    return StreamingResponse(
        io.BytesIO(encoded.tobytes()),
        media_type="image/png"
    )
